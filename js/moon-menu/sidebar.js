function clickSidebar() {
    const isRight = CONFIG.sidebar.position === 'right';
    const toggle = {
        showSidebar: function () {
            document.body.classList.add('sidebar-active');
            const animateAction = isRight ? 'fadeInRight' : 'fadeInLeft';
            document.querySelectorAll('.sidebar .animated').forEach((element, index) => {
                element.style.animationDelay = (100 * index) + 'ms';
                element.classList.remove(animateAction);
                setTimeout(() => {
                    // Trigger a DOM reflow
                    element.classList.add(animateAction);
                });
            });
        },
        hideSidebar: function () {
            document.body.classList.remove('sidebar-active');
        }
    }
    document.body.classList.contains('sidebar-active') ? toggle.hideSidebar() : toggle.showSidebar();
}

document.querySelector('#moon-menu-item-sidebar').addEventListener('click', () => {
    clickSidebar();
});
