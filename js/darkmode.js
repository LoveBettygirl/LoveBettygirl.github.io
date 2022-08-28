(function () {
    const enableDarkMode = function () {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    };
    const disableDarkMode = function () {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    const setColorScheme = e => {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    let colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    let darkMode = localStorage.getItem('theme');
    if (darkMode) {
        if (darkMode === 'dark') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    } else {
        setColorScheme(colorSchemeQueryList);
    }

    colorSchemeQueryList.addEventListener('change', setColorScheme);
}());
