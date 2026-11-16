const { cmd, send, envNames } = require('./_kv');
// 주소창에서 /api/health 를 열면 연결 상태를 알려줌 (값은 숨기고 이름만)
module.exports = async (req, res) => {
  const names = envNames();
  try { await cmd('PING'); send(res, 200, { ok: true, store: true, env: names }); }
  catch (e) { send(res, 200, { ok: false, reason: e.code === 'NO_STORE' ? '환경변수 없음: Storage 연결 후 Redeploy 필요' : String(e.message || e), env: names }); }
};
