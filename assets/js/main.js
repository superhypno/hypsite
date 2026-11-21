/* Локальный просмотр (file://): браузер не открывает index.html в папке сам, поэтому дописываем его к ссылкам. На сайте в интернете не срабатывает. */
(function(){
  if(location.protocol!=='file:') return;
  document.querySelectorAll('a[href]').forEach(function(a){
    var h=a.getAttribute('href');
    if(/^([a-z]+:|#|\/\/)/i.test(h)) return;
    var i=h.indexOf('#'), path=i<0?h:h.slice(0,i), hash=i<0?'':h.slice(i);
    if(path===''||path.slice(-1)!=='/') return;
    a.setAttribute('href', path+'index.html'+hash);
  });
})();
(function(){
  var circles=[].slice.call(document.querySelectorAll('.circle'));
  circles.forEach(function(btn){
    var v=btn.querySelector('video'), ring=btn.querySelector('.prog circle');
    v.addEventListener('timeupdate',function(){ if(v.duration){ ring.style.strokeDashoffset=301.6*(1-v.currentTime/v.duration); }});
    v.addEventListener('ended',function(){ btn.classList.remove('is-playing'); ring.style.strokeDashoffset=301.6; v.currentTime=0; });
    btn.addEventListener('click',function(){
      if(!v.paused){ v.pause(); btn.classList.remove('is-playing'); return; }
      circles.forEach(function(o){ if(o!==btn){ var ov=o.querySelector('video'); if(!ov.paused){ ov.pause(); o.classList.remove('is-playing'); } } });
      var pr=v.play(); btn.classList.add('is-playing');
      if(pr&&pr.catch){ pr.catch(function(){ btn.classList.remove('is-playing'); }); }
    });
  });
  var lb=document.getElementById('lightbox'); if(!lb) return; var img=lb.querySelector('img');
  function close(){ lb.hidden=true; img.removeAttribute('src'); }
  document.querySelectorAll('.orig').forEach(function(b){ b.addEventListener('click',function(){ img.src=b.getAttribute('data-img'); lb.hidden=false; lb.querySelector('.lb-close').focus(); }); });
  lb.addEventListener('click',function(e){ if(e.target!==img) close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!lb.hidden) close(); });
})();

(function(){
  var f=document.getElementById('f'), done=document.getElementById('done');
  if(f) f.addEventListener('submit',function(e){
    e.preventDefault();
    var el=f.elements, n=el['name'].value.trim(), c=el['contact'].value.trim(), m=el['msg'].value.trim();
    if(!n||!c){done.hidden=false;done.innerHTML='Заполните имя и контакт, чтобы я мог ответить.';return;}
    var text='Заявка на диагностику\nИмя: '+n+'\nКонтакт: '+c+(m?'\nЗапрос: '+m:'');
    function show(copied){
      done.hidden=false;
      done.innerHTML=(copied?'<b>Текст заявки скопирован.</b> ':'')+'Отправьте его в Telegram: <a href="https://t.me/avstarpro" target="_blank" rel="noopener">@avstarpro</a>. Я отвечу лично.';
    }
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){show(true)},function(){show(false)});}else{show(false);}
  });
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('js');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight)io.observe(el);});
})();
