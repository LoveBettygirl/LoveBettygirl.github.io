let header = document.querySelector('header.header');
document.addEventListener('scroll', function () {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 0) {
        header.classList.add('fix');
    }
    else {
        header.classList.remove('fix');
    }
});
