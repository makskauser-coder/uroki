/* Общий модуль уроков.
   Делает три вещи:
   1) считает ПЕРВУЮ попытку по каждому заданию — подбор ответов больше не проходит
      незаметно: даже если потом ответить верно, первая ошибка останется в итоге;
   2) после неверного ответа запирает варианты, пока не нажата кнопка «понятно» —
      чтобы нельзя было просто перещёлкать все кнопки подряд;
   3) рисует итоговую карточку и сохраняет прогресс урока для главной страницы. */
(function(){
'use strict';

var KEY='uroki.progress.v1';

/* Родительский код. В странице лежит не сам код, а его отпечаток,
   чтобы ребёнок не нашёл его, заглянув в исходник.
   Сейчас это 3322. Чтобы поставить свой: открыть на сайте консоль браузера,
   выполнить Uroki.hash('новый код') и вписать полученное сюда. */
var CODE='yjcvov';
function hash(str){
  var h=5381; str=String(str);
  for(var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))>>>0; }
  return h.toString(36);
}
var revealed=false;

var TXT={
  ru:{
    title:'Итог урока',
    sub:'Считается только первый ответ на каждое задание. Если сначала ошибка, а потом верно — задание всё равно попадёт в список ошибок.',
    nDone:'Сделано заданий', nFirst:'Верно с первой попытки', nErr:'Ошибок с первой попытки',
    of:' из ',
    listHead:'Где была ошибка с первой попытки',
    first:'первый ответ: ', right:'правильно: ', hinted:'сразу нажата подсказка',
    noErr:'Пока ни одной ошибки с первой попытки. Так держать!',
    allGood:'Весь урок пройден с первой попытки. Можно смело переписывать в тетрадь.',
    mixed:'Урок пройден полностью. Задания из списка выше стоит прорешать ещё раз — именно в них была ошибка с первой попытки.',
    inProgress:'Урок ещё не закончен — впереди ещё задания.',
    again:'Пройти урок заново', read:'Понятно — пробую ещё раз',
    askTitle:'Код для проверки', askNote:'Проверку открывает взрослый. Позови маму или папу — они введут код.',
    askGo:'Проверить', askNo:'Отмена', askBad:'Код не подходит. Попробуйте ещё раз.',
    askHint:'Код для подсказки', askHintNote:'Это домашнее задание — подсказку открывает взрослый.',
    reveal:'Показать правильные ответы', hiddenAns:'правильный ответ откроется по коду',
    kept:'Это ты уже решила раньше — ответ сохранён.',
    prevErr:'В прошлый раз здесь была ошибка. Попробуй ещё раз.', prevAns:'Прошлый ответ: ',
    tagFirst:'с первой попытки', tagLate:'со $-й попытки', tagHint:'с подсказкой'
  },
  be:{
    title:'Вынік урока',
    sub:'Лічыцца толькі першы адказ на кожнае заданне. Калі спачатку памылка, а потым правільна — заданне ўсё роўна трапіць у спіс памылак.',
    nDone:'Зроблена заданняў', nFirst:'Правільна з першага разу', nErr:'Памылак з першага разу',
    of:' з ',
    listHead:'Дзе была памылка з першага разу',
    first:'першы адказ: ', right:'правільна: ', hinted:'адразу націснута падказка',
    noErr:'Пакуль ніводнай памылкі з першага разу. Так трымаць!',
    allGood:'Увесь урок пройдзены з першага разу. Можна смела перапісваць у сшытак.',
    mixed:'Урок пройдзены цалкам. Заданні са спіса вышэй варта прарашаць яшчэ раз — менавіта ў іх была памылка з першага разу.',
    inProgress:'Урок яшчэ не скончаны — наперадзе яшчэ заданні.',
    again:'Прайсці ўрок зноў', read:'Зразумела — спрабую яшчэ раз',
    askTitle:'Код для праверкі', askNote:'Праверку адкрывае дарослы. Паклічы маму ці тату — яны ўвядуць код.',
    askGo:'Праверыць', askNo:'Адмена', askBad:'Код не падыходзіць. Паспрабуйце яшчэ раз.',
    askHint:'Код для падказкі', askHintNote:'Гэта дамашняе заданне — падказку адкрывае дарослы.',
    reveal:'Паказаць правільныя адказы', hiddenAns:'правільны адказ адкрыецца па кодзе',
    kept:'Гэта ты ўжо зрабіла раней — адказ захаваны.',
    prevErr:'Мінулы раз тут была памылка. Паспрабуй яшчэ раз.', prevAns:'Мінулы адказ: ',
    tagFirst:'з першага разу', tagLate:'з $-й спробы', tagHint:'з падказкай'
  }
};

function read(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
function write(o){ try{ localStorage.setItem(KEY, JSON.stringify(o)); }catch(e){} }

var L=TXT.ru, topic=null, items=[], box=null, saved=null, usedSaved=null;

function stats(){
  var s={total:items.length, done:0, first:0, errors:[]};
  items.forEach(function(r){
    if(r.done) s.done++;
    if(r.done && r.firstOk===true) s.first++;
    if(r.firstOk===false) s.errors.push(r);
  });
  return s;
}

function persist(){
  if(!topic) return;
  var s=stats(), all=read();
  all[topic.id]={
    title:topic.title, subject:topic.subject,
    total:s.total, done:s.done, first:s.first, errors:s.errors.length,
    updated:Date.now(),
    items:items.map(function(r){
      return {l:r.label, d:r.done?1:0,
              f:(r.firstOk===null?null:(r.firstOk?1:0)),
              t:r.tries, w:r.wrong, r:r.right, x:r.text};
    })
  };
  write(all);
}

function el(tag, cls, text){
  var e=document.createElement(tag);
  if(cls) e.className=cls;
  if(text!==undefined && text!==null) e.textContent=text;
  return e;
}

function num(value, label, cls){
  var d=el('div','u-num'+(cls?' '+cls:''));
  d.appendChild(el('b', null, String(value)));
  d.appendChild(el('span', null, label));
  return d;
}

function render(){
  if(!box) return;
  var s=stats();
  box.textContent='';
  box.appendChild(el('h3', null, L.title));
  box.appendChild(el('p','u-sub', L.sub));

  var nums=el('div','u-nums');
  nums.appendChild(num(s.done+L.of+s.total, L.nDone));
  nums.appendChild(num(s.first, L.nFirst, 'good'));
  nums.appendChild(num(s.errors.length, L.nErr, s.errors.length? 'bad' : ''));
  box.appendChild(nums);

  if(s.errors.length){
    box.appendChild(el('p','u-sub', L.listHead+':'));
    var ul=el('ul','u-errs');
    s.errors.forEach(function(r){
      var li=el('li');
      li.appendChild(el('span','u-where', r.group||''));
      li.appendChild(document.createTextNode(r.label));
      li.appendChild(document.createElement('br'));
      var was=el('span','u-was', r.wrong? L.first+r.wrong : L.hinted);
      li.appendChild(was);
      if(r.right){
        if(revealed){ li.appendChild(document.createTextNode(' · '+L.right+r.right)); }
        else{ li.appendChild(E_span(' · '+L.hiddenAns)); }
      }
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  var msg;
  if(s.done<s.total) msg=L.inProgress;
  else if(!s.errors.length) msg=L.allGood;
  else msg=L.mixed;
  if(!s.errors.length && s.done<s.total) msg=L.noErr+' '+L.inProgress;
  box.appendChild(el('p','u-done', msg));

  if(s.errors.length && !revealed){
    var rb=el('button','u-again', L.reveal); rb.type='button';
    rb.style.marginRight='8px';
    rb.addEventListener('click', function(){ ask(L.askTitle, L.askNote, function(){ revealed=true; render(); }); });
    box.appendChild(rb);
  }

  var again=el('button','u-again', L.again);
  again.type='button';
  again.addEventListener('click', function(){
    var all=read(); if(topic) delete all[topic.id]; write(all);
    location.reload();
  });
  box.appendChild(again);
}

function E_span(txt){ var e=el('span','u-hidden-ans'); e.textContent=txt; return e; }

/* Окно ввода родительского кода. Без кода проверка не запускается. */
function ask(title, note, cb){
  if(!CODE){ cb(); return; }
  var ov=el('div','u-ask');
  var box2=el('div','u-ask-box');
  box2.appendChild(el('h4',null,title||L.askTitle));
  box2.appendChild(el('p',null,note||L.askNote));
  var inp=document.createElement('input');
  inp.type='text'; inp.inputMode='numeric'; inp.autocomplete='off'; inp.maxLength=12;
  inp.setAttribute('aria-label', title||L.askTitle);
  box2.appendChild(inp);
  var err=el('p','u-ask-err','');
  box2.appendChild(err);
  var row=el('div','u-ask-btns');
  var go=el('button','u-ask-go', L.askGo); go.type='button';
  var no=el('button','u-ask-no', L.askNo); no.type='button';
  row.appendChild(go); row.appendChild(no);
  box2.appendChild(row);
  ov.appendChild(box2);
  document.body.appendChild(ov);
  function close(){ if(ov.parentNode) ov.parentNode.removeChild(ov); document.removeEventListener('keydown', esc); }
  function esc(e){ if(e.key==='Escape') close(); }
  document.addEventListener('keydown', esc);
  function submit(){
    if(hash(inp.value.trim())===CODE){ close(); cb(); }
    else { inp.classList.add('bad'); err.textContent=L.askBad; inp.value=''; inp.focus(); }
  }
  go.addEventListener('click', submit);
  no.addEventListener('click', close);
  inp.addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); submit(); } });
  inp.addEventListener('input', function(){ inp.classList.remove('bad'); err.textContent=''; });
  ov.addEventListener('click', function(e){ if(e.target===ov) close(); });
  setTimeout(function(){ try{ inp.focus(); }catch(e){} }, 30);
}

var Uroki={
  /* страница вызывает это первым: {id, title, subject, lang} */
  init:function(o){
    topic=o; items=[];
    L=TXT[o.lang==='be'?'be':'ru'];
    var e=read()[o.id];
    saved=(e && e.items instanceof Array)? e.items : null;
    usedSaved={};
    return this;
  },

  /* регистрируем одно задание. badgeHost — куда повесить отметку «с первой попытки» */
  item:function(label, group, badgeHost){
    var rec={label:label||'', group:group||'', done:false, firstOk:null, tries:0, wrong:null, right:null, text:null};
    /* Ищем сохранённое задание по подписи, а не по номеру: тогда новое
       упражнение, вставленное в середину урока, не сбрасывает пройденное. */
    var old=null;
    if(saved){
      var i=items.length;
      if(saved[i] && saved[i].l===rec.label && !usedSaved[i]){ old=saved[i]; usedSaved[i]=1; }
      else {
        for(var k=0;k<saved.length;k++){
          if(!usedSaved[k] && saved[k] && saved[k].l===rec.label){ old=saved[k]; usedSaved[k]=1; break; }
        }
      }
    }
    if(old){
      rec.done=!!old.d;
      rec.firstOk=(old.f===null||old.f===undefined)? null : !!old.f;
      rec.tries=old.t||0; rec.wrong=old.w||null; rec.right=old.r||null; rec.text=old.x||null;
    }
    items.push(rec);
    var badge=null;
    function mark(){
      if(!badgeHost) return;
      if(!badge){ badge=el('span','u-tag'); badgeHost.appendChild(badge); }
      if(rec.firstOk===true){ badge.className='u-tag first'; badge.textContent=L.tagFirst; }
      else { badge.className='u-tag late'; badge.textContent=rec.tries>1? L.tagLate.replace('$', String(rec.tries)) : L.tagHint; }
    }
    return {
      rec:rec,
      /* это задание уже было решено в прошлый раз */
      restored: rec.done,
      /* решено не было, но ошибка с первой попытки уже записана */
      hadError: (!rec.done && rec.firstOk===false),
      savedText: rec.text,
      /* нарисовать отметку «с первой попытки» без новой попытки */
      badge: mark,
      /* неверный ответ; detail — что именно ответили */
      wrong:function(detail){
        rec.tries++;
        if(rec.firstOk===null){ rec.firstOk=false; rec.wrong=(detail===undefined||detail===null||detail==='')?null:String(detail); }
        persist(); render();
      },
      /* подсказку попросили до правильного ответа — это тоже не «с первой попытки» */
      hint:function(){
        if(rec.done) return;
        if(rec.firstOk===null){ rec.firstOk=false; rec.wrong=null; }
        persist(); render();
      },
      /* верный ответ; right — правильный ответ для итоговой карточки */
      ok:function(right, text){
        rec.tries++;
        if(rec.firstOk===null) rec.firstOk=true;
        if(right!==undefined && right!==null) rec.right=String(right);
        if(text!==undefined && text!==null) rec.text=String(text);
        if(!rec.done){ rec.done=true; }
        mark(); persist(); render();
      },
      /* запомнить текст свободного ответа, не меняя попытки */
      keep:function(text){ rec.text=(text===undefined||text===null)?null:String(text); persist(); }
    };
  },

  /* запереть варианты после ошибки: пока не нажата кнопка, перещёлкивать нельзя */
  gate:function(els, host){
    if(!host || host.querySelector('.u-gate')) return;
    var first=null;
    els.forEach(function(e){
      e.classList.add('u-locked');
      if('disabled' in e){ e.disabled=true; }
      if(e.blur) e.blur();
      if(!first) first=e;
    });
    var b=el('button','u-gate','💡 '+L.read);
    b.type='button';
    b.addEventListener('click', function(){
      els.forEach(function(e){ e.classList.remove('u-locked'); if('disabled' in e){ e.disabled=false; } });
      if(b.parentNode) b.parentNode.removeChild(b);
      if(first && first.focus){ try{ first.focus(); }catch(err){} }
    });
    host.appendChild(b);
  },

  /* страница вызывает это последним — рисует итоговую карточку */
  mount:function(host){
    if(!host) return;
    box=el('section','u-result');
    host.appendChild(box);
    render(); persist();
  },

  /* спросить код и только потом выполнить действие */
  guard:function(cb, title, note){ ask(title, note, cb); },
  ask:ask,
  hash:hash,
  /* true, если взрослый уже открыл правильные ответы на этой странице */
  revealed:function(){ return revealed; },

  progress:read,
  clearAll:function(){ write({}); }
};

window.Uroki=Uroki;
})();
