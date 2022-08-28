(function () {
    function randomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    let tags = document.querySelectorAll('.tag-cloud-tags a');
    tags.forEach((item) => {
        let color = randomColor();
        item.style.color = item.style.borderColor = color;
    });
})();
