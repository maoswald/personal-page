const PREFETCH_ATTR = 'data-prefetch';

const initPrefetch = () => {
  if (!('IntersectionObserver' in window)) return;
  const links = document.querySelectorAll(`a[${PREFETCH_ATTR}]`);
  if (!links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const link = entry.target;
        observer.unobserve(link);
        const url = link.href;
        fetch(url, { method: 'GET', mode: 'no-cors' }).catch(() => {});
      }
    });
  });

  links.forEach((link) => observer.observe(link));
};

if (typeof window !== 'undefined') {
  if (document.readyState !== 'loading') {
    initPrefetch();
  } else {
    document.addEventListener('DOMContentLoaded', initPrefetch);
  }
}
