const { cmd, send, wrap } = require('./_kv');
module.exports = wrap(async (req, res) => {
  await cmd('PING');
  send(res, 200, { ok: true, store: true, time: Date.now() });
});
