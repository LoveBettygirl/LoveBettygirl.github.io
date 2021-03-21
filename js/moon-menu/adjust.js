let adjust = document.querySelector('#moon-menu-item-adjust');
let icon = adjust.querySelector('i');

function clickAdjust() {
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
    const recoverIcon = () => {
        icon.className = 'fas fa-adjust';
    };

    let darkMode = localStorage.getItem('theme');
    if (darkMode === 'dark') {
        icon.className = 'fas fa-sun';
        disableDarkMode();
        setTimeout(recoverIcon, 1000);
    } else {
        icon.className = 'fas fa-moon';
        enableDarkMode();
        setTimeout(recoverIcon, 1000);
    }
}

adjust.addEventListener('click', () => {
    clickAdjust();
});
