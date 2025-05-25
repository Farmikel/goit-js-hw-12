import{a as m,S as f,i as n}from"./assets/vendor-frHSA4Lh.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const g="50378123-4d32872220f2974038eb09c45",y="https://pixabay.com/api/";async function h(t){const r={key:g,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await m.get(y,{params:r})).data}const d=document.querySelector(".gallery");let l;function F(t){const r=t.map(({webformatURL:a,largeImageURL:o,tags:e,likes:s,views:i,comments:p,downloads:u})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img
            class="gallery-image"
            src="${a}"
            alt="${e}"
          />
        </a>
        <div class="image-info">
            <div class="info">
              <span class="info-title">Likes</span>
              <span class="stats">${s}</span>
            </div> 
            <div class="info">
              <span class="info-title">Views</span>
              <span class="stats">${i}</span>
            </div> 
            <div class="info">
              <span class="info-title">Comments</span>
              <span class="stats">${p}</span>
            </div> 
            <div class="info">
              <span class="info-title">Downloads</span>
              <span class="stats">${u}</span>
            </div> 
        </div>
      </li>
    `).join("");d.insertAdjacentHTML("beforeend",r),l?l.refresh():l=new f(".gallery a")}function v(){d.innerHTML=""}function L(){document.querySelector(".loader").classList.remove("visually-hidden")}function x(){document.querySelector(".loader").classList.add("visually-hidden")}const c=document.querySelector(".form");c.addEventListener("submit",async t=>{t.preventDefault();const a=t.target.elements["search-text"].value.trim();if(!a){n.error({message:"Please enter a search query",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"});return}try{L(),v();const o=await h(a);if(o.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"});return}F(o.hits)}catch{n.error({message:"Something went wrong. Please try again later!",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"})}finally{x(),c.reset()}});
//# sourceMappingURL=index.js.map
