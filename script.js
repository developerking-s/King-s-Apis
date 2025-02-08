const themeToggle = document.getElementById('toggle-theme');
const body = document.body;

themeToggle.addEventListener('click', () => {
  if (body.dataset.theme === 'light') {
    body.dataset.theme = 'dark';
  } else {
    body.dataset.theme = 'light';
  }
});
