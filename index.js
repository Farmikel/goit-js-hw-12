import{a as x,S as w,i}from"./assets/vendor-frHSA4Lh.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const q="50378123-4d32872220f2974038eb09c45",b="https://pixabay.com/api/";async function m(s,o=1){const r={key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};return(await x.get(b,{params:r})).data}const p=document.querySelector(".gallery");document.querySelector(".load-more");let d;function f(s){const o=s.map(({webformatURL:r,largeImageURL:n,tags:e,likes:t,views:l,comments:L,downloads:S})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img
            class="gallery-image"
            src="${r}"
            alt="${e}"
          />
        </a>
        <div class="image-info">
            <div class="info">
              <span class="info-title">Likes</span>
              <span class="stats">${t}</span>
            </div> 
            <div class="info">
              <span class="info-title">Views</span>
              <span class="stats">${l}</span>
            </div> 
            <div class="info">
              <span class="info-title">Comments</span>
              <span class="stats">${L}</span>
            </div> 
            <div class="info">
              <span class="info-title">Downloads</span>
              <span class="stats">${S}</span>
            </div> 
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",o),d?d.refresh():d=new w(".gallery a")}function A(){p.innerHTML=""}function g(){document.querySelector(".loader").classList.remove("visually-hidden")}function h(){document.querySelector(".loader").classList.add("visually-hidden")}function y(){document.querySelector(".load-more").classList.remove("visually-hidden")}function F(){document.querySelector(".load-more").classList.add("visually-hidden")}const v=document.querySelector(".form"),B=document.querySelector(".load-more");let u="",a=1,c=0;v.addEventListener("submit",C);B.addEventListener("click",P);async function C(s){s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(!o){i.error({message:"Please enter a search query",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"});return}u=o,a=1,A(),F();try{g();const r=await m(u,a);if(c=r.totalHits,r.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"});return}f(r.hits),a*15<c?y():i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{i.error({message:"Something went wrong. Please try again later!",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"})}finally{h(),v.reset()}}async function P(){if(!(a*15>=c)){a+=1,F();try{g();const s=await m(u,a);f(s.hits);const{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),a*15<c?y():i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{i.error({message:"Something went wrong. Please try again later!",position:"topRight",color:"#EF4040",maxWidth:"432px",messageColor:"#FAFAFB",iconColor:"#FFFFFF",messageSize:"16px"})}finally{h()}}}
//# sourceMappingURL=index.js.map
