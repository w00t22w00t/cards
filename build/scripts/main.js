!function(){const t=window.matchMedia("(min-width: 0px) and (max-width: 1023px)"),e=(window.matchMedia("(min-width: 1024px)"),document.querySelector("body")),n=document.querySelector(".cards"),o=document.querySelector(".bttn-add"),c=document.querySelector(".bttn-remove"),r=document.querySelector(".bttn-fill"),i=document.querySelector(".bttn-clear"),l=document.querySelector(".bttn-history"),d=document.querySelector(".modal-overlay"),s=(document.querySelector(".modal.modal_history"),document.querySelector(".modal__list")),a=(document.querySelector(".modal.modal_more"),document.querySelector(".more-js-title")),u=document.querySelector(".more-js-text");let m=!1;const h=[];fetch("https://jsonplaceholder.typicode.com/posts").then(t=>t.json()).then(f=>function(f){let v=0;function y(t,o){let c=document.createElement("li");c.classList.add("card"),c.insertAdjacentHTML("beforeend",`<h3 class="card__title">${t.title}</h3>\n        <p class="card__content">${t.body.slice(0,100)+"..."}</p>\n        <div class="card__bttns">\n          <button class="card__bttn-more bttn">more</button>\n          <button class="card__bttn-remove bttn">remove</button>\n        </div>\n        <div class="loader-wrapper">\n          <div class="loader">\n          </div>\n          <div class="loader-section section-left"></div>\n          <div class="loader-section section-right"></div>\n        </div>`);const r=c.querySelector(".card__bttn-more"),i=c.querySelector(".card__bttn-remove");r.addEventListener("click",(function(){e.classList.add("more-active"),a.textContent=t.title,u.textContent=t.body})),i.addEventListener("click",(function(){t.history=!0,c.remove()})),n.append(c),document.querySelectorAll(".card").length>1?n.classList.add("alot"):n.classList.remove("alot"),o?setTimeout((function(){c.classList.add("loaded")}),3e3):c.classList.add("loaded")}function L(){if(v>=f.length)return!1;let t=f[v];h[v]=Object.assign({history:!1},t),y(h[v],!0),v++}o.addEventListener("click",L),c.addEventListener("click",(function(){const t=document.querySelectorAll(".card");if(0==t)return!1;t[t.length-1].remove(),h[t.length-1].history=!0})),r.addEventListener("click",(function(){if(this.classList.toggle("active"),m=!m,t.matches)for(;v<=f.length&&n.scrollLeft+n.offsetWidth>=n.scrollWidth;)L();else for(;v<=f.length&&n.offsetHeight<=screen.height;)L()})),i.addEventListener("click",(function(){r.classList.remove("active"),m=!1;document.querySelectorAll(".card").forEach((function(t,e){if(0==e)return!1;t.remove(),h[e].history=!0}))})),l.addEventListener("click",(function(){e.classList.add("history-active"),s.innerHTML="",console.log("history"),h.forEach((function(t,e){if(!1===t.history)return!1;let n=document.createElement("li");n.classList.add("modal__list-item"),n.insertAdjacentHTML("beforeend",`<h4>${t.title}</h4>\n          <button class="bttn">restore</button>`);n.querySelector("button").addEventListener("click",(function(){y(t,!1),t.history=!1,n.remove()})),s.append(n)}))})),d.addEventListener("click",(function(t){if(!t.target.classList.contains("modal-overlay"))return!1;e.classList.remove("history-active","more-active")})),t.matches?n.addEventListener("scroll",t=>{if(0==m)return!1;if(n.scrollLeft+n.offsetWidth+50>=n.scrollWidth)for(let t=0;t<3;t++)L()},{passive:!0}):window.addEventListener("scroll",(function(){if(0==m)return!1;if(this.document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+150)for(let t=0;t<3;t++)L()}))}(f)).catch((function(t){}))}();