

const __tob_Theme = {
  value: getPreference(),
}

function applyTheme() {
  document.firstElementChild.setAttribute('data-theme', __tob_Theme.value);
}

function getPreference() {
  const themePreference = localStorage.getItem('theme-preference');
  if (themePreference) {
    return themePreference;
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function setPreference() {
  localStorage.setItem('theme-preference', __tob_Theme.value);
  applyTheme();
}


function onClick() {
  const currentTheme = __tob_Theme.value;
  __tob_Theme.value = (currentTheme === 'light') ? 'dark' : 'light';
  setPreference();
}

window.onload = () => {
  const switcher = document.querySelector('[data-theme-switcher]');
  if (!switcher) {
    return;
  }
  switcher.addEventListener('click', onClick);
};

// sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
});

applyTheme();