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
;(function ($) {
  $.fn.circleMagic = function (options) {

    var width, height, canvas, ctx, animateHeader = true;
    var circles = [];

    var settings = $.extend({
      color: 'rgba(255,255,255,.5)',
      radius: 10,
      density: 0.3,
      clearOffset: 0.2
    }, options);

    //  Main

    var container = this['0'];
    initContainer();
    addListeners();

    function initContainer() {
      width = container.offsetWidth;
      height = container.offsetHeight;

      //  create canvas element

      initCanvas();
      canvas = document.getElementById('homeTopCanvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.left = '0';
      canvas.style.bottom = '0';
      ctx = canvas.getContext('2d');

      //  create circles
      for (var x = 0; x < width * settings.density; x++) {
        var c = new Circle();
        circles.push(c);
      }
      animate();
    }

    //Init canvas element
    function initCanvas() {
      var canvasElement = document.createElement('canvas');
      canvasElement.id = 'homeTopCanvas';
      container.appendChild(canvasElement);
      canvasElement.parentElement.style.overflow = 'hidden';

    }

    // Event handling
    function addListeners() {
      window.addEventListener('scroll', scrollCheck, false);
      window.addEventListener('resize', resize, false);
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) {
        animateHeader = false;
      }
      else {
        animateHeader = true;
      }
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      container.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in circles) {
          circles[i].draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function randomColor() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var alpha = Math.random().toPrecision(2);
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    //  Canvas manipulation

    function Circle() {
      var that = this;

      // constructor
      (function () {
        that.pos = {};
        init();
      })();

      function init() {
        that.pos.x = Math.random() * width;
        that.pos.y = height + Math.random() * 100;
        that.alpha = 0.1 + Math.random() * settings.clearOffset;
        that.scale = 0.1 + Math.random() * 0.3;
        that.speed = Math.random();
        if (settings.color === 'random') {
          that.color = randomColor();
        }
        else {
          that.color = settings.color;
        }
      }

      this.draw = function () {
        if (that.alpha <= 0) {
          init();
        }
        that.pos.y -= that.speed;
        that.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(that.pos.x, that.pos.y, that.scale * settings.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = that.color;
        ctx.fill();
        ctx.closePath();
      };
    }
  }
})(jQuery);;
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
})();;
(function () {
    let postCover = document.querySelector('.post-cover');
    if (postCover === null) {
        return;
    }
    let postHeader = document.querySelector('.post .post-header') || document.querySelector('.page .post-header');
    if (postHeader === null) {
        postHeader = new DOMParser().parseFromString('<header class="post-header">'+
        `<h1 class="post-title" itemprop="name headline">${document.title.split(' | ')[0]}</h1>`+
        '<div class="post-meta-container"></div>'+
        '</header>', 'text/html').querySelector('header');
    }
    // let bgImg = "https://img.paulzzh.tech/touhou/random?tag=night";
    // let bgImg = "https://img.onesnas.com";
    // let bgImg = `/images/wallpaper/${randomNum(1, 35)}.png`;
    let bgImg;
    if (postHeader.getAttribute('topImg') != null) {
        bgImg = postHeader.getAttribute('topImg');
    }
    else {
        bgImg = `/images/wallpaper/${randomNum(1, 35)}.png`;
    }
    $('.post-cover').css({
        'background': '#222 url("'+encodeURI(bgImg)+'")  center center no-repeat',
        'background-size': 'cover'
    });
    document.querySelector('.post-cover #cover-post-header').appendChild(postHeader.cloneNode(true));
})();
;
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
"use strict";((e,t)=>{const o=function(){const o=t.documentElement.offsetHeight,n=t.documentElement.scrollHeight,l=t.documentElement.scrollTop||e.pageYOffset||t.body.scrollTop;let s=Math.round(l/(n-o)*100);s>100&&(s=100);const c=t.querySelector(".moon-menu-icon"),r=t.querySelector(".moon-menu-text");s?(c.style.display="none",r.style.display="block",r.innerHTML=s+"%"):(s=0,c.style.display="block",r.style.display="none");t.querySelector(".moon-menu-border").style.strokeDasharray=196*s/100+" 196"};e.addEventListener("load",(()=>{o()})),e.addEventListener("scroll",o),t.querySelector(".moon-menu-button").addEventListener("click",(()=>{t.querySelector(".moon-menu-icon").classList.toggle("active");const e=t.querySelector(".moon-menu-items");e.classList.toggle("active");const o=t.querySelectorAll(".moon-menu-item");if(e.classList.contains("active"))for(let e=0;e<o.length;e++)o[e].style.top=-3-3*e+"em",o[e].style.opacity=.9;else for(let e=0;e<o.length;e++)o[e].style.top="1em",o[e].style.opacity=0}));const n=(e,o)=>{const n=t.querySelector(e);n&&n.addEventListener("click",o)};n("#moon-menu-item-back2top",(()=>{e.scroll({top:0,behavior:"smooth"})})),n("#moon-menu-item-back2bottom",(()=>{const o=t.documentElement.offsetHeight,n=t.documentElement.scrollHeight;e.scroll({top:n-o,behavior:"smooth"})}))})(window,document);