// Upstash Redis (Vercel Marketplace) REST 연결 – 추가 설치 없이 fetch만 사용
// 연결 방식/접두어가 달라도 찾을 수 있게 환경변수 이름을 넓게 탐색
const E = process.env;
const pick = (re, not) => { const k = Object.keys(E).find(k => re.test(k) && (!not || !not.test(k)) && E[k]); return k ? E[k] : undefined; };
const URL_ = E.KV_REST_API_URL || E.UPSTASH_REDIS_REST_URL || pick(/(KV_REST_API_URL|REDIS_REST_URL)$/);
const TOKEN = E.KV_REST_API_TOKEN || E.UPSTASH_REDIS_REST_TOKEN || pick(/(KV_REST_API_TOKEN|REDIS_REST_TOKEN)$/, /READ_ONLY/);

async function cmd(...args) {
  if (!URL_ || !TOKEN) { const e = new Error('NO_STORE'); e.code = 'NO_STORE'; throw e; }
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(args) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(obj));
}
async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return await new Promise(ok => { let d = ''; req.on('data', c => d += c); req.on('end', () => { try { ok(JSON.parse(d || '{}')); } catch (e) { ok({}); } }); });
}
function wrap(fn) {
  return async (req, res) => {
    if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); return send(res, 204, {}); }
    try { await fn(req, res); }
    catch (e) {
      if (e.code === 'NO_STORE') return send(res, 503, { ok: false, error: 'NO_STORE', message: '버셀 Storage에 Redis(Upstash)를 연결해 주세요.' });
      send(res, 500, { ok: false, error: String(e.message || e) });
    }
  };
}
const okMember = m => typeof m === 'string' && /^M\d{4}$/.test(m);
const envNames = () => Object.keys(E).filter(k => /KV|REDIS|UPSTASH/i.test(k));
module.exports = { envNames, hasStore: () => !!(URL_ && TOKEN), cmd, send, body, wrap, okMember };
