// Apply the saved preference before CSS paints, including on the profile page.
(() => {
  let saved;
  try { saved = localStorage.getItem('rudhlab-theme'); } catch (_) {}
  const preference = saved === 'light' || saved === 'dark' ? saved : null;
  const dark = preference ? preference === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();
