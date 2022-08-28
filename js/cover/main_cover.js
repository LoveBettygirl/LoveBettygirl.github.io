let randomNum = function(minNum, maxNum) {
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1); break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum); break;
        default:
            return 0; break;
    }
};
let setDomHomePosition = function () {
    $('#main').css('margin-top', ($('.main-cover').outerHeight() + 120) + 'px');
};
let temScroll = null;
let scrollMonitor = function () {

};
(function () {
    // scrollMonitor();
    let mainCover = document.querySelector('.main-cover');
    if (mainCover === null) {
        return;
    }
    let hitokoto = $('#hitokoto');
    // let bgImg = "https://img.paulzzh.tech/touhou/random?tag=night";
    // let bgImg = "https://img.onesnas.com";
    let bgImg = `/images/wallpaper/${randomNum(1, 35)}.png`;
    $('.main-cover').css({
        'background': '#222 url("'+encodeURI(bgImg)+'")  center center no-repeat',
        'background-size': 'cover'
    });
    $('.main-cover .cover-mask').circleMagic({
        radius: 15,
        density: 0.2,
        color: 'rgba(255, 255, 255, .2)',
        clearOffset: 0.3
    });

    let topTitleList = [
        '每一个不曾起舞的日子，都是对生命的辜负。',
        '公主死去了，屠龙的少年还在燃烧',
        '我们听过无数的道理，却仍旧过不好这一生。',
        '生如夏花之绚烂，死如秋叶之静美。',
        '但凡不能杀死你的，最终都会使你更强大。',
        '好看的皮囊千篇一律，有趣的灵魂万里挑一。',
        '青春是一本太仓促的书，我们含着泪，一读再读。',
        '教育就是当一个人把在学校所学全部忘光之后剩下的东西。',
        '孤独不是一种脾性，而是一种无奈。',
        '有时候你以为天要塌下来了，其实是自己站歪了。',
        '温柔正确的人总是难以生存，因为这世界既不温柔，也不正确。',
        '死并非生的对立面，而作为生的一部分永存。',
        '不要努力成为一个成功者，要努力成为一个有价值的人。',
        '不要因为走得太远，忘了我们为什么出发。',
        '你的问题主要在于读书不多而想得太多。',
        '岁月不饶人，我亦未曾饶过岁月。',
        '当你凝视深渊时，深渊也在凝视着你。',
        '有的人25岁就死了，只是到75岁才埋葬'
    ], settings = {};

    let type = 2;

    switch (type) {
    case 1: //  ONE . 每日一句
        settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://sentence.iciba.com/index.php?callback=onecallback&c=dailysentence&m=getdetail&title=" + tools.getNowFormatDate(),
            "method": "POST",
            "dataType": 'jsonp',
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            },
            "data": {
                "TransCode": "030111",
                "OpenId": "123456789",
                "Body": ""
            }
        };

        $.ajax(settings).done(function (response) {
            if (response.errno === 0) {
                hitokoto.text(response.note).css('display', '-webkit-box');
                $('#hitokotoAuthor').text(response.content).show();
            } else {
                let listIndex = randomNum(0, topTitleList.length - 1);
                hitokoto.text(topTitleList[listIndex]).css('display', '-webkit-box');
            }
            // setDomHomePosition();
            return false;
        });
        break;

    case 2:
    default: // 今日诗词
        settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://v2.jinrishici.com/one.json",
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            if (response && response.status === "success") {
                hitokoto.text(response.data.content).css('display', '-webkit-box');
                $('#hitokotoAuthor').text('《'+response.data.origin.title+'》 - '+response.data.origin.dynasty+' - '+response.data.origin.author).show();
            } else {
                let listIndex = randomNum(0, topTitleList.length - 1);
                hitokoto.text(topTitleList[listIndex]).css('display', '-webkit-box');
            }
            // setDomHomePosition();
            return false;
        });
        break;
    }
    $('.scroll-down').click(function () {
        // $('.main-cover').hide();
        let endScroll;
        endScroll = $('.main-inner').offset().top - 80; 
        $('html,body').stop().animate({scrollTop: endScroll}, 1000);
        // window.setTimeout(function () {
        //     scrollMonitor();
        // }, 1000);
    });
    // $(window).scroll(function() { scrollMonitor(); });
})();