function clickWaifu() {
    if (localStorage.getItem('waifu-display') && Date.now() - localStorage.getItem('waifu-display') <= 86400000) {
		document.getElementById('waifu-toggle').click();
	} else {
		document.querySelector('#waifu-tool .fa-times').click();
	}
}

document.querySelector('#moon-menu-item-waifu').addEventListener('click', () => {
    clickWaifu();
});
