import{i as l,S as c}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u=document.querySelector("form"),a=document.querySelector("ul");u.addEventListener("submit",f);function f(i){i.preventDefault();const o=i.currentTarget.text.value.trim();if(o===""){l.info({title:"Attention",message:"Please enter a request"});return}const s=new URLSearchParams({key:"42277642-5b5e0c3e2383e813180f7c1aa",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${s}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(m).catch(r=>{console.log(r)})}function m(i){a.innerHTML="";const o='<div class="loader"></div>';a.insertAdjacentHTML("beforebegin",o);const s=document.querySelector(".loader"),r=i.hits.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}">
          <ul class="photo-info">
            <li>
                <h3>Likes</h3>
                <p>${e.likes}</p>
            </li>
            <li>
                <h3>Views</h3>
                <p>${e.views}</p>
            </li>
            <li>
                <h3>Comments</h3>
                <p>${e.comments}</p>
            </li>
            <li>
                <h3>Downloads</h3>
                <p>${e.downloads}</p>
            </li>
          </ul>
          </a>
        </li>
      `).join("");setTimeout(()=>{if(s.remove(),i.totalHits===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}a.insertAdjacentHTML("beforeend",r),new c(".gallery-list a",{captionsData:"alt",captionDelay:250}).refresh()},1e3)}
//# sourceMappingURL=commonHelpers.js.map
