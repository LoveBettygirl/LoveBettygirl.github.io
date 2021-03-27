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
;
/* global NexT, CONFIG */
HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},
// https://caniuse.com/mdn-api_element_classlist_replace
"function"!=typeof DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=function(e,t){this.remove(e),this.add(t)}),NexT.utils={
/**
   * Wrap images with fancybox.
   */
wrapImageWithFancyBox:function(){document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach(e=>{const t=$(e),o=t.attr("data-src")||t.attr("src"),n=t.wrap(`<a class="fancybox fancybox.image" href="${o}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?n.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?n.attr("data-fancybox","group").attr("rel","group"):n.attr("data-fancybox","default").attr("rel","default");const a=t.attr("title")||t.attr("alt");a&&(n.append(`<p class="image-caption">${a}</p>`),
// Make sure img title tag will show correctly in fancybox
n.attr("title",a).attr("data-caption",a))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},
/**
   * One-click copy code support.
   */
registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");0===e.length&&(e=document.querySelectorAll("pre")),e.forEach(e=>{if(e.querySelectorAll(".code .line span").forEach(e=>{e.classList.forEach(t=>{e.classList.replace(t,"hljs-"+t)})}),!CONFIG.copycode)return;e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const t=e.querySelector(".copy-btn");t.addEventListener("click",()=>{const o=(e.querySelector(".code")||e.querySelector("code")).innerText;if(navigator.clipboard)
// https://caniuse.com/mdn-api_clipboard_writetext
navigator.clipboard.writeText(o).then(()=>{t.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{t.querySelector("i").className="fa fa-times-circle fa-fw"});else{const e=document.createElement("textarea");e.style.top=window.scrollY+"px",// Prevent page scrolling
e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=o,document.body.append(e),e.select(),e.setSelectionRange(0,o.length),e.readOnly=!1;const n=document.execCommand("copy");t.querySelector("i").className=n?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),// For iOS
t.blur(),document.body.removeChild(e)}}),e.addEventListener("mouseleave",()=>{setTimeout(()=>{t.querySelector("i").className="fa fa-copy fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);const o=Number(e.width),n=Number(e.height);o&&n&&(t.style.paddingTop=n/o*100+"%")}})},registerScrollPercent:function(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");
// For init back to top in sidebar if page was scrolled after page refresh.
window.addEventListener("scroll",()=>{if(e||t){const o=document.body.scrollHeight-window.innerHeight,n=o>0?Math.min(100*window.scrollY/o,100):0;e&&(e.classList.toggle("back-to-top-on",Math.round(n)>=5),e.querySelector("span").innerText=Math.round(n)+"%"),t&&(t.style.width=n.toFixed(2)+"%")}if(!Array.isArray(NexT.utils.sections))return;let o=NexT.utils.sections.findIndex(e=>e&&e.getBoundingClientRect().top>0);-1===o?o=NexT.utils.sections.length-1:o>0&&o--,this.activateNavByIndex(o)}),e&&e.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},
/**
   * Tabs tag listener (without twitter bootstrap).
   */
registerTabsTag:function(){
// Binding `nav-tabs` & `tab-content` by real time permalink changing.
document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",t=>{
// Prevent selected tab to select again.
if(t.preventDefault(),e.classList.contains("active"))return;
// Add & Remove active class on `nav-tabs` & `tab-content`.
[...e.parentNode.children].forEach(t=>{t.classList.toggle("active",t===e)});
// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
const o=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));[...o.parentNode.children].forEach(e=>{e.classList.toggle("active",e===o)}),
// Trigger event
o.dispatchEvent(new Event("tabs:click",{bubbles:!0}))})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){
// Get responsive height passed from iframe.
window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],o=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(o,10)+5+"px"}},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),o=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||o))})},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),
// Disable Pjax to force refresh translation of menu item
window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map(e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));
// TOC item animation navigate.
return e.addEventListener("click",e=>{e.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o+10})}),t})},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(!t||t.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),t.classList.add("active","active-current");let o=t.parentNode;for(;!o.matches(".post-toc");)o.matches("li")&&o.classList.add("active"),o=o.parentNode;
// Scrolling to center active TOC element if TOC content is taller then viewport.
const n=document.querySelector(".sidebar-panel-container");window.anime({targets:n,duration:200,easing:"linear",scrollTop:n.scrollTop-n.offsetHeight/2+t.getBoundingClientRect().top-n.getBoundingClientRect().top})},getComputedStyle:function(e){const t=e.cloneNode(!0);t.style.position="absolute",t.style.visibility="hidden",t.style.display="block",e.parentNode.appendChild(t);const o=t.clientHeight;return e.parentNode.removeChild(t),o},
/**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
initSidebarDimension:function(){const e=document.querySelector(".sidebar-nav"),t=document.querySelector(".sidebar-inner .back-to-top"),o=e?e.offsetHeight:0,n=t?t.offsetHeight:0,a=CONFIG.sidebar.offset||12;let r=2*CONFIG.sidebar.padding+o+n;"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(r+=2*a);
// Initialize Sidebar & TOC Height.
const c=document.body.offsetHeight-r+"px";document.documentElement.style.setProperty("--sidebar-wrapper-height",c)},updateSidebarPosition:function(){if(NexT.utils.initSidebarDimension(),window.innerWidth<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;
// Expand sidebar on post detail page by default, when post has a toc.
const e=document.querySelector(".post-toc");let t=CONFIG.page.sidebar;"boolean"!=typeof t&&(
// There's no definition sidebar in the page front-matter.
t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},getScript:function(e,t,o){if(o)t();else{const o=document.createElement("script");o.onload=()=>{setTimeout(t)},o.src=e,document.head.appendChild(o)}},loadComments:function(e,t){const o=document.querySelector(e);if(!CONFIG.comments.lazyload||!o)return void t();const n=new IntersectionObserver((e,o)=>{e[0].isIntersecting&&(t(),o.disconnect())});return n.observe(o),n}};;
/* global NexT, CONFIG */
NexT.motion={},NexT.motion.integrator={queue:[],init:function(){return this.queue=[],this},add:function(e){const t=e();return CONFIG.motion.async?this.queue.push(t):this.queue=this.queue.concat(t),this},bootstrap:function(){CONFIG.motion.async||(this.queue=[this.queue]),this.queue.forEach(e=>{const t=window.anime.timeline({duration:200,easing:"linear"});e.forEach(e=>{e.deltaT?t.add(e,e.deltaT):t.add(e)})})}},NexT.motion.middleWares={header:function(){const e=[];function t(t,o=!1){e.push({targets:t,opacity:1,top:0,deltaT:o?"-=200":"-=0"})}var o;return t(".header"),"Mist"===CONFIG.scheme&&(o=".logo-line",e.push({targets:o,scaleX:[0,1],duration:500,deltaT:"-=200"})),"Muse"===CONFIG.scheme&&t(".custom-logo-image"),t(".site-title"),t(".site-brand-container .toggle",!0),t(".site-subtitle"),("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)&&t(".custom-logo-image"),document.querySelectorAll(".menu-item").forEach(t=>{e.push({targets:t,complete:()=>t.classList.add("animated","fadeInDown"),deltaT:"-=200"})}),e},subMenu:function(){const e=document.querySelectorAll(".sub-menu .menu-item");return e.length>0&&e.forEach(e=>{e.classList.add("animated")}),[]},postList:function(){const e=[],{post_block:t,post_header:o,post_body:n,coll_header:s}=CONFIG.motion.transition;function i(t,o){t&&document.querySelectorAll(o).forEach(o=>{e.push({targets:o,complete:()=>o.classList.add("animated",t),deltaT:"-=100"})})}return i(t,".post-block, .pagination, .comments"),i(s,".collection-header"),i(o,".post-header"),i(n,".post-body"),e},sidebar:function(){const e=document.querySelector(".sidebar"),t=CONFIG.motion.transition.sidebar;
// Only for Pisces | Gemini.
return!t||"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme?[]:[{targets:e,complete:()=>e.classList.add("animated",t)}]},footer:function(){return[{targets:document.querySelector(".footer"),opacity:1}]}};;
/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{const e="right"===CONFIG.sidebar.position,t={};function i(){const e=document.querySelector(".footer"),t=document.querySelector(".header").offsetHeight+document.querySelector(".main").offsetHeight+e.offsetHeight;e.classList.toggle("footer-fixed",t<=window.innerHeight)}({lines:document.querySelector(".sidebar-toggle"),init:function(){window.addEventListener("mousedown",this.mousedownHandler),window.addEventListener("mouseup",this.mouseupHandler.bind(this)),document.querySelector(".sidebar-dimmer").addEventListener("click",this.clickHandler.bind(this)),document.querySelector(".sidebar-toggle").addEventListener("click",this.clickHandler.bind(this)),window.addEventListener("sidebar:show",this.showSidebar),window.addEventListener("sidebar:hide",this.hideSidebar)},mousedownHandler:function(e){t.X=e.pageX,t.Y=e.pageY},mouseupHandler:function(e){const i=e.pageX-t.X,d=e.pageY-t.Y;
// Fancybox has z-index property, but medium-zoom does not, so the sidebar will overlay the zoomed image.
(Math.hypot(i,d)<20&&e.target.matches(".main")||e.target.matches("img.medium-zoom-image"))&&this.hideSidebar()},clickHandler:function(){document.body.classList.contains("sidebar-active")?this.hideSidebar():this.showSidebar()},showSidebar:function(){document.body.classList.add("sidebar-active");const t=e?"fadeInRight":"fadeInLeft";document.querySelectorAll(".sidebar .animated").forEach((e,i)=>{e.style.animationDelay=100*i+"ms",e.classList.remove(t),setTimeout(()=>{
// Trigger a DOM reflow
e.classList.add(t)})})},hideSidebar:function(){document.body.classList.remove("sidebar-active")}}).init(),i(),window.addEventListener("resize",i),window.addEventListener("scroll",i)});;
/* global NexT, CONFIG */
NexT.boot={},NexT.boot.registerEvents=function(){NexT.utils.registerScrollPercent(),NexT.utils.registerCanIUseTag(),
// Mobile top menu bar.
document.querySelector(".site-nav-toggle .toggle").addEventListener("click",e=>{e.currentTarget.classList.toggle("toggle-close");const t=document.querySelector(".site-nav");if(!t)return;const i=document.body.classList.contains("site-nav-on"),o=NexT.utils.getComputedStyle(t);t.style.height=i?o:0;const n=()=>document.body.classList.toggle("site-nav-on"),a=()=>{t.style.overflow="hidden"},r=()=>{t.style.overflow="",t.style.height=""};window.anime(Object.assign({targets:t,duration:200,height:i?[o,0]:[0,o],easing:"linear"},i?{begin:a,complete:()=>{r(),n()}}:{begin:()=>{a(),n()},complete:r}))});document.querySelectorAll(".sidebar-nav li").forEach((e,t)=>{e.addEventListener("click",()=>{if(e.matches(".sidebar-toc-active .sidebar-nav-toc, .sidebar-overview-active .sidebar-nav-overview"))return;const i=document.querySelector(".sidebar-inner"),o=document.querySelector(".sidebar-panel-container"),n=["sidebar-toc-active","sidebar-overview-active"];window.anime({duration:200,targets:o,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{
// Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
i.classList.replace(n[1-t],n[t]),window.anime({duration:200,targets:o,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})})}),window.addEventListener("resize",NexT.utils.initSidebarDimension),window.addEventListener("hashchange",()=>{const e=location.hash;if(""!==e&&!e.match(/%\S{2}/)){const t=document.querySelector(`.tabs ul.nav-tabs li a[href="${e}"]`);t&&t.click()}})},NexT.boot.refresh=function(){
/**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'scripts/helpers/next-config.js' file.
   */
CONFIG.prism&&window.Prism.highlightAll(),CONFIG.fancybox&&NexT.utils.wrapImageWithFancyBox(),CONFIG.mediumzoom&&window.mediumZoom(".post-body :not(a) > img, .post-body > img",{background:"var(--content-bg-color)"}),CONFIG.lazyload&&window.lozad(".post-body img").observe(),CONFIG.pangu&&window.pangu.spacingPage(),CONFIG.exturl&&NexT.utils.registerExtURL(),NexT.utils.registerCopyCode(),NexT.utils.registerTabsTag(),NexT.utils.registerActiveMenuItem(),NexT.utils.registerLangSelect(),NexT.utils.registerSidebarTOC(),NexT.utils.wrapTableWithBox(),NexT.utils.registerVideoIframe()},NexT.boot.motion=function(){
// Define Motion Sequence & Bootstrap Motion.
CONFIG.motion.enable&&NexT.motion.integrator.add(NexT.motion.middleWares.header).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar).add(NexT.motion.middleWares.footer).bootstrap(),NexT.utils.updateSidebarPosition()},document.addEventListener("DOMContentLoaded",()=>{NexT.boot.registerEvents(),NexT.boot.refresh(),NexT.boot.motion()});;
/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{"use strict";const e=()=>{localStorage.setItem("bookmark"+location.pathname,window.scrollY)},t=()=>{let e=localStorage.getItem("bookmark"+location.pathname);e=parseInt(e,10),
// If the page opens with a specific hash, just jump out
isNaN(e)||""!==location.hash||
// Auto scroll to the position
window.anime({targets:document.scrollingElement,duration:200,easing:"linear",scrollTop:e})};!function(o){
// Create a link element
const n=document.querySelector(".book-mark-link");
// Scroll event
window.addEventListener("scroll",()=>n.classList.toggle("book-mark-link-fixed",0===window.scrollY)),
// Register beforeunload event when the trigger is auto
"auto"===o&&(
// Register beforeunload event
window.addEventListener("beforeunload",e),document.addEventListener("pjax:send",e)),
// Save the position by clicking the icon
n.addEventListener("click",()=>{e(),window.anime({targets:n,duration:200,easing:"linear",top:-30,complete:()=>{setTimeout(()=>{n.style.top=""},400)}})}),t(),document.addEventListener("pjax:success",t)}(CONFIG.bookmark.save)});;
/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{if(!CONFIG.path)
// Search DB path
return void console.warn("`hexo-generator-searchdb` plugin is not installed!");
// Popup Window
let e,t=!1;const n=document.querySelector(".search-input"),r=(e,t,n=!1)=>{const r=[],o=new Set;return e.forEach(e=>{if(CONFIG.localsearch.unescape){const t=document.createElement("div");t.innerText=e,e=t.innerHTML}const s=e.length;if(0===s)return;let c=0,i=-1;for(n||(t=t.toLowerCase(),e=e.toLowerCase());(i=t.indexOf(e,c))>-1;)r.push({position:i,word:e}),o.add(e),c=i+s}),
// Sort index by position of keyword
r.sort((e,t)=>e.position!==t.position?e.position-t.position:t.word.length-e.word.length),[r,o]},o=(e,t,n)=>{let r=n[0],{position:o,word:s}=r;const c=[],i=new Set;for(;o+s.length<=t&&0!==n.length;){i.add(s),c.push({position:o,length:s.length});const e=o+s.length;
// Move to next position of hit
for(n.shift();0!==n.length&&(r=n[0],o=r.position,s=r.word,e>o);)n.shift()}return{hits:c,start:e,end:t,count:i.size}},s=(e,t)=>{let n="",r=t.start;for(const{position:o,length:s}of t.hits)n+=e.substring(r,o),r=o+s,n+=`<mark class="search-keyword">${e.substr(o,s)}</mark>`;return n+=e.substring(r,t.end),n},c=()=>{if(!t)return;const c=n.value.trim().toLowerCase(),i=c.split(/[-\s]+/),l=document.querySelector(".search-result-container");let a=[];if(c.length>0&&(
// Perform local searching
a=(t=>{const n=[];return e.forEach(({title:e,content:c,url:i})=>{
// The number of different keywords included in the article.
const[l,a]=r(t,e),[h,u]=r(t,c),d=new Set([...a,...u]).size,p=l.length+h.length;if(0===p)return;const g=[];0!==l.length&&g.push(o(0,e.length,l));let f=[];for(;0!==h.length;){const e=h[0],{position:t}=e,n=Math.max(0,t-20),r=Math.min(c.length,t+80);f.push(o(n,r,h))}
// Sort slices in content by included keywords' count and hits' count
f.sort((e,t)=>e.count!==t.count?t.count-e.count:e.hits.length!==t.hits.length?t.hits.length-e.hits.length:e.start-t.start);
// Select top N slices in content
const m=parseInt(CONFIG.localsearch.top_n_per_article,10);m>=0&&(f=f.slice(0,m));let C="";(i=new URL(i,location.origin)).searchParams.append("highlight",t.join(" ")),0!==g.length?C+=`<li><a href="${i.href}" class="search-result-title">${s(e,g[0])}</a>`:C+=`<li><a href="${i.href}" class="search-result-title">${e}</a>`,f.forEach(e=>{C+=`<a href="${i.href}"><p class="search-result">${s(c,e)}...</p></a>`}),C+="</li>",n.push({item:C,id:n.length,hitCount:p,includedCount:d})}),n})(i)),1===i.length&&""===i[0])l.classList.add("no-result"),l.innerHTML='<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>';else if(0===a.length)l.classList.add("no-result"),l.innerHTML='<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';else{a.sort((e,t)=>e.includedCount!==t.includedCount?t.includedCount-e.includedCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id);const e=CONFIG.i18n.hits.replace(/\$\{hits}/,a.length);l.classList.remove("no-result"),l.innerHTML=`<div class="search-stats">${e}</div>\n        <hr>\n        <ul class="search-result-list">${a.map(e=>e.item).join("")}</ul>`,window.pjax&&window.pjax.refresh(l)}},i=()=>{const n=!CONFIG.path.endsWith("json");fetch(CONFIG.path).then(e=>e.text()).then(r=>{
// Get the contents from search data
t=!0,e=n?[...(new DOMParser).parseFromString(r,"text/xml").querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent})):JSON.parse(r),
// Only match articles with non-empty titles
e=e.filter(e=>e.title).map(e=>(e.title=e.title.trim(),e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"",e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),e)),
// Remove loading animation
c()})},l=()=>{const e=new URL(location.href).searchParams.get("highlight"),t=e?e.split(" "):[],n=document.querySelector(".post-body");if(!t.length||!n)return;const s=document.createTreeWalker(n,NodeFilter.SHOW_TEXT,null),c=[];for(;s.nextNode();)s.currentNode.parentNode.matches("button, select, textarea")||c.push(s.currentNode);c.forEach(e=>{const[n]=r(t,e.nodeValue);if(!n.length)return;((e,t,n)=>{const r=e.nodeValue;let o=t.start;const s=[];for(const{position:e,length:c}of t.hits){const t=document.createTextNode(r.substring(o,e));o=e+c;const i=document.createElement("mark");i.className=n,i.appendChild(document.createTextNode(r.substr(e,c))),s.push(t,i)}e.nodeValue=r.substring(o,t.end),s.forEach(t=>{e.parentNode.insertBefore(t,e)})})(e,o(0,e.nodeValue.length,n),"search-keyword")})};l(),CONFIG.localsearch.preload&&i(),"auto"===CONFIG.localsearch.trigger?n.addEventListener("input",c):(document.querySelector(".search-icon").addEventListener("click",c),n.addEventListener("keypress",e=>{"Enter"===e.key&&c()})),
// Handle and trigger popup window
document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.classList.add("search-active"),
// Wait for search-popup animation to complete
setTimeout(()=>n.focus(),500),t||i()})});
// Monitor main search box
const a=()=>{document.body.classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&a()}),document.querySelector(".popup-btn-close").addEventListener("click",a),document.addEventListener("pjax:success",()=>{l(),a()}),window.addEventListener("keyup",e=>{"Escape"===e.key&&a()})});;
'use strict';

// Rebound
// =======
// **Rebound** is a simple library that models Spring dynamics for the
// purpose of driving physical animations.
//
// Origin
// ------
// [Rebound](http://facebook.github.io/rebound) was originally written
// in Java to provide a lightweight physics system for
// [Home](https://play.google.com/store/apps/details?id=com.facebook.home) and
// [Chat Heads](https://play.google.com/store/apps/details?id=com.facebook.orca)
// on Android. It's now been adopted by several other Android
// applications. This JavaScript port was written to provide a quick
// way to demonstrate Rebound animations on the web for a
// [conference talk](https://www.youtube.com/watch?v=s5kNm-DgyjY). Since then
// the JavaScript version has been used to build some really nice interfaces.
// Check out [brandonwalkin.com](http://brandonwalkin.com) for an
// example.
//
// Overview
// --------
// The Library provides a SpringSystem for maintaining a set of Spring
// objects and iterating those Springs through a physics solver loop
// until equilibrium is achieved. The Spring class is the basic
// animation driver provided by Rebound. By attaching a listener to
// a Spring, you can observe its motion. The observer function is
// notified of position changes on the spring as it solves for
// equilibrium. These position updates can be mapped to an animation
// range to drive animated property updates on your user interface
// elements (translation, rotation, scale, etc).
//
// Example
// -------
// Here's a simple example. Pressing and releasing on the logo below
// will cause it to scale up and down with a springy animation.
//
// <div style="text-align:center; margin-bottom:50px; margin-top:50px">
//   <img
//     src="http://facebook.github.io/rebound/images/rebound.png"
//     id="logo"
//   />
// </div>
// <script src="../rebound.min.js"></script>
// <script>
//
// function scale(el, val) {
//   el.style.mozTransform =
//   el.style.msTransform =
//   el.style.webkitTransform =
//   el.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
// }
// var el = document.getElementById('logo');
//
// var springSystem = new rebound.SpringSystem();
// var spring = springSystem.createSpring(50, 3);
// spring.addListener({
//   onSpringUpdate: function(spring) {
//     var val = spring.getCurrentValue();
//     val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
//     scale(el, val);
//   }
// });
//
// el.addEventListener('mousedown', function() {
//   spring.setEndValue(1);
// });
//
// el.addEventListener('mouseout', function() {
//   spring.setEndValue(0);
// });
//
// el.addEventListener('mouseup', function() {
//   spring.setEndValue(0);
// });
//
// </script>
//
// Here's how it works.
//
// ```
// // Get a reference to the logo element.
// var el = document.getElementById('logo');
//
// // create a SpringSystem and a Spring with a bouncy config.
// var springSystem = new rebound.SpringSystem();
// var spring = springSystem.createSpring(50, 3);
//
// // Add a listener to the spring. Every time the physics
// // solver updates the Spring's value onSpringUpdate will
// // be called.
// spring.addListener({
//   onSpringUpdate: function(spring) {
//     var val = spring.getCurrentValue();
//     val = rebound.MathUtil
//                  .mapValueInRange(val, 0, 1, 1, 0.5);
//     scale(el, val);
//   }
// });
//
// // Listen for mouse down/up/out and toggle the
// //springs endValue from 0 to 1.
// el.addEventListener('mousedown', function() {
//   spring.setEndValue(1);
// });
//
// el.addEventListener('mouseout', function() {
//   spring.setEndValue(0);
// });
//
// el.addEventListener('mouseup', function() {
//   spring.setEndValue(0);
// });
//
// // Helper for scaling an element with css transforms.
// function scale(el, val) {
//   el.style.mozTransform =
//   el.style.msTransform =
//   el.style.webkitTransform =
//   el.style.transform = 'scale3d(' +
//     val + ', ' + val + ', 1)';
// }
// ```

(function () {
    var rebound = {};
    var util = rebound.util = {};
    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;

    // Bind a function to a context object.
    util.bind = function bind(func, context) {
        var args = slice.call(arguments, 2);
        return function () {
            func.apply(context, concat.call(args, slice.call(arguments)));
        };
    };

    // Add all the properties in the source to the target.
    util.extend = function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    };

    // SpringSystem
    // ------------
    // **SpringSystem** is a set of Springs that all run on the same physics
    // timing loop. To get started with a Rebound animation you first
    // create a new SpringSystem and then add springs to it.
    var SpringSystem = rebound.SpringSystem = function SpringSystem(looper) {
        this._springRegistry = {};
        this._activeSprings = [];
        this.listeners = [];
        this._idleSpringIndices = [];
        this.looper = looper || new AnimationLooper();
        this.looper.springSystem = this;
    };

    util.extend(SpringSystem.prototype, {

        _springRegistry: null,

        _isIdle: true,

        _lastTimeMillis: -1,

        _activeSprings: null,

        listeners: null,

        _idleSpringIndices: null,

        // A SpringSystem is iterated by a looper. The looper is responsible
        // for executing each frame as the SpringSystem is resolved to idle.
        // There are three types of Loopers described below AnimationLooper,
        // SimulationLooper, and SteppingSimulationLooper. AnimationLooper is
        // the default as it is the most useful for common UI animations.
        setLooper: function setLooper(looper) {
            this.looper = looper;
            looper.springSystem = this;
        },

        // Add a new spring to this SpringSystem. This Spring will now be solved for
        // during the physics iteration loop. By default the spring will use the
        // default Origami spring config with 40 tension and 7 friction, but you can
        // also provide your own values here.
        createSpring: function createSpring(tension, friction) {
            var springConfig;
            if (tension === undefined || friction === undefined) {
                springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
            } else {
                springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction);
            }
            return this.createSpringWithConfig(springConfig);
        },

        // Add a spring with a specified bounciness and speed. To replicate Origami
        // compositions based on PopAnimation patches, use this factory method to
        // create matching springs.
        createSpringWithBouncinessAndSpeed: function createSpringWithBouncinessAndSpeed(bounciness, speed) {
            var springConfig;
            if (bounciness === undefined || speed === undefined) {
                springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
            } else {
                springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed);
            }
            return this.createSpringWithConfig(springConfig);
        },

        // Add a spring with the provided SpringConfig.
        createSpringWithConfig: function createSpringWithConfig(springConfig) {
            var spring = new Spring(this);
            this.registerSpring(spring);
            spring.setSpringConfig(springConfig);
            return spring;
        },

        // You can check if a SpringSystem is idle or active by calling
        // getIsIdle. If all of the Springs in the SpringSystem are at rest,
        // i.e. the physics forces have reached equilibrium, then this
        // method will return true.
        getIsIdle: function getIsIdle() {
            return this._isIdle;
        },

        // Retrieve a specific Spring from the SpringSystem by id. This
        // can be useful for inspecting the state of a spring before
        // or after an integration loop in the SpringSystem executes.
        getSpringById: function getSpringById(id) {
            return this._springRegistry[id];
        },

        // Get a listing of all the springs registered with this
        // SpringSystem.
        getAllSprings: function getAllSprings() {
            var vals = [];
            for (var id in this._springRegistry) {
                if (this._springRegistry.hasOwnProperty(id)) {
                    vals.push(this._springRegistry[id]);
                }
            }
            return vals;
        },

        // registerSpring is called automatically as soon as you create
        // a Spring with SpringSystem#createSpring. This method sets the
        // spring up in the registry so that it can be solved in the
        // solver loop.
        registerSpring: function registerSpring(spring) {
            this._springRegistry[spring.getId()] = spring;
        },

        // Deregister a spring with this SpringSystem. The SpringSystem will
        // no longer consider this Spring during its integration loop once
        // this is called. This is normally done automatically for you when
        // you call Spring#destroy.
        deregisterSpring: function deregisterSpring(spring) {
            removeFirst(this._activeSprings, spring);
            delete this._springRegistry[spring.getId()];
        },

        advance: function advance(time, deltaTime) {
            while (this._idleSpringIndices.length > 0) {
                this._idleSpringIndices.pop();
            }for (var i = 0, len = this._activeSprings.length; i < len; i++) {
                var spring = this._activeSprings[i];
                if (spring.systemShouldAdvance()) {
                    spring.advance(time / 1000.0, deltaTime / 1000.0);
                } else {
                    this._idleSpringIndices.push(this._activeSprings.indexOf(spring));
                }
            }
            while (this._idleSpringIndices.length > 0) {
                var idx = this._idleSpringIndices.pop();
                idx >= 0 && this._activeSprings.splice(idx, 1);
            }
        },

        // This is our main solver loop called to move the simulation
        // forward through time. Before each pass in the solver loop
        // onBeforeIntegrate is called on an any listeners that have
        // registered themeselves with the SpringSystem. This gives you
        // an opportunity to apply any constraints or adjustments to
        // the springs that should be enforced before each iteration
        // loop. Next the advance method is called to move each Spring in
        // the systemShouldAdvance forward to the current time. After the
        // integration step runs in advance, onAfterIntegrate is called
        // on any listeners that have registered themselves with the
        // SpringSystem. This gives you an opportunity to run any post
        // integration constraints or adjustments on the Springs in the
        // SpringSystem.
        loop: function loop(currentTimeMillis) {
            var listener;
            if (this._lastTimeMillis === -1) {
                this._lastTimeMillis = currentTimeMillis - 1;
            }
            var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
            this._lastTimeMillis = currentTimeMillis;

            var i = 0,
                len = this.listeners.length;
            for (i = 0; i < len; i++) {
                listener = this.listeners[i];
                listener.onBeforeIntegrate && listener.onBeforeIntegrate(this);
            }

            this.advance(currentTimeMillis, ellapsedMillis);
            if (this._activeSprings.length === 0) {
                this._isIdle = true;
                this._lastTimeMillis = -1;
            }

            for (i = 0; i < len; i++) {
                listener = this.listeners[i];
                listener.onAfterIntegrate && listener.onAfterIntegrate(this);
            }

            if (!this._isIdle) {
                this.looper.run();
            }
        },

        // activateSpring is used to notify the SpringSystem that a Spring
        // has become displaced. The system responds by starting its solver
        // loop up if it is currently idle.
        activateSpring: function activateSpring(springId) {
            var spring = this._springRegistry[springId];
            if (this._activeSprings.indexOf(spring) == -1) {
                this._activeSprings.push(spring);
            }
            if (this.getIsIdle()) {
                this._isIdle = false;
                this.looper.run();
            }
        },

        // Add a listener to the SpringSystem so that you can receive
        // before/after integration notifications allowing Springs to be
        // constrained or adjusted.
        addListener: function addListener(listener) {
            this.listeners.push(listener);
        },

        // Remove a previously added listener on the SpringSystem.
        removeListener: function removeListener(listener) {
            removeFirst(this.listeners, listener);
        },

        // Remove all previously added listeners on the SpringSystem.
        removeAllListeners: function removeAllListeners() {
            this.listeners = [];
        }

    });

    // Spring
    // ------
    // **Spring** provides a model of a classical spring acting to
    // resolve a body to equilibrium. Springs have configurable
    // tension which is a force multipler on the displacement of the
    // spring from its rest point or `endValue` as defined by [Hooke's
    // law](http://en.wikipedia.org/wiki/Hooke's_law). Springs also have
    // configurable friction, which ensures that they do not oscillate
    // infinitely. When a Spring is displaced by updating it's resting
    // or `currentValue`, the SpringSystems that contain that Spring
    // will automatically start looping to solve for equilibrium. As each
    // timestep passes, `SpringListener` objects attached to the Spring
    // will be notified of the updates providing a way to drive an
    // animation off of the spring's resolution curve.
    var Spring = rebound.Spring = function Spring(springSystem) {
        this._id = 's' + Spring._ID++;
        this._springSystem = springSystem;
        this.listeners = [];
        this._currentState = new PhysicsState();
        this._previousState = new PhysicsState();
        this._tempState = new PhysicsState();
    };

    util.extend(Spring, {
        _ID: 0,

        MAX_DELTA_TIME_SEC: 0.064,

        SOLVER_TIMESTEP_SEC: 0.001

    });

    util.extend(Spring.prototype, {

        _id: 0,

        _springConfig: null,

        _overshootClampingEnabled: false,

        _currentState: null,

        _previousState: null,

        _tempState: null,

        _startValue: 0,

        _endValue: 0,

        _wasAtRest: true,

        _restSpeedThreshold: 0.001,

        _displacementFromRestThreshold: 0.001,

        listeners: null,

        _timeAccumulator: 0,

        _springSystem: null,

        // Remove a Spring from simulation and clear its listeners.
        destroy: function destroy() {
            this.listeners = [];
            this.frames = [];
            this._springSystem.deregisterSpring(this);
        },

        // Get the id of the spring, which can be used to retrieve it from
        // the SpringSystems it participates in later.
        getId: function getId() {
            return this._id;
        },

        // Set the configuration values for this Spring. A SpringConfig
        // contains the tension and friction values used to solve for the
        // equilibrium of the Spring in the physics loop.
        setSpringConfig: function setSpringConfig(springConfig) {
            this._springConfig = springConfig;
            return this;
        },

        // Retrieve the SpringConfig used by this Spring.
        getSpringConfig: function getSpringConfig() {
            return this._springConfig;
        },

        // Set the current position of this Spring. Listeners will be updated
        // with this value immediately. If the rest or `endValue` is not
        // updated to match this value, then the spring will be dispalced and
        // the SpringSystem will start to loop to restore the spring to the
        // `endValue`.
        //
        // A common pattern is to move a Spring around without animation by
        // calling.
        //
        // ```
        // spring.setCurrentValue(n).setAtRest();
        // ```
        //
        // This moves the Spring to a new position `n`, sets the endValue
        // to `n`, and removes any velocity from the `Spring`. By doing
        // this you can allow the `SpringListener` to manage the position
        // of UI elements attached to the spring even when moving without
        // animation. For example, when dragging an element you can
        // update the position of an attached view through a spring
        // by calling `spring.setCurrentValue(x)`. When
        // the gesture ends you can update the Springs
        // velocity and endValue
        // `spring.setVelocity(gestureEndVelocity).setEndValue(flingTarget)`
        // to cause it to naturally animate the UI element to the resting
        // position taking into account existing velocity. The codepaths for
        // synchronous movement and spring driven animation can
        // be unified using this technique.
        setCurrentValue: function setCurrentValue(currentValue, skipSetAtRest) {
            this._startValue = currentValue;
            this._currentState.position = currentValue;
            if (!skipSetAtRest) {
                this.setAtRest();
            }
            this.notifyPositionUpdated(false, false);
            return this;
        },

        // Get the position that the most recent animation started at. This
        // can be useful for determining the number off oscillations that
        // have occurred.
        getStartValue: function getStartValue() {
            return this._startValue;
        },

        // Retrieve the current value of the Spring.
        getCurrentValue: function getCurrentValue() {
            return this._currentState.position;
        },

        // Get the absolute distance of the Spring from it's resting endValue
        // position.
        getCurrentDisplacementDistance: function getCurrentDisplacementDistance() {
            return this.getDisplacementDistanceForState(this._currentState);
        },

        getDisplacementDistanceForState: function getDisplacementDistanceForState(state) {
            return Math.abs(this._endValue - state.position);
        },

        // Set the endValue or resting position of the spring. If this
        // value is different than the current value, the SpringSystem will
        // be notified and will begin running its solver loop to resolve
        // the Spring to equilibrium. Any listeners that are registered
        // for onSpringEndStateChange will also be notified of this update
        // immediately.
        setEndValue: function setEndValue(endValue) {
            if (this._endValue == endValue && this.isAtRest()) {
                return this;
            }
            this._startValue = this.getCurrentValue();
            this._endValue = endValue;
            this._springSystem.activateSpring(this.getId());
            for (var i = 0, len = this.listeners.length; i < len; i++) {
                var listener = this.listeners[i];
                var onChange = listener.onSpringEndStateChange;
                onChange && onChange(this);
            }
            return this;
        },

        // Retrieve the endValue or resting position of this spring.
        getEndValue: function getEndValue() {
            return this._endValue;
        },

        // Set the current velocity of the Spring. As previously mentioned,
        // this can be useful when you are performing a direct manipulation
        // gesture. When a UI element is released you may call setVelocity
        // on its animation Spring so that the Spring continues with the
        // same velocity as the gesture ended with. The friction, tension,
        // and displacement of the Spring will then govern its motion to
        // return to rest on a natural feeling curve.
        setVelocity: function setVelocity(velocity) {
            if (velocity === this._currentState.velocity) {
                return this;
            }
            this._currentState.velocity = velocity;
            this._springSystem.activateSpring(this.getId());
            return this;
        },

        // Get the current velocity of the Spring.
        getVelocity: function getVelocity() {
            return this._currentState.velocity;
        },

        // Set a threshold value for the movement speed of the Spring below
        // which it will be considered to be not moving or resting.
        setRestSpeedThreshold: function setRestSpeedThreshold(restSpeedThreshold) {
            this._restSpeedThreshold = restSpeedThreshold;
            return this;
        },

        // Retrieve the rest speed threshold for this Spring.
        getRestSpeedThreshold: function getRestSpeedThreshold() {
            return this._restSpeedThreshold;
        },

        // Set a threshold value for displacement below which the Spring
        // will be considered to be not displaced i.e. at its resting
        // `endValue`.
        setRestDisplacementThreshold: function setRestDisplacementThreshold(displacementFromRestThreshold) {
            this._displacementFromRestThreshold = displacementFromRestThreshold;
        },

        // Retrieve the rest displacement threshold for this spring.
        getRestDisplacementThreshold: function getRestDisplacementThreshold() {
            return this._displacementFromRestThreshold;
        },

        // Enable overshoot clamping. This means that the Spring will stop
        // immediately when it reaches its resting position regardless of
        // any existing momentum it may have. This can be useful for certain
        // types of animations that should not oscillate such as a scale
        // down to 0 or alpha fade.
        setOvershootClampingEnabled: function setOvershootClampingEnabled(enabled) {
            this._overshootClampingEnabled = enabled;
            return this;
        },

        // Check if overshoot clamping is enabled for this spring.
        isOvershootClampingEnabled: function isOvershootClampingEnabled() {
            return this._overshootClampingEnabled;
        },

        // Check if the Spring has gone past its end point by comparing
        // the direction it was moving in when it started to the current
        // position and end value.
        isOvershooting: function isOvershooting() {
            var start = this._startValue;
            var end = this._endValue;
            return this._springConfig.tension > 0 && (start < end && this.getCurrentValue() > end || start > end && this.getCurrentValue() < end);
        },

        // Spring.advance is the main solver method for the Spring. It takes
        // the current time and delta since the last time step and performs
        // an RK4 integration to get the new position and velocity state
        // for the Spring based on the tension, friction, velocity, and
        // displacement of the Spring.
        advance: function advance(time, realDeltaTime) {
            var isAtRest = this.isAtRest();

            if (isAtRest && this._wasAtRest) {
                return;
            }

            var adjustedDeltaTime = realDeltaTime;
            if (realDeltaTime > Spring.MAX_DELTA_TIME_SEC) {
                adjustedDeltaTime = Spring.MAX_DELTA_TIME_SEC;
            }

            this._timeAccumulator += adjustedDeltaTime;

            var tension = this._springConfig.tension,
                friction = this._springConfig.friction,
                position = this._currentState.position,
                velocity = this._currentState.velocity,
                tempPosition = this._tempState.position,
                tempVelocity = this._tempState.velocity,
                aVelocity,
                aAcceleration,
                bVelocity,
                bAcceleration,
                cVelocity,
                cAcceleration,
                dVelocity,
                dAcceleration,
                dxdt,
                dvdt;

            while (this._timeAccumulator >= Spring.SOLVER_TIMESTEP_SEC) {

                this._timeAccumulator -= Spring.SOLVER_TIMESTEP_SEC;

                if (this._timeAccumulator < Spring.SOLVER_TIMESTEP_SEC) {
                    this._previousState.position = position;
                    this._previousState.velocity = velocity;
                }

                aVelocity = velocity;
                aAcceleration = tension * (this._endValue - tempPosition) - friction * velocity;

                tempPosition = position + aVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                tempVelocity = velocity + aAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                bVelocity = tempVelocity;
                bAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

                tempPosition = position + bVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                tempVelocity = velocity + bAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                cVelocity = tempVelocity;
                cAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

                tempPosition = position + cVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                tempVelocity = velocity + cAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                dVelocity = tempVelocity;
                dAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

                dxdt = 1.0 / 6.0 * (aVelocity + 2.0 * (bVelocity + cVelocity) + dVelocity);
                dvdt = 1.0 / 6.0 * (aAcceleration + 2.0 * (bAcceleration + cAcceleration) + dAcceleration);

                position += dxdt * Spring.SOLVER_TIMESTEP_SEC;
                velocity += dvdt * Spring.SOLVER_TIMESTEP_SEC;
            }

            this._tempState.position = tempPosition;
            this._tempState.velocity = tempVelocity;

            this._currentState.position = position;
            this._currentState.velocity = velocity;

            if (this._timeAccumulator > 0) {
                this._interpolate(this._timeAccumulator / Spring.SOLVER_TIMESTEP_SEC);
            }

            if (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) {

                if (this._springConfig.tension > 0) {
                    this._startValue = this._endValue;
                    this._currentState.position = this._endValue;
                } else {
                    this._endValue = this._currentState.position;
                    this._startValue = this._endValue;
                }
                this.setVelocity(0);
                isAtRest = true;
            }

            var notifyActivate = false;
            if (this._wasAtRest) {
                this._wasAtRest = false;
                notifyActivate = true;
            }

            var notifyAtRest = false;
            if (isAtRest) {
                this._wasAtRest = true;
                notifyAtRest = true;
            }

            this.notifyPositionUpdated(notifyActivate, notifyAtRest);
        },

        notifyPositionUpdated: function notifyPositionUpdated(notifyActivate, notifyAtRest) {
            for (var i = 0, len = this.listeners.length; i < len; i++) {
                var listener = this.listeners[i];
                if (notifyActivate && listener.onSpringActivate) {
                    listener.onSpringActivate(this);
                }

                if (listener.onSpringUpdate) {
                    listener.onSpringUpdate(this);
                }

                if (notifyAtRest && listener.onSpringAtRest) {
                    listener.onSpringAtRest(this);
                }
            }
        },

        // Check if the SpringSystem should advance. Springs are advanced
        // a final frame after they reach equilibrium to ensure that the
        // currentValue is exactly the requested endValue regardless of the
        // displacement threshold.
        systemShouldAdvance: function systemShouldAdvance() {
            return !this.isAtRest() || !this.wasAtRest();
        },

        wasAtRest: function wasAtRest() {
            return this._wasAtRest;
        },

        // Check if the Spring is atRest meaning that it's currentValue and
        // endValue are the same and that it has no velocity. The previously
        // described thresholds for speed and displacement define the bounds
        // of this equivalence check. If the Spring has 0 tension, then it will
        // be considered at rest whenever its absolute velocity drops below the
        // restSpeedThreshold.
        isAtRest: function isAtRest() {
            return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || this._springConfig.tension === 0);
        },

        // Force the spring to be at rest at its current position. As
        // described in the documentation for setCurrentValue, this method
        // makes it easy to do synchronous non-animated updates to ui
        // elements that are attached to springs via SpringListeners.
        setAtRest: function setAtRest() {
            this._endValue = this._currentState.position;
            this._tempState.position = this._currentState.position;
            this._currentState.velocity = 0;
            return this;
        },

        _interpolate: function _interpolate(alpha) {
            this._currentState.position = this._currentState.position * alpha + this._previousState.position * (1 - alpha);
            this._currentState.velocity = this._currentState.velocity * alpha + this._previousState.velocity * (1 - alpha);
        },

        getListeners: function getListeners() {
            return this.listeners;
        },

        addListener: function addListener(newListener) {
            this.listeners.push(newListener);
            return this;
        },

        removeListener: function removeListener(listenerToRemove) {
            removeFirst(this.listeners, listenerToRemove);
            return this;
        },

        removeAllListeners: function removeAllListeners() {
            this.listeners = [];
            return this;
        },

        currentValueIsApproximately: function currentValueIsApproximately(value) {
            return Math.abs(this.getCurrentValue() - value) <= this.getRestDisplacementThreshold();
        }

    });

    // PhysicsState
    // ------------
    // **PhysicsState** consists of a position and velocity. A Spring uses
    // this internally to keep track of its current and prior position and
    // velocity values.
    var PhysicsState = function PhysicsState() {};

    util.extend(PhysicsState.prototype, {
        position: 0,
        velocity: 0
    });

    // SpringConfig
    // ------------
    // **SpringConfig** maintains a set of tension and friction constants
    // for a Spring. You can use fromOrigamiTensionAndFriction to convert
    // values from the [Origami](http://facebook.github.io/origami/)
    // design tool directly to Rebound spring constants.
    var SpringConfig = rebound.SpringConfig = function SpringConfig(tension, friction) {
        this.tension = tension;
        this.friction = friction;
    };

    // Loopers
    // -------
    // **AnimationLooper** plays each frame of the SpringSystem on animation
    // timing loop. This is the default type of looper for a new spring system
    // as it is the most common when developing UI.
    var AnimationLooper = rebound.AnimationLooper = function AnimationLooper() {
        this.springSystem = null;
        var _this = this;
        var _run = function _run() {
            _this.springSystem.loop(Date.now());
        };

        this.run = function () {
            util.onFrame(_run);
        };
    };

    // **SimulationLooper** resolves the SpringSystem to a resting state in a
    // tight and blocking loop. This is useful for synchronously generating
    // pre-recorded animations that can then be played on a timing loop later.
    // Sometimes this lead to better performance to pre-record a single spring
    // curve and use it to drive many animations; however, it can make dynamic
    // response to user input a bit trickier to implement.
    rebound.SimulationLooper = function SimulationLooper(timestep) {
        this.springSystem = null;
        var time = 0;
        var running = false;
        timestep = timestep || 16.667;

        this.run = function () {
            if (running) {
                return;
            }
            running = true;
            while (!this.springSystem.getIsIdle()) {
                this.springSystem.loop(time += timestep);
            }
            running = false;
        };
    };

    // **SteppingSimulationLooper** resolves the SpringSystem one step at a
    // time controlled by an outside loop. This is useful for testing and
    // verifying the behavior of a SpringSystem or if you want to control your own
    // timing loop for some reason e.g. slowing down or speeding up the
    // simulation.
    rebound.SteppingSimulationLooper = function (timestep) {
        this.springSystem = null;
        var time = 0;

        // this.run is NOOP'd here to allow control from the outside using
        // this.step.
        this.run = function () {};

        // Perform one step toward resolving the SpringSystem.
        this.step = function (timestep) {
            this.springSystem.loop(time += timestep);
        };
    };

    // Math for converting from
    // [Origami](http://facebook.github.io/origami/) to
    // [Rebound](http://facebook.github.io/rebound).
    // You mostly don't need to worry about this, just use
    // SpringConfig.fromOrigamiTensionAndFriction(v, v);
    var OrigamiValueConverter = rebound.OrigamiValueConverter = {
        tensionFromOrigamiValue: function tensionFromOrigamiValue(oValue) {
            return (oValue - 30.0) * 3.62 + 194.0;
        },

        origamiValueFromTension: function origamiValueFromTension(tension) {
            return (tension - 194.0) / 3.62 + 30.0;
        },

        frictionFromOrigamiValue: function frictionFromOrigamiValue(oValue) {
            return (oValue - 8.0) * 3.0 + 25.0;
        },

        origamiFromFriction: function origamiFromFriction(friction) {
            return (friction - 25.0) / 3.0 + 8.0;
        }
    };

    // BouncyConversion provides math for converting from Origami PopAnimation
    // config values to regular Origami tension and friction values. If you are
    // trying to replicate prototypes made with PopAnimation patches in Origami,
    // then you should create your springs with
    // SpringSystem.createSpringWithBouncinessAndSpeed, which uses this Math
    // internally to create a spring to match the provided PopAnimation
    // configuration from Origami.
    var BouncyConversion = rebound.BouncyConversion = function (bounciness, speed) {
        this.bounciness = bounciness;
        this.speed = speed;
        var b = this.normalize(bounciness / 1.7, 0, 20.0);
        b = this.projectNormal(b, 0.0, 0.8);
        var s = this.normalize(speed / 1.7, 0, 20.0);
        this.bouncyTension = this.projectNormal(s, 0.5, 200);
        this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01);
    };

    util.extend(BouncyConversion.prototype, {

        normalize: function normalize(value, startValue, endValue) {
            return (value - startValue) / (endValue - startValue);
        },

        projectNormal: function projectNormal(n, start, end) {
            return start + n * (end - start);
        },

        linearInterpolation: function linearInterpolation(t, start, end) {
            return t * end + (1.0 - t) * start;
        },

        quadraticOutInterpolation: function quadraticOutInterpolation(t, start, end) {
            return this.linearInterpolation(2 * t - t * t, start, end);
        },

        b3Friction1: function b3Friction1(x) {
            return 0.0007 * Math.pow(x, 3) - 0.031 * Math.pow(x, 2) + 0.64 * x + 1.28;
        },

        b3Friction2: function b3Friction2(x) {
            return 0.000044 * Math.pow(x, 3) - 0.006 * Math.pow(x, 2) + 0.36 * x + 2.;
        },

        b3Friction3: function b3Friction3(x) {
            return 0.00000045 * Math.pow(x, 3) - 0.000332 * Math.pow(x, 2) + 0.1078 * x + 5.84;
        },

        b3Nobounce: function b3Nobounce(tension) {
            var friction = 0;
            if (tension <= 18) {
                friction = this.b3Friction1(tension);
            } else if (tension > 18 && tension <= 44) {
                friction = this.b3Friction2(tension);
            } else {
                friction = this.b3Friction3(tension);
            }
            return friction;
        }
    });

    util.extend(SpringConfig, {
        // Convert an origami Spring tension and friction to Rebound spring
        // constants. If you are prototyping a design with Origami, this
        // makes it easy to make your springs behave exactly the same in
        // Rebound.
        fromOrigamiTensionAndFriction: function fromOrigamiTensionAndFriction(tension, friction) {
            return new SpringConfig(OrigamiValueConverter.tensionFromOrigamiValue(tension), OrigamiValueConverter.frictionFromOrigamiValue(friction));
        },

        // Convert an origami PopAnimation Spring bounciness and speed to Rebound
        // spring constants. If you are using PopAnimation patches in Origami, this
        // utility will provide springs that match your prototype.
        fromBouncinessAndSpeed: function fromBouncinessAndSpeed(bounciness, speed) {
            var bouncyConversion = new rebound.BouncyConversion(bounciness, speed);
            return this.fromOrigamiTensionAndFriction(bouncyConversion.bouncyTension, bouncyConversion.bouncyFriction);
        },

        // Create a SpringConfig with no tension or a coasting spring with some
        // amount of Friction so that it does not coast infininitely.
        coastingConfigWithOrigamiFriction: function coastingConfigWithOrigamiFriction(friction) {
            return new SpringConfig(0, OrigamiValueConverter.frictionFromOrigamiValue(friction));
        }
    });

    SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG = SpringConfig.fromOrigamiTensionAndFriction(40, 7);

    util.extend(SpringConfig.prototype, { friction: 0, tension: 0 });

    // Here are a couple of function to convert colors between hex codes and RGB
    // component values. These are handy when performing color
    // tweening animations.
    var colorCache = {};
    util.hexToRGB = function (color) {
        if (colorCache[color]) {
            return colorCache[color];
        }
        color = color.replace('#', '');
        if (color.length === 3) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }
        var parts = color.match(/.{2}/g);

        var ret = {
            r: parseInt(parts[0], 16),
            g: parseInt(parts[1], 16),
            b: parseInt(parts[2], 16)
        };

        colorCache[color] = ret;
        return ret;
    };

    util.rgbToHex = function (r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        r = r.length < 2 ? '0' + r : r;
        g = g.length < 2 ? '0' + g : g;
        b = b.length < 2 ? '0' + b : b;
        return '#' + r + g + b;
    };

    var MathUtil = rebound.MathUtil = {
        // This helper function does a linear interpolation of a value from
        // one range to another. This can be very useful for converting the
        // motion of a Spring to a range of UI property values. For example a
        // spring moving from position 0 to 1 could be interpolated to move a
        // view from pixel 300 to 350 and scale it from 0.5 to 1. The current
        // position of the `Spring` just needs to be run through this method
        // taking its input range in the _from_ parameters with the property
        // animation range in the _to_ parameters.
        mapValueInRange: function mapValueInRange(value, fromLow, fromHigh, toLow, toHigh) {
            var fromRangeSize = fromHigh - fromLow;
            var toRangeSize = toHigh - toLow;
            var valueScale = (value - fromLow) / fromRangeSize;
            return toLow + valueScale * toRangeSize;
        },

        // Interpolate two hex colors in a 0 - 1 range or optionally provide a
        // custom range with fromLow,fromHight. The output will be in hex by default
        // unless asRGB is true in which case it will be returned as an rgb string.
        interpolateColor: function interpolateColor(val, startColor, endColor, fromLow, fromHigh, asRGB) {
            fromLow = fromLow === undefined ? 0 : fromLow;
            fromHigh = fromHigh === undefined ? 1 : fromHigh;
            startColor = util.hexToRGB(startColor);
            endColor = util.hexToRGB(endColor);
            var r = Math.floor(util.mapValueInRange(val, fromLow, fromHigh, startColor.r, endColor.r));
            var g = Math.floor(util.mapValueInRange(val, fromLow, fromHigh, startColor.g, endColor.g));
            var b = Math.floor(util.mapValueInRange(val, fromLow, fromHigh, startColor.b, endColor.b));
            if (asRGB) {
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            } else {
                return util.rgbToHex(r, g, b);
            }
        },

        degreesToRadians: function degreesToRadians(deg) {
            return deg * Math.PI / 180;
        },

        radiansToDegrees: function radiansToDegrees(rad) {
            return rad * 180 / Math.PI;
        }

    };

    util.extend(util, MathUtil);

    // Utilities
    // ---------
    // Here are a few useful JavaScript utilities.

    // Lop off the first occurence of the reference in the Array.
    function removeFirst(array, item) {
        var idx = array.indexOf(item);
        idx != -1 && array.splice(idx, 1);
    }

    var _onFrame;
    if (typeof window !== 'undefined') {
        _onFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }
    if (!_onFrame && typeof process !== 'undefined' && process.title === 'node') {
        _onFrame = setImmediate;
    }

    // Cross browser/node timer functions.
    util.onFrame = function onFrame(func) {
        return _onFrame(func);
    };

    // Export the public api using exports for common js or the window for
    // normal browser inclusion.
    if (typeof exports != 'undefined') {
        util.extend(exports, rebound);
    } else if (typeof window != 'undefined') {
        window.rebound = rebound;
    }
})();

// Legal Stuff
// -----------
/**
 *  Copyright (c) 2013, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

/**
 * Polygon.
 * Create a regular polygon and provide api to compute inscribed child.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
    function Polygon() {
        var radius = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
        var sides = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];
        var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var colors = arguments[3];

        _classCallCheck(this, Polygon);

        this._radius = radius;
        this._sides = sides;
        this._depth = depth;
        this._colors = colors;

        this._x = 0;
        this._y = 0;

        this.rotation = 0;
        this.scale = 1;

        // Get basePolygon points straight away.
        this.points = this._getRegularPolygonPoints();
    }

    /**
     * Get the points of any regular polygon based on
     * the number of sides and radius.
     */


    _createClass(Polygon, [{
        key: '_getRegularPolygonPoints',
        value: function _getRegularPolygonPoints() {

            var points = [];

            var i = 0;

            while (i < this._sides) {
                // Note that sin and cos are inverted in order to draw
                // polygon pointing down like: èŒ…è—›é¢…èŒ‚é©´é™†
                var x = -this._radius * Math.sin(i * 2 * Math.PI / this._sides);
                var y = this._radius * Math.cos(i * 2 * Math.PI / this._sides);

                points.push({ x: x, y: y });

                i++;
            }

            return points;
        }

        /**
         * Get the inscribed polygon points by calling `getInterpolatedPoint`
         * for the points (start, end) of each side.
         */

    }, {
        key: '_getInscribedPoints',
        value: function _getInscribedPoints(points, progress) {
            var _this = this;

            var inscribedPoints = [];

            points.forEach(function (item, i) {

                var start = item;
                var end = points[i + 1];

                if (!end) {
                    end = points[0];
                }

                var point = _this._getInterpolatedPoint(start, end, progress);

                inscribedPoints.push(point);
            });

            return inscribedPoints;
        }

        /**
         * Get interpolated point using linear interpolation
         * on x and y axis.
         */

    }, {
        key: '_getInterpolatedPoint',
        value: function _getInterpolatedPoint(start, end, progress) {

            var Ax = start.x;
            var Ay = start.y;

            var Bx = end.x;
            var By = end.y;

            // Linear interpolation formula:
            // point = start + (end - start) * progress;
            var Cx = Ax + (Bx - Ax) * progress;
            var Cy = Ay + (By - Ay) * progress;

            return {
                x: Cx,
                y: Cy
            };
        }

        /**
         * Update children points array.
         */

    }, {
        key: '_getUpdatedChildren',
        value: function _getUpdatedChildren(progress) {

            var children = [];

            for (var i = 0; i < this._depth; i++) {

                // Get basePolygon points on first lap
                // then get previous child points.
                var points = children[i - 1] || this.points;

                var inscribedPoints = this._getInscribedPoints(points, progress);

                children.push(inscribedPoints);
            }

            return children;
        }

        /**
         * Render children, first update children array,
         * then loop and draw each child.
         */

    }, {
        key: 'renderChildren',
        value: function renderChildren(context, progress) {
            var _this2 = this;

            var children = this._getUpdatedChildren(progress);

            // child = array of points at a certain progress over the parent sides.
            children.forEach(function (points, i) {

                // Draw child.
                context.beginPath();
                points.forEach(function (point) {
                    return context.lineTo(point.x, point.y);
                });
                context.closePath();

                // Set colors.
                var strokeColor = _this2._colors.stroke;
                var childColor = _this2._colors.child;

                if (strokeColor) {
                    context.strokeStyle = strokeColor;
                    context.stroke();
                }

                if (childColor) {
                    var rgb = rebound.util.hexToRGB(childColor);

                    var alphaUnit = 1 / children.length;
                    var alpha = alphaUnit + alphaUnit * i;

                    var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')';

                    context.fillStyle = rgba;

                    // Set Shadow.
                    context.shadowColor = 'rgba(0,0,0, 0.1)';
                    context.shadowBlur = 10;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;

                    context.fill();
                }
            });
        }

        /**
         * Render.
         */

    }, {
        key: 'render',
        value: function render(context) {

            context.save();

            context.translate(this._x, this._y);

            if (this.rotation !== 0) {
                context.rotate(rebound.MathUtil.degreesToRadians(this.rotation));
            }

            if (this.scale !== 1) {
                context.scale(this.scale, this.scale);
            }

            // Draw basePolygon.
            context.beginPath();
            this.points.forEach(function (point) {
                return context.lineTo(point.x, point.y);
            });
            context.closePath();

            // Set colors.
            var strokeColor = this._colors.stroke;
            var childColor = this._colors.base;

            if (strokeColor) {
                context.strokeStyle = strokeColor;
                context.stroke();
            }

            if (childColor) {
                context.fillStyle = childColor;
                context.fill();
            }

            context.restore();
        }
    }]);

    return Polygon;
}();
'use strict';

/**
 * Spinner.
 * Create a canvas element, append it to the body, render polygon with
 * inscribed children, provide init and complete methods to control spinner.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spinner = function () {
    function Spinner(params) {
        _classCallCheck(this, Spinner);

        var id = params.id,
            radius = params.radius,
            sides = params.sides,
            depth = params.depth,
            colors = params.colors,
            alwaysForward = params.alwaysForward,
            restAt = params.restAt,
            renderBase = params.renderBase;

        if (sides < 3) {
            console.warn('At least 3 sides required.');
            sides = 3;
        }

        this._canvas = document.createElement('canvas');
        this._canvas.style.backgroundColor = colors.background;
        this._canvas.style.zIndex = 1100;

        this._canvasW = null;
        this._canvasH = null;
        this._canvasOpacity = 1;

        this._centerX = null;
        this._centerY = null;

        this._alwaysForward = alwaysForward;
        this._restThreshold = restAt;
        this._renderBase = renderBase;

        this._springRangeLow = 0;
        this._springRangeHigh = this._restThreshold || 1;

        // Instantiate basePolygon.
        this._basePolygon = new Polygon(radius, sides, depth, colors);

        this._progress = 0;

        this._isAutoSpin = null;
        this._isCompleting = null;
    }

    /**
     * Init spinner.
     */


    _createClass(Spinner, [{
        key: 'init',
        value: function init(spring, autoSpin) {

            this._addCanvas();

            this._spring = spring;
            this._addSpringListener();

            this._isAutoSpin = autoSpin;

            if (autoSpin) {
                // Start auto spin.
                this._spin();
            } else {
                // Render first frame only.
                this._spring.setEndValue(0);
                this.render();
            }
        }
    }, {
        key: '_addCanvas',
        value: function _addCanvas() {
            document.body.appendChild(this._canvas);
            this._context = this._canvas.getContext('2d');
            this._setCanvasSize();
        }
    }, {
        key: '_setCanvasSize',
        value: function _setCanvasSize() {
            this._canvasW = this._canvas.width = window.innerWidth;
            this._canvasH = this._canvas.height = window.innerHeight;

            this._canvas.style.position = 'fixed';
            this._canvas.style.top = 0;
            this._canvas.style.left = 0;

            this._centerX = this._canvasW / 2;
            this._centerY = this._canvasH / 2;
        }
    }, {
        key: '_addSpringListener',
        value: function _addSpringListener() {

            var ctx = this;

            // Add a listener to the spring. Every time the physics
            // solver updates the Spring's value onSpringUpdate will
            // be called.
            this._spring.addListener({
                onSpringUpdate: function onSpringUpdate(spring) {

                    var val = spring.getCurrentValue();

                    // Input range in the `from` parameters.
                    var fromLow = 0,
                        fromHigh = 1,

                        // Property animation range in the `to` parameters.
                        toLow = ctx._springRangeLow,
                        toHigh = ctx._springRangeHigh;

                    val = rebound.MathUtil.mapValueInRange(val, fromLow, fromHigh, toLow, toHigh);

                    // Note that the render method is
                    // called with the spring motion value.
                    ctx.render(val);
                }
            });
        }

        /**
         * Start complete animation.
         */

    }, {
        key: 'setComplete',
        value: function setComplete() {
            this._isCompleting = true;
        }
    }, {
        key: '_completeAnimation',
        value: function _completeAnimation() {

            // Fade out the canvas.
            // this._canvasOpacity -= 0.1;
            this._canvasOpacity = 0;
            this._canvas.style.opacity = this._canvasOpacity;

            // Stop animation and remove canvas.
            if (this._canvasOpacity <= 0) {
                this._isAutoSpin = false;
                this._spring.setAtRest();
                this._canvas.style.display = 'none';
                this._canvas.remove();
            }
        }

        /**
         * Spin animation.
         */

    }, {
        key: '_spin',
        value: function _spin() {

            if (this._alwaysForward) {

                var currentValue = this._spring.getCurrentValue();

                // Switch the animation range used to compute the value
                // in the `onSpringUpdate`, so to change the reverse animation
                // of the spring at a certain threshold.
                if (this._restThreshold && currentValue === 1) {
                    this._switchSpringRange();
                }

                // In order to keep the motion going forward
                // when spring reach 1 reset to 0 at rest.
                if (currentValue === 1) {
                    this._spring.setCurrentValue(0).setAtRest();
                }
            }

            // Restart the spinner.
            this._spring.setEndValue(this._spring.getCurrentValue() === 1 ? 0 : 1);
        }
    }, {
        key: '_switchSpringRange',
        value: function _switchSpringRange() {

            var threshold = this._restThreshold;

            this._springRangeLow = this._springRangeLow === threshold ? 0 : threshold;
            this._springRangeHigh = this._springRangeHigh === threshold ? 1 : threshold;
        }

        /**
         * Render.
         */

    }, {
        key: 'render',
        value: function render(progress) {

            // Update progess if present and round to 4th decimal.
            if (progress) {
                this._progress = Math.round(progress * 10000) / 10000;
            }

            // Restart the spin.
            if (this._isAutoSpin && this._spring.isAtRest()) {
                this._spin();
            }

            // Complete the animation.
            if (this._isCompleting) {
                this._completeAnimation();
            }

            // Clear canvas and save context.
            this._context.clearRect(0, 0, this._canvasW, this._canvasH);
            this._context.save();

            // Move to center.
            this._context.translate(this._centerX, this._centerY);

            this._context.lineWidth = 1.5;

            // Render basePolygon.
            if (this._renderBase) {
                this._basePolygon.render(this._context);
            }

            // Render inscribed polygons.
            this._basePolygon.renderChildren(this._context, this._progress);

            this._context.restore();
        }
    }]);

    return Spinner;
}();
'use strict';

// Custom SETTINGS for each demo in related index.html

/**
 * Demo.
 */
var pageLoading = {
    settings: {
        rebound: {
            tension: 16,
            friction: 5
        },
        spinner: {
            id: 'spinner',
            radius: 90,
            sides: 3,
            depth: 4,
            colors: {
                //background: '#231E76',
                //stroke: '#231E76',
                background: '#f0f0f0',
                stroke: '#272633',
                base: null,
                child: '#272633'
            },
            alwaysForward: true, // When false the spring will reverse normally.
            restAt: 0.5, // A number from 0.1 to 0.9 || null for full rotation
            renderBase: false
        }
    },

    spring: null,
    spinner: null,

    /**
     * Initialize Rebound.js with settings.
     * Rebound is used to generate a spring which
     * is then used to animate the spinner.
     * See more: http://facebook.github.io/rebound-js/docs/rebound.html
     */
    initRebound: function initRebound() {

        var settings = pageLoading.settings.rebound;

        // Create a SpringSystem.
        var springSystem = new rebound.SpringSystem();

        // Add a spring to the system.
        pageLoading.spring = springSystem.createSpring(settings.tension, settings.friction);
    },


    /**
     * Initialize Spinner with settings.
     */
    initSpinner: function initSpinner() {

        var settings = pageLoading.settings.spinner;

        // Instantiate Spinner.
        pageLoading.spinner = new Spinner(settings);
    },


    /**
     * Initialize demo.
     */
    init: function init() {

        var spinnerTypeAutoSpin = true;

        // Instantiate animation engine and spinner system.
        pageLoading.initRebound();
        pageLoading.initSpinner();

        // Init animation with Rebound Spring System.
        pageLoading.spinner.init(pageLoading.spring, spinnerTypeAutoSpin);

        if (spinnerTypeAutoSpin) {
            // Fake loading time, in a real world just call demo.spinner.setComplete();
            // whenever the preload will be completed.
            // setTimeout(function () {
            //     pageLoading.spinner.setComplete();
            // }, 6000);
            window.addEventListener('load', () => {
                console.log('load');
                document.getElementById('loading').style.display = 'none';
                pageLoading.spinner.setComplete();
            });
        } else {
            // Perform real ajax request.
            pageLoading.loadSomething();
        }
    },


    /**
     * Ajax Request.
     */
    loadSomething: function loadSomething() {

        var oReq = new XMLHttpRequest();

        oReq.addEventListener('progress', function (oEvent) {
            if (oEvent.lengthComputable) {

                var percent = Math.ceil(oEvent.loaded / oEvent.total * 100);
                console.log('ajax loding percent', percent);

                // By setting the end value with the actual loading percentage
                // the spinner will progress based on the actual ajax loading time.
                pageLoading.spring.setEndValue(percent * 0.01);
            }
        });

        oReq.addEventListener('load', function (e) {
            // Complete the loading animation.
            pageLoading.spinner.setComplete();
        });

        oReq.open('GET', '/img/something.jpg');
        oReq.send();
    }
};
//# sourceMappingURL=main.js.map;
var now = new Date();

function createtime() {
    var grt = new Date('07/31/2019 17:43:07'); //此处修改你的建站时间或者网站上线时间
    now.setTime(now.getTime() + 250);
    var days = (now - grt) / 1000 / 60 / 60 / 24;
    var dnum = Math.floor(days);
    var hours = ((now - grt) / 1000 / 60 / 60 - (24 * dnum)) % 60;
    var hnum = Math.floor(hours);
    if (String(hnum).length == 1) {
        hnum = '0' + hnum;
    }
    var minutes = ((now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum)) % 60;
    var mnum = Math.floor(minutes);
    if (String(mnum).length == 1) {
        mnum = '0' + mnum;
    }
    var seconds = ((now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum)) % 60;
    var snum = Math.round(seconds);
    if (String(snum).length == 1) {
        snum = '0' + snum;
    }
    document.getElementById('timeDate').innerHTML = 'Service time: ' + dnum + ' days ';
    document.getElementById('times').innerHTML = hnum + ':' + mnum + ':' + snum + ' <span class="my-face">ღゝ◡╹)ノ♡</span>';
}
setInterval('createtime()', 250);;
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
;
"use strict";function updateCoords(e){pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,pointerY=e.clientY||e.touches[0].clientY-canvasEl.getBoundingClientRect().top}function setParticuleDirection(e){var t=anime.random(0,360)*Math.PI/180,a=anime.random(50,180),n=[-1,1][anime.random(0,1)]*a;return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function createParticule(e,t){var a={};return a.x=e,a.y=t,a.color=colors[anime.random(0,colors.length-1)],a.radius=anime.random(16,32),a.endPos=setParticuleDirection(a),a.draw=function(){ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.fillStyle=a.color,ctx.fill()},a}function createCircle(e,t){var a={};return a.x=e,a.y=t,a.color="#F00",a.radius=.1,a.alpha=.5,a.lineWidth=6,a.draw=function(){ctx.globalAlpha=a.alpha,ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.lineWidth=a.lineWidth,ctx.strokeStyle=a.color,ctx.stroke(),ctx.globalAlpha=1},a}function renderParticule(e){for(var t=0;t<e.animatables.length;t++)e.animatables[t].target.draw()}function animateParticules(e,t){for(var a=createCircle(e,t),n=[],i=0;i<numberOfParticules;i++)n.push(createParticule(e,t));anime.timeline().add({targets:n,x:function(e){return e.endPos.x},y:function(e){return e.endPos.y},radius:.1,duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule}).add({targets:a,radius:anime.random(80,160),lineWidth:0,alpha:{value:0,easing:"linear",duration:anime.random(600,800)},duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule,offset:0})}function debounce(e,t){var a;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}var canvasEl=document.querySelector(".fireworks");if(canvasEl){var ctx=canvasEl.getContext("2d"),numberOfParticules=30,pointerX=0,pointerY=0,tap="mousedown",colors=["#FF1461","#18FF92","#5A87FF","#FBF38C"],setCanvasSize=debounce(function(){canvasEl.width=2*window.innerWidth,canvasEl.height=2*window.innerHeight,canvasEl.style.width=window.innerWidth+"px",canvasEl.style.height=window.innerHeight+"px",canvasEl.getContext("2d").scale(2,2)},500),render=anime({duration:1/0,update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}});document.addEventListener(tap,function(e){"sidebar"!==e.target.id&&"toggle-sidebar"!==e.target.id&&"A"!==e.target.nodeName&&"IMG"!==e.target.nodeName&&(render.play(),updateCoords(e),animateParticules(pointerX,pointerY))},!1),setCanvasSize(),window.addEventListener("resize",setCanvasSize,!1)};
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
;
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
;
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
;
"use strict";((e,t)=>{const o=function(){const o=t.documentElement.offsetHeight,n=t.documentElement.scrollHeight,l=t.documentElement.scrollTop||e.pageYOffset||t.body.scrollTop;let s=Math.round(l/(n-o)*100);s>100&&(s=100);const c=t.querySelector(".moon-menu-icon"),r=t.querySelector(".moon-menu-text");s?(c.style.display="none",r.style.display="block",r.innerHTML=s+"%"):(s=0,c.style.display="block",r.style.display="none");t.querySelector(".moon-menu-border").style.strokeDasharray=196*s/100+" 196"};e.addEventListener("load",(()=>{o()})),e.addEventListener("scroll",o),t.querySelector(".moon-menu-button").addEventListener("click",(()=>{t.querySelector(".moon-menu-icon").classList.toggle("active");const e=t.querySelector(".moon-menu-items");e.classList.toggle("active");const o=t.querySelectorAll(".moon-menu-item");if(e.classList.contains("active"))for(let e=0;e<o.length;e++)o[e].style.top=-3-3*e+"em",o[e].style.opacity=.9;else for(let e=0;e<o.length;e++)o[e].style.top="1em",o[e].style.opacity=0}));const n=(e,o)=>{const n=t.querySelector(e);n&&n.addEventListener("click",o)};n("#moon-menu-item-back2top",(()=>{e.scroll({top:0,behavior:"smooth"})})),n("#moon-menu-item-back2bottom",(()=>{const o=t.documentElement.offsetHeight,n=t.documentElement.scrollHeight;e.scroll({top:n-o,behavior:"smooth"})}))})(window,document);