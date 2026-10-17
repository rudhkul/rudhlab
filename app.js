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
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#121519':'#ffffff');
}
applyTheme(document.documentElement.dataset.theme||'light');
themeButton?.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('rudhlab-theme',theme)}catch(_){}});
systemTheme.addEventListener('change',e=>{let saved;try{saved=localStorage.getItem('rudhlab-theme')}catch(_){}if(saved!=='dark'&&saved!=='light')applyTheme(e.matches?'dark':'light')});
const cv=$('#download-cv');if(cv&&LAB.cv){cv.href=LAB.cv;cv.textContent='Download CV ↗';cv.hidden=false}
$('#print-profile')?.addEventListener('click',()=>window.print());
const repositories={cuda:{language:'CUDA C++',name:'CUDA-computing',topic:'LBM · IBM · FVM'},julia:{language:'Julia',name:'lid-driven cavity',topic:'Re = 1000'},fsi:{language:'C++',name:'fsicavity',topic:'Fluid–structure interaction'}};
const grid=$('#gallery-grid');
if(grid){const total=$('.filter[data-filter="all"] span');if(total)total.textContent=String(LAB.studies.length).padStart(2,'0');$('#gallery-count').textContent=LAB.studies.length+' entries';LAB.studies.forEach((s,i)=>{const card=document.createElement('article');card.className='gallery-card'+(s.type==='simulation'?' visual-card':'');card.dataset.type=s.type;card.innerHTML=`<div class="gallery-art ${s.type==='code'?'code-art':''}">${s.type==='code'?`<div class="repository-cover"><span>${repositories[s.art].language}</span><strong>${repositories[s.art].name}</strong><small>${repositories[s.art].topic}</small><span class="repository-link">VIEW REPOSITORY ↗</span></div>`:''}</div><div class="gallery-card-body"><div class="gallery-meta"><span>${s.category}</span><span>${s.label}</span></div><button class="gallery-title" data-study="${s.id}">${s.title}<span aria-hidden="true">↗</span></button><p>${s.description}</p></div>`;if(s.media){const art=card.querySelector('.gallery-art');art.replaceChildren();const m=document.createElement(s.media.type==='video'?'video':'img');if(s.media.type==='video'){m.controls=true;m.preload='none';m.playsInline=true;if(s.media.poster)m.poster=s.media.poster;m.setAttribute('aria-label',s.media.alt||s.title)}else{m.alt=s.media.alt||s.title;m.loading='lazy';m.decoding='async'}m.src=s.media.src;art.classList.add('has-media');art.append(m)}grid.append(card)});
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

// The featured recording starts only on request, including for reduced-motion visitors.
})();
