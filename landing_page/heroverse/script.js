const nav=document.querySelector('.hero-nav');
const topBtn=document.getElementById('topBtn');

window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>40);
  topBtn.classList.toggle('show',window.scrollY>500);
});

topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',()=>document.querySelector('.navbar-collapse')?.classList.remove('show'));
});

const particleLayer=document.getElementById('particles');
for(let i=0;i<34;i++){
  const p=document.createElement('span');
  p.className='particle';
  p.style.left=Math.random()*100+'%';
  p.style.animationDuration=(6+Math.random()*10)+'s';
  p.style.animationDelay=(-Math.random()*12)+'s';
  p.style.opacity=(.2+Math.random()*.7);
  particleLayer.appendChild(p);
}

document.getElementById('newsletter').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.currentTarget.querySelector('button');
  btn.innerHTML='<i class="bi bi-check-lg"></i>';
  setTimeout(()=>btn.innerHTML='<i class="bi bi-send"></i>',1800);
});

document.getElementById('joinForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.currentTarget.querySelector('button');
  btn.textContent='APPLICATION RECEIVED ✓';
  setTimeout(()=>bootstrap.Modal.getInstance(document.getElementById('joinModal')).hide(),1200);
});
