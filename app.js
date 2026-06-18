const orbitHtml=`<div class='card c real-skull'><img src='assets/art/skull-dot-green.svg' alt='green dot skull art'></div>`;
document.getElementById('orbit').innerHTML=orbitHtml;
const delay=1450;
const state={busy:false,seen:new Set(JSON.parse(localStorage.getItem('panku.seen')||'[]')),last:localStorage.getItem('panku.last')||''};
const stage=document.getElementById('stage'),go=document.getElementById('go'),preview=document.getElementById('preview'),statusLabel=document.getElementById('status'),target=document.getElementById('target'),count=document.getElementById('count'),lastTarget=document.getElementById('last');
function stats(){count.textContent=`${state.seen.size} / ${companies.length}`;const c=companies.find(x=>x.code===state.last);lastTarget.textContent=c?`${c.code} ${c.name}`:'NONE'}
function choose(){let c=companies[Math.floor(Math.random()*companies.length)];if(companies.length>1&&c.code===state.last)c=companies[Math.floor(Math.random()*companies.length)];return c}
function save(c){state.seen.add(c.code);state.last=c.code;localStorage.setItem('panku.seen',JSON.stringify([...state.seen]));localStorage.setItem('panku.last',c.code);stats()}
function show(c){target.innerHTML=`<strong>${c.code} ${c.name}</strong><br><span>${c.sector}</span>`}
function dive(){if(state.busy)return;state.busy=true;const c=choose();save(c);show(c);statusLabel.textContent='TARGET LOCKED';go.setAttribute('aria-busy','true');stage.classList.add('is-diving');setTimeout(()=>location.assign(c.url),delay)}
function prev(){if(state.busy)return;const c=choose();save(c);show(c);statusLabel.textContent='TARGET PREVIEW'}
go.addEventListener('click',dive);preview.addEventListener('click',prev);stats();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
