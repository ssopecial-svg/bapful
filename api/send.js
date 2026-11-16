// 아이패드(POS) → 멤버 폰으로 식재료 전송
const { cmd, send, body, wrap, okMember } = require('./_kv');
module.exports = wrap(async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { ok: false });
  const b = await body(req);
  if (!okMember(b.member)) return send(res, 400, { ok: false, error: 'BAD_MEMBER' });
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 50).map(i => ({ id: String(i.id || ''), qty: Math.max(1, Math.min(99, parseInt(i.qty, 10) || 1)) })).filter(i => i.id);
  if (!items.length) return send(res, 400, { ok: false, error: 'EMPTY' });
  const payload = { items, points: Number(b.points) || 80, at: Date.now(), store: String(b.store || '밥풀마트') };
  await cmd('SET', `bapful:inbox:${b.member}`, JSON.stringify(payload), 'EX', 1800);
  await cmd('LPUSH', 'bapful:log', JSON.stringify({ member: b.member, ...payload }));
  await cmd('LTRIM', 'bapful:log', 0, 199);
  send(res, 200, { ok: true });
});
