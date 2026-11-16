// 상품 바코드 ↔ 식재료 연결표 (여러 아이패드가 같이 씀)
const { cmd, send, body, wrap } = require('./_kv');
module.exports = wrap(async (req, res) => {
  if (req.method === 'POST') {
    const b = await body(req);
    const code = String(b.code || '').trim().slice(0, 64), id = String(b.id || '').trim().slice(0, 32);
    if (!code) return send(res, 400, { ok: false });
    if (id) await cmd('HSET', 'bapful:barcodes', code, id); else await cmd('HDEL', 'bapful:barcodes', code);
  }
  const flat = (await cmd('HGETALL', 'bapful:barcodes')) || [];
  const map = {}; for (let i = 0; i < flat.length; i += 2) map[flat[i]] = flat[i + 1];
  send(res, 200, { ok: true, map });
});
