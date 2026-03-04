// TuneOut Popup Script

document.addEventListener('DOMContentLoaded', () => {
  const sites = ['twitter', 'reddit', 'youtube'];

  // Load settings
  chrome.storage.local.get(['disabledSites', 'stats', 'llmApiKey', 'llmProvider'], (data) => {
    const disabled = data.disabledSites || [];

    // Set toggle states
    for (const site of sites) {
      const toggle = document.getElementById(`toggle-${site}`);
      if (toggle) toggle.checked = !disabled.includes(site);
    }

    // Set stats
    const stats = data.stats || { total: 0, sites: {} };
    document.getElementById('stat-total').textContent = stats.total || 0;
    for (const site of sites) {
      const el = document.getElementById(`stat-${site}`);
      if (el) el.textContent = stats.sites?.[site] || 0;
    }

    // Set API config
    const provider = data.llmProvider || 'anthropic';
    document.getElementById('llm-provider').value = provider;

    if (data.llmApiKey) {
      document.getElementById('llm-api-key').value = data.llmApiKey;
      document.getElementById('api-status').textContent = 'API key configured. AI briefings enabled.';
      document.getElementById('api-status').classList.add('connected');
    }
  });

  // Toggle handlers
  for (const site of sites) {
    const toggle = document.getElementById(`toggle-${site}`);
    if (!toggle) continue;
    toggle.addEventListener('change', () => {
      chrome.storage.local.get(['disabledSites'], (data) => {
        let disabled = data.disabledSites || [];
        if (toggle.checked) {
          disabled = disabled.filter(s => s !== site);
        } else {
          if (!disabled.includes(site)) disabled.push(site);
        }
        chrome.storage.local.set({ disabledSites: disabled });
      });
    });
  }

  // API key handler
  let saveTimeout = null;
  document.getElementById('llm-api-key').addEventListener('input', (e) => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const key = e.target.value.trim();
      chrome.storage.local.set({ llmApiKey: key || null });
      const status = document.getElementById('api-status');
      if (key) {
        status.textContent = 'API key saved. AI briefings enabled.';
        status.classList.add('connected');
      } else {
        status.textContent = 'No API key set. Headlines shown without summarization.';
        status.classList.remove('connected');
      }
    }, 500);
  });

  // Provider handler
  document.getElementById('llm-provider').addEventListener('change', (e) => {
    chrome.storage.local.set({ llmProvider: e.target.value });
  });
});
