// TuneOut Content Script
// Detects feed pages and replaces them with briefings

(function() {
  'use strict';

  // Determine which site we're on and if it's a feed page
  function detectSite() {
    const host = location.hostname.replace('www.', '');
    const path = location.pathname;

    if (host === 'twitter.com' || host === 'x.com') {
      // Home feed, For You, Following
      if (path === '/' || path === '/home' || path === '/i/trending') return 'twitter';
    }
    if (host === 'reddit.com') {
      // Front page, popular, all
      if (path === '/' || path === '/r/popular' || path === '/r/popular/' ||
          path === '/r/all' || path === '/r/all/' || path === '/?feed=home') return 'reddit';
    }
    if (host === 'youtube.com') {
      // Home page only
      if (path === '/' || path === '/feed/trending' || path === '/feed/subscriptions') return 'youtube';
    }
    return null;
  }

  const site = detectSite();
  if (!site) return;

  // Check if extension is enabled for this site
  chrome.runtime.sendMessage({ type: 'CHECK_ENABLED', site }, (resp) => {
    if (chrome.runtime.lastError || !resp?.enabled) return;
    initTuneOut(site);
  });

  function initTuneOut(site) {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => replaceFeed(site));
    } else {
      replaceFeed(site);
    }
  }

  function replaceFeed(site) {
    // Create full-page overlay
    const overlay = document.createElement('div');
    overlay.id = 'tuneout-overlay';
    overlay.innerHTML = buildUI(site);
    document.documentElement.appendChild(overlay);

    // Hide original page content
    document.body.style.overflow = 'hidden';

    // Fetch briefing
    chrome.runtime.sendMessage({ type: 'GET_BRIEFING', site }, (resp) => {
      if (chrome.runtime.lastError) {
        showError('Could not load briefing. Extension may need to be reloaded.');
        return;
      }
      if (resp?.error) {
        showError(resp.error);
        return;
      }
      renderBriefing(resp.items, resp.summary);
    });

    // Wire up event handlers
    setTimeout(() => {
      const proceedBtn = document.getElementById('tuneout-proceed');
      if (proceedBtn) {
        proceedBtn.addEventListener('click', handleProceed);
      }

      const intentInput = document.getElementById('tuneout-intent');
      if (intentInput) {
        intentInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const value = intentInput.value.trim();
            if (value) {
              showIntentConfirm(value, site);
            }
          }
        });
      }
    }, 0);
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function getSiteName(site) {
    return { twitter: 'Twitter/X', reddit: 'Reddit', youtube: 'YouTube' }[site] || site;
  }

  function formatDate() {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function buildUI(site) {
    const siteName = getSiteName(site);
    return `
      <div class="tuneout-container">
        <header class="tuneout-header">
          <div class="tuneout-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1a1a2e"/>
              <path d="M8 12h16M8 16h12M8 20h14" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
              <circle cx="24" cy="10" r="4" fill="#00d4aa" opacity="0.3"/>
            </svg>
            <span class="tuneout-wordmark">TuneOut</span>
          </div>
          <div class="tuneout-date">${formatDate()}</div>
        </header>

        <main class="tuneout-main">
          <section class="tuneout-greeting">
            <h1>${getGreeting()}.</h1>
            <p class="tuneout-intercept-msg">
              You opened <strong>${siteName}</strong>. Before the algorithm decides what you see, take a moment.
            </p>
          </section>

          <section class="tuneout-intent">
            <label for="tuneout-intent">What did you come here to do?</label>
            <input type="text" id="tuneout-intent"
                   placeholder="e.g. Check messages from a friend, look up a specific topic..."
                   autocomplete="off" />
            <p class="tuneout-intent-hint">
              If you have a specific purpose, type it and press Enter. If you were just going to scroll... read your briefing instead.
            </p>
          </section>

          <section class="tuneout-briefing">
            <h2>Your Briefing</h2>
            <div id="tuneout-summary" class="tuneout-summary">
              <div class="tuneout-loading">
                <div class="tuneout-spinner"></div>
                <span>Fetching your briefing...</span>
              </div>
            </div>
            <div id="tuneout-items" class="tuneout-items"></div>
          </section>

          <section class="tuneout-why">
            <details>
              <summary>Why am I seeing this?</summary>
              <div class="tuneout-why-content">
                <p><strong>Algorithmic feeds are prompt injection attacks on your brain.</strong>
                They exploit empathy, curiosity, and outrage to keep you scrolling.
                The more empathetic you are, the more vulnerable you are.</p>
                <p>TuneOut replaces the feed with a briefing from RSS sources.
                Same trigger (opening ${siteName}), different reward (information you chose vs. information chosen to manipulate you).</p>
                <p>You're not missing anything important. If something matters, it'll reach you through people, not algorithms.</p>
              </div>
            </details>
          </section>
        </main>

        <footer class="tuneout-footer">
          <button id="tuneout-proceed" class="tuneout-proceed-btn">
            Show the feed anyway
          </button>
          <p class="tuneout-proceed-note">
            You've been here <span id="tuneout-timer">0</span> seconds. The average scroll session is 30 minutes.
          </p>
        </footer>
      </div>
    `;
  }

  function renderBriefing(items, summary) {
    const summaryEl = document.getElementById('tuneout-summary');
    const itemsEl = document.getElementById('tuneout-items');
    if (!summaryEl || !itemsEl) return;

    // Show LLM summary if available
    if (summary) {
      const paragraphs = summary.split('\n\n').filter(p => p.trim());
      summaryEl.innerHTML = paragraphs.map(p =>
        `<p>${escapeHTML(p.trim())}</p>`
      ).join('');
    } else {
      summaryEl.innerHTML = '<p class="tuneout-no-summary">Headlines from your RSS sources. Add an API key in settings for AI-generated briefings.</p>';
    }

    // Show items
    if (items && items.length > 0) {
      itemsEl.innerHTML = items.map(item => `
        <a href="${escapeHTML(item.link)}" class="tuneout-item" target="_blank" rel="noopener">
          <span class="tuneout-item-source">${escapeHTML(item.source)}</span>
          <span class="tuneout-item-title">${escapeHTML(item.title)}</span>
          ${item.description ? `<span class="tuneout-item-desc">${escapeHTML(item.description)}</span>` : ''}
        </a>
      `).join('');
    } else {
      itemsEl.innerHTML = '<p class="tuneout-no-items">No items to show. Check your RSS feed settings.</p>';
    }

    // Start timer
    startTimer();
  }

  function showError(msg) {
    const summaryEl = document.getElementById('tuneout-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `<p class="tuneout-error">Error: ${escapeHTML(msg)}</p>`;
    }
  }

  function showIntentConfirm(intent, site) {
    const intentSection = document.querySelector('.tuneout-intent');
    if (!intentSection) return;
    const siteName = getSiteName(site);
    intentSection.innerHTML = `
      <div class="tuneout-intent-confirm">
        <p>Your intention: <strong>${escapeHTML(intent)}</strong></p>
        <p>Go do that specific thing. Skip the feed. Come back here when you're done.</p>
        <button class="tuneout-intent-go" onclick="document.getElementById('tuneout-overlay').remove(); document.body.style.overflow = '';">
          Go to ${siteName} with intention
        </button>
      </div>
    `;
  }

  let timerInterval = null;
  function startTimer() {
    let seconds = 0;
    const timerEl = document.getElementById('tuneout-timer');
    if (!timerEl) return;
    timerInterval = setInterval(() => {
      seconds++;
      timerEl.textContent = seconds;
    }, 1000);
  }

  function handleProceed() {
    // Add friction: confirm dialog
    const seconds = parseInt(document.getElementById('tuneout-timer')?.textContent || '0');
    let msg = 'Open the algorithmic feed?';
    if (seconds < 10) {
      msg = "You've been here less than 10 seconds. The briefing above has everything important. Open the feed anyway?";
    }
    if (confirm(msg)) {
      if (timerInterval) clearInterval(timerInterval);
      const overlay = document.getElementById('tuneout-overlay');
      if (overlay) overlay.remove();
      document.body.style.overflow = '';
    }
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Handle SPA navigation (Twitter/YouTube are SPAs)
  let lastPath = location.pathname;
  const observer = new MutationObserver(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      const newSite = detectSite();
      if (newSite && !document.getElementById('tuneout-overlay')) {
        chrome.runtime.sendMessage({ type: 'CHECK_ENABLED', site: newSite }, (resp) => {
          if (chrome.runtime.lastError || !resp?.enabled) return;
          replaceFeed(newSite);
        });
      } else if (!newSite) {
        const overlay = document.getElementById('tuneout-overlay');
        if (overlay) {
          overlay.remove();
          document.body.style.overflow = '';
        }
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
