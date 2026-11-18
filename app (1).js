/* =========================================================
   밥풀 프로토타입 v2
   - 화면은 전부 디자인 원본 이미지 그대로 (가로 1206px = 402pt @3x)
   - 좌표는 원본 이미지 픽셀 기준. 상태바(186px)는 잘라내고 실제 폰 상태바 사용
   ========================================================= */
(() => {
  const W = 1206, SB = 186, FULL = 2436, MIN = 2334;
  const M = D.meta, C = D.comps;
  // GitHub에 폴더째 올라간 파일들의 실제 위치 (예: s/2_s폴더안에_A/home.webp)
  const PATHS = {"s/cook_risotto_2.webp":"s/2_s폴더안에_A/cook_risotto_2.webp","s/cprofile.webp":"s/2_s폴더안에_A/cprofile.webp","s/detail_curry.webp":"s/2_s폴더안에_A/detail_curry.webp","s/cook_noodle_3.webp":"s/2_s폴더안에_A/cook_noodle_3.webp","s/done_risotto.webp":"s/2_s폴더안에_A/done_risotto.webp","s/cshare.webp":"s/2_s폴더안에_A/cshare.webp","s/cdeals.webp":"s/2_s폴더안에_A/cdeals.webp","s/ashop.webp":"s/2_s폴더안에_A/ashop.webp","s/cook_curry_3.webp":"s/2_s폴더안에_A/cook_curry_3.webp","s/cook_noodle_2.webp":"s/2_s폴더안에_A/cook_noodle_2.webp","s/agrow.webp":"s/2_s폴더안에_A/agrow.webp","s/detail_risotto.webp":"s/2_s폴더안에_A/detail_risotto.webp","s/acloset.webp":"s/2_s폴더안에_A/acloset.webp","s/cdeal.webp":"s/2_s폴더안에_A/cdeal.webp","s/cook_picnic_1.webp":"s/2_s폴더안에_A/cook_picnic_1.webp","s/cpost_photo.webp":"s/2_s폴더안에_A/cpost_photo.webp","s/cwrite.webp":"s/2_s폴더안에_A/cwrite.webp","s/cook_risotto_1.webp":"s/2_s폴더안에_A/cook_risotto_1.webp","s/csearch.webp":"s/2_s폴더안에_A/csearch.webp","s/cook_yogurt_1.webp":"s/2_s폴더안에_A/cook_yogurt_1.webp","s/cmain.webp":"s/2_s폴더안에_A/cmain.webp","s/cando.webp":"s/2_s폴더안에_A/cando.webp","s/amission.webp":"s/2_s폴더안에_A/amission.webp","s/cook_risotto_3.webp":"s/2_s폴더안에_A/cook_risotto_3.webp","s/apoints.webp":"s/2_s폴더안에_A/apoints.webp","s/detail_yogurt.webp":"s/2_s폴더안에_A/detail_yogurt.webp","s/cook_curry_1.webp":"s/2_s폴더안에_A/cook_curry_1.webp","s/astamp.webp":"s/2_s폴더안에_A/astamp.webp","s/cook_noodle_1.webp":"s/2_s폴더안에_A/cook_noodle_1.webp","s/cvote.webp":"s/2_s폴더안에_A/cvote.webp","s/done_yogurt.webp":"s/2_s폴더안에_A/done_yogurt.webp","s/amain.webp":"s/2_s폴더안에_A/amain.webp","s/cook_yogurt_2.webp":"s/2_s폴더안에_A/cook_yogurt_2.webp","s/done_curry.webp":"s/2_s폴더안에_A/done_curry.webp","s/detail_picnic.webp":"s/2_s폴더안에_A/detail_picnic.webp","s/done_picnic.webp":"s/2_s폴더안에_A/done_picnic.webp","s/cook_curry_2.webp":"s/2_s폴더안에_A/cook_curry_2.webp","s/cpost.webp":"s/2_s폴더안에_A/cpost.webp","s/detail_noodle.webp":"s/2_s폴더안에_A/detail_noodle.webp","s/done_noodle.webp":"s/2_s폴더안에_A/done_noodle.webp","s/login.webp":"s/3_s폴더안에_B/login.webp","s/reg_cam.webp":"s/3_s폴더안에_B/reg_cam.webp","s/sheet_yogurt.webp":"s/3_s폴더안에_B/sheet_yogurt.webp","s/reg_manual.webp":"s/3_s폴더안에_B/reg_manual.webp","s/reg_qr.webp":"s/3_s폴더안에_B/reg_qr.webp","s/reel_risotto.webp":"s/3_s폴더안에_B/reel_risotto.webp","s/reel_yogurt.webp":"s/3_s폴더안에_B/reel_yogurt.webp","s/fr_cold.webp":"s/3_s폴더안에_B/fr_cold.webp","s/splash.webp":"s/3_s폴더안에_B/splash.webp","s/fr_info_strip1.webp":"s/3_s폴더안에_B/fr_info_strip1.webp","s/ob1.webp":"s/3_s폴더안에_B/ob1.webp","s/rsearch.webp":"s/3_s폴더안에_B/rsearch.webp","s/fr_list.webp":"s/3_s폴더안에_B/fr_list.webp","s/mreport.webp":"s/3_s폴더안에_B/mreport.webp","s/p6.webp":"s/3_s폴더안에_B/p6.webp","s/ob4.webp":"s/3_s폴더안에_B/ob4.webp","s/reel_curry.webp":"s/3_s폴더안에_B/reel_curry.webp","s/mbadge.webp":"s/3_s폴더안에_B/mbadge.webp","s/home_strip1.webp":"s/3_s폴더안에_B/home_strip1.webp","s/ob3.webp":"s/3_s폴더안에_B/ob3.webp","s/fr_frozen.webp":"s/3_s폴더안에_B/fr_frozen.webp","s/fr_pop.webp":"s/3_s폴더안에_B/fr_pop.webp","s/fr_info.webp":"s/3_s폴더안에_B/fr_info.webp","s/fr_room.webp":"s/3_s폴더안에_B/fr_room.webp","s/p5.webp":"s/3_s폴더안에_B/p5.webp","s/reel_picnic.webp":"s/3_s폴더안에_B/reel_picnic.webp","s/fr_info_strip0.webp":"s/3_s폴더안에_B/fr_info_strip0.webp","s/ob2.webp":"s/3_s폴더안에_B/ob2.webp","s/reel_noodle.webp":"s/3_s폴더안에_B/reel_noodle.webp","s/p1.webp":"s/3_s폴더안에_B/p1.webp","s/p3.webp":"s/3_s폴더안에_B/p3.webp","s/reg_qr_done.webp":"s/3_s폴더안에_B/reg_qr_done.webp","s/sheet_picnic.webp":"s/3_s폴더안에_B/sheet_picnic.webp","s/my.webp":"s/3_s폴더안에_B/my.webp","s/sheet_noodle.webp":"s/3_s폴더안에_B/sheet_noodle.webp","s/sheet_risotto.webp":"s/3_s폴더안에_B/sheet_risotto.webp","s/p4.webp":"s/3_s폴더안에_B/p4.webp","s/sheet_curry.webp":"s/3_s폴더안에_B/sheet_curry.webp","s/home.webp":"s/3_s폴더안에_B/home.webp","s/home_strip0.webp":"s/3_s폴더안에_B/home_strip0.webp","s/p2.webp":"s/3_s폴더안에_B/p2.webp","ui/cta_cook_risotto_3.png":"ui/4_ui폴더안에/cta_cook_risotto_3.png","ui/vote_cmain_0.png":"ui/4_ui폴더안에/vote_cmain_0.png","ui/p1_chk1.png":"ui/4_ui폴더안에/p1_chk1.png","ui/cta_cook_noodle_2.png":"ui/4_ui폴더안에/cta_cook_noodle_2.png","ui/cta_cook_risotto_1.png":"ui/4_ui폴더안에/cta_cook_risotto_1.png","ui/navu_3.png":"ui/4_ui폴더안에/navu_3.png","ui/vote_cvote_0.png":"ui/4_ui폴더안에/vote_cvote_0.png","ui/fr_all.png":"ui/4_ui폴더안에/fr_all.png","ui/p1_chk2.png":"ui/4_ui폴더안에/p1_chk2.png","ui/cta_cook_curry_2.png":"ui/4_ui폴더안에/cta_cook_curry_2.png","ui/cta_cook_curry_3.png":"ui/4_ui폴더안에/cta_cook_curry_3.png","ui/navu_2.png":"ui/4_ui폴더안에/navu_2.png","ui/vote_cmain_2.png":"ui/4_ui폴더안에/vote_cmain_2.png","ui/nav_home.png":"ui/4_ui폴더안에/nav_home.png","ui/cta_cook_picnic_1.png":"ui/4_ui폴더안에/cta_cook_picnic_1.png","ui/cta_cook_yogurt_1.png":"ui/4_ui폴더안에/cta_cook_yogurt_1.png","ui/deal_plus.png":"ui/4_ui폴더안에/deal_plus.png","ui/vote_cvote_1.png":"ui/4_ui폴더안에/vote_cvote_1.png","ui/cat_sheet.png":"ui/4_ui폴더안에/cat_sheet.png","ui/nav_amain.png":"ui/4_ui폴더안에/nav_amain.png","ui/navu_1.png":"ui/4_ui폴더안에/navu_1.png","ui/cta_cook_yogurt_2.png":"ui/4_ui폴더안에/cta_cook_yogurt_2.png","ui/navu_4.png":"ui/4_ui폴더안에/navu_4.png","ui/nav_my.png":"ui/4_ui폴더안에/nav_my.png","ui/deal_fab.png":"ui/4_ui폴더안에/deal_fab.png","ui/cta_cook_risotto_2.png":"ui/4_ui폴더안에/cta_cook_risotto_2.png","ui/cta_cook_noodle_3.png":"ui/4_ui폴더안에/cta_cook_noodle_3.png","ui/navu_0.png":"ui/4_ui폴더안에/navu_0.png","ui/wear.png":"ui/4_ui폴더안에/wear.png","ui/cta_cook_noodle_1.png":"ui/4_ui폴더안에/cta_cook_noodle_1.png","ui/cta_cook_curry_1.png":"ui/4_ui폴더안에/cta_cook_curry_1.png","ui/p1_chk0.png":"ui/4_ui폴더안에/p1_chk0.png","ui/vote_cmain_1.png":"ui/4_ui폴더안에/vote_cmain_1.png","ui/vote_cvote_2.png":"ui/4_ui폴더안에/vote_cvote_2.png","reels/yogurt_ui.png":"reels/5_reels폴더안에_이미지/yogurt_ui.png","reels/noodle_ui.png":"reels/5_reels폴더안에_이미지/noodle_ui.png","reels/curry_ui.png":"reels/5_reels폴더안에_이미지/curry_ui.png","reels/picnic_ui.png":"reels/5_reels폴더안에_이미지/picnic_ui.png","reels/risotto_ui.png":"reels/5_reels폴더안에_이미지/risotto_ui.png","reels/picnic.mp4":"reels/6_reels폴더안에_영상1/picnic.mp4","reels/curry.mp4":"reels/6_reels폴더안에_영상1/curry.mp4","reels/noodle.mp4":"reels/7_reels폴더안에_영상2/noodle.mp4","reels/yogurt.mp4":"reels/8_reels폴더안에_영상3/yogurt.mp4","reels/risotto.mp4":"reels/8_reels폴더안에_영상3/risotto.mp4"};
  const R = (p) => '/' + (PATHS[p] || p);
  const S = (id) => R(`s/${id}.webp`);
  const U = (n) => R(`ui/${n}.png`);
  const stage = document.getElementById('stage');
  const viewport = document.getElementById('viewport');
  let scale = 1, stageH = FULL;

  /* ---------------- 레이아웃 ---------------- */
  // 댓글 입력 중에는 화면 크기를 다시 계산하지 않고, 입력창만 키보드 위로 올림
  let baseH = 0;
  const isTyping = () => { const a = document.activeElement; return a && (a.tagName === 'INPUT' && a.type !== 'time' && a.type !== 'file' || a.tagName === 'TEXTAREA'); };
  function layout() {
    if (isTyping() && baseH) {
      const vv = window.visualViewport, visH = vv ? vv.height : innerHeight;
      const kb = Math.max(0, baseH - visH);
      document.querySelectorAll('.typing').forEach(b => b.style.transform = `translateY(${-kb / scale}px)`);
      if (window.scrollY) window.scrollTo(0, 0);
      return;
    }
    baseH = innerHeight;
    document.querySelectorAll('.pinned').forEach(b => { if (b.style.transform) b.style.transform = ''; });
    const vw = innerWidth, vh = innerHeight;
    scale = Math.min(vw / W, vh / MIN);
    stageH = vh / scale;
    stage.style.height = stageH + 'px';
    stage.style.transform = `translate(${(vw - W * scale) / 2}px,0) scale(${scale})`;
    document.querySelectorAll('[data-pin]').forEach(e => e.style.top = (stageH - +e.dataset.pin) + 'px');
  }
  addEventListener('resize', layout);
  addEventListener('orientationchange', () => setTimeout(layout, 300));
  if (window.visualViewport) visualViewport.addEventListener('resize', layout);

  /* ---------------- DOM 도우미 ---------------- */
  const el = (t, c, p) => { const e = document.createElement(t); if (c) e.className = c; if (p) p.appendChild(e); return e; };
  function img(src, p, x = 0, y = 0, c = '') { const i = el('img', 'abs ' + c, p); i.src = src; i.style.left = x + 'px'; i.style.top = y + 'px'; i.alt = ''; i.draggable = false; return i; }
  const at = (e, x, y, w, h) => { Object.assign(e.style, { left: x + 'px', top: y + 'px' }); if (w != null) e.style.width = w + 'px'; if (h != null) e.style.height = h + 'px'; return e; };
  // 터치 영역: box = 원본 좌표 [x0,y0,x1,y1], layer.oy = 레이어 기준 y
  function hs(layer, box, fn, o = {}) {
    const [x0, y0, x1, y1] = box;
    const h = el('div', 'hs' + (o.dim === false ? '' : ' dim'), layer);
    at(h, x0, y0 - (layer.oy || 0), x1 - x0, y1 - y0); h.style.borderRadius = (o.r ?? 24) + 'px';
    h.addEventListener('click', e => { e.stopPropagation(); if (Date.now() - (window.__swipeAt || 0) < 350) return; fn && fn(e, h); });
    return h;
  }
  // 상태 이미지(위=on, 아래=off 로 붙은 스프라이트)
  function stateImg(layer, src, x, y, w, h, on) {
    const b = el('div', 'state', layer); at(b, x, y - (layer.oy || 0), w, h);
    const a = img(src, b, 0, 0), c = img(src, b, 0, -h);
    b.set = v => { b.value = !!v; a.style.opacity = v ? 1 : 0; c.style.opacity = v ? 0 : 1; };
    b.set(on); return b;
  }
  const pop = (e, cls = 'pop') => { e.classList.remove(cls); void e.offsetWidth; e.classList.add(cls); };
  function toast(msg) {
    const t = el('div', 'toast', stage); t.textContent = msg; t.dataset.pin = 420; layout();
    setTimeout(() => t.classList.add('out'), 1400); setTimeout(() => t.remove(), 1800);
  }

  /* ---------------- 화면 만들기 ---------------- */
  const screens = {}, enter = {}, leave = {};
  function screen(id, opt = {}) {
    const m = M[id] || { h: 2622, bg: [253, 253, 253] };
    const s = el('section', 'screen', stage); s.id = 's-' + id;
    s.dataset.bg = `rgb(${(opt.bg || m.bg).join(',')})`; s.style.background = s.dataset.bg;
    const scroller = el('div', 'scroller', s);
    const tall = m.h > 2640 || opt.scroll;
    if (!tall) scroller.style.overflowY = 'hidden';
    const content = el('div', 'content', scroller); content.oy = SB;
    content.style.height = (m.h - SB + (opt.pad || 0)) + 'px';
    if (!opt.noImg) img(S(id), content, 0, 0, 'base');
    (m.strips || []).forEach(st => {     // 화면 밖으로 넘친 가로 스크롤 영역
      const h = el('div', 'hscroll', content); at(h, 0, st.y0 - SB, W, st.y1 - st.y0);
      const i = el('img', '', h); i.src = S(id + '_strip' + m.strips.indexOf(st)); i.style.width = st.w + 'px';
      // 카드 단위로 딱딱 멈추게 (스냅)
      const end = st.w - W; (st.snaps || [0, end]).filter(x => x === end || end - x > 60).forEach(x => { const k = el('div', 'snap', h); k.style.left = x + 'px'; });
    });
    s.scroller = scroller; s.content = content; screens[id] = s; s.sid = id;
    return s;
  }
  // 화면 하단 고정 레이어 (탭바, 독, 댓글창 등)
  function pin(s, src, y0, fromBottom, x = 0) {
    const l = el('div', 'pinned', s); l.dataset.pin = fromBottom; l.oy = y0; l.style.left = x + 'px';
    if (src) img(src, l, 0, 0);
    return l;
  }
  const back = (s) => hs(s.content, [0, 186, 190, 340], goBack, { r: 40 });

  /* ---------------- 내비게이션 ---------------- */
  let current = null; const stack = []; let busy = false;
  const TABS = ['home', 'reels', 'cmain', 'amain', 'my'];
  function show(id, mode) {
    const next = screens[id], prev = current && screens[current];
    if (!next || id === current) return;
    if (prev && leave[current]) leave[current]();
    viewport.style.background = next.dataset.bg;
    next.classList.add('active');
    if (enter[id]) enter[id]();
    if (prev && mode !== 'none') {
      busy = true; prev.classList.add('anim');
      let a1;
      const E = 'cubic-bezier(.2,.8,.2,1)';
      if (mode === 'fade' || mode === 'tab') {
        a1 = next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: mode === 'tab' ? 180 : 380 });
      } else if (mode === 'up') {
        next.style.zIndex = 3; a1 = next.animate([{ transform: 'translateY(100%)' }, { transform: 'none' }], { duration: 380, easing: E });
      } else {
        const bk = mode === 'back';
        next.style.zIndex = bk ? 1 : 2; prev.style.zIndex = bk ? 2 : 1;
        a1 = next.animate(bk ? [{ transform: 'translateX(-30%)', filter: 'brightness(.94)' }, { transform: 'none', filter: 'none' }] : [{ transform: 'translateX(100%)' }, { transform: 'none' }], { duration: 320, easing: E });
        prev.animate(bk ? [{ transform: 'none' }, { transform: 'translateX(100%)' }] : [{ transform: 'none', filter: 'none' }, { transform: 'translateX(-30%)', filter: 'brightness(.94)' }], { duration: 320, easing: E });
      }
      a1.onfinish = () => { prev.classList.remove('active', 'anim'); next.style.zIndex = prev.style.zIndex = ''; busy = false; };
    } else if (prev) prev.classList.remove('active');
    current = id;
  }
  function go(id, mode = 'push') { if (busy || id === current) return; stack.push(current); history.pushState({ id }, '', '#' + id); show(id, mode); }
  function reset(id, mode = 'fade') { if (busy) return; stack.length = 0; history.replaceState({ id }, '', '#' + id); show(id, mode); }
  function tab(id) { if (busy || id === current) return; stack.length = 0; history.replaceState({ id }, '', '#' + id); show(id, 'tab'); }
  function goBack() { if (busy) return; if (!stack.length) { tab('home'); return; } history.back(); }
  addEventListener('popstate', () => { if (stack.length && !busy) show(stack.pop(), 'back'); });

  // 탭바
  const NAVX = { home: [244, 439, 618, 802, 979], amain: [226, 403, 582, 784, 979], my: [223, 400, 579, 763, 957], cmain: [223, 400, 579, 763, 957] };
  // 탭바: 모든 탭에서 같은 한 장(navu_N)을 써서 크기·위치가 똑같음
  const NAVU = { y0: 3660, pb: 3902, xs: [223, 400, 579, 763, 957] };
  function navbar(s, key) {
    const ti = { home: 0, cmain: 2, amain: 3, my: 4 }[key];
    const l = pin(s, U('navu_' + ti), NAVU.y0, (NAVU.pb - NAVU.y0) + 66);
    l.classList.add('navbar');
    NAVU.xs.forEach((x, i) => {
      const h = hs(l, [x - 88, NAVU.pb - 200, x + 88, NAVU.pb - 30], () => { if (navigator.vibrate) navigator.vibrate(8); tab(TABS[i]); }, { r: 90, dim: false });
      h.classList.add('navbtn');
    });
    s.content.style.height = (parseFloat(s.content.style.height) + 120) + 'px';
    return l;
  }

  /* =========================================================
     온보딩
     ========================================================= */
  { // 스플래시
    const s = screen('splash', { noImg: true, bg: [255, 255, 255] });
    img(U('splash_logo'), s.content, 0, C.splash.logo - SB, 'splash-logo');
    const ch = el('div', 'pinned', s); ch.dataset.pin = 2622 - C.splash.char; img(U('splash_char'), ch, 0, 0, 'splash-char');
    let t;
    enter.splash = () => { clearTimeout(t); t = setTimeout(() => current === 'splash' && reset('ob'), 2300); };
    s.addEventListener('click', () => { clearTimeout(t); reset('ob'); });
  }
  { // 온보딩 4장 (스와이프)
    const s = screen('ob', { noImg: true }); s.dataset.bg = 'rgb(253,253,253)';
    const slider = el('div', 'slider', s.content); at(slider, 0, 0, W, FULL);
    const track = el('div', 'track', slider);
    [1, 2, 3, 4].forEach(i => { const im = el('img', '', track); im.src = S('ob' + i); });
    let idx = 0;
    const setIdx = (i, anim = true) => { idx = Math.max(0, Math.min(3, i)); track.style.transition = anim ? 'transform .38s cubic-bezier(.2,.8,.2,1)' : 'none'; track.style.transform = `translateX(${-idx * W}px)`; };
    hs(s.content, [60, 2280, 1146, 2470], () => idx < 3 ? setIdx(idx + 1) : go('login'), { r: 50 });
    enter.ob = () => setIdx(idx, false);
    swipeX(slider, d => setIdx(idx + d), dx => { track.style.transition = 'none'; let x = -idx * W + dx; if ((idx === 0 && dx > 0) || (idx === 3 && dx < 0)) x = -idx * W + dx * .35; track.style.transform = `translateX(${x}px)`; }, () => setIdx(idx));
  }
  function swipeX(target, onChange, onMove, onCancel) {
    let sx = null, sy = 0, dx = 0, t0 = 0, hz = null;
    target.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; dx = 0; t0 = Date.now(); hz = null; });
    target.addEventListener('pointermove', e => {
      if (sx === null) return; const mx = (e.clientX - sx) / scale, my = (e.clientY - sy) / scale;
      if (hz === null && (Math.abs(mx) > 8 || Math.abs(my) > 8)) { hz = Math.abs(mx) > Math.abs(my); if (hz) target.setPointerCapture(e.pointerId); }
      if (hz) { dx = mx; onMove(dx); }
    });
    const end = () => { if (sx === null) return; sx = null; if (!hz) return; const v = dx / Math.max(1, Date.now() - t0); if (dx < -200 || v < -.6) onChange(1); else if (dx > 200 || v > .6) onChange(-1); else onCancel(); };
    target.addEventListener('pointerup', end); target.addEventListener('pointercancel', end);
  }
  { // 로그인
    const s = screen('login');
    const b = C.login_bubble; img(U('login_bubble'), s.content, b[0], b[1] - SB, 'bob');
    hs(s.content, [960, 200, 1206, 340], () => reset('home', 'push'), { r: 30 });
    [260, 490, 715, 935].forEach(x => hs(s.content, [x - 92, 1970, x + 92, 2150], () => go('p1'), { r: 92 }));
    hs(s.content, [360, 2160, 540, 2240], () => go('p1'), { r: 20 });
    hs(s.content, [580, 2160, 820, 2240], () => go('p1'), { r: 20 });
  }
  { // 개인화1 - 약관
    const s = screen('p1');
    const p = C.p1_pill; const pill = img(U('p1_pill'), s.content, p[0], p[1] - SB);
    const a = C.p1_all; const all = stateImg(s.content, U('p1_all'), a[0], a[1], 104, 105, false);
    const cta = img(U('p1_cta'), s.content, C.p1_cta[0], C.p1_cta[1] - SB, 'press-t disabled');
    // 개별 항목: [0]=필수 약관, [1]=필수 개인정보, [2]=선택 마케팅
    const items = [1699, 1843, 1987].map((y, i) => {
      const st = stateImg(s.content, U('p1_chk' + i), 92, y - 10, 56, 46, false);
      hs(s.content, [60, y - 50, 1000, y + 76], () => { st.set(!st.value); pop(st, 'tap'); sync(); }, { r: 20 });
      return st;
    });
    const sync = () => {
      const every = items.every(i => i.value), must = items[0].value && items[1].value;
      if (all.value !== every) { all.set(every); pop(all); }
      cta.classList.toggle('disabled', !must);
    };
    hs(s.content, [60, 1470, 1146, 1640], () => { const v = !all.value; items.forEach(i => i.set(v)); all.set(v); pop(all); cta.classList.toggle('disabled', !v); }, { r: 30 });
    hs(s.content, [60, 2238, 1146, 2409], () => { if (items[0].value && items[1].value) go('p2'); else { pop(all, 'shake'); toast('필수 항목에 동의해 주세요'); } }, { r: 50 });
    enter.p1 = () => pop(pill, 'dropout');
  }
  // 칩: 처음엔 모두 선택 안 됨. counter가 있으면 'N개 선택됨' 표시
  function chips(s, list, prefix, single, counter) {
    const items = list.map((c, i) => {
      const st = stateImg(s.content, U(prefix + i), c[0], c[1], c[2] - c[0], c[3] - c[1], false);
      hs(s.content, c.slice(0, 4), () => {
        if (single) items.forEach(o => o.set(o === st ? !st.value : false)); else st.set(!st.value);
        pop(st, 'tap'); if (counter) counter(items.filter(o => o.value).length);
      }, { r: 80, dim: false });
      return st;
    });
    return items;
  }
  function countLabel(s) {
    const l = el('div', 'cntlabel', s.content); at(l, 530, 2108 - SB, 300, 56); l.style.display = 'none';
    return n => { l.style.display = n ? 'flex' : 'none'; l.textContent = n + '개 선택됨'; pop(l, 'tap'); };
  }
  // 투표: 처음엔 모두 회색, 눌러서 선택 (여러 개 가능)
  const VOTES = {"cmain": [[114, 1263, 1101, 1419], [114, 1440, 1101, 1596], [114, 1617, 1101, 1773]], "cvote": [[120, 882, 1107, 1037], [120, 1059, 1107, 1214], [120, 1236, 1107, 1391]]};
  function votes(s, key) {
    VOTES[key].forEach((b, i) => {
      const st = stateImg(s.content, U(`vote_${key}_${i}`), b[0], b[1], b[2] - b[0], b[3] - b[1], false);
      hs(s.content, b, () => { st.set(!st.value); pop(st, 'tap'); if (navigator.vibrate) navigator.vibrate(8); }, { r: 30, dim: false });
    });
  }
  const BACKBOX = [0, 186, 190, 340], SKIPBOX = [930, 186, 1206, 340];
  [['p2', 'p3'], ['p3', 'p4'], ['p4', 'p5'], ['p5', 'p6']].forEach(([id, nx]) => {
    const s = screen(id);
    hs(s.content, BACKBOX, goBack, { r: 40 }); hs(s.content, SKIPBOX, () => go(nx), { r: 30 });
    const cta = M[id].ctas[M[id].ctas.length - 1]; hs(s.content, cta, () => go(nx), { r: 50 });
    if (id === 'p2') chips(s, C.chips.p2, 'chip_p2_', false, countLabel(s));
    if (id === 'p3') chips(s, C.chips.p3, 'chip_p3_', false, countLabel(s));
    if (id === 'p4') {
      chips(s, C.chips.p4a, 'chip_p4a_', true); chips(s, C.chips.p4b, 'chip_p4b_', true);
      const row = (dy) => {
        const ml = el('div', 'vlabel', s.content); at(ml, 90, 1690 + dy - SB, 190, 110); ml.style.display = 'none';
        const tl = el('div', 'vlabel', s.content); at(tl, 460, 1690 + dy - SB, 250, 110); tl.style.display = 'none';
        const sel = el('select', 'native', s.content); ['아침', '점심', '저녁', '간식', '야식'].forEach(v => { const o = el('option', '', sel); o.textContent = v; });
        at(sel, 60, 1669 + dy - SB, 327, 151);
        sel.onchange = () => { ml.style.display = sel.value === '아침' ? 'none' : 'flex'; ml.textContent = sel.value; };
        const tm = el('input', 'native', s.content); tm.type = 'time'; tm.value = '06:30'; at(tm, 429, 1669 + dy - SB, 420, 151);
        tm.onchange = () => { const v = tm.value || '06:30', [h, m] = v.split(':'); tl.style.display = v === '06:30' ? 'none' : 'flex'; tl.textContent = `${h} : ${m}`; };
      };
      row(0); let added = false;
      hs(s.content, [1016, 1674, 1156, 1815], () => { if (added) return; added = true; const r = img(U('p4_mealrow'), s.content, C.p4_mealrow[0], C.p4_mealrow[1] + 180 - SB); r.animate([{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'none' }], { duration: 260 }); row(180); }, { r: 70 });
    }
    if (id === 'p5') {
      const rows = [[1040, 1240], [1263, 1463], [1472, 1672], [1695, 1895]];
      C.toggles.forEach((t, i) => { const st = stateImg(s.content, U('tog_' + i), t[0], t[1], 195, 126, false); hs(s.content, [60, rows[i][0], 1146, rows[i][1]], () => st.set(!st.value), { r: 20 }); });
    }
  });
  { // 개인화6 - 냉장고 채우기
    const s = screen('p6');
    hs(s.content, BACKBOX, goBack, { r: 40 }); hs(s.content, SKIPBOX, () => reset('home', 'push'), { r: 30 });
    hs(s.content, [60, 1000, 1146, 1270], () => go('reg_cam'), { r: 40 });
    hs(s.content, [60, 1290, 1146, 1560], () => go('reg_qr'), { r: 40 });
    hs(s.content, [400, 1690, 810, 1790], () => go('reg_manual'), { r: 20 });
    hs(s.content, M.p6.ctas[0], () => reset('home', 'push'), { r: 50 });
  }

  /* =========================================================
     홈
     ========================================================= */
  {
    const s = screen('home');
    const X = 99, c = s.content, b = (x0, y0, x1, y1) => [x0 - X, y0, x1 - X, y1];
    hs(c, b(140, 330, 1150, 480), () => go('rsearch'), { r: 30 });
    hs(c, b(1150, 330, 1260, 480), () => go('reg_qr'), { r: 30 });
    const q = [['reg_cam'], ['fr_cold'], ['rsearch'], ['cmain', 1]];
    q.forEach(([to, isTab], i) => { const x0 = 150 + i * 280; hs(c, b(x0, 540, x0 + 255, 790), () => isTab ? tab(to) : go(to), { r: 30 }); });
    hs(c, b(140, 850, 1270, 1230), () => go('amission'), { r: 40 });
    hs(c, b(1000, 1300, 1270, 1400), () => go('fr_list'), { r: 20 });
    hs(c, b(1000, 2160, 1270, 2260), () => go('cando'), { r: 20 });
    hs(c, b(140, 2290, 1270, 3150), () => go('detail_curry'), { r: 40 });
    hs(c, b(1000, 3300, 1270, 3400), () => go('rsearch'), { r: 20 });
    hs(c, b(1000, 4380, 1270, 4480), () => tab('cmain'), { r: 20 });
    hs(c, b(140, 4500, 1270, 5650), () => go('cpost_photo'), { r: 40 });
    // 가로 스크롤 카드 안 터치
    const strips = c.querySelectorAll('.hscroll');
    if (strips[0]) [60, 636, 1212].forEach(x => hs(strips[0], [x, 0, x + 515, 420], () => go('fr_info'), { r: 30 }));
    if (strips[1]) [60, 528, 995, 1464].forEach((x, i) => hs(strips[1], [x, 0, x + 430, 800], () => openReels(i), { r: 30 }));
    strips.forEach(st => st.oy = 0);
    navbar(s, 'home');
  }
  { // 지금 만들 수 있는 한 끼
    const s = screen('cando'); back(s);
    const map = ['detail_noodle', 'detail_curry', 'detail_yogurt', 'detail_risotto', 'detail_curry'];
    [880, 1250, 1640, 2040, 2440].forEach((y, i) => hs(s.content, [40, y - 40, 1166, y + 340], () => go(map[i]), { r: 30 }));
  }
  { // 레시피 검색
    const s = screen('rsearch'); back(s);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) hs(s.content, [50 + k * 540, 770 + r * 860, 50 + k * 540 + 520, 770 + r * 860 + 830], () => openReels((r * 2 + k) % 5), { r: 30 });
  }

  /* =========================================================
     레시피 - 릴스
     ========================================================= */
  const REELS = ['curry', 'noodle', 'risotto', 'yogurt', 'picnic'];
  let openReels;
  {
    const s = screen('reels', { noImg: true, bg: [0, 0, 0] }); s.classList.add('reels');
    const c = s.content; c.style.height = '100%';
    const feed = el('div', 'feed', s); feed.dataset.fill = 1;
    let idx = 0; const slides = [];
    function makeSlide() {
      const sl = el('div', 'slide', feed);
      const v = el('video', '', sl); v.playsInline = true; v.loop = true; v.preload = 'metadata'; v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
      const ui = el('img', 'abs', sl); ui.style.left = '0px'; ui.style.top = '0px';
      const panel = el('div', 'rpanel', sl);
      const bar = el('div', 'rbar', sl); const fill = el('div', 'rfill', bar);
      const btn = el('img', 'abs', sl);
      const pause = el('div', 'rpause', sl);
      sl.v = v; sl.ui = ui; sl.btn = btn; sl.fill = fill; sl.pause = pause;
      v.addEventListener('timeupdate', () => { fill.style.width = (v.currentTime / (v.duration || 1) * 100) + '%'; });
      return sl;
    }
    for (let i = 0; i < 3; i++) slides.push(makeSlide());
    function load(sl, k) {
      const e = REELS[(k % 5 + 5) % 5]; if (sl.key === e) return; sl.key = e;
      sl.v.src = R(`reels/${e}.mp4`); sl.ui.src = R(`reels/${e}_ui.png`);
      const r = D.reels[e].btn; sl.btn.src = R(`reels/${e}_btn.png`); at(sl.btn, r[0] - 3, r[1] - 3 - SB);
    }
    function place(off = 0, anim = false) {
      slides.forEach((sl, i) => { sl.style.transition = anim ? 'transform .36s cubic-bezier(.2,.8,.2,1)' : 'none'; sl.style.transform = `translateY(${(i - 1) * stageH + off}px)`; });
    }
    function arrange() { load(slides[0], idx - 1); load(slides[1], idx); load(slides[2], idx + 1); place(0); s.syncReelUI && s.syncReelUI(); }
    function playCur() {
      slides.forEach((sl, i) => { if (i !== 1) { sl.v.pause(); } });
      const v = slides[1].v; slides[1].pause.classList.remove('on');
      v.muted = false; const p = v.play(); if (p) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
    }
    function move(d) {
      if (d === 1) { slides.push(slides.shift()); } else { slides.unshift(slides.pop()); }
      idx += d;
      // 새로 들어온 슬라이드 위치를 먼저 맞추고 나서 애니메이션
      const off = d === 1 ? stageH : -stageH;
      slides.forEach((sl, i) => { sl.style.transition = 'none'; sl.style.transform = `translateY(${(i - 1) * stageH + off}px)`; });
      load(slides[d === 1 ? 2 : 0], idx + d);
      void feed.offsetWidth; place(0, true);
      slides[1].v.currentTime = 0; playCur(); s.syncReelUI && s.syncReelUI();
    }
    // 세로 스와이프
    let sy = null, dy = 0, t0 = 0, sx = 0, vert = null;
    s.addEventListener('pointerdown', e => { if (sheetOpen || current !== 'reels') return; sy = e.clientY; sx = e.clientX; dy = 0; t0 = Date.now(); vert = null; });
    s.addEventListener('pointermove', e => {
      if (sy === null) return; const my = (e.clientY - sy) / scale, mx = (e.clientX - sx) / scale;
      if (vert === null && (Math.abs(my) > 10 || Math.abs(mx) > 10)) { vert = Math.abs(my) > Math.abs(mx); }
      if (vert) { dy = my; place(dy); }
    });
    const end = () => {
      if (sy === null) return; sy = null; if (!vert) return; window.__swipeAt = Date.now();
      const v = dy / Math.max(1, Date.now() - t0);
      if (dy < -260 || v < -.5) move(1); else if (dy > 260 || v > .5) move(-1); else place(0, true);
    };
    s.addEventListener('pointerup', end); s.addEventListener('pointercancel', end);
    // 터치 영역 (현재 슬라이드 기준)
    const top = el('div', 'layer', s); top.oy = SB; top.style.top = '0px';
    hs(top, [0, 186, 190, 340], goBack, { r: 40 });
    hs(top, [1040, 186, 1206, 340], () => go('rsearch'), { r: 40 });
    hs(top, [0, 1990, 1000, 2300], () => openSheet(), { r: 20, dim: false });
    hs(top, [60, 2361, 1146, 2532], () => openSheet(), { r: 44 });
    hs(top, [0, 360, 1020, 1900], () => { const sl = slides[1], v = sl.v; if (v.paused) { v.play(); sl.pause.classList.remove('on'); } else { v.pause(); sl.pause.classList.add('on'); } }, { dim: false, r: 0 });
    // 좋아요 하트 톡톡
    // 좋아요: 누르면 빨간 하트로 채워짐 (릴스마다 따로 기억)
    const liked = {}, followed = {};
    const heart = el('div', 'rheart', top); at(heart, 1066, 1285 - SB, 75, 66);
    heart.innerHTML = '<svg viewBox="0 0 24 21"><path d="M12 20.3l-1.5-1.3C5.3 14.3 2 11.3 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 3.8-3.3 6.8-8.5 11.5L12 20.3z" fill="#FF4D5E" stroke="#FF4D5E" stroke-width="1"/></svg>';
    const syncLike = () => { heart.classList.toggle('on', !!liked[slides[1].key]); };
    hs(top, [1040, 1250, 1206, 1400], () => {
      const k = slides[1].key; liked[k] = !liked[k]; syncLike();
      if (liked[k]) { pop(heart, 'pop'); burst(top, 1103, 1318 - SB, U('emoji_0'), 6); if (navigator.vibrate) navigator.vibrate(10); }
    }, { r: 60, dim: false });
    // 팔로우 → 팔로잉
    const FX = { curry: 495, noodle: 465, risotto: 495, yogurt: 549, picnic: 402 };
    const fol = el('div', 'rfollow', top); fol.textContent = '팔로잉';
    const syncFollow = () => { const k = slides[1].key; at(fol, FX[k] || 495, 1878 - SB, 176, 95); fol.classList.toggle('on', !!followed[k]); fHs.style.left = (FX[k] || 495) + 'px'; };
    const fHs = hs(top, [495, 1870, 671, 1980], () => { const k = slides[1].key; followed[k] = !followed[k]; syncFollow(); if (followed[k]) toast('팔로우했어요'); }, { r: 50, dim: false });
    fHs.style.zIndex = 7;
    s.syncReelUI = () => { syncLike(); syncFollow(); };

    // 레시피 시트 (밑에서 올라오는 카드)
    let sheetOpen = false;
    const dimmer = el('div', 'sheetdim', s);
    const sheetWrap = el('div', 'sheetwrap', s);
    const sheetScroll = el('div', 'sheetscroll', sheetWrap);
    const sheetImg = el('img', '', sheetScroll);
    const sheetHs = el('div', 'layer', sheetScroll); sheetHs.style.top = '0px';
    let exPop = null;
    function openSheet() {
      const e = slides[1].key, m = C.sheets[e];
      sheetImg.src = U('sheet_' + e); sheetHs.innerHTML = ''; sheetHs.oy = m.y;
      const avail = stageH - (m.y - SB);
      sheetWrap.style.top = (m.y - SB) + 'px'; sheetWrap.style.height = avail + 'px';
      sheetHs.style.height = m.h + 'px';
      const cta = M['sheet_' + e].ctas[0];
      hs(sheetHs, cta, () => { closeSheet(true); go('detail_' + e); }, { r: 44 });
      if (e === 'curry') exPop = exclaim(sheetHs, [690, 1960, 870, 2180], 500, 2185);
      sheetOpen = true; s.classList.add('sheet-on'); sheetScroll.scrollTop = 0;
    }
    function closeSheet(keep) { sheetOpen = false; s.classList.remove('sheet-on'); }
    dimmer.addEventListener('click', () => closeSheet());
    // 시트 아래로 끌어 닫기
    let gy = null;
    sheetWrap.addEventListener('pointerdown', e => { if (sheetScroll.scrollTop <= 0) gy = e.clientY; });
    sheetWrap.addEventListener('pointermove', e => { if (gy === null) return; const d = (e.clientY - gy) / scale; if (d > 0) { sheetWrap.style.transition = 'none'; sheetWrap.style.transform = `translateY(${d}px)`; } });
    const gend = e => { if (gy === null) return; const d = (e.clientY - gy) / scale; gy = null; sheetWrap.style.transition = ''; sheetWrap.style.transform = ''; if (d > 220) closeSheet(); };
    sheetWrap.addEventListener('pointerup', gend); sheetWrap.addEventListener('pointercancel', gend);

    openReels = (k = 0, homeBack = false) => {
      idx = k; arrange(); slides.forEach(sl => sl.v.currentTime = 0);
      if (current === 'reels') { playCur(); return; }
      if (homeBack) { if (busy) return; stack.length = 0; stack.push('home'); history.replaceState({ id: 'reels' }, '', '#reels'); show('reels', 'push'); return; }   // 요리완료 → 둘러보기: 뒤로가면 홈
      (TABS.includes(current) ? tab : go)('reels');
    };
    enter.reels = () => { if (!slides[1].key) arrange(); place(0); slides[1].fill.style.width = '0%'; playCur(); };
    leave.reels = () => { slides.forEach(sl => sl.v.pause()); closeSheet(); };
    s.slidesRef = slides;
  }
  // 느낌표 말풍선 (대신 닭가슴살이 있어요!)
  function exclaim(layer, box, x, y) {
    const p = img(U('ex_popup'), layer, x, y - (layer.oy || 0), 'expop');
    hs(layer, box, () => { p.classList.toggle('on'); if (p.classList.contains('on')) setTimeout(() => p.classList.remove('on'), 2600); }, { r: 30, dim: false });
    return p;
  }
  // 이모지 하트 폭죽
  function burst(layer, x, y, src, n = 7) {
    for (let i = 0; i < n; i++) {
      const e = img(src, layer, x - 40, y - 40, 'burst'); e.style.width = '80px';
      const dx = (Math.random() - .5) * 360, dy = -260 - Math.random() * 320, r = (Math.random() - .5) * 60, s = .6 + Math.random() * .6;
      e.animate([{ transform: 'translate(0,0) scale(.2)', opacity: 0 }, { transform: `translate(${dx * .3}px,${dy * .3}px) scale(${s})`, opacity: 1, offset: .25 }, { transform: `translate(${dx}px,${dy}px) scale(${s * .8}) rotate(${r}deg)`, opacity: 0 }], { duration: 900 + Math.random() * 500, delay: i * 40, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => e.remove();
    }
  }

  /* =========================================================
     레시피 상세 → 조리모드 → 요리완료
     ========================================================= */
  const COOK = { curry: 3, noodle: 3, risotto: 3, yogurt: 2, picnic: 1 };
  REELS.forEach(e => {
    const s = screen('detail_' + e); back(s);
    hs(s.content, M['detail_' + e].ctas[0], () => go(`cook_${e}_1`), { r: 50 });
    if (e === 'curry') exclaim(s.content, [600, 1880, 800, 2180], 400, 2185);
    for (let i = 1; i <= COOK[e]; i++) {
      const id = `cook_${e}_${i}`, cs = screen(id); back(cs);
      const nx = i < COOK[e] ? `cook_${e}_${i + 1}` : 'done_' + e;
      // '다음' 버튼: 화면 하단 고정
      const c = M[id].ctas[M[id].ctas.length - 1], cy0 = c[1] - 14, ch = c[3] + 14 - cy0;
      const bar = pin(cs, null, cy0, ch + 80, 30); bar.classList.add('ctabar');
      const fade = el('div', 'ctafade', bar); fade.style.background = `linear-gradient(rgba(${M[id].bg.join(',')},0), rgb(${M[id].bg.join(',')}) 70px)`;
      img(U('cta_' + id), bar, 0, 0, 'ctaimg');
      hs(bar, [c[0] - 30, c[1], c[2] - 30, c[3]], () => go(nx), { r: 50 });
      cs.content.style.height = (parseFloat(cs.content.style.height) + 100) + 'px';
      if (D.dyn.timer[id]) timer(cs, D.dyn.timer[id]);
    }
    const ds = screen('done_' + e); back(ds);
    const dc = M['done_' + e].ctas[0];
    hs(ds.content, dc, () => go('cwrite'), { r: 50 });
    hs(ds.content, [380, dc[3] + 30, 830, dc[3] + 150], () => openReels(REELS.indexOf(e), true), { r: 20 });
    (D.dyn.steps['done_' + e] || []).forEach(p => stepper(ds, p));
    photo(ds, D.photo['done_' + e]);
  });
  // 전자레인지 타이머
  function timer(s, o) {
    const [ox, oy] = o; let left = 180, t = null;
    const lab = el('div', 'tlabel', s.content); at(lab, 112 + ox, 2008 + oy - SB, 420, 134); lab.style.display = 'none';
    const draw = () => { const m = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0'); lab.textContent = `${m}:${ss}`; lab.style.display = left === 180 ? 'none' : 'flex'; };
    const play = hs(s.content, [760 + ox, 2005 + oy, 910 + ox, 2155 + oy], () => {
      if (t) { clearInterval(t); t = null; play.classList.remove('running'); return; }
      play.classList.add('running');
      t = setInterval(() => { left = Math.max(0, left - 1); draw(); if (!left) { clearInterval(t); t = null; play.classList.remove('running'); toast('조리 완료! 다음 단계로 넘어가 주세요'); if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } }, 1000);
    }, { r: 80 });
    hs(s.content, [935 + ox, 2005 + oy, 1085 + ox, 2155 + oy], () => { clearInterval(t); t = null; left = 180; draw(); play.classList.remove('running'); }, { r: 80 });
  }
  // 수량 - / +
  function stepper(s, [x, y]) {
    let n = 1; const lab = el('div', 'slabel', s.content); at(lab, x + 85, y + 22 - SB, 60, 80); lab.style.display = 'none';
    const draw = () => { lab.textContent = n; lab.style.display = n === 1 ? 'none' : 'flex'; pop(lab, 'tap'); };
    hs(s.content, [x, y, x + 70, y + 120], () => { n = Math.max(0, n - 1); draw(); }, { r: 30 });
    hs(s.content, [x + 165, y, x + 250, y + 120], () => { n = Math.min(99, n + 1); draw(); }, { r: 30 });
  }
  // 완성 사진 남기기 (실제 사진 선택)
  function photo(s, b) {
    if (!b) return;
    const box = el('div', 'photobox', s.content); at(box, b[0], b[1] - SB, b[2] - b[0], b[3] - b[1]);
    const inp = el('input', 'native', box); inp.type = 'file'; inp.accept = 'image/*'; at(inp, 0, 0, b[2] - b[0], b[3] - b[1]);
    inp.onchange = () => { const f = inp.files[0]; if (!f) return; box.style.backgroundImage = `url(${URL.createObjectURL(f)})`; box.classList.add('has'); };
  }

  /* =========================================================
     커뮤니티
     ========================================================= */
  {
    const s = screen('cmain'), c = s.content;
    hs(c, [820, 200, 940, 320], () => go('csearch'), { r: 60 });
    const chipsX = [[60, 205, 'cmain'], [225, 445, 'cvote'], [470, 690, 'cpost_photo'], [715, 935, 'cdeals'], [960, 1206, 'cshare']];
    chipsX.forEach(([a, b, to]) => hs(c, [a, 380, b, 480], () => to !== 'cmain' && go(to), { r: 50 }));
    hs(c, [60, 520, 1146, 770], () => go('cprofile'), { r: 30 });
    hs(c, [880, 870, 1146, 970], () => go('cvote'), { r: 20 });
    hs(c, [60, 990, 1146, 1250], () => go('cvote'), { r: 30 });
    hs(c, [60, 1780, 1146, 1900], () => go('cvote'), { r: 30 });
    votes(s, 'cmain');
    hs(c, [880, 2040, 1146, 2140], () => go('cdeals'), { r: 20 });
    hs(c, [60, 2170, 1146, 2580], () => go('cdeal'), { r: 30 });
    hs(c, [880, 2770, 1146, 2870], () => go('cdeals'), { r: 20 });
    hs(c, [60, 2890, 1146, 3340], () => go('cdeal'), { r: 20 });
    hs(c, [60, 3370, 1146, 3810], () => go('cvote'), { r: 20 });
    hs(c, [60, 3840, 1146, 4260], () => go('cshare'), { r: 20 });
    hs(c, [60, 4290, 1146, 4660], () => go('cpost_photo'), { r: 20 });
    const nav = navbar(s, 'cmain');
    const f = pin(s, U('fab_write'), 0, 480, 816);
    f.querySelector('img').classList.add('fab'); hs(f, [0, 0, 330, 165], () => go('cwrite'), { r: 80, dim: false });
  }
  { const s = screen('cwrite'); hs(s.content, [0, 186, 190, 340], goBack, { r: 40 }); }
  { const s = screen('csearch'); back(s); hs(s.content, [960, 186, 1206, 340], goBack); hs(s.content, [40, 870, 1166, 3500], () => go('cpost'), { r: 30 }); }
  {
    const s = screen('cdeals'); back(s); [1080, 1820, 2560, 3300].forEach(y => hs(s.content, [60, y, 1146, y + 700], () => go('cdeal'), { r: 30 }));
    // 글쓰기 버튼: 화면에 고정. 처음엔 '+'만 보이다가 누르면 '글쓰기'로 펼쳐지고, 한 번 더 누르면 글쓰기 화면
    const f = pin(s, U('deal_fab'), 0, 400, 812); f.classList.add('dealfab'); img(U('deal_plus'), f, 0, 0, 'plusimg');
    let open = false;
    const fh = hs(f, [0, 0, 337, 173], () => { if (!open) { open = true; f.classList.add('open'); clearTimeout(f.t); f.t = setTimeout(() => { open = false; f.classList.remove('open'); }, 3500); } else go('cwrite'); }, { r: 90, dim: false });
    enter.cdeals = () => { open = false; f.classList.remove('open'); };
  }
  {
    const s = screen('cprofile'); back(s);
    const fl = el('div', 'followbtn', s.content); at(fl, 66, 1155 - SB, 525, 123); fl.textContent = '팔로잉';
    hs(s.content, [60, 1140, 600, 1290], () => { const on = !fl.classList.contains('on'); fl.classList.toggle('on', on); if (on) { pop(fl, 'tap'); toast('팔로우했어요!'); } }, { r: 30 });
  }
  // 게시글 상세: 공감하기 + 댓글창
  ['cpost', 'cpost_photo', 'cvote', 'cshare', 'cdeal'].forEach(id => {
    const s = screen(id, { pad: 460 }); back(s);
    if (id === 'cvote') votes(s, 'cvote');
    if (id === 'cdeal') hs(s.content, [60, 370, 1146, 600], () => go('fr_cold'), { r: 30 });
    const b = D.emp[id]; if (b) empathy(s, b);
    const bar = pin(s, U('comment_bar'), 0, 366);
    const inp = el('input', 'cinput', bar); inp.placeholder = ''; at(inp, 60, 60, 900, 130);
    inp.addEventListener('focus', () => { bar.classList.add('typing'); setTimeout(layout, 300); setTimeout(layout, 700); });
    inp.addEventListener('blur', () => { bar.classList.remove('typing'); bar.style.transform = ''; setTimeout(layout, 100); });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && inp.value) { inp.value = ''; inp.blur(); toast('댓글을 남겼어요'); } });
  });
  function empathy(s, [x, y, w, h]) {
    const c = s.content; let chosen = -1;
    const picker = el('div', 'picker', c); at(picker, x - 4, y - SB - 177 - 30, 645, 177);
    img(U('react_picker'), picker, 0, 0);
    const ems = C.emojis.map((p, i) => { const e = img(U('emoji_' + i), picker, p[0] - p[2], p[1] - p[2], 'em'); e.style.animationDelay = (i * 55) + 'ms'; return e; });
    const cover = el('div', 'rcover', c); at(cover, x, y - SB, w, h);
    const chip = el('img', 'abs rchip', c);
    const btn = hs(c, [x, y, x + w, y + h], () => { if (chosen >= 0) { chosen = -1; chip.style.display = 'none'; cover.style.display = 'none'; return; } picker.classList.toggle('on'); }, { r: 60, dim: false });
    C.emojis.forEach((p, i) => {
      const e = ems[i];
      e.style.pointerEvents = 'auto';
      e.addEventListener('click', ev => {
        ev.stopPropagation(); chosen = i; picker.classList.remove('on');
        const [cw, ch] = C.react_chips[i]; chip.src = U('react_chip_' + i); at(chip, x, y - SB + (h - ch) / 2, cw, ch); chip.style.display = 'block'; cover.style.display = 'block'; pop(chip, 'pop');
        burst(c, x + w / 2, y - SB, U('emoji_' + i), 9);
        if (navigator.vibrate) navigator.vibrate(15);
      });
    });
    s.addEventListener('click', () => picker.classList.remove('on'));
  }

  /* =========================================================
     밥푸리 (앱테크)
     ========================================================= */
  function bapuri(s, key) {
    const ch = D.chars[key];
    const w = el('div', 'charwrap', s.content); at(w, ch.x, ch.y - SB, ch.w, ch.h);
    const i = img(U('char_' + key), w, 0, 0, 'idle');
    w.addEventListener('click', e => { e.stopPropagation(); pop(i, 'hop'); if (navigator.vibrate) navigator.vibrate(10); });
    return w;
  }
  {
    const s = screen('amain'); const c = s.content;
    hs(c, [0, 186, 190, 340], goBack, { r: 40 }).style.zIndex = 8;   // 이전 버튼 (탭 화면이면 홈으로)
    bapuri(s, 'amain');
    hs(c, [40, 340, 560, 1000], () => go('agrow'), { r: 40, dim: false }).style.zIndex = 4;
    hs(c, [580, 340, 1166, 560], () => go('apoints'), { r: 30 });
    hs(c, [580, 590, 1166, 1000], () => go('ashop'), { r: 30 });
    hs(c, [880, 1080, 1166, 1180], () => go('amission'), { r: 20 });
    hs(c, [40, 1200, 1166, 1900], () => go('amission'), { r: 30 });
    hs(c, [40, 2150, 1166, 2680], () => go('amission'), { r: 30 });
    navbar(s, 'amain');
  }
  { const s = screen('agrow'); back(s); bapuri(s, 'agrow'); hs(s.content, [90, 230, 470, 340], () => go('acloset'), { r: 50 }); hs(s.content, [880, 1760, 1166, 1860], () => go('astamp'), { r: 20 }); hs(s.content, M.agrow.ctas[0], () => go('astamp'), { r: 50 }); }
  {
    const s = screen('acloset'); back(s); bapuri(s, 'acloset');
    hs(s.content, M.acloset.ctas[0], () => { toast('저장했어요'); setTimeout(goBack, 500); }, { r: 50 });
    // 착용하기 ↔ 착용중 (한 번에 하나만 착용)
    const wear = [96, 654].map((x, i) => stateImg(s.content, U('wear'), x, 2295, 456, 120, i === 1));
    wear.forEach((w, i) => hs(s.content, [w === wear[0] ? 96 : 654, 2295, (w === wear[0] ? 96 : 654) + 456, 2415], () => {
      if (w.value) return; wear.forEach(o => o.set(o === w)); pop(w, 'tap'); toast(i === 0 ? '요리사 장갑을 착용했어요' : '작은 주걱을 착용했어요');
      const ch = s.content.querySelector('.charwrap img'); if (ch) pop(ch, 'hop');
    }, { r: 50, dim: false }));
  }
  { const s = screen('ashop'); back(s); }
  { const s = screen('amission'); back(s); M.amission.ctas.forEach(b => hs(s.content, b, () => go('cwrite'), { r: 50 })); }
  { const s = screen('astamp'); back(s); }
  { const s = screen('apoints'); back(s); }

  /* =========================================================
     MY
     ========================================================= */
  {
    const s = screen('my'); const c = s.content;
    hs(c, [800, 1250, 960, 1340], () => go('apoints'), { r: 40 });
    hs(c, [960, 1250, 1120, 1340], () => go('ashop'), { r: 40 });
    hs(c, [40, 1400, 380, 1700], () => go('cprofile'), { r: 30 });
    hs(c, [40, 1880, 1166, 2680], () => go('mreport'), { r: 30 });
    hs(c, [40, 2760, 1166, 2900], () => go('mreport'), { r: 20 });
    hs(c, [40, 3260, 1166, 3400], () => go('mbadge'), { r: 20 });
    hs(c, [380, 3500, 820, 3600], () => reset('login'), { r: 20 });
    navbar(s, 'my');
  }
  { const s = screen('mreport'); back(s); }
  { const s = screen('mbadge'); back(s); }

  /* =========================================================
     내 냉장고
     ========================================================= */
  const POPS = { fr_cold: [3, 4, 5, 6, 7, 8, 9, 10, 11], fr_frozen: [19, 20, 21, 22, 23, 24, 25, 26, 1], fr_room: [2, 12, 13, 14, 15, 16, 17, 18, 27] };
  const sheetLayer = (s, src, w, h, onTap) => {
    const dim = el('div', 'modaldim', s); dim.dataset.fill = 1;
    const sh = el('div', 'modal', s); const im = img(U(src), sh, 0, 0);
    sh.style.width = w + 'px'; sh.style.height = h + 'px';
    const open = () => { dim.classList.add('on'); sh.classList.add('on'); };
    const close = () => { dim.classList.remove('on'); sh.classList.remove('on'); };
    dim.addEventListener('click', close);
    sh.oy = 0; return { dim, sh, open, close };
  };
  ['fr_cold', 'fr_frozen', 'fr_room'].forEach(id => {
    const s = screen(id), c = s.content;
    const tabsX = { fr_cold: [400, 560], fr_frozen: [590, 760], fr_room: [790, 950] };
    Object.entries(tabsX).forEach(([to, [a, b]]) => hs(c, [a, 500, b, 620], () => to !== id && replace(to), { r: 50 }));
    // 카테고리 정렬 시트
    const cat = sheetLayer(s, 'cat_sheet', 1248, 1250); cat.sh.classList.add('bottom'); cat.sh.style.left = '-19px';
    hs(cat.sh, [19, 950, 1225, 1120], cat.close, { r: 0 });
    [[19, 166, 1225, 336], [19, 344, 1225, 514], [19, 520, 1225, 690], [19, 696, 1225, 866]].forEach(b => hs(cat.sh, b, () => { setTimeout(cat.close, 200); }, { r: 0 }));
    hs(c, [40, 500, 380, 620], cat.open, { r: 50 });
    // 식재료 팝오버
    const dim = el('div', 'frdim', c); at(dim, 0, 0, W, parseFloat(c.style.height));
    const pp = img('', c, 0, 0, 'frpop');
    const close = () => { dim.classList.remove('on'); pp.classList.remove('on'); };
    dim.addEventListener('click', close);
    const PX = [120, 490, 687], PY = [1296, 1790, 1844];
    POPS[id].forEach((n, k) => {
      const col = k % 3, row = Math.floor(k / 3);
      hs(c, [40 + col * 380, 880 + row * 495, 40 + col * 380 + 360, 880 + row * 495 + 460], () => {
        pp.src = U('pop_' + n); at(pp, PX[col], PY[row] - SB); dim.classList.add('on'); pp.classList.add('on');
      }, { r: 30, dim: false });
    });
    pp.addEventListener('click', e => { e.stopPropagation(); const r = pp.getBoundingClientRect(); const y = (e.clientY - r.top) / scale; if (y > 280) { close(); go('fr_info'); } });
    // 하단 독 (고정)
    const dock = pin(s, U('dock_' + id), C.dock.y0, 2800 - C.dock.y0 + 40);
    hs(dock, [76, 2577, 276, 2777], () => tab('home'), { r: 100, dim: false });
    hs(dock, [550, 2580, 750, 2780], () => go('reg_manual'), { r: 60 });
    hs(dock, [740, 2580, 925, 2780], () => go('reg_qr'), { r: 60 });
    hs(dock, [920, 2580, 1110, 2780], () => go('reg_cam'), { r: 60 });
    // '전체보기' 버튼: 스크롤과 상관없이 독 위에 고정
    const all = pin(s, U('fr_all'), 2441, 2800 - 2441 + 40, 479);
    hs(all, [479 - 479, 2441, 727 - 479, 2548], () => go('fr_list'), { r: 54 });
  });
  function replace(id) { if (busy) return; history.replaceState({ id }, '', '#' + id); show(id, 'tab'); }
  { // 식재료 정보
    const s = screen('fr_info'); back(s);
    const eat = sheetLayer(s, 'eat_sheet', 1368, 873); eat.sh.classList.add('bottom'); eat.sh.style.left = '-18px';
    const cta = M.fr_info.ctas[0]; hs(s.content, cta, () => eat.open(), { r: 50 });
    hs(eat.sh, [60, 600, 1180, 785], () => { eat.close(); toast(`${amount}개 먹었다고 기록했어요!`); }, { r: 50 });
    // 먹은 양 슬라이더 (0~6개, 손가락으로 끌기 + 1~4개 칩)
    const MAX = 6, TX0 = 85, TX1 = 1156;
    let amount = 4;
    const big = el('div', 'eatnum', eat.sh); at(big, 80, 172, 260, 96);
    const cover = el('div', 'eatcover', eat.sh); at(cover, TX0 - 30, 292, TX1 - TX0 + 60, 70);
    const track = el('div', 'eattrack', eat.sh); at(track, TX0, 312, TX1 - TX0, 26);
    const fill = el('div', 'eatfill', track);
    const thumb = el('div', 'eatthumb', track);
    const setAmt = (v, snap = true) => {
      const r = Math.max(0, Math.min(1, v / MAX)); amount = Math.round(v);
      const px = (snap ? amount / MAX : r) * (TX1 - TX0);
      fill.style.width = px + 'px'; thumb.style.left = (px - 27) + 'px'; big.textContent = amount + '개';
    };
    setAmt(4);
    const drag = el('div', 'hs', eat.sh); at(drag, TX0 - 40, 270, TX1 - TX0 + 80, 110); drag.style.zIndex = 8; drag.style.touchAction = 'none';
    const fromEv = e => { const r = track.getBoundingClientRect(); return (e.clientX - r.left) / r.width * MAX; };
    let dragging = false;
    drag.addEventListener('pointerdown', e => { dragging = true; drag.setPointerCapture(e.pointerId); setAmt(fromEv(e), false); });
    drag.addEventListener('pointermove', e => { if (dragging) setAmt(fromEv(e), false); });
    const up = e => { if (!dragging) return; dragging = false; setAmt(fromEv(e)); if (navigator.vibrate) navigator.vibrate(6); };
    drag.addEventListener('pointerup', up); drag.addEventListener('pointercancel', up);
    [[84, 210], [210, 330], [330, 450], [450, 570]].forEach(([a, b], i) => hs(eat.sh, [a, 400, b, 530], () => setAmt(i + 1), { r: 40 }));
    const open0 = eat.open; eat.open = () => { setAmt(4); open0(); };
    const st = s.content.querySelector('.hscroll'); if (st) { st.oy = 0; [0, 1, 2, 3].forEach(i => hs(st, [66 + i * 476, 0, 66 + i * 476 + 450, 800], () => openReels(i), { r: 30 })); }
  }
  { // 세부 리스트
    const s = screen('fr_list'); back(s);
    [1040, 1430, 1820, 2210, 2600].forEach(y => hs(s.content, [40, y - 60, 1166, y + 300], () => go('fr_info'), { r: 30 }));
    [0, 1, 2, 3].forEach(i => hs(s.content, [60 + i * 300, 3200, 60 + i * 300 + 280, 3950], () => openReels(i), { r: 30 }));
  }
  /* ---------------- 식재료 등록 ---------------- */
  const regDock = (s) => {
    hs(s.content, [57, 2335, 257, 2535], goBack, { r: 100, dim: false });
    hs(s.content, [360, 2340, 550, 2530], () => go('fr_cold'), { r: 60 });
    hs(s.content, [550, 2340, 745, 2530], () => replace('reg_manual'), { r: 60 });
    hs(s.content, [745, 2340, 925, 2530], () => replace('reg_qr'), { r: 60 });
    hs(s.content, [925, 2340, 1110, 2530], () => replace('reg_cam'), { r: 60 });
  };
  {
    const s = screen('reg_cam'); regDock(s);
    hs(s.content, [597, 450, 830, 560], () => replace('reg_qr'), { r: 50 });
    const conf = sheetLayer(s, 'reg_confirm', 1242, 2124); conf.sh.classList.add('center'); conf.sh.style.left = '-18px';
    hs(conf.sh, [40, 1800, 1200, 2080], () => { conf.close(); go('fr_cold'); }, { r: 50 });
    const flash = el('div', 'flash', s); flash.dataset.fill = 1;
    // ---- 실제 카메라 ----
    const BOX = [150, 760, 1055, 1920];
    const vf = el('div', 'camview', s.content); at(vf, BOX[0], BOX[1] - SB, BOX[2] - BOX[0], BOX[3] - BOX[1]);
    const video = el('video', '', vf); video.muted = true; video.playsInline = true; video.setAttribute('playsinline', ''); video.setAttribute('muted', ''); video.autoplay = true;
    const still = el('canvas', 'camstill', vf);
    img(U('cam_frame'), s.content, 130, 735 - SB, 'camframe');
    let stream = null, torch = false;
    async function startCam() {
      if (stream || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1920 } }, audio: false });
        if (current !== 'reg_cam') { stopCam(); return; }
        video.srcObject = stream; await video.play().catch(() => {}); vf.classList.add('on');
      } catch (e) { toast('카메라 권한을 허용해 주세요'); }
    }
    function stopCam() { if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; } vf.classList.remove('on', 'frozen'); torch = false; }
    enter.reg_cam = () => { vf.classList.remove('frozen'); setTimeout(startCam, 350); };
    leave.reg_cam = stopCam;
    // 셔터: 화면 멈춤 + 플래시 → 등록 확인
    hs(s.content, [500, 2040, 710, 2250], () => {
      if (stream && video.videoWidth) {
        const vw = video.videoWidth, vh = video.videoHeight, bw = BOX[2] - BOX[0], bh = BOX[3] - BOX[1];
        const sc = Math.max(bw / vw, bh / vh), sw = bw / sc, sh = bh / sc;
        still.width = bw; still.height = bh;
        still.getContext('2d').drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, bw, bh);
        vf.classList.add('frozen');
      }
      pop(flash, 'go'); if (navigator.vibrate) navigator.vibrate(20);
      setTimeout(conf.open, 450);
    }, { r: 110 });
    const close0 = conf.close; conf.close = () => { close0(); vf.classList.remove('frozen'); };
    conf.dim.onclick = conf.close;
    // 앨범에서 고르기
    const pick = el('input', 'native', s.content); pick.type = 'file'; pick.accept = 'image/*'; at(pick, 165, 2065 - SB, 160, 160);
    pick.onchange = () => {
      const f = pick.files[0]; if (!f) return; const im = new Image();
      im.onload = () => {
        const bw = BOX[2] - BOX[0], bh = BOX[3] - BOX[1], sc = Math.max(bw / im.width, bh / im.height);
        still.width = bw; still.height = bh; const g = still.getContext('2d');
        g.drawImage(im, (bw - im.width * sc) / 2, (bh - im.height * sc) / 2, im.width * sc, im.height * sc);
        vf.classList.add('on', 'frozen'); setTimeout(conf.open, 300); pick.value = '';
      };
      im.src = URL.createObjectURL(f);
    };
    // 플래시(손전등) – 지원하는 폰에서만
    hs(s.content, [880, 2065, 1040, 2225], async () => {
      const t = stream && stream.getVideoTracks()[0];
      const caps = t && t.getCapabilities ? t.getCapabilities() : {};
      if (!caps.torch) { toast('이 기기에서는 플래시를 켤 수 없어요'); return; }
      torch = !torch; try { await t.applyConstraints({ advanced: [{ torch }] }); } catch (e) {}
    }, { r: 80 });
  }
  /* ---------------- 밥풀 멤버십 QR ↔ 아이패드 POS 연동 ---------------- */
  const MEMBER = (() => {
    let m = null; try { m = localStorage.getItem('bapful_member'); } catch (e) {}
    if (!/^M\d{4}$/.test(m || '')) { m = 'M' + String(1 + Math.floor(Math.random() * 400)).padStart(4, '0'); try { localStorage.setItem('bapful_member', m); } catch (e) {} }
    return m;
  })();
  let received = null;
  function drawMemberQR(cv) {
    const Q = window.MEMBER_QR; if (!Q) return false;
    const n = Q.n, hex = Q.codes[parseInt(MEMBER.slice(1), 10) - 1]; if (!hex) return false;
    let bits = ''; for (const h of hex) bits += parseInt(h, 16).toString(2).padStart(4, '0');
    const S = cv.width, cell = S / n, g = cv.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, S, S); g.fillStyle = '#000';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (bits[r * n + c] === '1') g.fillRect(Math.floor(c * cell), Math.floor(r * cell), Math.ceil(cell), Math.ceil(cell));
    return true;
  }
  {
    const s = screen('reg_qr'); regDock(s); let t = null, failed = 0;
    hs(s.content, [365, 490, 597, 610], () => replace('reg_cam'), { r: 50 });
    const cv = el('canvas', 'memberqr', s.content); cv.width = cv.height = 516; at(cv, 345, 801 - SB, 516, 516);
    const ok = drawMemberQR(cv); if (!ok) cv.style.display = 'none';
    const no = el('div', 'memberno', s.content); at(no, 0, 1400 - SB, W, 60); no.textContent = '회원번호 ' + MEMBER;
    // 1순위: 우리 서버(/api) · 2순위: 공개 중계(ntfy.sh) – Storage가 없어도 동작
    const RELAY = 'https://ntfy.sh/bapful-cc33-' + MEMBER;
    let since = 0, seen = new Set();
    const got = (data) => { received = data; if (navigator.vibrate) navigator.vibrate([60, 40, 60]); replace('reg_qr_done'); };
    const poll = async () => {
      let ok = false;
      try {
        const r = await fetch('/api/inbox?member=' + MEMBER, { cache: 'no-store' });
        const j = await r.json();
        if (j.ok) { ok = true; if (j.data && j.data.items && j.data.items.length) return got(j.data); }
      } catch (e) {}
      try {
        const r = await fetch(`${RELAY}/json?poll=1&since=${since}`, { cache: 'no-store' });
        const txt = await r.text(); ok = true;
        for (const line of txt.split('\n')) {
          if (!line.trim()) continue; const m = JSON.parse(line);
          if (m.event !== 'message' || seen.has(m.id)) continue; seen.add(m.id);
          try { const d = JSON.parse(m.message); if (d.items && d.items.length) return got(d); } catch (e) {}
        }
      } catch (e) {}
      if (ok) failed = 0; else if (++failed === 5) toast('인터넷 연결을 확인해 주세요');
      if (current === 'reg_qr') t = setTimeout(poll, 1200);
    };
    enter.reg_qr = () => { clearTimeout(t); failed = 0; since = Math.floor(Date.now() / 1000) - 5; t = setTimeout(poll, 600); };
    leave.reg_qr = () => clearTimeout(t);
    // QR을 1.5초 길게 누르면 시연용으로 전체 품목이 도착한 것처럼 동작
    let lp; cv.style.pointerEvents = 'auto';
    cv.addEventListener('pointerdown', () => { lp = setTimeout(() => { received = { items: ITEMS.map(i => ({ id: i.id, qty: 1 })), points: 80 }; replace('reg_qr_done'); }, 1500); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => cv.addEventListener(ev, () => clearTimeout(lp)));
  }
  {
    const s = screen('reg_qr_done'); regDock(s);
    // 받은 식재료 목록 (등록 확인 시트)
    const dim = el('div', 'modaldim', s); dim.dataset.fill = 1;
    const sh = el('div', 'rlist', s);
    const head = el('div', 'rl-head', sh);
    const body = el('div', 'rl-body', sh);
    const save = img(U('rc_save'), sh, 0, 0, 'rl-save');
    const open = () => {
      const items = (received && received.items) || [];
      const n = items.reduce((a, b) => a + (b.qty || 1), 0);
      head.innerHTML = `<b>${items.length}개의 식재료를 찾았어요</b><span>수정 후 냉장고에 추가해 주세요</span>`;
      body.innerHTML = '';
      const card = el('div', 'rl-card', body);
      items.forEach((it, k) => {
        const I = ITEM[it.id]; if (!I) return;
        const row = el('div', 'rl-row', card);
        row.innerHTML = `<img src="${I.img}" alt=""><div class="rl-t"><b>${I.name}</b><span>${qtyText(I, it.qty)}</span></div><div class="rl-q"><button data-d="-1">−</button><button data-d="1">+</button></div><svg class="rl-edit" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4z" fill="none" stroke="#555" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 6l4 4" stroke="#555" stroke-width="1.8"/></svg>`;
        row.querySelector('.rl-edit').addEventListener('click', e => { e.stopPropagation(); row.classList.toggle('editing'); });
        row.querySelectorAll('.rl-q button').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); it.qty = Math.max(1, it.qty + +b.dataset.d); row.querySelector('.rl-t span').textContent = qtyText(I, it.qty); }));
        row.style.animationDelay = (k * 70) + 'ms';
      });
      dim.classList.add('on'); sh.classList.add('on'); sh.scrollTop = 0;
    };
    const close = () => { dim.classList.remove('on'); sh.classList.remove('on'); };
    dim.addEventListener('click', close);
    save.style.pointerEvents = 'auto';
    save.addEventListener('click', () => {
      try { const mine = JSON.parse(localStorage.getItem('bapful_fridge') || '[]'); (received.items || []).forEach(i => mine.push({ ...i, at: Date.now() })); localStorage.setItem('bapful_fridge', JSON.stringify(mine)); } catch (e) {}
      close(); toast('냉장고에 추가했어요'); setTimeout(() => go('fr_list'), 500);
    });
    hs(s.content, [160, 1610, 1040, 1790], open, { r: 60 });
    leave.reg_qr_done = close;
  }
  { const s = screen('reg_manual'); regDock(s); hs(s.content, M.reg_manual.ctas[0], () => { toast('냉장고에 추가했어요'); setTimeout(() => go('fr_cold'), 400); }, { r: 50 }); hs(s.content, [480, 2170, 730, 2270], goBack, { r: 20 }); }
  { const s = screen('fr_pop'); back(s); } // (디자인 참고용: 팝오버는 냉장고 화면에서 직접 동작)

  /* ---------------- 이미지 미리 불러오기 & 시작 ---------------- */
  layout();
  document.querySelectorAll('[data-fill]').forEach(e => e.style.height = '100%');
  const start = (location.hash || '').slice(1);
  if (screens[start] && start !== 'splash') { history.replaceState({ id: start }, '', '#' + start); show(start, 'none'); }
  else { history.replaceState({ id: 'splash' }, '', '#splash'); show('splash', 'none'); }
  layout();
  window.__go = go; window.__screens = screens;
})();
