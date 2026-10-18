(function(){
var R=document.documentElement;
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function s(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var pal=g('cs-palette');
if(pal&&pal!==R.dataset.palette)R.dataset.palette=pal;
var pth=location.pathname||'';
var base=/(^|\/)(assembly|code|practice|diag)\//.test(pth)?'../':'';
var P=[['Методическое пособие.html','Обзор'],['assembly/assembly.html','Сборка'],['code/code.html','Код'],['practice/practice.html','Практика'],['diag/diag.html','Диагностика']];
var last=pth.split('/').filter(Boolean).pop()||'';
var ci=0;
for(var i=0;i<P.length;i++){if(P[i][0].split('/').pop()===last){ci=i;break}}
var hd=document.createElement('header');hd.className='top';
hd.innerHTML='<div class="wrap bar"><a class="logo" href="'+base+'Методическое пособие.html"><img id="logo-ico" src="'+base+'Vector.png" alt="" style="width:30px;height:30px;vertical-align:-7px;margin-right:6px"><span>ЭСЭМКО</span></a><nav>'+P.map(function(p,i){return '<a href="'+base+p[0]+'"'+(i===ci?' class="on"':'')+'>'+p[1]+'</a>'}).join('')+'</nav><span class="soc" style="margin-left:100px"><a class="soc-ic" href="https://t.me/+Iqdgb5pppSMxNTVi" target="_blank" rel="noopener" aria-label="Телеграм"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.41-.83.41z"/></svg></a><a class="soc-ic" href="https://vk.ru/club242039063" target="_blank" rel="noopener" aria-label="ВКонтакте"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.16 16.6c-5.9 0-9.27-4.05-9.41-10.79h2.95c.1 4.87 2.24 6.93 3.95 7.35V5.81h2.75v4.2c1.68-.18 3.45-2.09 4.05-4.2h2.75c-.46 2.6-2.38 4.51-3.74 5.3 1.36.64 3.54 2.31 4.36 5.49h-3.03c-.65-2.02-2.25-3.58-4.39-3.8v3.8h-.24z"/></svg></a></span><div class="pal" id="pal" role="switch" aria-label="Палитра"><span class="knob"></span></div><button class="ic" id="th" aria-label="Тема"><span id="thico">🌒</span></button></div>';
document.body.prepend(hd);
var th0=document.getElementById('th');
if(th0){var ti=document.getElementById('thico');if(ti)ti.textContent=R.dataset.theme==='light'?'🌖':'🌒';if(R.dataset.theme==='light')th0.classList.add('flip');}
var lico0=document.getElementById('logo-ico');
if(lico0)lico0.src=base+(R.dataset.theme==='dark'?'Vector2.png':'Vector.png');
var main=document.querySelector('main');
var pg='<div class="pager">'+(ci>0?'<a href="'+base+P[ci-1][0]+'"><small>← Назад</small>'+P[ci-1][1]+'</a>':'<span></span>')+(ci<P.length-1?'<a class="next" href="'+base+P[ci+1][0]+'"><small>Далее →</small>'+P[ci+1][1]+'</a>':'')+'</div>';
main.insertAdjacentHTML('beforeend',pg);
document.body.insertAdjacentHTML('beforeend','<footer>ЭСЭМКО · Учебный Методический Комплекс</footer>');
// meteor shower on logo click
var logo=document.querySelector('a.logo');
if(logo){
  logo.addEventListener('click',function(e){
    e.preventDefault();
    var box=document.getElementById('meteors');
    if(!box){box=document.createElement('div');box.id='meteors';document.body.appendChild(box)}
    var t0=performance.now();
    for(var k=0;k<14;k++){
      (function(k){
        setTimeout(function(){
          var m=document.createElement('i');
          var big=Math.random()<.04;
          m.style.left=(Math.random()*100)+'vw';
          m.style.top=(Math.random()*60)+'vh';
          m.style.width=(big?3+Math.random()*2:(1+Math.random()*2))+'px';
          m.style.height=(big?80+Math.random()*35:(70+Math.random()*80))+'px';
          m.style.animationDelay=(Math.random()*.5)+'s';
          if(big)m.classList.add('big');
          box.appendChild(m);
          requestAnimationFrame(function(){m.classList.add('run')});
          setTimeout(function(){m.remove()},2200);
        },k*180+Math.random()*120);
      })(k);
    }
    return false;
  });
}
document.getElementById('th').onclick=function(){
  var d=R.dataset.theme!=='light';R.dataset.theme=d?'light':'dark';s('cs-theme',R.dataset.theme);
  this.classList.toggle('flip');
  var ti=document.getElementById('thico');if(ti)ti.textContent=d?'🌖':'🌒';
  this.classList.remove('filling');void this.offsetWidth;this.classList.add('filling');
  var b=document.body;b.classList.add('theming');
  clearTimeout(b._tm);b._tm=setTimeout(function(){b.classList.remove('theming')},700);
  var lico=document.getElementById('logo-ico');
  if(lico)lico.src=base+(R.dataset.theme==='dark'?'Vector2.png':'Vector.png');
};
var palEl=document.getElementById('pal');
if(palEl){
  palEl.onclick=function(){
    R.dataset.palette=R.dataset.palette==='beige'?'blue':'beige';
    s('cs-palette',R.dataset.palette);
    var b=document.body;b.classList.add('theming');
    clearTimeout(b._tm);b._tm=setTimeout(function(){b.classList.remove('theming')},700);
  };
}
document.querySelectorAll('a[href$=".html"]').forEach(function(a){if(a.classList.contains('logo'))return;a.addEventListener('click',function(e){
  if(e.ctrlKey||e.metaKey||e.shiftKey||a.target)return;e.preventDefault();
  document.body.classList.add('leave');setTimeout(function(){location.href=a.href},220);
})});
addEventListener('pageshow',function(){document.body.classList.remove('leave')});
// earth press: reverse orbit direction (toggle), continuing from the same point
var earth=document.querySelector('.earth');
var rings=[].slice.call(document.querySelectorAll('.ring'));
if(earth){
  var orb=earth.closest('.orbit');
  var rev=false,last=performance.now();
  var st=rings.map(function(r){
    var r2=r.classList.contains('r2');
    return {base:r2?26:16,dir:r2?1:-1,ang:0}; // r2 — по часовой, r1 — против часовой
  });
  var step=function(now){
    var dt=Math.min(now-last,50);last=now;
    var flip=rev?-1:1;
    rings.forEach(function(r,i){
      var c=st[i];
      c.ang+=c.dir*flip*(360/c.base)*dt/1000;
      r.style.transform='rotate('+c.ang+'deg)';
    });
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  earth.addEventListener('click',function(){
    rev=!rev;
    orb.classList.add('hold');
    clearTimeout(orb._rm);orb._rm=setTimeout(function(){orb.classList.remove('hold')},220);
  });
}
// reveal
var els=document.querySelectorAll('main .card,main .step,main details.lab,main .tw,main .note,main h2,main .tag,main .stats,main .hero>div,main .prog');
els.forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.classList.add('rv');el.style.setProperty('--d',(i%6)*70+'ms')});
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1});
  els.forEach(function(el){io.observe(el)});
}else els.forEach(function(el){el.classList.add('in')});
// tabs
var savedTab=g('cs-tab');
if(savedTab){
  var savedBtn=document.querySelector('.tab[data-t="'+savedTab+'"]');
  if(savedBtn){
    document.querySelectorAll('.tab').forEach(function(x){x.classList.toggle('on',x===savedBtn)});
    document.querySelectorAll('.pn').forEach(function(p){p.classList.toggle('on',p.id===savedTab)});
    var pn=document.querySelector('.pn.on');
    if(pn)pn.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});
  }
}
document.querySelectorAll('.tab').forEach(function(b){b.onclick=function(){
  document.querySelectorAll('.tab').forEach(function(x){x.classList.toggle('on',x===b)});
  document.querySelectorAll('.pn').forEach(function(p){p.classList.toggle('on',p.id===b.dataset.t)});
  s('cs-tab',b.dataset.t);
  // раскрыть rv-элементы в только что показанной панели (скрытые при загрузке не получили .in)
  var pn=document.querySelector('.pn.on');
  if(pn)pn.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});
}});
// copy
document.querySelectorAll('.cp').forEach(function(b){b.onclick=function(){
  var t=b.nextElementSibling.innerText;
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent='Скопировано ✓'},function(){b.textContent='Выделите вручную'});
  setTimeout(function(){b.textContent='Копировать'},1500);
}});
// code editor (auto-save, highlight, suggestions, versions)
var ed=document.getElementById('ed');
if(ed){
  var SNAP_KEYS={switch:'cs-snap-switch',load:'cs-snap-load',last:'cs-snap-last'};
  var snapGet=function(k){var v=null;try{v=g(SNAP_KEYS[k])}catch(e){}return v};
  var snapSet=function(k,v){s(SNAP_KEYS[k],v)};
  var saved=null;try{saved=g('cs-editor')}catch(e){}
  if(saved){ed.value=saved;if(!snapGet('last'))snapSet('last',saved)}
  snapSet('load',ed.value); /* после загрузки страницы */
  var hl=document.getElementById('ed-hl');
  var errEl=document.getElementById('ed-err');
  var sugEl=document.getElementById('sug');
  var edbox=ed.parentNode;
  var saveTimer;
  /* Arduino-ish dictionary */
  var KW='void|if|else|for|while|do|switch|case|default|return|break|continue|const|static|struct|enum|class|public|private|new|delete|sizeof|true|false|HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP|A0|A1|A2|A3|A4|A5|A6|A7' .split('|');
  var TP='int|float|double|char|byte|boolean|long|short|unsigned|String|bool|uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t|size_t|word'
    .split('|');
  var FN='pinMode|digitalWrite|digitalRead|analogRead|analogWrite|delay|delayMicroseconds|millis|micros|Serial|begin|print|println|available|read|readString|map|constrain|min|max|abs|pow|sqrt|random|randomSeed|tone|noTone|attachInterrupt|detachInterrupt|setup|loop|Wire|beginTransmission|endTransmission|requestFrom|write|send'.split('|');
  var esc=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};
  var highlight=function(){
    var src=ed.value;
    /* split на токены: коммент, строка, число, слово */
    var parts=src.split(/(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|\b\d+\.?\d*\b|\b\w+\b)/g);
    var html='';
    for(var p=0;p<parts.length;p++){
      var t=parts[p];
      if(!t)continue;
      if(/^\/\//.test(t))html+='<span class="cm">'+esc(t)+'</span>';
      else if(/^["']/.test(t))html+='<span class="str">'+esc(t)+'</span>';
      else if(/^\d/.test(t))html+=esc(t);
      else if(/^\w+$/.test(t)){
        if(KW.indexOf(t)>-1)html+='<span class="kw">'+esc(t)+'</span>';
        else if(TP.indexOf(t)>-1)html+='<span class="tp">'+esc(t)+'</span>';
        else if(FN.indexOf(t)>-1)html+='<span class="fn">'+esc(t)+'</span>';
        else html+=esc(t);
      }else html+=esc(t);
    }
    hl.innerHTML=html+'\n';
    hl.scrollTop=ed.scrollTop;hl.scrollLeft=ed.scrollLeft;
  };
  var check=function(){
    var t=ed.value,errs=[];
    var dep=0;for(var i=0;i<t.length;i++){var c=t[i];if(c==='{')dep++;else if(c==='}'){dep--;if(dep<0){errs.push('Лишняя закрывающая скобка }');break}}}
    if(dep>0)errs.push('Не хватает закрывающих скобок } ('+dep+')');
    var q=0;for(var j=0;j<t.length;j++){var cc=t[j];if(cc==='"'&&(j===0||t[j-1]!=='\\'))q++}
    if(q%2)errs.push('Незакрытая строка');
    if(errs.length)errEl.textContent=errs.join(' · ');
    else errEl.textContent='';
  };
  var update=function(){highlight();check()};
  var applyingFile=false;
  ed.addEventListener('input',function(){
    update();
    if(!applyingFile){if(ed.value)snapSet('last',ed.value)}
    clearTimeout(saveTimer);saveTimer=setTimeout(function(){s('cs-editor',ed.value)},250);
    showSug();
  });
  ed.addEventListener('scroll',function(){hl.scrollTop=ed.scrollTop;hl.scrollLeft=ed.scrollLeft});
  /* suggestions */
  var DICT=KW.concat(TP,FN);
  var sugIdx=-1,sugFiltered=[],sugCaret=0;
  var wordAt=function(){
    var v=ed.value,p=ed.selectionStart,i=p;
    while(i>0&&/\w/.test(v[i-1]))i--;
    var w=v.slice(i,p).trim();
    return {word:w,start:i};
  };
  var showSug=function(){
    var w=wordAt();
    if(!w.word){sugEl.style.display='none';return}
    sugFiltered=DICT.filter(function(x){return x.toLowerCase().indexOf(w.word.toLowerCase())===0}).slice(0,8);
    if(!sugFiltered.length){sugEl.style.display='none';return}
    sugCaret=w.start;
    sugEl.innerHTML=sugFiltered.map(function(x,i){return '<div class="sug-i'+(i===0?' sel':'')+'" data-i="'+i+'">'+esc(x)+'</div>'}).join('');
    // position near caret
    var ta=ed;var top=8+16*ed.value.slice(0,ed.selectionStart).split('\n').length-16;
    sugEl.style.top=(top+26)+'px';sugEl.style.left='16px';
    sugEl.style.display='block';
    var items=sugEl.querySelectorAll('.sug-i');
    items.forEach(function(el,idx){el.onmousedown=function(e){e.preventDefault();applySug(idx)}});
    sugIdx=0;
  };
  var applySug=function(i){
    var w=wordAt();
    var full=sugFiltered[i];
    ed.setRangeText(full,w.start,ed.selectionStart,'end');
    update();sugEl.style.display='none';
    clearTimeout(saveTimer);saveTimer=setTimeout(function(){s('cs-editor',ed.value)},250);
  };
  ed.addEventListener('keydown',function(e){
    if(sugEl.style.display==='block'){
      if(e.key==='ArrowDown'){e.preventDefault();sugIdx=(sugIdx+1)%sugFiltered.length;mark()}
      else if(e.key==='ArrowUp'){e.preventDefault();sugIdx=(sugIdx-1+sugFiltered.length)%sugFiltered.length;mark()}
      else if(e.key==='Enter'||e.key==='Tab'){e.preventDefault();if(sugIdx>=0)applySug(sugIdx)}
      else if(e.key==='Escape'){sugEl.style.display='none'}
      else return;
    }
  });
  var mark=function(){var it=sugEl.querySelectorAll('.sug-i');it.forEach(function(x,i){x.classList.toggle('sel',i===sugIdx)})};
  ed.addEventListener('click',function(){sugEl.style.display='none'});
  document.getElementById('ed-clr').onclick=function(){
    ed.value='';s('cs-editor','');update();
  };
  addEventListener('beforeunload',function(){s('cs-editor',ed.value)});
  update();
  /* Files panel (offline, manifest embedded in code.html) */
  (function(){
    var panel=document.getElementById('files-panel');
    if(!panel)return;
    var list=document.getElementById('fp-list');
    var head=document.getElementById('fp-head');
    var manifest=null;
    var mEl=document.getElementById('files-manifest');
    var lsManifest=null;try{lsManifest=g('cs-files-manifest')}catch(e){}
    if(lsManifest){try{manifest=JSON.parse(lsManifest)}catch(e){manifest=null}}
    if(!manifest&&mEl){try{manifest=JSON.parse(mEl.textContent)}catch(e){manifest=null}}
    var persistManifest=function(){if(manifest)s('cs-files-manifest',JSON.stringify(manifest))};
    var collapsed=g('cs-fp-collapsed')==='1';
    var setCollapsed=function(v){
      panel.classList.toggle('collapsed',v);
      s('cs-fp-collapsed',v?'1':'0');
      document.getElementById('fp-tog').textContent=v?'▸':'▾';
    };
    head.onclick=function(){setCollapsed(!panel.classList.contains('collapsed'))};
    setCollapsed(collapsed);
    list.innerHTML='';
    var curFile=null; /* имя текущего выбранного файла; null = автосохранение */
    var fileNameEl=document.getElementById('ed-filename');
    var histBtn=document.getElementById('ed-history');
    var histMenu=document.getElementById('ed-hist-menu');
    var updateFileName=function(){
      if(fileNameEl)fileNameEl.textContent=curFile?curFile:'АВТОСОХРАНЕНИЕ';
    };
    var autosaveBackup=function(){
      snapSet('switch',ed.value);
      if(ed.value)snapSet('last',ed.value);
    };
    /* меню версий */
    histBtn.onclick=function(e){
      e.stopPropagation();
      histMenu.classList.toggle('open');
    };
    document.addEventListener('click',function(e){
      if(histMenu.classList.contains('open')&&!histMenu.contains(e.target)&&e.target!==histBtn){
        histMenu.classList.remove('open');
      }
    });
    histMenu.querySelectorAll('.ed-hist-item').forEach(function(item){
      item.onclick=function(){
        var v=item.getAttribute('data-v');
        var snap=snapGet(v);
        if(snap!==null){applyingFile=true;ed.value=snap;ed.dispatchEvent(new Event('input'));applyingFile=false;}
        histMenu.classList.remove('open');
      };
    });
    function renderList(){
      var old=list.querySelectorAll('li[data-file]');
      old.forEach(function(o){o.parentNode.removeChild(o)});
      if(!manifest)return;
      Object.keys(manifest).forEach(function(nm){
        var li=document.createElement('li');
        li.dataset.file=nm;
        if(curFile===nm)li.classList.add('cur');
        var txt=document.createElement('span');
        txt.textContent=nm;
        txt.title='Вставить содержимое '+nm;
        var pen=document.createElement('span');
        pen.className='rename';pen.textContent='✎';
        pen.title='Переименовать';
        var li2=li;
        li.onclick=function(){
          if(curFile===nm)return;
          autosaveBackup();
          applyingFile=true;
          ed.value=manifest[nm];ed.dispatchEvent(new Event('input'));
          applyingFile=false;
          curFile=nm;renderList();updateFileName();
        };
        pen.onclick=function(e){
          e.stopPropagation();
          var inp=document.createElement('input');
          inp.value=nm;
          li2.innerHTML='';
          li2.appendChild(inp);
          inp.focus();
          var commit=function(){
            var nn=inp.value.trim();
            if(nn&&nn!==nm&&!manifest[nn]){manifest[nn]=manifest[nm];delete manifest[nm];if(curFile===nm)curFile=nn;persistManifest();updateFileName()}
            else if(nn&&nn!==nm){inp.value=nm}
            renderList();
          };
          inp.onblur=commit;
          inp.onkeydown=function(ev){if(ev.key==='Enter')commit();else if(ev.key==='Escape')renderList()};
        };
        li.appendChild(txt);
        li.appendChild(pen);
        list.appendChild(li);
      });
    }
    renderList();
    /* сохранение в выбранный файл: только если файл выбран, иначе блокируем */
    document.getElementById('fp-save').onclick=function(){
      if(!manifest){return}
      if(!curFile||!manifest[curFile]){
        var names=Object.keys(manifest);
        if(names.length)curFile=names[0];else return;
      }
      if(ed.value)manifest[curFile]=ed.value;
      persistManifest();
    };
    /* создание нового файла и его выбор */
    document.getElementById('fp-new').onclick=function(){
      if(!manifest)return;
      var base='новый файл';
      var n=base,i=1;
      while(manifest[n]){n='новый файл '+i;i++}
      manifest[n]='';
      persistManifest();
      autosaveBackup();
      curFile=n;
      updateFileName();
      applyingFile=true;
      ed.value='';ed.dispatchEvent(new Event('input'));
      applyingFile=false;
      renderList();
      var newLi=list.querySelector('li[data-file="'+n+'"]');
      if(newLi){var pen=newLi.querySelector('.rename');if(pen)pen.click()}
    };
  })();
}
// Alt editor factory (two independent windows, shared file manifest)
function bootAltEditor(root,prefix){
  var q=function(sel){return root.querySelector(sel)};
  var ed=q('[data-ed]'),hl=q('[data-hl]'),errEl=q('[data-ederr]'),sugEl=q('[data-sug]'),
      clr=q('[data-edclr]'),histBtn=q('[data-histbtn]'),histMenu=q('[data-histmenu]'),
      fileNameEl=q('#'+prefix+'-filename');
  var filesEl=q('[data-files]'),fpHead=q('[data-fphead]'),fpTog=q('[data-fptog]'),
      fpSave=q('[data-fpsave]'),fpNew=q('[data-fpnew]'),fpList=q('[data-fplist]');
  var KW='void|if|else|for|while|do|switch|case|default|return|break|continue|const|static|struct|enum|class|public|private|new|delete|sizeof|true|false|HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP|A0|A1|A2|A3|A4|A5|A6|A7'.split('|');
  var TP='int|float|double|char|byte|boolean|long|short|unsigned|String|bool|uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t|size_t|word'.split('|');
  var FN='pinMode|digitalWrite|digitalRead|analogRead|analogWrite|delay|delayMicroseconds|millis|micros|Serial|begin|print|println|available|read|readString|map|constrain|min|max|abs|pow|sqrt|random|randomSeed|tone|noTone|attachInterrupt|detachInterrupt|setup|loop|Wire|beginTransmission|endTransmission|requestFrom|write|send'.split('|');
  var DICT=KW.concat(TP,FN);
  var esc=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};
  var storeKey=function(k){return 'cs-alt-'+prefix+'-'+k};
  var saveTimer,applyFlag=false;
  var saved=null;try{saved=g(storeKey('editor'))}catch(e){}
  if(saved)ed.value=saved;
  else{var legacy=null;try{legacy=g('cs-editor')}catch(e){};if(legacy)ed.value=legacy}
  var highlight=function(){
    var parts=ed.value.split(/(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|\b\d+\.?\d*\b|\b\w+\b)/g);
    var html='';
    for(var p=0;p<parts.length;p++){
      var t=parts[p];if(!t)continue;
      if(/^\/\//.test(t))html+='<span class="cm">'+esc(t)+'</span>';
      else if(/^["']/.test(t))html+='<span class="str">'+esc(t)+'</span>';
      else if(/^\d/.test(t))html+=esc(t);
      else if(/^\w+$/.test(t)){
        if(KW.indexOf(t)>-1)html+='<span class="kw">'+esc(t)+'</span>';
        else if(TP.indexOf(t)>-1)html+='<span class="tp">'+esc(t)+'</span>';
        else if(FN.indexOf(t)>-1)html+='<span class="fn">'+esc(t)+'</span>';
        else html+=esc(t);
      }else html+=esc(t);
    }
    hl.innerHTML=html+'\n';
    hl.scrollTop=ed.scrollTop;hl.scrollLeft=ed.scrollLeft;
  };
  var check=function(){
    var t=ed.value,errs=[],dep=0;
    for(var i=0;i<t.length;i++){var c=t[i];if(c==='{')dep++;else if(c==='}'){dep--;if(dep<0){errs.push('Лишняя }');break}}}
    if(dep>0)errs.push('Не хватает } ('+dep+')');
    var qq=0;for(var j=0;j<t.length;j++){if(t[j]==='"'&&(j===0||t[j-1]!=='\\'))qq++}
    if(qq%2)errs.push('Незакрытая строка');
    errEl.textContent=errs.join(' · ');
  };
  var update=function(){highlight();check()};
  ed.addEventListener('input',function(){
    update();
    clearTimeout(saveTimer);saveTimer=setTimeout(function(){s(storeKey('editor'),ed.value)},250);
    showSug();
  });
  ed.addEventListener('scroll',function(){hl.scrollTop=ed.scrollTop;hl.scrollLeft=ed.scrollLeft});
  /* suggestions */
  var sugIdx=0,sugFiltered=[];
  var wordAt=function(){var v=ed.value,p=ed.selectionStart,i=p;while(i>0&&/\w/.test(v[i-1]))i--;return {word:v.slice(i,p),start:i}};
  var showSug=function(){
    var w=wordAt();
    if(!w.word){sugEl.style.display='none';return}
    sugFiltered=DICT.filter(function(x){return x.toLowerCase().indexOf(w.word.toLowerCase())===0}).slice(0,8);
    if(!sugFiltered.length){sugEl.style.display='none';return}
    sugEl.innerHTML=sugFiltered.map(function(x,i){return '<div class="sug-i'+(i?'':' sel')+'">'+esc(x)+'</div>'}).join('');
    var top=16+16*ed.value.slice(0,ed.selectionStart).split('\n').length;
    sugEl.style.top=top+'px';sugEl.style.left='16px';sugEl.style.display='block';
    sugIdx=0;
    Array.prototype.forEach.call(sugEl.children,function(el,idx){el.onmousedown=function(e){e.preventDefault();applySug(idx)}});
  };
  var mark=function(){Array.prototype.forEach.call(sugEl.children,function(x,i){x.classList.toggle('sel',i===sugIdx)})};
  var applySug=function(i){
    var w=wordAt();ed.setRangeText(sugFiltered[i],w.start,ed.selectionStart,'end');
    update();sugEl.style.display='none';
    clearTimeout(saveTimer);saveTimer=setTimeout(function(){s(storeKey('editor'),ed.value)},250);
  };
  ed.addEventListener('keydown',function(e){
    if(sugEl.style.display==='block'){
      if(e.key==='ArrowDown'){e.preventDefault();sugIdx=(sugIdx+1)%sugFiltered.length;mark()}
      else if(e.key==='ArrowUp'){e.preventDefault();sugIdx=(sugIdx-1+sugFiltered.length)%sugFiltered.length;mark()}
      else if(e.key==='Enter'||e.key==='Tab'){e.preventDefault();applySug(sugIdx)}
      else if(e.key==='Escape'){sugEl.style.display='none'}
      else return;
    }
  });
  ed.addEventListener('click',function(){sugEl.style.display='none'});
  /* versions */
  var snapGet=function(k){var v=null;try{v=g('cs-alt-'+prefix+'-snap-'+k)}catch(e){}return v};
  var snapSet=function(k,v){s('cs-alt-'+prefix+'-snap-'+k,v)};
  if(!snapGet('last')&&ed.value)snapSet('last',ed.value);
  snapSet('load',ed.value);
  histBtn.onclick=function(e){e.stopPropagation();histMenu.classList.toggle('open')};
  document.addEventListener('click',function(e){if(histMenu.classList.contains('open')&&!histMenu.contains(e.target)&&e.target!==histBtn)histMenu.classList.remove('open')});
  Array.prototype.forEach.call(histMenu.querySelectorAll('.ed-hist-item'),function(item){
    item.onclick=function(){var v=item.getAttribute('data-v');var snap=snapGet(v);if(snap!==null){applyFlag=true;ed.value=snap;ed.dispatchEvent(new Event('input'));applyFlag=false}histMenu.classList.remove('open')};
  });
  clr.onclick=function(){ed.value='';s(storeKey('editor'),'');update()};
  /* files panel (shared manifest) */
  var manifest=null;
  var mEl=document.getElementById('files-manifest');
  var lsManifest=null;try{lsManifest=g('cs-files-manifest')}catch(e){}
  if(lsManifest){try{manifest=JSON.parse(lsManifest)}catch(e){manifest=null}}
  if(!manifest&&mEl){try{manifest=JSON.parse(mEl.textContent)}catch(e){manifest=null}}
  var persistManifest=function(){if(manifest)s('cs-files-manifest',JSON.stringify(manifest))};
  var curFile=null;
  var updateFileName=function(){fileNameEl.textContent=curFile?curFile:'АВТОСОХРАНЕНИЕ'};
  var collapsed=g(storeKey('collapsed'))==='1';
  var setCollapsed=function(v){filesEl.classList.toggle('collapsed',v);s(storeKey('collapsed'),v?'1':'0');fpTog.textContent=v?'▸':'▾'};
  fpHead.onclick=function(){setCollapsed(!filesEl.classList.contains('collapsed'))};
  setCollapsed(collapsed);
  var autosaveBackup=function(){snapSet('switch',ed.value)};
  function renderList(){
    var old=fpList.querySelectorAll('li[data-file]');
    old.forEach(function(o){o.parentNode.removeChild(o)});
    if(!manifest)return;
    Object.keys(manifest).forEach(function(nm){
      var li=document.createElement('li');li.dataset.file=nm;if(curFile===nm)li.classList.add('cur');
      var txt=document.createElement('span');txt.textContent=nm;txt.title='Вставить содержимое '+nm;
      var pen=document.createElement('span');pen.className='rename';pen.textContent='✎';pen.title='Переименовать';
      var li2=li;
      li.onclick=function(){
        if(curFile===nm)return;
        autosaveBackup();
        applyFlag=true;ed.value=manifest[nm];ed.dispatchEvent(new Event('input'));applyFlag=false;
        curFile=nm;renderList();updateFileName();
      };
      pen.onclick=function(e){
        e.stopPropagation();
        var inp=document.createElement('input');inp.value=nm;li2.innerHTML='';li2.appendChild(inp);inp.focus();
        var commit=function(){
          var nn=inp.value.trim();
          if(nn&&nn!==nm&&!manifest[nn]){manifest[nn]=manifest[nm];delete manifest[nm];if(curFile===nm)curFile=nn;persistManifest();updateFileName()}
          else if(nn&&nn!==nm){inp.value=nm}
          renderList();
        };
        inp.onblur=commit;inp.onkeydown=function(ev){if(ev.key==='Enter')commit();else if(ev.key==='Escape')renderList()};
      };
      li.appendChild(txt);li.appendChild(pen);fpList.appendChild(li);
    });
  }
  renderList();
  fpSave.onclick=function(){
    if(!manifest)return;
    if(!curFile||!manifest[curFile]){var names=Object.keys(manifest);if(names.length)curFile=names[0];else return}
    if(ed.value)manifest[curFile]=ed.value;
    persistManifest();
  };
  fpNew.onclick=function(){
    if(!manifest)return;
    var base='новый файл',n=base,i=1;
    while(manifest[n]){n='новый файл '+i;i++}
    manifest[n]='';persistManifest();
    autosaveBackup();curFile=n;updateFileName();
    applyFlag=true;ed.value='';ed.dispatchEvent(new Event('input'));applyFlag=false;
    renderList();
    var newLi=fpList.querySelector('li[data-file="'+n+'"]');
    if(newLi){var pen=newLi.querySelector('.rename');if(pen)pen.click()}
  };
  addEventListener('beforeunload',function(){s(storeKey('editor'),ed.value)});
  update();
}
var altRoots=document.querySelectorAll('#d .editor');
Array.prototype.forEach.call(altRoots,function(r,i){bootAltEditor(r,i===0?'l':'r')});
// checklist
var cbs=[].slice.call(document.querySelectorAll('.step input'));
if(cbs.length){
  var sv=[];try{sv=JSON.parse(g('cs-checks')||'[]')}catch(e){}
  var pb=document.getElementById('pb'),pt=document.getElementById('pt');
  var upd=function(){
    var n=0;cbs.forEach(function(c){if(c.checked)n++;
      c.closest('.step').classList.toggle('done',[].every.call(c.closest('.step').querySelectorAll('input'),function(x){return x.checked}))});
    pb.style.width=(n/cbs.length*100)+'%';pt.textContent='Выполнено '+n+' из '+cbs.length;
    s('cs-checks',JSON.stringify(cbs.map(function(c){return c.checked})));
  };
  cbs.forEach(function(c,i){c.checked=!!sv[i];c.onchange=upd});
  setTimeout(upd,300);
}
// measurements
var tb=document.querySelector('#mt tbody');
if(tb){
  for(var i=1;i<=10;i++)tb.insertAdjacentHTML('beforeend','<tr><td>'+i+'</td><td><input></td><td><input inputmode="decimal" class="v t"></td><td><input inputmode="decimal" class="v p"></td><td><input></td></tr>');
  var st=document.getElementById('st'),prev='';
  var stat=function(c){var a=[].map.call(document.querySelectorAll('.v.'+c),function(x){return parseFloat(x.value.replace(',','.'))}).filter(function(x){return !isNaN(x)});
    return a.length?{min:Math.min.apply(0,a),max:Math.max.apply(0,a),avg:a.reduce(function(x,y){return x+y},0)/a.length}:null};
  var calc=function(){var h='';[['t','Темп., °C'],['p','Давл., hPa']].forEach(function(k){var v=stat(k[0]);
    h+=['мин','макс','среднее'].map(function(n,j){var key=['min','max','avg'][j];return '<div class="stat"><span>'+k[1]+' · '+n+'</span><b>'+(v?v[key].toFixed(2):'—')+'</b></div>'}).join('')});
    if(h!==prev){st.innerHTML=h;st.querySelectorAll('b').forEach(function(b){if(b.textContent!=='—')b.classList.add('bump')});prev=h}};
  tb.addEventListener('input',calc);calc();
}
})();
