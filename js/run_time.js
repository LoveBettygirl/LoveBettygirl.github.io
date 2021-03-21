var now = new Date();

function createtime() {
    var grt = new Date('07/31/2019 17:43:07'); //此处修改你的建站时间或者网站上线时间
    now.setTime(now.getTime() + 250);
    days = (now - grt) / 1000 / 60 / 60 / 24;
    dnum = Math.floor(days);
    hours = ((now - grt) / 1000 / 60 / 60 - (24 * dnum)) % 60;
    hnum = Math.floor(hours);
    if (String(hnum).length == 1) {
        hnum = '0' + hnum;
    }
    minutes = ((now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum)) % 60;
    mnum = Math.floor(minutes);
    if (String(mnum).length == 1) {
        mnum = '0' + mnum;
    }
    seconds = ((now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum)) % 60;
    snum = Math.round(seconds);
    if (String(snum).length == 1) {
        snum = '0' + snum;
    }
    document.getElementById('timeDate').innerHTML = 'Service time: ' + dnum + ' days ';
    document.getElementById('times').innerHTML = hnum + ':' + mnum + ':' + snum + ' <span class="my-face">ღゝ◡╹)ノ♡</span>';
}
setInterval('createtime()', 250);