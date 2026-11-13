/* =========================================================
   밥풀 프로토타입
   - 모든 화면은 디자인 원본 이미지를 잘라 그대로 사용 (픽셀 동일)
   - 좌표는 전부 원본 이미지(가로 603px) 기준 픽셀
   ========================================================= */
(() => {
  const W = 603;          // 디자인 가로(px) = 393pt
  const SB = 83;          // 잘라낸 가짜 상태바 높이 (54pt)
  const FULL_H = 1228;    // 상태바 제외 화면 높이
  const MIN_H = 1176;     // 홈 인디케이터 영역(34pt)을 뺀, 반드시 보여야 하는 높이
  const A = (n) => `/assets/${n}`;

  const stage = document.getElementById('stage');
  const viewport = document.getElementById('viewport');
  let scale = 1, stageH = FULL_H, off = 0;

  /* ---------- 화면 크기 맞추기 ---------- */
  function layout() {
    const vw = window.innerWidth, vh = window.innerHeight;
    scale = Math.min(vw / W, vh / MIN_H);
    stageH = vh / scale;
    off = Math.max(0, stageH - FULL_H);
    stage.style.height = stageH + 'px';
    stage.style.transform = `translate(${(vw - W * scale) / 2}px,0) scale(${scale})`;
    stage.style.setProperty('--off', off + 'px');
    document.querySelectorAll('[data-bottom]').forEach(el => {
      el.style.top = (+el.dataset.bottom + off) + 'px';
    });
    document.querySelectorAll('[data-fill]').forEach(el => { el.style.height = stageH + 'px'; });
    document.querySelectorAll('[data-pin]').forEach(el => {
      el.style.top = (stageH - +el.dataset.pin) + 'px';
    });
  }
  window.addEventListener('resize', layout);
  window.addEventListener('orientationchange', () => setTimeout(layout, 300));
  if (window.visualViewport) visualViewport.addEventListener('resize', layout);

  /* ---------- DOM helpers ---------- */
  const el = (tag, cls, parent) => { const e = document.createElement(tag); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; };
  function img(src, parent, x = 0, y = 0, cls = '') {
    const i = el('img', 'abs ' + cls, parent); i.src = A(src); i.style.left = x + 'px'; i.style.top = y + 'px'; i.alt = '';
    return i;
  }
  // 화면 = 위쪽 레이어(상태바 아래부터 split까지) + 아래쪽 레이어(split부터, 화면 하단에 붙음)
  function makeScreen(id, bg) {
    const s = el('section', 'screen', stage); s.id = 's-' + id; s.dataset.bg = bg || '#FDFDFD';
    s.style.background = s.dataset.bg; screens[id] = s; return s;
  }
  function layers(s, name, split) {
    const top = el('div', 'layer', s); top.style.top = '0px';
    img(name + '_top.png', top, 0, 0);
    const bot = el('div', 'layer', s); bot.dataset.bottom = split - SB;
    img(name + '_bot.png', bot, 0, 0);
    top.origin = SB; bot.origin = split;
    return { top, bot };
  }
  // 터치 영역 (box = 원본 좌표 [x0,y0,x1,y1])
  function hs(layer, box, fn, opt = {}) {
    const [x0, y0, x1, y1] = box;
    const h = el('div', 'hs' + (opt.dim ? ' dim' : ''), layer);
    Object.assign(h.style, { left: x0 + 'px', top: (y0 - layer.origin) + 'px', width: (x1 - x0) + 'px', height: (y1 - y0) + 'px', borderRadius: (opt.r || 0) + 'px' });
    let pressImg = null;
    if (opt.img) { // 눌림 효과용: 같은 픽셀의 잘라낸 이미지를 얹음
      pressImg = img(opt.img, layer, x0 + (opt.ix || 0), y0 - layer.origin + (opt.iy || 0), 'press');
      layer.insertBefore(pressImg, h);
    }
    const target = pressImg;
    h.addEventListener('pointerdown', () => target && target.classList.add('down'));
    const up = () => target && target.classList.remove('down');
    h.addEventListener('pointerup', up); h.addEventListener('pointerleave', up); h.addEventListener('pointercancel', up);
    h.addEventListener('click', (e) => { e.stopPropagation(); fn && fn(e); });
    h.pressImg = pressImg;
    return h;
  }
  // on/off 두 장을 겹쳐 놓고 투명도로 전환
  // 상태 이미지: 한 파일에 [위=on, 아래=off]로 붙어 있음
  const SZ = {"heart":[38,36],"info_f1":[171,77],"info_f2":[171,77],"info_f3":[171,77],"info_p1":[171,77],"info_p2":[171,77],"info_p3":[171,77],"prio_0":[164,77],"prio_1":[206,77],"prio_2":[300,77],"prio_3":[273,77],"prio_4":[184,77],"taste_0":[233,77],"taste_1":[252,77],"taste_2":[341,77],"taste_3":[294,77],"taste_4":[243,77],"taste_5":[252,77],"taste_6":[252,77],"taste_7":[341,77],"taste_8":[206,77],"taste_9":[185,77],"terms_all":[51,49],"tog0":[94,60],"tog1":[94,60],"tog2":[94,60],"tog3":[94,60]};
  function stateImg(layer, name, x, y, state) {
    const [w, h] = SZ[name];
    const box = el('div', 'state', layer);
    Object.assign(box.style, { left: x + 'px', top: (y - layer.origin) + 'px', width: w + 'px', height: h + 'px', overflow: 'hidden' });
    const on = img(name + '.png', box), offI = img(name + '.png', box, 0, -h);
    const set = (v) => { on.classList.toggle('off', !v); offI.classList.toggle('off', !!v); box.value = !!v; };
    set(state); box.set = set; return box;
  }

  /* ---------- 내비게이션 ---------- */
  const screens = {};
  const enterHooks = {};
  let current = null; const stack = [];
  let busy = false;

  function show(id, mode) {
    const next = screens[id], prev = current && screens[current];
    if (!next || id === current) return;
    viewport.style.background = next.dataset.bg;
    next.classList.add('active');
    enterHooks[id] && enterHooks[id]();
    if (prev && mode !== 'none') {
      busy = true;
      prev.classList.add('anim');
      const dur = 320, ease = 'cubic-bezier(.2,.8,.2,1)';
      let a1, a2;
      if (mode === 'fade') {
        a1 = next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, easing: 'ease' });
        a2 = prev.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: 'ease' });
      } else {
        const back = mode === 'back';
        next.style.zIndex = back ? 1 : 2; prev.style.zIndex = back ? 2 : 1;
        a1 = next.animate(back ? [{ transform: 'translateX(-30%)', filter: 'brightness(.94)' }, { transform: 'none', filter: 'none' }]
                               : [{ transform: 'translateX(100%)' }, { transform: 'none' }], { duration: dur, easing: ease });
        a2 = prev.animate(back ? [{ transform: 'none' }, { transform: 'translateX(100%)' }]
                               : [{ transform: 'none', filter: 'none' }, { transform: 'translateX(-30%)', filter: 'brightness(.94)' }], { duration: dur, easing: ease });
      }
      a1.onfinish = () => { prev.classList.remove('active', 'anim'); next.style.zIndex = prev.style.zIndex = ''; busy = false; };
    } else if (prev) prev.classList.remove('active');
    current = id;
  }
  function go(id, mode = 'push') {
    if (busy) return;
    if (current) stack.push(current);
    history.pushState({ id }, '', '#' + id);
    show(id, mode);
  }
  function reset(id, mode = 'fade') {   // 기록을 비우고 이동 (예: 홈 진입)
    if (busy) return;
    stack.length = 0; history.replaceState({ id }, '', '#' + id); show(id, mode);
  }
  function back() {
    if (busy || !stack.length) return;
    history.back();   // popstate에서 처리 → 안드로이드 뒤로가기와 동작 통일
  }
  window.addEventListener('popstate', () => { if (stack.length && !busy) { const id = stack.pop(); show(id, 'back'); } });

  const BACK = [10, 120, 90, 200], SKIP = [465, 120, 595, 200];
  const CTA = [30, 1119, 573, 1204];
  const cta = (layer, name, fn) => hs(layer, CTA, fn, { img: name + '_cta.png', ix: -4, iy: -4, r: 20 });

  /* =========================================================
     1. 스플래시
     ========================================================= */
  {
    const s = makeScreen('splash', '#FFFFFF');
    const logo = el('div', 'layer', s); logo.style.top = (400 - SB) + 'px';
    img('splash_logo.png', logo, 0, 0, 'splash-logo');
    const ch = el('div', 'layer', s); ch.dataset.bottom = 690 - SB;
    img('splash_char.png', ch, 0, 0, 'splash-char');
    let t;
    enterHooks.splash = () => { clearTimeout(t); t = setTimeout(() => current === 'splash' && reset('ob', 'fade'), 2300); };
    s.addEventListener('click', () => { clearTimeout(t); reset('ob', 'fade'); });
  }

  /* =========================================================
     2. 온보딩 (스와이프 + 다음)
     ========================================================= */
  {
    const s = makeScreen('ob', '#FDFDFD');
    const top = el('div', 'layer', s); top.style.top = '0px'; top.origin = SB;
    const slider = el('div', 'slider', top); slider.style.height = (1040 - SB) + 'px';
    const track = el('div', 'track', slider);
    for (let i = 1; i <= 4; i++) { const im = el('img', '', track); im.src = A(`ob${i}_top.png`); }
    const bot = el('div', 'layer fade-stack', s); bot.dataset.bottom = 1040 - SB; bot.origin = 1040;
    const bots = [1, 2, 3, 4].map(i => img(`ob${i}_bot.png`, bot, 0, 0));
    let idx = 0;
    const btn = hs(bot, [26, 1143, 577, 1236], () => idx < 3 ? setIdx(idx + 1) : go('login'), { img: 'ob1_cta.png' });
    btn.style.left = '26px'; btn.style.width = '551px';
    function setIdx(i, animate = true) {
      idx = Math.max(0, Math.min(3, i));
      track.style.transition = animate ? 'transform .38s cubic-bezier(.2,.8,.2,1)' : 'none';
      track.style.transform = `translateX(${-idx * W}px)`;
      bots.forEach((b, k) => b.style.opacity = k === idx ? 1 : 0);
      btn.pressImg.src = A(`ob${idx + 1}_cta.png`);
    }
    setIdx(0, false);
    enterHooks.ob = () => setIdx(idx, false);
    // 스와이프
    let sx = null, sy = 0, dx = 0, t0 = 0, horiz = null;
    slider.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; dx = 0; t0 = Date.now(); horiz = null; track.style.transition = 'none'; slider.setPointerCapture(e.pointerId); });
    slider.addEventListener('pointermove', e => {
      if (sx === null) return;
      const mx = (e.clientX - sx) / scale, my = (e.clientY - sy) / scale;
      if (horiz === null && (Math.abs(mx) > 6 || Math.abs(my) > 6)) horiz = Math.abs(mx) > Math.abs(my);
      if (!horiz) return;
      dx = mx; let x = -idx * W + dx;
      if ((idx === 0 && dx > 0) || (idx === 3 && dx < 0)) x = -idx * W + dx * 0.35;
      track.style.transform = `translateX(${x}px)`;
    });
    const end = () => {
      if (sx === null) return; sx = null;
      const v = dx / Math.max(1, Date.now() - t0);
      if (dx < -110 || v < -0.5) setIdx(idx + 1); else if (dx > 110 || v > 0.5) setIdx(idx - 1); else setIdx(idx);
    };
    slider.addEventListener('pointerup', end); slider.addEventListener('pointercancel', end);
  }

  /* =========================================================
     3. 로그인
     ========================================================= */
  {
    const s = makeScreen('login', '#FDFDFD');
    const { top, bot } = layers(s, 'login', 700);
    img('login_bubble.png', bot, 165, 866 - 700, 'bob');
    hs(top, [465, 115, 600, 185], () => reset('home', 'push'));                       // 둘러보기
    [['kakao', [84, 983, 180, 1079]], ['naver', [197, 983, 293, 1079]], ['google', [310, 983, 405, 1079]], ['apple', [423, 983, 518, 1079]]]
      .forEach(([n, b]) => hs(bot, b, () => go('terms'), { img: `login_${n}.png`, r: 48 }));
    hs(bot, [180, 1110, 285, 1162], () => go('terms'), { dim: true, r: 8 });          // 로그인
    hs(bot, [298, 1110, 420, 1162], () => go('terms'), { dim: true, r: 8 });          // 회원가입
  }

  /* =========================================================
     4. 약관 동의
     ========================================================= */
  {
    const s = makeScreen('terms', '#FDFDFD');
    const { top, bot } = layers(s, 'terms', 1060);
    const pill = img('terms_pill.png', top, 180, 115 - SB);
    const all = stateImg(top, 'terms_all', 44, 754, true);
    const btn = cta(bot, 'terms', () => {
      if (all.value) go('info');
      else { all.classList.remove('shake'); void all.offsetWidth; all.classList.add('shake'); }
    });
    hs(top, [30, 737, 573, 820], () => {
      all.set(!all.value); all.classList.remove('pulse'); void all.offsetWidth; all.classList.add('pulse');
      btn.pressImg.classList.toggle('disabled', !all.value);
      btn.pressImg.classList.add('cta');
    }, { dim: true, r: 16 });
    enterHooks.terms = () => { pill.classList.remove('drop'); void pill.offsetWidth; pill.classList.add('drop'); };
  }

  /* ---------- 칩 공통 ---------- */
  const CH = JSON.parse('{"info":[[[29,495,200,572,0],[216,495,387,572,1],[403,495,574,572,0]],[[29,664,200,741,0],[216,664,387,741,0],[403,664,574,741,0]]],"taste":[[29,441,262,518,0],[278,441,530,518,1],[29,531,370,608,0],[29,621,323,698,0],[340,621,583,698,0],[29,711,281,788,1],[298,711,550,788,0],[29,801,370,878,0],[29,891,235,968,0],[251,891,436,968,0]],"prio":[[29,495,193,572,0],[206,495,412,572,1],[29,585,329,662,0],[29,675,302,752,0],[316,675,500,752,0]]}');
  function chips(layer, prefix, list, single, base = 0) {
    const items = list.map((c, i) => {
      const st = stateImg(layer, `${prefix}${i + base}`, c[0], c[1], !!c[4]);
      hs(layer, c, () => {
        if (single) items.forEach(o => o.set(o === st)); else st.set(!st.value);
      });
      return st;
    });
    return items;
  }

  /* =========================================================
     5. 기본 정보
     ========================================================= */
  {
    const s = makeScreen('info', '#FDFDFD');
    const { top, bot } = layers(s, 'info', 1040);
    hs(top, BACK, back); hs(top, SKIP, () => go('taste'));
    chips(top, 'info_p', CH.info[0], true, 1);
    chips(top, 'info_f', CH.info[1], true, 1);
    cta(bot, 'info', () => go('taste'));
    // 식사 시간 행: 네이티브 피커 + 바뀐 값만 글자로 표시
    function mealRow(dy) {
      const y = (v) => v + dy - SB;
      const mealLabel = el('div', 'vlabel', top); Object.assign(mealLabel.style, { left: '44px', top: y(846) + 'px', width: '98px', height: '52px', display: 'none' });
      const timeLabel = el('div', 'vlabel', top); Object.assign(timeLabel.style, { left: '230px', top: y(846) + 'px', width: '112px', height: '52px', display: 'none' });
      const sel = el('select', 'native', top);
      ['아침', '점심', '저녁', '간식', '야식'].forEach(v => { const o = el('option', '', sel); o.value = o.textContent = v; });
      Object.assign(sel.style, { left: '30px', top: y(835) + 'px', width: '164px', height: '75px' });
      sel.addEventListener('change', () => { const v = sel.value; mealLabel.style.display = v === '아침' ? 'none' : 'flex'; mealLabel.textContent = v; });
      const tm = el('input', 'native', top); tm.type = 'time'; tm.value = '06:30';
      Object.assign(tm.style, { left: '214px', top: y(835) + 'px', width: '211px', height: '75px' });
      tm.addEventListener('change', () => {
        const v = tm.value || '06:30'; const [h, m] = v.split(':');
        timeLabel.style.display = v === '06:30' ? 'none' : 'flex'; timeLabel.textContent = `${h} : ${m}`;
      });
    }
    mealRow(0);
    let added = false;
    hs(top, [508, 838, 578, 906], () => {
      if (added) return; added = true;
      const row = img('info_mealrow.png', top, 29, 834 + 90 - SB);
      row.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 250, easing: 'ease-out' });
      mealRow(90);
    }, { dim: true, r: 30 });
  }

  /* =========================================================
     6. 요리 취향 / 7. 우선순위
     ========================================================= */
  {
    const s = makeScreen('taste', '#FDFDFD');
    const { top, bot } = layers(s, 'taste', 1040);
    hs(top, BACK, back); hs(top, SKIP, () => go('prio'));
    chips(top, 'taste_', CH.taste, false);
    cta(bot, 'taste', () => go('prio'));
  }
  {
    const s = makeScreen('prio', '#FDFDFD');
    const { top, bot } = layers(s, 'prio', 1040);
    hs(top, BACK, back); hs(top, SKIP, () => go('noti'));
    chips(top, 'prio_', CH.prio, false);
    cta(bot, 'prio', () => go('noti'));
  }

  /* =========================================================
     8. 알림 설정
     ========================================================= */
  {
    const s = makeScreen('noti', '#FDFDFD');
    const { top, bot } = layers(s, 'noti', 1040);
    hs(top, BACK, back); hs(top, SKIP, () => go('fridge'));
    [[542, 1, [30, 525, 590, 620]], [653, 0, [30, 636, 590, 730]], [758, 1, [30, 741, 590, 835]], [869, 1, [30, 852, 590, 946]]]
      .forEach(([y, st, row], i) => {
        const t = stateImg(top, `tog${i}`, 482, y, !!st);
        hs(top, row, () => { t.set(!t.value); if (navigator.vibrate) navigator.vibrate(8); });
      });
    cta(bot, 'noti', () => go('fridge'));
  }

  /* =========================================================
     9. 냉장고 채우기
     ========================================================= */
  {
    const s = makeScreen('fridge', '#FDFDFD');
    const { top, bot } = layers(s, 'fridge', 1040);
    hs(top, BACK, back); hs(top, SKIP, () => reset('home', 'push'));
    hs(top, [30, 520, 573, 652], () => reset('home', 'push'), { dim: true, r: 18 });
    hs(top, [32, 667, 573, 799], () => reset('home', 'push'), { dim: true, r: 18 });
    hs(top, [225, 828, 380, 876], () => reset('home', 'push'), { dim: true, r: 8 });
    cta(bot, 'fridge', () => reset('home', 'push'));
  }

  /* =========================================================
     10. 홈
     ========================================================= */
  {
    const s = makeScreen('home', '#FDFDFD');
    const sc = el('div', 'home-scroll', s); sc.dataset.fill = 1;
    const inner = el('div', 'home-inner', sc); inner.style.height = (2885 - SB + 160) + 'px';
    inner.origin = SB;
    img('home_col.webp', inner, 0, 0);
    // 가로 스크롤 영역 (원본에서 화면 밖으로 넘친 카드까지 포함)
    function hstrip(src, y, w, snaps) {
      const h = el('div', 'hscroll', inner); h.style.top = (y - SB) + 'px';
      const i = el('img', '', h); i.src = A(src); i.style.width = w + 'px';
      h.style.scrollPaddingLeft = '31px';
      snaps.forEach(x => { const m = el('div', 'snap', h); m.style.left = x + 'px'; });
      const e = el('div', 'snap', h); e.style.left = (w - 1) + 'px'; e.style.scrollSnapAlign = 'end';
      return h;
    }
    hstrip('home_c1.webp', 696, 898, [31, 319, 607]);
    hstrip('home_c2.webp', 1704, 978, [31, 265, 499, 733]);
    // 좋아요
    const heart = stateImg(inner, 'heart', 98 - 49, 2778, false);
    hs(inner, [92 - 49, 2772, 142 - 49, 2818], () => { heart.set(!heart.value); heart.classList.remove('pop'); void heart.offsetWidth; heart.classList.add('pop'); });
    // 로고 길게 누르기 → 처음부터 다시 (테스트용)
    let lp;
    const logo = hs(inner, [80 - 49, 110, 160 - 49, 170], null);
    logo.addEventListener('pointerdown', () => { lp = setTimeout(() => { location.hash = ''; location.reload(); }, 900); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => logo.addEventListener(ev, () => clearTimeout(lp)));
    // 하단 탭바 (화면 하단 고정)
    const tab = el('div', 'tabbar', s); tab.style.left = '-9px';
    tab.dataset.pin = (3005 - 2880) + 40;   // 탭바 아래 여백 40px
    img('home_tab.png', tab, 0, 0);
    tab.origin = 2880;
    const tabHs = (x0, x1, fn) => { const h = hs(tab, [x0 - 40, 2905, x1 - 40, 3003], fn, { r: 40 }); return h; };
    tabHs(300, 402, () => sc.scrollTo({ top: 0, behavior: 'smooth' }));
    enterHooks.home = () => { sc.scrollTop = 0; };
  }

  /* ---------- 이미지 미리 불러오기 ---------- */
  fetch(A('manifest.json')).then(r => r.json()).then(m => {
    m.files.forEach(f => { const i = new Image(); i.src = A(f); });
  }).catch(() => {});

  /* ---------- 시작 ---------- */
  layout();
  const startAt = (location.hash || '').slice(1);
  if (screens[startAt] && startAt !== 'splash') { history.replaceState({ id: startAt }, '', '#' + startAt); show(startAt, 'none'); }
  else { history.replaceState({ id: 'splash' }, '', '#splash'); show('splash', 'none'); }
  layout();
})();
