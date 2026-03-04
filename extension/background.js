// TuneOut Background Service Worker
// Handles RSS fetching, caching, and optional LLM summarization

const DEFAULT_FEEDS = [
  { url: 'https://hnrss.org/frontpage?count=10', name: 'Hacker News', category: 'tech' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', name: 'BBC World', category: 'world' },
  { url: 'https://feeds.npr.org/1001/rss.xml', name: 'NPR News', category: 'news' },
  { url: 'https://feeds.arstechnica.com/arstechnica/index', name: 'Ars Technica', category: 'tech' },
];

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
let feedCache = { items: [], fetchedAt: 0 };

// Parse RSS/Atom XML into items
function parseRSS(xml, sourceName) {
  const items = [];
  // RSS 2.0 items
  const rssItems = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  for (const raw of rssItems) {
    const title = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
    const link = (raw.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1] || '';
    const desc = (raw.match(/<description[^>]*>([\s\S]*?)<\/description>/i) || [])[1] || '';
    const pubDate = (raw.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) || [])[1] || '';
    items.push({
      title: decodeEntities(title).trim(),
      link: decodeEntities(link).trim(),
      description: stripHTML(decodeEntities(desc)).trim().slice(0, 200),
      date: pubDate ? new Date(pubDate).toISOString() : null,
      source: sourceName,
    });
  }

  // Atom entries
  if (items.length === 0) {
    const entries = xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
    for (const raw of entries) {
      const title = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
      const linkMatch = raw.match(/<link[^>]*href=["']([^"']+)["']/i);
      const link = linkMatch ? linkMatch[1] : '';
      const summary = (raw.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) || [])[1] || '';
      const published = (raw.match(/<published[^>]*>([\s\S]*?)<\/published>/i) || [])[1] ||
                         (raw.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i) || [])[1] || '';
      items.push({
        title: decodeEntities(title).trim(),
        link: decodeEntities(link).trim(),
        description: stripHTML(decodeEntities(summary)).trim().slice(0, 200),
        date: published ? new Date(published).toISOString() : null,
        source: sourceName,
      });
    }
  }

  return items;
}

function decodeEntities(str) {
  return str
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function stripHTML(str) {
  return str.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
}

// Fetch all RSS feeds
async function fetchFeeds() {
  const now = Date.now();
  if (feedCache.items.length > 0 && (now - feedCache.fetchedAt) < CACHE_TTL_MS) {
    return feedCache.items;
  }

  const settings = await chrome.storage.local.get(['customFeeds']);
  const feeds = settings.customFeeds || DEFAULT_FEEDS;

  const results = await Promise.allSettled(
    feeds.map(async (feed) => {
      const resp = await fetch(feed.url, { cache: 'no-cache' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const xml = await resp.text();
      return parseRSS(xml, feed.name);
    })
  );

  let allItems = [];
  for (const r of results) {
    if (r.status === 'fulfilled') allItems.push(...r.value);
  }

  // Sort by date (newest first), deduplicate by title
  allItems.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

  const seen = new Set();
  allItems = allItems.filter(item => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Keep top 20
  allItems = allItems.slice(0, 20);

  feedCache = { items: allItems, fetchedAt: now };
  return allItems;
}

// Optional LLM summarization
async function summarizeWithLLM(items) {
  const settings = await chrome.storage.local.get(['llmApiKey', 'llmProvider']);
  const apiKey = settings.llmApiKey;
  if (!apiKey) return null;

  const provider = settings.llmProvider || 'anthropic';
  const headlines = items.slice(0, 15).map((item, i) =>
    `${i + 1}. [${item.source}] ${item.title}${item.description ? ' - ' + item.description : ''}`
  ).join('\n');

  const prompt = `You are a personal news briefing assistant. Given these headlines from the user's RSS feeds, write a concise morning briefing (3-5 paragraphs). Group related stories. Be factual and direct. Skip clickbait. End with one thought-provoking question for the reader to consider today.\n\nHeadlines:\n${headlines}`;

  try {
    if (provider === 'anthropic') {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      return data.content?.[0]?.text || null;
    }

    if (provider === 'openai') {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1024,
        }),
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      return data.choices?.[0]?.message?.content || null;
    }
  } catch (e) {
    console.error('TuneOut: LLM summarization failed', e);
    return null;
  }

  return null;
}

// Track stats
async function incrementStat(site) {
  const data = await chrome.storage.local.get(['stats']);
  const stats = data.stats || { total: 0, sites: {} };
  stats.total++;
  stats.sites[site] = (stats.sites[site] || 0) + 1;
  stats.lastIntercept = new Date().toISOString();
  await chrome.storage.local.set({ stats });
}

// Message handler
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_BRIEFING') {
    (async () => {
      try {
        const items = await fetchFeeds();
        const summary = await summarizeWithLLM(items);
        incrementStat(msg.site);
        sendResponse({ items, summary, error: null });
      } catch (e) {
        sendResponse({ items: [], summary: null, error: e.message });
      }
    })();
    return true; // async response
  }

  if (msg.type === 'GET_SETTINGS') {
    chrome.storage.local.get(['disabledSites', 'llmApiKey', 'llmProvider', 'stats', 'customFeeds'], (data) => {
      sendResponse(data);
    });
    return true;
  }

  if (msg.type === 'CHECK_ENABLED') {
    chrome.storage.local.get(['disabledSites'], (data) => {
      const disabled = data.disabledSites || [];
      sendResponse({ enabled: !disabled.includes(msg.site) });
    });
    return true;
  }
});

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['disabledSites', 'stats'], (data) => {
    if (!data.disabledSites) {
      chrome.storage.local.set({ disabledSites: [] });
    }
    if (!data.stats) {
      chrome.storage.local.set({ stats: { total: 0, sites: {} } });
    }
  });
});
