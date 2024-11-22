

const __tob_Theme = {
  loadedFromStorage: false,
  value: '',
}

function getPreference() {
  const themePreference = localStorage.getItem('theme-preference');
  if (themePreference) {
    __tob_Theme.loadedFromStorage = true;
    return themePreference;
  } else {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (matchDark) {
      return 'dark';
    }
  }
  return 'light';
}

function applyTheme() {
  document.firstElementChild.setAttribute('data-theme', __tob_Theme.value);
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

window.addEventListener("load", () => {
  const switcher = document.querySelector('[data-theme-switcher]');
  if (!switcher) {
    return;
  }
  switcher.addEventListener('click', onClick);
  __tob_Theme.value = getPreference();
  applyTheme();
}, false);

// DISABLED - sync with system changes
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
//   if (!__tob_Theme.loadedFromStorage) {
//     __tob_Theme.value = isDark ? 'dark' : 'light';
//     setPreference();
//   }
// });

__tob_Theme.value = getPreference();
applyTheme();