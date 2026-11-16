// 멤버 폰이 1초마다 확인 → 도착한 식재료를 꺼내감(한 번만)
const { cmd, send, wrap, okMember } = require('./_kv');
module.exports = wrap(async (req, res) => {
  const m = (req.query && req.query.member) || new URL(req.url, 'http://x').searchParams.get('member');
  if (!okMember(m)) return send(res, 400, { ok: false, error: 'BAD_MEMBER' });
  const v = await cmd('GETDEL', `bapful:inbox:${m}`);
  send(res, 200, { ok: true, data: v ? JSON.parse(v) : null });
});
