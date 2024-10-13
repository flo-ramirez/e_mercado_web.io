document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    const lightTheme = document.getElementById('light-theme');
    const darkTheme = document.getElementById('dark-theme');
    const themeIcon = document.getElementById('theme-icon');
  
    if (theme === 'dark') {
      darkTheme.disabled = false;
      lightTheme.disabled = true;
      themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    }
  
    document.getElementById('theme-toggle').addEventListener('click', () => {
      if (darkTheme.disabled) {
        darkTheme.disabled = false;
        lightTheme.disabled = true;
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        localStorage.setItem('theme', 'dark');
      } else {
        darkTheme.disabled = true;
        lightTheme.disabled = false;
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        localStorage.setItem('theme', 'light');
      }
    });
});
  