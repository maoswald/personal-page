const STORAGE_KEY = 'aurora-consent';

const enableScripts = () => {
  document.querySelectorAll('script[data-analytics-script]').forEach((script) => {
    if (script.dataset.loaded === 'true') return;
    const newScript = document.createElement('script');
    [...script.attributes].forEach((attr) => {
      if (attr.name === 'type' || attr.name === 'data-analytics-script') return;
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = script.textContent;
    script.replaceWith(newScript);
  });
};

const isDntEnabled = () => {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
};

const initConsent = () => {
  const banner = document.querySelector('[data-cookie-consent]');
  if (!banner) return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const analyticsDisabledByDnt = isDntEnabled();

  if (analyticsDisabledByDnt) {
    banner.setAttribute('hidden', 'true');
    banner.setAttribute('data-dnt', 'true');
    return;
  }

  if (stored === 'accepted') {
    banner.setAttribute('hidden', 'true');
    enableScripts();
    return;
  }

  const acceptBtn = banner.querySelector('[data-consent-accept]');
  const declineBtn = banner.querySelector('[data-consent-decline]');

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    enableScripts();
    banner.setAttribute('hidden', 'true');
  });

  declineBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    banner.setAttribute('hidden', 'true');
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState !== 'loading') {
    initConsent();
  } else {
    document.addEventListener('DOMContentLoaded', initConsent);
  }
}
