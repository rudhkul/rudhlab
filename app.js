(() => {
'use strict';
const $ = s => document.querySelector(s);
$('#year')?.replaceChildren(String(new Date().getFullYear()));
const menu=$('.menu-toggle'),nav=$('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
if(window.LAB?.email){const a=$('#contact-primary');if(a)a.href='mailto:'+LAB.email}
const themeButton=$('.theme-toggle'), systemTheme=matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme){
  document.documentElement.dataset.theme=theme;
  const dark=theme==='dark';
  themeButton?.setAttribute('aria-pressed',String(dark));
  themeButton?.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  const label=themeButton?.querySelector('.theme-text');if(label)label.textContent=dark?'Light mode':'Dark mode';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#0c171e':'#f7f7f2');
}
applyTheme(document.documentElement.dataset.theme||'light');
themeButton?.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('rudhlab-theme',theme)}catch(_){}});
systemTheme.addEventListener('change',e=>{let saved;try{saved=localStorage.getItem('rudhlab-theme')}catch(_){}if(saved!=='dark'&&saved!=='light')applyTheme(e.matches?'dark':'light')});
const cv=$('#download-cv');if(cv&&LAB.cv){cv.href=LAB.cv;cv.textContent='Download CV ↗';cv.hidden=false}
$('#print-profile')?.addEventListener('click',()=>window.print());
const snippets={cuda:'<b>// parallel computation</b>\n__global__ void kernel(...) {\n  int i = blockIdx.x *\n          blockDim.x + threadIdx.x;\n  <b>// explore the source ↗</b>\n}',julia:'<b># lid-driven cavity</b>\nRe = 1000\n\n<b># numerical methods</b>\n<b># written in Julia</b>\n<b># explore the source ↗</b>',fsi:'<b>// fluid meets structure</b>\n#include &lt;cmath&gt;\n\n<b>// numerical formulation</b>\n<b>// written in C++</b>\n<b>// explore the source ↗</b>'};
const grid=$('#gallery-grid');
if(grid){const total=$('.filter[data-filter="all"] span');if(total)total.textContent=String(LAB.studies.length).padStart(2,'0');$('#gallery-count').textContent=LAB.studies.length+' entries';LAB.studies.forEach((s,i)=>{const card=document.createElement('article');card.className='gallery-card'+(s.type==='simulation'?' visual-card':'');card.dataset.type=s.type;card.innerHTML=`<div class="gallery-art ${s.type==='code'?'code-art':''}">${s.type==='code'?`<pre aria-label="Illustrative code snippet">${snippets[s.art]||''}</pre><span class="code-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="art-label">R / ${String(i+1).padStart(2,'0')}</span><span class="art-corner">SOURCE CODE ↗</span>`:''}</div><div class="gallery-card-body"><div class="gallery-meta"><span>${s.category}</span><span>${s.label}</span></div><button class="gallery-title" data-study="${s.id}">${s.title}<span aria-hidden="true">↗</span></button><p>${s.description}</p></div>`;if(s.media){const art=card.querySelector('.gallery-art');art.replaceChildren();const m=document.createElement(s.media.type==='video'?'video':'img');if(s.media.type==='video'){m.controls=true;m.preload='none';m.playsInline=true;if(s.media.poster)m.poster=s.media.poster;m.setAttribute('aria-label',s.media.alt||s.title)}else{m.alt=s.media.alt||s.title;m.loading='lazy';m.decoding='async'}m.src=s.media.src;art.classList.add('has-media');art.append(m)}grid.append(card)});
const dialog=$('#study-dialog');let opener=null;grid.addEventListener('click',e=>{const b=e.target.closest('[data-study]');if(!b)return;const s=LAB.studies.find(x=>x.id===b.dataset.study);if(!s)return;document.querySelectorAll('video').forEach(v=>v.pause());opener=b;$('#dialog-kicker').textContent=s.category+' / '+s.label;$('#dialog-title').textContent=s.title;$('#dialog-description').textContent=s.detail;const mediaHost=$('#dialog-media');mediaHost?.replaceChildren();if(mediaHost&&s.media){const preview=document.createElement(s.media.type==='video'?'video':'img');preview.src=s.media.src;if(s.media.type==='video'){preview.controls=true;preview.preload='metadata';preview.playsInline=true;if(s.media.poster)preview.poster=s.media.poster;preview.setAttribute('aria-label',s.media.alt||s.title)}else{preview.alt=s.media.alt||s.title}mediaHost.append(preview)}const detail=$('#dialog-detail');detail.replaceChildren();const d=document.createElement('div');d.className='study-details';const strong=document.createElement('strong');strong.textContent='Notes';const code=document.createElement('code');code.textContent=s.method;d.append(strong,code);detail.append(d);const link=$('#dialog-link');link.replaceChildren((s.linkLabel||'View source')+' ↗');link.hidden=!s.url;if(s.url)link.href=s.url;else link.removeAttribute('href');dialog.showModal()});$('.dialog-close')?.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{$('#dialog-media')?.querySelectorAll('video').forEach(v=>v.pause());$('#dialog-media')?.replaceChildren();opener?.focus()});
$('.filter-bar').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;document.querySelectorAll('.filter').forEach(f=>{const active=f===b;f.classList.toggle('active',active);f.setAttribute('aria-pressed',String(active))});let n=0;grid.querySelectorAll('.gallery-card').forEach(c=>{c.hidden=b.dataset.filter!=='all'&&c.dataset.type!==b.dataset.filter;if(c.hidden)c.querySelectorAll('video').forEach(v=>v.pause());if(!c.hidden)n++});$('#gallery-count').textContent=n+' entries'});
}
document.addEventListener('play',e=>{if(e.target instanceof HTMLVideoElement)document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause()})},true);
// Publication filtering operates on server-rendered citations; no request is needed.
const publicationList=$('#publication-list');
if(publicationList){
 let kind='all';const search=$('#publication-search'),entries=[...publicationList.querySelectorAll('.publication')];
 function filterPublications(){const query=search.value.trim().toLocaleLowerCase();let count=0;entries.forEach(entry=>{const matches=(kind==='all'||entry.dataset.type===kind)&&entry.textContent.toLocaleLowerCase().includes(query);entry.hidden=!matches;if(matches)count++});$('#publication-count').textContent=count+' publication'+(count===1?'':'s');$('#publication-empty').hidden=count!==0;}
 search.addEventListener('input',filterPublications);
 document.querySelectorAll('[data-publication-filter]').forEach(button=>button.addEventListener('click',()=>{kind=button.dataset.publicationFilter;document.querySelectorAll('[data-publication-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});filterPublications()}));
}

// Analytical illustrative field; no external solver or scientific result is implied.
const canvas=$('#flow');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,visible=true,w=0,h=0,particles=[],pointer={x:.5,y:.5},frame=0,last=0;
const velocity=(x,y)=>{let xx=x+(pointer.x-.5)*.13,yy=y+(pointer.y-.5)*.13;return {u:Math.sin(Math.PI*xx)**2*Math.sin(2*Math.PI*yy),v:-Math.sin(2*Math.PI*xx)*Math.sin(Math.PI*yy)**2}};
let streamlines=[];
function buildStreamlines(){
 streamlines=[];
 for(let k=0;k<18;k++){
  let x=.5,y=.07+k*.024;
  const path=new Path2D();path.moveTo(x*w,y*h);
  for(let j=0;j<1500;j++){const v=velocity(x,y),m=Math.hypot(v.u,v.v)||1;x+=v.u/m*.0018;y+=v.v/m*.0018;path.lineTo(x*w,y*h)}
  streamlines.push(path);
 }
}
function background(){
 ctx.fillStyle='#102a36';ctx.fillRect(0,0,w,h);
 const glow=ctx.createRadialGradient(w*.52,h*.45,10,w*.52,h*.45,w*.65);glow.addColorStop(0,'rgba(38,112,118,.22)');glow.addColorStop(1,'rgba(16,42,54,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 ctx.strokeStyle='rgba(160,197,197,.085)';ctx.lineWidth=.7;
 for(let x=20;x<w;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
 for(let y=20;y<h;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 streamlines.forEach((p,i)=>{ctx.strokeStyle=`rgba(108,199,188,${.14+i*.011})`;ctx.lineWidth=.9;ctx.stroke(p)});
}
function resize(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);particles=Array.from({length:280},()=>({x:.06+Math.random()*.88,y:.06+Math.random()*.80,life:Math.random()*150}));buildStreamlines();drawStatic();if(!paused)start()}
function drawStatic(){step(0)}
function step(delta){background();particles.forEach(p=>{const v=velocity(p.x,p.y),nx=p.x+v.u*.004*delta,ny=p.y+v.v*.004*delta;const speed=Math.hypot(v.u,v.v);ctx.strokeStyle=`hsla(${170-speed*60}, ${45+speed*25}%, ${56+speed*24}%, .9)`;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(p.x*w,p.y*h);ctx.lineTo((p.x+v.u*.012)*w,(p.y+v.v*.012)*h);ctx.stroke();p.x=nx;p.y=ny;p.life+=delta;if(p.life>220||p.x<.03||p.x>.97||p.y<.03||p.y>.9){p.x=.06+Math.random()*.88;p.y=.06+Math.random()*.8;p.life=0}})}
function tick(t){frame=0;if(paused||!visible||document.hidden)return;let d=last?Math.min((t-last)/16.67,2):1;last=t;step(d);frame=requestAnimationFrame(tick)}function start(){if(!frame&&!paused&&visible&&!document.hidden){last=0;frame=requestAnimationFrame(tick)}}function stop(){cancelAnimationFrame(frame);frame=0}
function updateButton(){const b=$('#flow-toggle');b.setAttribute('aria-pressed',String(paused));b.setAttribute('aria-label',paused?'Play flow animation':'Pause flow animation');b.innerHTML=paused?'▶ <span>Play</span>':'Ⅱ <span>Pause</span>'}
$('#flow-toggle').addEventListener('click',()=>{paused=!paused;updateButton();if(paused)stop();else start()});canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};buildStreamlines();if(paused)drawStatic()});canvas.addEventListener('pointerleave',()=>{pointer={x:.5,y:.5};buildStreamlines();if(paused)drawStatic()});new ResizeObserver(resize).observe(canvas);new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)start();else stop()}).observe(canvas);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});reduced.addEventListener('change',e=>{paused=e.matches;updateButton();if(paused)stop();else start()});updateButton();
})();
