/* Движок уроков: карточки заданий, виджеты с проверкой, чистовик, голос.
   Каждое задание само отмечается в Uroki — поэтому в итоге урока видно,
   что было решено с первой попытки, а что подбором. */
(function(){
'use strict';

var T={
  ru:{check:'🔒 Проверить', help:'Подумать вместе', solved:'Решено заданий', of:' из ',
      lockNote:'Проверку открывает взрослый по коду. Подсказки бери сама — они не говорят ответ.',
      lockNoteHome:'Домашнее задание: и проверку, и подсказки открывает взрослый по коду.',
      pickFirst:'Сначала выбери вариант, потом нажми «Проверить».',
      waysHead:'Вот три рассуждения. Какое из них верное?',
      wayOk:'Да, это верный ход мысли. ', wayNo:'Нет, так не получится. ',
      checkTitle:'Код для проверки', checkNote:'Проверку открывает взрослый. Позови маму или папу — они введут код.',
      checkNoteHome:'Домашнее задание. Проверку открывает взрослый.',
      helpTitle:'Код для подсказки', helpNote:'Это домашнее задание — подсказку открывает взрослый.',
      thinkAgain:'Перечитай задание и попробуй рассуждать вслух: что известно и что надо найти?',
      hintOne:'\uD83D\uDCA1 Подсказка',
      empty:'Сначала впиши ответ.', emptyAll:'Заполни все окошки.', allWords:'Используй все слова.',
      touchMark:'Это задание ещё не начато: сначала отметь слова в предложении.',
      touchPick:'Это задание ещё не начато: сначала выбери нужные слова.',
      okWord:'Верно! ', notYet:'Пока не сходится. ', notThat:'Не то. ',
      lock:'🔒 Выполни это задание — и тут появится, что переписать в тетрадь.',
      listen:'🔊 Слушать задание', stop:'⏹ Остановить',
      playAll:'▶︎ Слушать урок', pause:'⏸ Пауза', prev:'◀ Назад', next:'Дальше ▶',
      part:'Часть ', noPart:'Часть не выбрана.', endLesson:'Урок закончен. Переходи к заданиям!',
      kept:'Это ты уже сделала раньше — ответ сохранён.',
      prevErr:'В прошлый раз здесь была ошибка. Попробуй ещё раз.', prevAns:'Прошлый ответ: ',
      answer:'Ответ: ',
      defChoice:'Прочитай все варианты вслух и отбрось те, что явно не подходят. Из оставшихся выбери тот, который отвечает именно на вопрос задания, и проверь себя: подставь его обратно в предложение.',
      defPicks:'Прочитай предложение целиком с каждым вариантом по очереди — вслух. Оставь тот, с которым фраза звучит правильно и подходит по смыслу. Если выбираешь букву, подбери проверочное или родственное слово.',
      defMark:'Сначала найди главные члены. Спроси: о ком или о чём говорится в предложении? — это подлежащее. Что о нём говорится, что оно делает? — это сказуемое. Потом от главных слов задавай вопросы к остальным: какой? чей? — определение; кого? чем? о чём? — дополнение; где? когда? как? — обстоятельство.',
      defPick:'Задай вопрос от главного слова и смотри, какие слова на него отвечают. Отмечай только те, что подходят по вопросу, а не те, что просто стоят рядом.',
      defOrder:'Если собираешь предложение из слов — начни с главных членов: о ком или о чём говорится и что он делает. Потом подставляй остальные слова, задавая вопросы от тех слов, к которым они относятся, и сверяйся со схемой. Если расставляешь готовые предложения по порядку — первым ставь то, которое понятно само по себе, а дальше то, которое продолжает мысль предыдущего (по словам «он», «её», «там», «потом»).',
      defMorph:'Разбирай по порядку. Сначала измени слово (один — много, нет кого, доволен чем) — та часть на конце, которая меняется, и есть окончание. Потом подбери родственные слова: их общая часть — корень. Всё, что стоит перед корнем, — приставка, а то, что между корнем и окончанием, — суффикс.'},
  be:{check:'🔒 Праверыць', help:'Падумаць разам', solved:'Выканана', of:' з ',
      lockNote:'Праверку адкрывае дарослы па кодзе. Падказкі бяры сама — яны не кажуць адказ.',
      lockNoteHome:'Дамашняе заданне: і праверку, і падказкі адкрывае дарослы па кодзе.',
      pickFirst:'Спачатку выберы варыянт, потым націсні «Праверыць».',
      waysHead:'Вось тры разважанні. Якое з іх правільнае?',
      wayOk:'Так, гэта правільны ход думкі. ', wayNo:'Не, так не атрымаецца. ',
      checkTitle:'Код для праверкі', checkNote:'Праверку адкрывае дарослы. Паклічы маму ці тату — яны ўвядуць код.',
      checkNoteHome:'Дамашняе заданне. Праверку адкрывае дарослы.',
      helpTitle:'Код для падказкі', helpNote:'Гэта дамашняе заданне — падказку адкрывае дарослы.',
      thinkAgain:'Перачытай заданне і паспрабуй разважаць уголас: што вядома і што трэба знайсці?',
      hintOne:'\uD83D\uDCA1 Падказка',
      empty:'Спачатку ўпішы адказ.', emptyAll:'Запоўні ўсе ваконцы.', allWords:'Выкарыстай усе словы.',
      touchMark:'Гэта заданне яшчэ не пачата: спачатку размець словы ў сказе.',
      touchPick:'Гэта заданне яшчэ не пачата: спачатку выберы патрэбныя словы.',
      okWord:'Правільна! ', notYet:'Пакуль не сыходзіцца. ', notThat:'Не тое. ',
      lock:'🔒 Выканай гэта заданне — і тут з’явіцца, што перапісаць у сшытак.',
      listen:'🔊 Паслухаць заданне', stop:'⏹ Спыніць',
      playAll:'▶︎ Слухаць урок', pause:'⏸ Паўза', prev:'◀ Назад', next:'Далей ▶',
      part:'Частка ', noPart:'Частка не выбрана.', endLesson:'Урок скончаны. Пераходзь да заданняў!',
      kept:'Гэта ты ўжо зрабіла раней — адказ захаваны.',
      prevErr:'Мінулы раз тут была памылка. Паспрабуй яшчэ раз.', prevAns:'Мінулы адказ: ',
      answer:'Адказ: ',
      defChoice:'Прачытай усе варыянты ўголас і адкінь тыя, што відавочна не падыходзяць. З тых, што засталіся, выберы той, які адказвае менавіта на пытанне задання.',
      defPicks:'Прачытай сказ цалкам з кожным варыянтам па чарзе — уголас. Пакінь той, з якім фраза гучыць правільна і падыходзіць па сэнсе.',
      defMark:'Спачатку знайдзі галоўныя члены. Спытай: пра каго ці пра што гаворыцца ў сказе? — гэта дзейнік. Што пра яго гаворыцца, што ён робіць? — гэта выказнік. Потым ад галоўных слоў задавай пытанні да астатніх: які? чый? — азначэнне; каго? чым? пра што? — дапаўненне; дзе? калі? як? — акалічнасць.',
      defPick:'Задай пытанне ад галоўнага слова і глядзі, якія словы на яго адказваюць. Адзначай толькі тыя, што падыходзяць па пытанні, а не тыя, што проста стаяць побач.',
      defOrder:'Калі складаеш сказ са слоў — пачынай з галоўных членаў: пра каго ці пра што гаворыцца і што ён робіць. Далей дастаўляй словы, задаючы пытанні ад тых слоў, да якіх яны адносяцца, і звярайся са схемай. Калі ставіш гатовыя сказы па парадку — першым стаў той, які зразумелы сам па сабе, а далей той, што працягвае думку папярэдняга (па словах «ён», «яе», «там», «потым»).',
      defMorph:'Разбірай па парадку. Спачатку змяні слова — тое, што мяняецца на канцы, і ёсць канчатак. Потым падбяры роднасныя словы: іх агульная частка — корань. Усё перад коранем — прыстаўка, а паміж коранем і канчаткам — суфікс.'}
};

var L=T.ru, cfg=null, exHost=null, cleanHost=null, progEl=null;
var total=0, solved=0, cleanBlocks={}, exList=[];

function E(tag,cls,txt){ var e=document.createElement(tag); if(cls)e.className=cls; if(txt!==undefined&&txt!==null)e.textContent=txt; return e; }
function plain(h){ var d=document.createElement('div'); d.innerHTML=h||''; return (d.textContent||'').replace(/\s+/g,' ').trim(); }
function norm(s){
  return String(s===undefined||s===null?'':s).toLowerCase()
    .replace(/ё/g,'е').replace(/[’'`]/g,'')
    .replace(/[^0-9a-zа-яіўґє\- ]/gi,' ')
    .replace(/\s+/g,' ').trim();
}
function bump(){ if(progEl) progEl.textContent=solved+L.of+total; }
function fbEl(parent){ var f=E('div','fb'); f.hidden=true; parent.appendChild(f); return f; }
function say(f,html,kind){ f.innerHTML=html; f.className='fb '+kind; f.hidden=false; }

/* ---- общая оболочка одного задания внутри упражнения ---- */
function mkItem(ex, label){
  var wrap=E('div','item');
  var st={done:false, wrap:wrap, home:!!ex.home};
  total++;
  st.trk=window.Uroki ? window.Uroki.item(label, ex.title, wrap) : {wrong:function(){},ok:function(){},hint:function(){}};
  ex.items.push(st);
  ex.card.appendChild(wrap);
  return st;
}
function win(ex, st, f, msg, right, text){
  if(!st.done){ st.done=true; solved++; bump(); }
  st.trk.ok(right, text);
  say(f, L.okWord+(msg||''), 'ok');
  finish(ex);
}
/* Задание было решено в прошлый раз: ставим готовый вид, но попытку не добавляем. */
function revive(st, f, msg){
  if(st.done) return;
  st.done=true; solved++; bump();
  st.trk.badge();
  if(f) say(f, L.kept+' '+(msg||''), 'ok');
}
/* Подсказки идут ступенями и ни на одной не называют ответ:
   1) вопрос-направление, 2) разбор другого примера, 3) выбор верного рассуждения. */
function rungs(d, def){
  var r=[], h=d.help;
  if(h){
    if(h.ask) r.push({t:'ask', v:h.ask});
    if(h.sample) r.push({t:'sample', v:h.sample});
    if(h.ways && h.ways.length) r.push({t:'ways'});
  } else {
    (d.steps||[]).forEach(function(x){ r.push({t:'ask', v:x}); });
  }
  if(!r.length && def) r.push({t:'ask', v:def});
  return r;
}
function waysBox(st, d){
  if(st.wrap.querySelector('.ways')) return;
  var box=E('div','ways');
  box.appendChild(E('p','wh', L.waysHead));
  d.help.ways.forEach(function(w){
    var b=E('button','wayb'); b.type='button'; b.innerHTML=w.s;
    var why=E('div','way-why'); why.hidden=true; why.innerHTML=(w.ok? L.wayOk : L.wayNo)+(w.why||'');
    b.addEventListener('click', function(){ b.className='wayb '+(w.ok?'ok':'bad'); why.hidden=false; });
    box.appendChild(b); box.appendChild(why);
  });
  st.wrap.appendChild(box);
}
function helpStep(st, f, d, pre, def){
  pre=pre||'';
  if(!st._rungs) st._rungs=rungs(d, def);
  var r=st._rungs, i=st.hi||0;
  if(!r.length){ say(f, pre+L.thinkAgain, pre? 'bad':'tip'); return; }
  var cur=r[Math.min(i, r.length-1)];
  st.hi=i+1;
  if(cur.t==='ways'){ say(f, pre+L.waysHead, pre? 'bad':'tip'); waysBox(st, d); return; }
  say(f, pre+(cur.t==='sample'? '\uD83D\uDCD8 ' : '\uD83D\uDCA1 ')+cur.v, pre? 'bad':'tip');
}

/* Задание было начато и завалено: напоминаем, но не решаем за ребёнка. */
function remind(st, f){
  if(!st.trk.hadError || !f) return;
  say(f, L.prevErr+(st.trk.rec.wrong? ' '+L.prevAns+st.trk.rec.wrong : ''), 'tip');
}
function finish(ex){
  if(!ex.items.length) return;
  if(ex.items.every(function(s){return s.done;})){
    var b=cleanBlocks[ex.id];
    if(b&&!b.opened){ b.opened=true; b.el.classList.add('open'); b.lock.hidden=true; b.content.hidden=false; }
  }
}

var Lesson={

start:function(o){
  cfg=o; L=T[o.lang==='be'?'be':'ru'];
  exHost=document.getElementById('ex');
  cleanHost=document.getElementById('clean');
  progEl=document.getElementById('progress-n');
  if(window.Uroki) window.Uroki.init({id:o.id,title:o.title,subject:o.subject,lang:o.lang});
  bump();
  return Lesson;
},

/* карточка упражнения */
ex:function(id,title,sub,audio,opts){
  opts=opts||{};
  var c=E('section','card');
  c.appendChild(E('h3',null,title));
  if(sub){ var p=E('p'); p.innerHTML=sub; c.appendChild(p); }
  if(audio){
    var b=E('button','b ghost saybtn',L.listen); b.type='button';
    b.setAttribute('data-say',audio); c.appendChild(b);
  }
  exHost.appendChild(c);
  var ex={id:id,title:title,card:c,items:[],home:!!opts.home};
  exList.push(ex);
  return ex;
},
note:function(ex,html){ var p=E('p','q'); p.innerHTML=html; ex.card.appendChild(p); return p; },
hr:function(ex){ var h=E('div'); h.style.cssText='border-top:1px solid var(--line);margin:12px 0 2px'; ex.card.appendChild(h); },

btns:function(ex){
  /* у каждого задания своя кнопка подсказки: нажатие помечает только его,
     а не все задания карточки сразу */
  ex.items.forEach(function(st){
    if(!st.explain || !st.wrap || st.wrap.querySelector('.hintb')) return;
    var hb=E('button','hintb', L.hintOne); hb.type='button';
    hb.addEventListener('click', function(){
      if(st.done) return;
      if(ex.home && window.Uroki) window.Uroki.guard(function(){ st.explain(); }, L.helpTitle, L.helpNote);
      else st.explain();
    });
    st.wrap.appendChild(hb);
  });
  var box=E('div','btns');
  var b1=E('button','b',L.check); b1.type='button';
  var b2=E('button','b ghost',L.help); b2.type='button';
  function runCheck(){ ex.items.forEach(function(s){ if(s.check) s.check(); }); finish(ex); }
  function runHelp(){
    for(var i=0;i<ex.items.length;i++){
      if(!ex.items[i].done && ex.items[i].explain){ ex.items[i].explain(); return; }
    }
  }
  b1.addEventListener('click',function(){
    if(window.Uroki) window.Uroki.guard(runCheck, L.checkTitle, ex.home? L.checkNoteHome : L.checkNote);
    else runCheck();
  });
  b2.addEventListener('click',function(){
    if(ex.home && window.Uroki) window.Uroki.guard(runHelp, L.helpTitle, L.helpNote);
    else runHelp();
  });
  box.appendChild(b1); box.appendChild(b2); ex.card.appendChild(box);
  var note=E('p','lockhint', ex.home? L.lockNoteHome : L.lockNote);
  ex.card.appendChild(note);
},

/* ---------- числовой ответ ---------- */
num:function(ex,d){
  var st=mkItem(ex, plain(d.q));
  var row=E('div','row');
  var qt=E('span','qt'); qt.innerHTML=d.q; row.appendChild(qt);
  var inp=E('input','ansbox'); inp.type='text'; inp.inputMode='numeric'; inp.autocomplete='off'; inp.placeholder='?';
  inp.setAttribute('aria-label',plain(d.q)); row.appendChild(inp);
  if(d.unit) row.appendChild(E('span','unit',d.unit));
  st.wrap.appendChild(row);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    var raw=inp.value.trim().replace(',','.');
    if(raw===''){ say(f,L.empty,'tip'); return false; }
    var v=Number(raw);
    if(v===d.a){ inp.classList.add('ok'); inp.classList.remove('bad'); win(ex,st,f,d.why||'',d.a); return true; }
    inp.classList.add('bad');
    st.trk.wrong(raw);
    if(st.home){ say(f,L.notYet,'bad'); }
    else if(d.near&&d.near[v]!==undefined){ say(f,d.near[v],'bad'); }
    else { helpStep(st,f,d,L.notYet); }
    window.Uroki && window.Uroki.gate([inp], st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d); };
  inp.addEventListener('keydown',function(e){
    if(e.key!=='Enter') return;
    e.preventDefault();
    var all=[].slice.call(ex.card.querySelectorAll('input.ansbox')).filter(function(x){ return !x.readOnly; });
    var k=all.indexOf(inp);
    if(k>=0 && all[k+1]) all[k+1].focus(); else inp.blur();
  });
  inp.addEventListener('input',function(){ inp.classList.remove('bad'); });
  if(st.trk.restored){ inp.value=String(d.a); inp.classList.add('ok'); inp.readOnly=true; revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- текстовый ответ (одно слово/фраза) ---------- */
text:function(ex,d){
  var st=mkItem(ex, plain(d.q));
  var row=E('div','row');
  var qt=E('span','qt'); qt.innerHTML=d.q; row.appendChild(qt);
  var inp=E('input','ansbox '+(d.size||'wide')); inp.type='text'; inp.autocomplete='off'; inp.spellcheck=false;
  inp.placeholder=d.ph||'…'; inp.setAttribute('aria-label',plain(d.q)); row.appendChild(inp);
  st.wrap.appendChild(row);
  var f=fbEl(st.wrap);
  var variants=(d.a instanceof Array? d.a : [d.a]).map(norm);
  st.check=function(){
    if(st.done) return true;
    var raw=inp.value.trim();
    if(raw===''){ say(f,L.empty,'tip'); return false; }
    if(variants.indexOf(norm(raw))>=0){ inp.classList.add('ok'); inp.classList.remove('bad'); win(ex,st,f,d.why||'',(d.a instanceof Array? d.a[0]:d.a)); return true; }
    inp.classList.add('bad');
    st.trk.wrong(raw);
    if(st.home) say(f,L.notYet,'bad'); else helpStep(st,f,d,L.notYet);
    window.Uroki && window.Uroki.gate([inp], st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d); };
  inp.addEventListener('keydown',function(e){
    if(e.key!=='Enter') return;
    e.preventDefault();
    var all=[].slice.call(ex.card.querySelectorAll('input.ansbox')).filter(function(x){ return !x.readOnly; });
    var k=all.indexOf(inp);
    if(k>=0 && all[k+1]) all[k+1].focus(); else inp.blur();
  });
  inp.addEventListener('input',function(){ inp.classList.remove('bad'); });
  if(st.trk.restored){ inp.value=(d.a instanceof Array? d.a[0] : String(d.a)); inp.classList.add('ok'); inp.readOnly=true; revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- выбор одного варианта ---------- */
choice:function(ex,d){
  var st=mkItem(ex, plain(d.q));
  var qp=E('p'); qp.innerHTML=d.q; qp.style.margin='0 0 2px'; st.wrap.appendChild(qp);
  var opts=E('div','opts');
  var btns=[];
  var f, picked=-1;
  d.opts.forEach(function(o,oi){
    var b=E('button','opt',o); b.type='button'; btns.push(b);
    b.addEventListener('click',function(){
      if(st.done) return;
      picked=oi;
      btns.forEach(function(x){ x.classList.remove('sel','bad'); });
      b.classList.add('sel');
      if(f){ f.hidden=true; }
    });
    opts.appendChild(b);
  });
  st.wrap.appendChild(opts);
  f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    if(picked<0){ say(f,L.pickFirst,'tip'); return false; }
    if(picked===d.a){
      btns[picked].classList.remove('sel'); btns[picked].classList.add('ok');
      btns.forEach(function(x){ x.disabled=true; });
      win(ex,st,f,d.why||'',d.opts[d.a]);
      return true;
    }
    btns[picked].classList.remove('sel'); btns[picked].classList.add('bad');
    st.trk.wrong(d.opts[picked]);
    say(f, st.home? L.notThat : ((d.no&&d.no[picked])? d.no[picked] : L.notThat+(d.hint||'')),'bad');
    window.Uroki && window.Uroki.gate(btns, st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',L.defChoice); };
  if(st.trk.restored){ btns[d.a].classList.add('ok'); btns.forEach(function(x){ x.disabled=true; }); revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- выпадающие окошки внутри предложения ---------- */
picks:function(ex,d){
  var st=mkItem(ex, d.label||plain(d.parts.map(function(p){return typeof p==='string'?p:'___';}).join('')));
  var row=E('div','row');
  if(d.pic){ var pc=E('span','q','🖼 '+d.pic); row.appendChild(pc); }
  var sels=[];
  d.parts.forEach(function(p){
    if(typeof p==='string'){ var s=E('span'); s.innerHTML=p; row.appendChild(s); return; }
    var sel=E('select','pick');
    sel.setAttribute('aria-label',p.q||'выбери');
    var o0=E('option',null,(p.q? p.q+' …' : '…')); o0.value=''; sel.appendChild(o0);
    p.opts.forEach(function(o,oi){ var op=E('option',null,o); op.value=String(oi); sel.appendChild(op); });
    sel.dataset.a=String(p.a); sel.why=p.why||''; sel.qq=p.q||'';
    sels.push(sel); row.appendChild(sel);
  });
  st.wrap.appendChild(row);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    var bad=[], empty=0;
    sels.forEach(function(s){
      s.classList.remove('ok','bad');
      if(s.value===''){ empty++; return; }
      if(Number(s.value)===Number(s.dataset.a)) s.classList.add('ok'); else { s.classList.add('bad'); bad.push(s); }
    });
    if(empty){ say(f,L.emptyAll,'tip'); return false; }
    if(!bad.length){ win(ex,st,f,d.ok||'',d.ok||''); return true; }
    st.trk.wrong(bad.map(function(s){ return s.options[s.selectedIndex].textContent; }).join(', '));
    if(st.home) say(f,L.notYet,'bad'); else helpStep(st,f,d,L.notYet,L.defPicks);
    window.Uroki && window.Uroki.gate(sels, st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',L.defPicks); };
  if(st.trk.restored){ sels.forEach(function(x){ x.value=String(x.dataset.a); x.classList.add('ok'); x.disabled=true; }); revive(st,f,d.ok||''); }
  else remind(st,f);
  return st;
},

/* ---------- разметка членов предложения ---------- */
mark:function(ex,d){
  var roles=d.roles||['дзейнік','выказнік','даданы член'];
  var st=mkItem(ex, d.words.map(function(w){return w.w;}).join(' '));
  var h=E('p','q', d.hint||('Нажимай на слово: 1 раз — '+roles[0]+', 2 раза — '+roles[1]+', 3 раза — '+roles[2]+', 4 — снять.'));
  st.wrap.appendChild(h);
  var line=E('div','sent'); var btns=[]; var touched=false;
  d.words.forEach(function(wd){
    var b=E('button','w',wd.w); b.type='button'; b.setAttribute('aria-label',wd.w);
    var cur=-1;
    b.addEventListener('click',function(){ if(st.done) return; touched=true; cur=(cur+2)%4-1; b.className='w'+(cur>=0?' r'+cur:''); });
    b.getRole=function(){ return cur; };
    b.setRole=function(r){ cur=r; b.className='w'+(r>=0?' r'+r:''); };
    btns.push(b); line.appendChild(b);
  });
  st.wrap.appendChild(line);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    if(!touched){ say(f, L.touchMark, 'tip'); return false; }
    var bad=[];
    btns.forEach(function(b,i){ b.classList.remove('err'); if(b.getRole()!==d.words[i].r){ b.classList.add('err'); bad.push(i); } });
    if(!bad.length){
      var s0=d.words.filter(function(w){return w.r===0;}).map(function(w){return w.w;}).join(' ');
      var s1=d.words.filter(function(w){return w.r===1;}).map(function(w){return w.w;}).join(' ');
      win(ex,st,f,s0+' — '+roles[0]+', '+s1+' — '+roles[1]+'.', s0+' / '+s1);
      return true;
    }
    st.trk.wrong(bad.map(function(i){return d.words[i].w;}).join(', '));
    if(st.home) say(f,L.notYet,'bad'); else helpStep(st,f,d,L.notYet,L.defMark);
    window.Uroki && window.Uroki.gate(btns, st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',L.defMark); };
  if(st.trk.restored){ btns.forEach(function(b,i){ b.setRole(d.words[i].r); }); revive(st,f,''); }
  else remind(st,f);
  return st;
},

/* ---------- выбрать нужные слова из списка ---------- */
pickWords:function(ex,d){
  var st=mkItem(ex, plain(d.q));
  var qp=E('p'); qp.innerHTML=d.q; qp.style.margin='0 0 2px'; st.wrap.appendChild(qp);
  var line=E('div','sent'); var btns=[]; var touched=false;
  d.words.forEach(function(wd){
    var b=E('button','w',wd.w); b.type='button';
    b.on=false;
    b.addEventListener('click',function(){ if(st.done) return; touched=true; b.on=!b.on; b.className='w'+(b.on?' on':''); });
    btns.push(b); line.appendChild(b);
  });
  st.wrap.appendChild(line);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    if(!touched){ say(f, L.touchPick, 'tip'); return false; }
    var bad=[];
    btns.forEach(function(b,i){ b.classList.remove('err'); if(!!b.on!==!!d.words[i].on){ b.classList.add('err'); bad.push(i); } });
    if(!bad.length){ win(ex,st,f,d.why||'', d.words.filter(function(w){return w.on;}).map(function(w){return w.w;}).join(', ')); return true; }
    st.trk.wrong(btns.filter(function(b){return b.on;}).map(function(b){return b.textContent;}).join(', ')||'ничего не выбрано');
    if(st.home) say(f,L.notYet,'bad'); else helpStep(st,f,d,L.notYet,L.defPick);
    window.Uroki && window.Uroki.gate(btns, st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',L.defPick); };
  if(st.trk.restored){ btns.forEach(function(b,i){ b.on=!!d.words[i].on; b.className='w'+(b.on?' on':''); }); revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- составить предложение из слов ---------- */
order:function(ex,d){
  var st=mkItem(ex, d.label||d.words.join(' '));
  if(d.before){ var bp=E('p','q'); bp.innerHTML=d.before; st.wrap.appendChild(bp); }
  if(d.schemeEl) st.wrap.appendChild(d.schemeEl);
  var bank=E('div','bank'), built=E('div','built',''), chosen=[], bbtns=[];
  function redraw(){ built.textContent=chosen.map(function(i){return d.words[i];}).join(' ')+(chosen.length?(d.tail||'.'):''); }
  d.words.forEach(function(w,i){
    var b=E('button','word',w); b.type='button';
    b.addEventListener('click',function(){ if(st.done) return; if(chosen.indexOf(i)>=0) return; chosen.push(i); b.classList.add('used'); redraw(); });
    bbtns.push(b); bank.appendChild(b);
  });
  var clr=E('button','b ghost','↺'); clr.type='button'; clr.style.cssText='font-size:14px;padding:6px 12px';
  clr.addEventListener('click',function(){ if(st.done) return; chosen=[]; bbtns.forEach(function(b){b.classList.remove('used');}); redraw(); });
  st.wrap.appendChild(bank); st.wrap.appendChild(built); st.wrap.appendChild(clr);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    if(chosen.length!==d.words.length){ say(f,L.allWords,'tip'); return false; }
    var ok=chosen.every(function(v,i){ return v===d.order[i]; });
    if(ok){ win(ex,st,f,d.why||'', d.order.map(function(i){return d.words[i];}).join(' ')); return true; }
    st.trk.wrong(chosen.map(function(i){return d.words[i];}).join(' '));
    if(st.home) say(f,L.notYet,'bad'); else helpStep(st,f,d,L.notYet,L.defOrder);
    window.Uroki && window.Uroki.gate(bbtns.concat([clr]), st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',L.defOrder); };
  if(st.trk.restored){ chosen=d.order.slice(); chosen.forEach(function(i){ bbtns[i].classList.add('used'); }); redraw(); revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- разбор слова по составу ---------- */
morph:function(ex,d){
  var roles=d.roles||['приставка','корень','суффикс','окончание'];
  var st=mkItem(ex, d.word);
  var h=E('p','q', d.hint||('Слово <b>'+d.word+'</b>: подпиши каждую часть.'));
  h.innerHTML=d.hint||('Слово <b>'+d.word+'</b>: выбери, чем является каждая часть.');
  st.wrap.appendChild(h);
  var box=E('div','morph'); var sels=[];
  d.parts.forEach(function(p){
    var mp=E('div','mp');
    mp.appendChild(E('div','pv', p.v===''? '◻' : p.v));
    var sel=E('select');
    var o0=E('option',null,'?'); o0.value=''; sel.appendChild(o0);
    roles.forEach(function(r,ri){ var op=E('option',null,r); op.value=String(ri); sel.appendChild(op); });
    sel.dataset.a=String(p.r); sel.why=p.why||''; sel.pv=p.v;
    sels.push(sel); mp.appendChild(sel); box.appendChild(mp);
  });
  st.wrap.appendChild(box);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    var bad=[], empty=0;
    sels.forEach(function(s){
      s.classList.remove('ok','bad');
      if(s.value===''){ empty++; return; }
      if(Number(s.value)===Number(s.dataset.a)) s.classList.add('ok'); else { s.classList.add('bad'); bad.push(s); }
    });
    if(empty){ say(f,L.emptyAll,'tip'); return false; }
    if(!bad.length){
      win(ex,st,f,d.why||'', d.parts.map(function(p){ return (p.v||'нулевое')+' — '+roles[p.r]; }).join(', '));
      return true;
    }
    st.trk.wrong(bad.map(function(s){ return (s.pv||'нулевое')+'='+s.options[s.selectedIndex].textContent; }).join(', '));
    if(st.home) say(f,L.notYet,'bad'); else helpStep(st,f,d,L.notYet,L.defMorph);
    window.Uroki && window.Uroki.gate(sels, st.wrap);
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',L.defMorph); };
  if(st.trk.restored){ sels.forEach(function(x){ x.value=String(x.dataset.a); x.classList.add('ok'); x.disabled=true; }); revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- свободный ответ: проверяем по ключевым словам ---------- */
free:function(ex,d){
  var st=mkItem(ex, plain(d.q));
  var qp=E('p'); qp.innerHTML=d.q; qp.style.margin='0 0 8px'; st.wrap.appendChild(qp);
  var ta=E('textarea','ansarea'); ta.placeholder=d.ph||'Пиши здесь…'; ta.setAttribute('aria-label',plain(d.q));
  st.wrap.appendChild(ta);
  var f=fbEl(st.wrap);
  st.check=function(){
    if(st.done) return true;
    var raw=ta.value.trim();
    if(raw===''){ say(f,L.empty,'tip'); return false; }
    var n=norm(raw), missing=[];
    (d.must||[]).forEach(function(m){
      var alts=(m instanceof Array? m : [m]);
      var hit=alts.some(function(a){ return n.indexOf(norm(a))>=0; });
      if(!hit) missing.push(alts[0]);
    });
    var tooShort=(d.min && n.split(' ').length<d.min);
    if(!missing.length && !tooShort){ ta.style.borderColor='var(--ok)'; win(ex,st,f,d.why||'', d.sample||'', raw); return true; }
    st.trk.wrong(raw.slice(0,60));
    var m2=tooShort? ('Напиши подробнее — хотя бы '+d.min+' слов. ') : '';
    if(missing.length) m2+='Не хватает: <b>'+missing.join('</b>, <b>')+'</b>. '+(d.hint||'');
    say(f,m2,'bad');
    return false;
  };
  st.explain=function(){ if(st.done) return; st.trk.hint(); helpStep(st,f,d,'',d.hint||''); };
  /* черновик свободного ответа сохраняем даже без проверки */
  ta.addEventListener('blur',function(){ if(!st.done) st.trk.keep(ta.value); });
  if(st.trk.savedText){ ta.value=st.trk.savedText; }
  if(st.trk.restored){ ta.style.borderColor='var(--ok)'; ta.readOnly=true; revive(st,f,d.why||''); }
  else remind(st,f);
  return st;
},

/* ---------- чистовик ---------- */
clean:function(id,title,lines){
  var el=E('div','clean');
  el.appendChild(E('h3',null,title));
  var lock=E('p','lock',L.lock);
  var ol=E('ol'); ol.hidden=true;
  lines.forEach(function(l){ var li=E('li'); li.innerHTML=l; ol.appendChild(li); });
  el.appendChild(lock); el.appendChild(ol); cleanHost.appendChild(el);
  cleanBlocks[id]={el:el,lock:lock,content:ol,opened:false};
},

/* ---------- итог ---------- */
mount:function(){
  exList.forEach(finish);
  var host=document.getElementById('uroki-result');
  if(host && window.Uroki) window.Uroki.mount(host);
  bump();
  Lesson.voice();
},

/* ---------- голос ---------- */
voice:function(){
  var synth=window.speechSynthesis;
  var btns=[].slice.call(document.querySelectorAll('[data-say]'));
  if(!synth||!window.SpeechSynthesisUtterance){ btns.forEach(function(b){ b.hidden=true; }); return; }
  var want=(cfg&&cfg.lang==='be')? /^be/i : /^ru/i;
  function voiceFor(u){
    var vs=synth.getVoices()||[];
    for(var i=0;i<vs.length;i++){ if(want.test(vs[i].lang)){ u.voice=vs[i]; u.lang=vs[i].lang; return; } }
    for(var j=0;j<vs.length;j++){ if(/^ru/i.test(vs[j].lang)){ u.voice=vs[j]; u.lang='ru-RU'; return; } }
    u.lang='ru-RU';
  }
  var active=null;
  btns.forEach(function(b){
    var lbl=b.textContent;
    b.addEventListener('click',function(){
      if(active===b&&synth.speaking){ synth.cancel(); b.textContent=lbl; active=null; return; }
      synth.cancel();
      btns.forEach(function(x){ if(x.dataset.lbl) x.textContent=x.dataset.lbl; });
      b.dataset.lbl=lbl;
      var u=new SpeechSynthesisUtterance(b.getAttribute('data-say'));
      u.rate=0.92; voiceFor(u);
      u.onend=function(){ b.textContent=lbl; active=null; };
      u.onerror=function(){ b.textContent=lbl; active=null; };
      active=b; b.textContent=L.stop;
      setTimeout(function(){ synth.speak(u); },50);
    });
  });
},

/* ---------- аудиоурок из нескольких частей ---------- */
audio:function(parts){
  var host=document.getElementById('audio');
  if(!host) return;
  var synth=window.speechSynthesis;
  if(!synth||!window.SpeechSynthesisUtterance){ host.hidden=true; return; }
  var token=0, playing=false, li=0;
  var want=(cfg&&cfg.lang==='be')? /^be/i : /^ru/i;
  function voiceFor(u){
    var vs=synth.getVoices()||[];
    for(var i=0;i<vs.length;i++){ if(want.test(vs[i].lang)){ u.voice=vs[i]; u.lang=vs[i].lang; return; } }
    for(var j=0;j<vs.length;j++){ if(/^ru/i.test(vs[j].lang)){ u.voice=vs[j]; u.lang='ru-RU'; return; } }
    u.lang='ru-RU';
  }
  function speak(text,cb){
    token++; var my=token; synth.cancel();
    var u=new SpeechSynthesisUtterance(text); u.rate=0.9; voiceFor(u);
    u.onend=function(){ if(my===token&&cb) cb(false); };
    u.onerror=function(){ if(my===token&&cb) cb(true); };
    setTimeout(function(){ if(my===token) synth.speak(u); },60);
  }
  var list=E('div'); list.style.cssText='display:flex;flex-direction:column;gap:7px;margin:10px 0';
  var pb=[];
  parts.forEach(function(p,i){
    var b=E('button','b ghost'); b.type='button';
    b.style.cssText='justify-content:flex-start;text-align:left;border-radius:12px';
    b.textContent=L.part+(i+1)+'. '+p.t;
    b.addEventListener('click',function(){ playFrom(i); });
    pb.push(b); list.appendChild(b);
  });
  var note=E('p','q',L.noPart);
  var bar=E('div','btns');
  var bPlay=E('button','b',L.playAll); bPlay.type='button';
  var bPrev=E('button','b ghost',L.prev); bPrev.type='button';
  var bNext=E('button','b ghost',L.next); bNext.type='button';
  bar.appendChild(bPlay); bar.appendChild(bPrev); bar.appendChild(bNext);
  host.appendChild(list); host.appendChild(note); host.appendChild(bar);
  function paint(){
    pb.forEach(function(b,i){ b.style.outline=(i===li&&playing)?'3px solid var(--accent)':'none'; });
    bPlay.textContent=playing? L.pause : L.playAll;
    note.textContent=playing? (L.part+(li+1)+': '+parts[li].t) : L.noPart;
  }
  function playFrom(i){
    if(i>=parts.length){ playing=false; li=parts.length-1; paint(); note.textContent=L.endLesson; return; }
    if(i<0) i=0;
    li=i; playing=true; pb[i].style.opacity='1'; paint();
    speak(parts[i].s,function(err){ if(!err&&playing) playFrom(i+1); else { playing=false; paint(); } });
  }
  function stop(){ token++; synth.cancel(); playing=false; paint(); }
  bPlay.addEventListener('click',function(){ if(playing) stop(); else playFrom(li); });
  bPrev.addEventListener('click',function(){ stop(); li=Math.max(0,li-1); playFrom(li); });
  bNext.addEventListener('click',function(){ stop(); li=Math.min(parts.length-1,li+1); playFrom(li); });
  paint();
}

};

window.Lesson=Lesson;
})();
