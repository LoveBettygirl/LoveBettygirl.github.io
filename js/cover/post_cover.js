(function () {
    // scrollMonitor();
    let postCover = document.querySelector('.post-cover');
    if (postCover === null) {
        return;
    }
    // let bgImg = "https://img.paulzzh.tech/touhou/random?tag=night";
    // let bgImg = "https://img.onesnas.com";
    let bgImg = `/images/wallpaper/${randomNum(1, 35)}.png`;
    $('.post-cover').css({
        'background': '#222 url("'+encodeURI(bgImg)+'")  center center no-repeat',
        'background-size': 'cover'
    });
    let postHeader;
    if (location.pathname.indexOf('/archives') === 0) {
        postHeader = new DOMParser().parseFromString('<header class="post-header">'+
        `<h1 class="post-title" itemprop="name headline">${document.title.split(' | ')[0]}</h1>`+
        '<div class="post-meta-container"></div>'+
        '</header>', 'text/html').querySelector('header');
    }
    else {
        postHeader = document.querySelector('.post-block .post-header').cloneNode(true);
    }
    document.querySelector('.post-cover #cover-post-header').appendChild(postHeader);
})();
