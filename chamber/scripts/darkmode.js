const toggleSwitch = document.querySelector('#darkModeToggle');

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Add the darkmode.css to the page when the switch is turned on
    document.querySelector('link[href="./styles/base.css"]').href = './styles/darkmode.css';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    // Revert to the original base.css when the switch is turned off
    document.querySelector('link[href="./styles/darkmode.css"]').href = './styles/base.css';
  }
};

toggleSwitch.addEventListener('change', switchTheme);