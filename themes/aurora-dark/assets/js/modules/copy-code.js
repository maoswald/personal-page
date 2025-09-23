const attachCopyButtons = () => {
  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (pre.querySelector('button.copy-button')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code');
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 1500);
      } catch (error) {
        button.textContent = 'Error';
      }
    });
    pre.appendChild(button);
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState !== 'loading') {
    attachCopyButtons();
  } else {
    document.addEventListener('DOMContentLoaded', attachCopyButtons);
  }
}
