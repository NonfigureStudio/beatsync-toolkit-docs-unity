/* =====================================================================
   BeatSyncToolkit Documentation engine
   Renders nav/hero/paths/content from index.html (LANGS/UI/HERO/PATHS/NAV)
   and content.js (DOCS). Handles language, theme, search, scrollspy,
   copy buttons, progress bar, mobile drawer, deep-link hashes.
   ===================================================================== */
(function () {
  'use strict';
  const html = document.documentElement;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const store = {
    get(k, d){ try { return localStorage.getItem('bst_'+k) ?? d; } catch(e){ return d; } },
    set(k, v){ try { localStorage.setItem('bst_'+k, v); } catch(e){} }
  };

  let lang = store.get('lang', 'en');
  if (!LANGS.some(l => l.code === lang && l.ready)) lang = 'en';
  let theme = store.get('theme', 'dark');
  let searchIndex = [];
  let searchResults = [];
  let currentPageId = null;

  /* ---------- small helpers ---------- */
  const t = (obj) => (obj && (obj[lang] ?? obj.en)) || '';

  const SEARCH_ALIASES = {
    en: {
      home:'home overview adaptive music unity documentation beginner developer advanced start here guide',
      'what-is-bst':'overview introduction unity 2022.3 package path states tracks layers sections intensity zones stingers ducking runtime panel',
      'before-you-start':'before you start conductor one conductor exact names bpm beats per bar stems sections scene requirements',
      'quick-start':'quick start new scene single full mix music stem layer section based track zone adaptive music',
      'project-integration':'project integration game setup real game conductor profile states tracks layers zones api release validation',
      'included-assets':'included assets runtime editor prefabs reference content documentation',
      'core-concepts':'bstconductor bstmusicprofile bstintensityprofile bstmusiczone bstruntimecontrolpanel bst bstmanager',
      'music-profiles':'music profile authoring states tracks base clip section tracks layers stems default layer modes stinger cues intensity common mistakes',
      states:'states mood changes stateconfigs setmusicstate startmusic transition mode crossfade forcewhileinzone persistafterleavingzone start track start section requests zones global state arbitration',
      'control-panel':'runtime control panel transport states layers tracks sections intensity requests events input system hidden panel setvisible',
      'gameplay-api':'gameplay api startmusic stopmusic setmusicstate addlayer removelayer jumptrack jumpsection pushstaterequest removestaterequest setintensity playstinger ducking timing getters',
      'conductor-settings':'conductor settings stingers ducking performance playlist intensity default layers recommended defaults tuning',
      zones:'music zones trigger priority nested zones profile override state override intensity profile track lock layer rules local player tag preview box',
      'sections':'advanced systems transition modes valid exits branch conditions custom flags hysteresis manual layer ownership stingers sections sample synced muted layers',
      'api-reference':'full api reference complete bst methods getters hasconductor getconductor section info pending transition layer fade durations',
      'pipelines':'release validation dotnet build runtime editor solution m:1 smoke checklist performance preload audio import layer sources',
      troubleshooting:'troubleshooting no sound audio listener state does not change zone does not trigger layers do not appear intensity panel hidden stinger sections magenta multiple conductor invalid names build lock',
      faq:'faq runtime panel code only ugui urp hdrp full song stems multiple conductors visible zone boxes gameplay intensity',
      glossary:'glossary state track layer stem section stinger ducking quantize valid exit priority request zone override',
      validation:'release validation dotnet build runtime editor solution m:1 smoke checklist'
    },
    tr: {
      home:'ana sayfa genel bakış adaptif müzik unity dokümantasyon başlangıç geliştirici ileri rehber buradan başla',
      'what-is-bst':'genel bakış giriş unity 2022.3 paket yolu durumlar track parçalar katmanlar bölümler yoğunluk bölgeler stinger ducking runtime panel',
      'before-you-start':'başlamadan önce conductor tek conductor kesin isimler bpm bar ölçü stem bölüm sahne gereksinimleri',
      'quick-start':'hızlı başlangıç yeni sahne tek full mix müzik stem katman bölüm tabanlı track bölge adaptif müzik',
      'project-integration':'projeye entegrasyon gerçek oyun conductor profil state track katman zone api yayın referans doğrulama',
      'included-assets':'dahil varlıklar runtime editor prefabs referans içerik dokümantasyon',
      'core-concepts':'bstconductor bstmusicprofile bstintensityprofile bstmusiczone bstruntimecontrolpanel bst bstmanager kavramlar',
      'music-profiles':'müzik profili durumlar track base clip section track katman stem varsayılan katman modu stinger yoğunluk profil hataları',
      states:'state durum mod degisimi setmusicstate startmusic transition gecis crossfade forcewhileinzone persistafterleavingzone start track start section request zone global state onceliklendirme',
      'control-panel':'runtime kontrol paneli transport durumlar katmanlar track bölümler yoğunluk istekler olaylar input system gizli panel setvisible',
      'gameplay-api':'gameplay api startmusic stopmusic setmusicstate addlayer removelayer jumptrack jumpsection pushstaterequest removestaterequest setintensity playstinger ducking zaman getter',
      'conductor-settings':'conductor ayarları stinger ducking performans playlist yoğunluk varsayılan katman önerilen ayarlar gelişmiş ayar',
      zones:'müzik bölgeleri bölge trigger tetikleyici öncelik iç içe bölgeler profil override durum override yoğunluk profil track lock katman kuralı local player tag preview box',
      'sections':'ileri sistemler geçiş modları geçerli çıkış valid exit branch conditions koşullar custom flags özel bayraklar hysteresis manuel katman sahipliği stinger bölümler sample synced muted layers',
      'api-reference':'tam api referansı eksiksiz bst metotları getter hasconductor getconductor section info pending transition katman fade süreleri',
      'pipelines':'sürüm doğrulama dotnet build runtime editor solution m:1 smoke checklist performans preload ses import katman kaynakları',
      troubleshooting:'sorun giderme ses yok ses gelmiyor audio listener durum değişmiyor bölge tetiklenmiyor katman görünmüyor yoğunluk çalışmıyor panel gizli stinger çalmıyor bölümler erken geç geçiyor magenta çoklu conductor geçersiz isim build kilit',
      faq:'sık sorulan sorular runtime panel sadece kod ugui urp hdrp tek şarkı stem birden fazla conductor görünür bölge kutuları gameplay yoğunluk',
      glossary:'sözlük durum track katman stem bölüm stinger ducking quantize geçerli çıkış öncelikli istek bölge override',
      validation:'sürüm doğrulama dotnet build runtime editor solution m:1 smoke checklist'
    }
  };

  // Single-pass C#-ish highlighter. One regex with alternation tokenizes each
  // line; spans are inserted only into untouched gaps, so previously-emitted
  // markup (e.g. class="tok-s") is never re-scanned. Tokens are HTML-escaped.
  function highlight(raw){
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const KW = 'using|public|private|protected|static|void|class|struct|new|return|if|else|var|bool|float|int|string|true|false|null|foreach|for|while|in|override|virtual|namespace|enum|get|set|this|out|ref';
    const TY = 'BSTConductor|BSTManager|BSTMusicProfile|BSTIntensityProfile|BSTMusicZone|BSTTransitionMode|BSTLayerAddMode|BSTSmoothEasing|BSTConditionType|BSTDefaultLayerMode|BSTIntensityOverrideMode|BSTStingerCue|MonoBehaviour|AudioClip|GameObject|Mathf|Nonfigure|BST';
    const pat = new RegExp(
      '(\\/\\/[^\\n]*)' +                       // 1 comment
      '|("(?:[^"\\\\]|\\\\.)*")' +              // 2 string
      '|\\b(' + KW + ')\\b' +                   // 3 keyword
      '|\\b(' + TY + ')\\b' +                   // 4 type
      '|\\b(\\d+\\.?\\d*f?)\\b' +               // 5 number
      '|\\.([A-Za-z_]\\w*)(?=\\s*\\()',         // 6 .method(
      'g');
    return raw.split('\n').map(line=>{
      let out='', last=0, m;
      pat.lastIndex = 0;
      while((m = pat.exec(line))){
        out += esc(line.slice(last, m.index));
        if (m[1])               out += '<span class="tok-c">'+esc(m[1])+'</span>';
        else if (m[2])          out += '<span class="tok-s">'+esc(m[2])+'</span>';
        else if (m[3])          out += '<span class="tok-k">'+esc(m[3])+'</span>';
        else if (m[4])          out += '<span class="tok-t">'+esc(m[4])+'</span>';
        else if (m[5])          out += '<span class="tok-n">'+esc(m[5])+'</span>';
        else if (m[6]!==undefined) out += '.<span class="tok-m">'+esc(m[6])+'</span>';
        last = m.index + m[0].length;
      }
      out += esc(line.slice(last));
      return out;
    }).join('\n');
  }

  const copyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';

  function allNavItems(){
    return NAV.flatMap(group => group.items);
  }

  function firstPageId(){
    const first = allNavItems()[0];
    return first ? first.id : '';
  }

  function knownPageId(id){
    return allNavItems().some(item => item.id === id) ? id : firstPageId();
  }

  function activatePage(id, opts={}){
    const target = knownPageId(id);
    if (!target) return;
    currentPageId = target;
    $$('.doc-section').forEach(sec => {
      const active = sec.id === target;
      sec.classList.toggle('page-hidden', !active);
      sec.classList.toggle('page-active', active);
    });
    $$('.nav-link').forEach(a=> a.classList.toggle('active', a.dataset.id===target));
    const home = target === 'home';
    $('#hero').style.display = home ? '' : 'none';
    $('#paths').style.display = home ? '' : 'none';
    if (location.hash.slice(1) !== target && opts.updateHash !== false) {
      history.replaceState(null, '', '#'+target);
    }
    if (opts.scroll !== false) window.scrollTo({top:0, behavior: opts.smooth ? 'smooth' : 'auto'});
    $('#progress').style.width = '0%';
    $('#toTop').classList.toggle('show', window.scrollY > 600);
  }

  function activatePageFromHash(opts={}){
    activatePage(location.hash.slice(1) || firstPageId(), opts);
  }

  // Clipboard with a file:// fallback (navigator.clipboard needs a secure context).
  function copyText(text){
    try {
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text); return; }
    } catch(e){}
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e){}
    document.body.removeChild(ta);
  }

  // process raw section HTML: turn <pre data-lang="C#">...</pre> markers into styled code blocks
  function processBlocks(scope){
    $$('pre[data-code]', scope).forEach(pre=>{
      const label = pre.getAttribute('data-code') || 'C#';
      const raw = pre.textContent.replace(/^\n/,'').replace(/\s+$/,'');
      const wrap = document.createElement('div');
      wrap.className = 'code';
      wrap.innerHTML =
        '<div class="code-head"><span class="lang">'+label+'</span>'+
        '<button class="copy">'+copyIcon+'<span>Copy</span></button></div>'+
        '<pre><code>'+highlight(raw)+'</code></pre>';
      pre.replaceWith(wrap);
      const btn = $('.copy', wrap);
      btn.addEventListener('click', ()=>{
        copyText(raw);
        const span = $('span', btn); const old = span.textContent;
        span.textContent = lang==='tr' ? 'Kopyalandı' : 'Copied'; btn.style.color='#39d98a';
        setTimeout(()=>{ span.textContent = old; btn.style.color=''; }, 1400);
      });
    });
  }

  function setupTabs(scope){
    $$('.doc-tabs', scope).forEach(tabs=>{
      const buttons = $$('.tab-list button', tabs);
      const panels = $$('.tab-panel', tabs);
      if (!buttons.length || !panels.length) return;

      function activate(target){
        buttons.forEach(btn=> btn.classList.toggle('active', btn.dataset.tab === target));
        panels.forEach(panel=> panel.classList.toggle('active', panel.dataset.panel === target));
      }

      buttons.forEach(btn=>{
        btn.addEventListener('click', ()=> activate(btn.dataset.tab));
      });

      const active = buttons.find(btn=>btn.classList.contains('active')) || buttons[0];
      activate(active.dataset.tab);
    });
  }

  /* ---------- render: sidebar ---------- */
  function renderNav(){
    const sb = $('#sidebar'); sb.innerHTML = '';
    NAV.forEach(group=>{
      const wrap = document.createElement('div'); wrap.className='nav-group';
      const h = document.createElement('h4'); h.textContent = t(group.g); wrap.appendChild(h);
      group.items.forEach(it=>{
        const a = document.createElement('a');
        a.className='nav-link'; a.href='#'+it.id; a.dataset.id=it.id;
        const dot = lvlLabel.hasOwnProperty(it.lvl) ? '<span class="lvl '+it.lvl+'"></span>' : '';
        a.innerHTML = '<span class="lbl">'+ (it[lang]||it.en) +'</span>'+dot;
        a.dataset.search = ((it[lang]||it.en)+' '+t(group.g)).toLowerCase();
        a.addEventListener('click', ()=>{
          closeDrawer();
          setTimeout(()=>activatePage(it.id, {scroll:true, smooth:false, updateHash:false}), 0);
        });
        wrap.appendChild(a);
      });
      sb.appendChild(wrap);
    });
  }

  /* ---------- render: hero + paths ---------- */
  function renderHero(){
    const h = t(HERO);
    $('#hero').innerHTML =
      '<div class="eyebrow">'+h.eyebrow+'</div>'+
      '<h1>'+h.title+'</h1>'+
      '<p>'+h.sub+'</p>'+
      '<div class="pills">'+ h.pills.map(p=>'<span class="pill">'+checkSvg()+p+'</span>').join('') +'</div>';

    const icons = [pathIcon('play'), pathIcon('code'), pathIcon('layers')];
    $('#paths').innerHTML = t(PATHS).map((p,i)=>
      '<a class="path-card" href="#'+p.to+'"><div class="ico">'+icons[i]+'</div>'+
      '<h3>'+p.t+'</h3><p>'+p.d+'</p></a>').join('');
  }

  /* ---------- render: content sections ---------- */
  const lvlLabel = {
    beginner:{en:'Beginner',tr:'Başlangıç'},
    intermediate:{en:'Intermediate',tr:'Orta'},
    advanced:{en:'Advanced',tr:'İleri'}
  };
  function renderContent(){
    const root = $('#content'); root.innerHTML='';
    NAV.forEach(group=> group.items.forEach(it=>{
      const sec = document.createElement('section');
      sec.className='doc-section'; sec.id=it.id;
      const body = (DOCS[it.id] && (DOCS[it.id][lang] || DOCS[it.id].en)) || '<p>-</p>';
      const badge = lvlLabel.hasOwnProperty(it.lvl)
        ? '<span class="badge '+it.lvl+'">'+t(lvlLabel[it.lvl])+'</span>' : '';
      sec.innerHTML =
        '<div class="sec-head">'+badge+
        '<h2>'+(it[lang]||it.en)+'</h2>'+
        '<a class="anchor" href="#'+it.id+'" aria-label="link">#</a></div>'+ body;
      root.appendChild(sec);
    }));
    processBlocks(root);
    setupTabs(root);
    activatePageFromHash({scroll:false, updateHash:true});
  }

  /* ---------- language menu ---------- */
  function renderLangMenu(){
    const m = $('#langMenu'); m.innerHTML='';
    LANGS.forEach(l=>{
      const b = document.createElement('button');
      b.className = (l.code===lang?'active':'');
      b.innerHTML = '<span class="flag">'+l.flag+'</span>'+l.label+
        (l.ready?'':'<span class="soon">'+UI[lang].soon+'</span>');
      if (l.ready) b.addEventListener('click', ()=>{ setLang(l.code); m.classList.remove('open'); });
      else b.disabled = true, b.style.opacity=.55, b.style.cursor='default';
      m.appendChild(b);
    });
    const cur = LANGS.find(l=>l.code===lang);
    $('#langLabel').textContent = cur ? cur.short : 'EN';
  }

  function setLang(code){
    lang = code; store.set('lang', code);
    html.setAttribute('lang', code); html.setAttribute('data-lang', code);
    $('#search').placeholder = UI[lang].search;
    $('#footPrivacy').textContent = UI[lang].privacy;
    $('#footTerms').textContent = UI[lang].terms;
    renderNav(); renderHero(); renderContent(); renderLangMenu(); buildSearchIndex(); scrollSpy(); applySearch();
  }

  /* ---------- theme ---------- */
  function setTheme(tm){
    theme = tm; store.set('theme', tm); html.setAttribute('data-theme', tm);
    $('#themeIcon').outerHTML = tm==='dark'
      ? '<svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }

  /* ---------- search ---------- */
  function plainText(htmlText){
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlText || '';
    return tmp.textContent || tmp.innerText || '';
  }

  function normalizeSearch(text){
    return (text || '')
      .toString()
      .toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : 'en-US')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function buildSearchIndex(){
    searchIndex = [];
    NAV.forEach(group => group.items.forEach(it => {
      const title = it[lang] || it.en;
      const groupTitle = t(group.g);
      const localizedBody = (DOCS[it.id] && (DOCS[it.id][lang] || DOCS[it.id].en)) || '';
      const fallbackBody = (DOCS[it.id] && DOCS[it.id].en) || '';
      const renderedSection = document.getElementById(it.id);
      const aliases = [
        SEARCH_ALIASES.en[it.id] || '',
        SEARCH_ALIASES.tr[it.id] || '',
        (SEARCH_ALIASES[lang] && SEARCH_ALIASES[lang][it.id]) || ''
      ].join(' ');

      searchIndex.push({
        id: it.id,
        title,
        group: groupTitle,
        titleText: normalizeSearch(title + ' ' + groupTitle),
        text: normalizeSearch([
          title,
          groupTitle,
          plainText(localizedBody),
          lang === 'en' ? '' : plainText(fallbackBody),
          renderedSection ? renderedSection.textContent : '',
          aliases
        ].join(' '))
      });
    }));
  }

  function searchLabel(key, fallback){
    return (UI[lang] && UI[lang][key]) || fallback;
  }

  function ensureSearchPopover(){
    let pop = $('#searchResults');
    if (pop) return pop;
    pop = document.createElement('div');
    pop.id = 'searchResults';
    pop.className = 'search-popover';
    pop.setAttribute('role', 'listbox');
    pop.setAttribute('aria-label', 'Documentation search results');
    const wrap = $('.tb-search');
    if (wrap) wrap.appendChild(pop);
    return pop;
  }

  function closeSearch(){
    const pop = $('#searchResults');
    if (pop) pop.classList.remove('open');
  }

  function openSearchResult(item){
    if (!item) return;
    const el = document.getElementById(item.id);
    if (!el) return;
    activatePage(item.id, {scroll:false, updateHash:false});
    location.hash = item.id;
    el.scrollIntoView({behavior:'smooth', block:'start'});
    el.classList.add('flash');
    setTimeout(()=> el.classList.remove('flash'), 1300);
    closeDrawer();
    closeSearch();
  }

  function applySearch(){
    const input = $('#search');
    const pop = ensureSearchPopover();
    const q = normalizeSearch(input.value.trim());
    searchResults = [];

    if (!q){
      pop.classList.remove('open');
      pop.innerHTML = '';
      $$('.nav-link').forEach(a=> a.classList.remove('hide'));
      $$('.nav-group').forEach(g=> g.style.display = '');
      return;
    }

    searchResults = searchIndex
      .map(item => {
        if (!item.text.includes(q)) return null;
        const score = (item.titleText.includes(q) ? 20 : 0) + Math.max(0, 10 - item.text.indexOf(q) / 250);
        return {...item, score};
      })
      .filter(Boolean)
      .sort((a,b)=> b.score - a.score)
      .slice(0, 10);

    $$('.nav-link').forEach(a=>{
      const match = searchResults.some(r => r.id === a.dataset.id);
      a.classList.toggle('hide', !match);
    });
    $$('.nav-group').forEach(g=>{
      const any = $$('.nav-link', g).some(a=>!a.classList.contains('hide'));
      g.style.display = any ? '' : 'none';
    });

    if (!searchResults.length){
      pop.innerHTML = '<div class="search-empty">'+(lang==='tr' ? 'Sonuç bulunamadı.' : 'No results found.')+'</div>';
      pop.classList.add('open');
      return;
    }

    pop.innerHTML = searchResults.map((item, i)=>
      '<button class="search-result" type="button" data-index="'+i+'">'+
      '<span>'+item.title+'</span><small>'+item.group+'</small></button>'
    ).join('');
    $$('.search-result', pop).forEach(btn=>{
      btn.addEventListener('click', ()=> openSearchResult(searchResults[Number(btn.dataset.index)]));
    });
    pop.classList.add('open');
  }

  /* ---------- scrollspy + progress ---------- */
  let spyTicking=false;
  function scrollSpy(){
    if (spyTicking) return; spyTicking=true;
    requestAnimationFrame(()=>{
      const secs = $$('.doc-section');
      const visibleSecs = secs.filter(s=>!s.classList.contains('page-hidden'));
      const y = window.scrollY + 120;
      let cur = currentPageId || (visibleSecs[0] && visibleSecs[0].id) || (secs[0] && secs[0].id);
      for (const s of visibleSecs){ if (s.offsetTop <= y) cur = s.id; }
      $$('.nav-link').forEach(a=> a.classList.toggle('active', a.dataset.id===cur));
      const dh = document.body.scrollHeight - window.innerHeight;
      $('#progress').style.width = (dh>0 ? (window.scrollY/dh*100) : 0)+'%';
      $('#toTop').classList.toggle('show', window.scrollY > 600);
      spyTicking=false;
    });
  }

  /* ---------- mobile drawer ---------- */
  function openDrawer(){ $('#sidebar').classList.add('open'); $('#scrim').classList.add('show'); }
  function closeDrawer(){ $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('show'); }

  /* ---------- icons ---------- */
  function checkSvg(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>';}
  function pathIcon(k){
    const m={
      play:'<path d="M5 3l14 9-14 9V3z"/>',
      code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
      layers:'<path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+(m[k]||'')+'</svg>';
  }

  /* ---------- init ---------- */
  function init(){
    html.setAttribute('data-theme', theme);
    setTheme(theme);
    renderLangMenu();
    setLang(lang);

    $('#themeBtn').addEventListener('click', ()=> setTheme(theme==='dark'?'light':'dark'));
    $('#langBtn').addEventListener('click', e=>{ e.stopPropagation(); $('#langMenu').classList.toggle('open'); });
    document.addEventListener('click', e=>{
      if(!e.target.closest('.lang-wrap')) $('#langMenu').classList.remove('open');
      if(!e.target.closest('.tb-search')) closeSearch();
    });
    $('#search').addEventListener('input', applySearch);
    $('#search').addEventListener('keydown', e=>{
      if (e.key === 'Enter' && searchResults.length){
        e.preventDefault();
        openSearchResult(searchResults[0]);
      } else if (e.key === 'Escape'){
        e.currentTarget.value = '';
        applySearch();
      }
    });
    $('#menuToggle').addEventListener('click', openDrawer);
    $('#scrim').addEventListener('click', closeDrawer);
    $('#toTop').addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
    window.addEventListener('scroll', scrollSpy, {passive:true});
    window.addEventListener('resize', scrollSpy);
    window.addEventListener('hashchange', ()=>activatePageFromHash({scroll:true, smooth:false, updateHash:false}));

    // deep link / page mode
    setTimeout(()=>activatePageFromHash({scroll:false, updateHash:true}),60);
    scrollSpy();
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
