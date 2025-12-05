const svgCaptcha = require('svg-captcha');
const crypto = require('crypto');

const captchaStore = new Map();

const cleanExpiredCaptchas = () => {
  const now = Date.now();
  for (const [id, data] of captchaStore.entries()) {
    if (now - data.createdAt > 5 * 60 * 1000) {
      captchaStore.delete(id);
    }
  }
};

const generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true
  });
  
  const captchaId = crypto.randomBytes(32).toString('hex');
  
  captchaStore.set(captchaId, {
    text: captcha.text.toLowerCase(),
    createdAt: Date.now(),
    used: false
  });
  
  cleanExpiredCaptchas();
  
  res.json({
    captchaId,
    captcha: captcha.data
  });
};

const verifyCaptcha = (req, res) => {
  const { captchaId, captchaText } = req.body;
  
  const stored = captchaStore.get(captchaId);
  
  if (!stored) {
    return res.json({ valid: false, error: 'CAPTCHA no encontrado' });
  }
  
  const age = Date.now() - stored.createdAt;
  if (age > 5 * 60 * 1000) {
    captchaStore.delete(captchaId);
    return res.json({ valid: false, error: 'CAPTCHA expirado' });
  }
  
  if (stored.used) {
    return res.json({ valid: false, error: 'CAPTCHA ya utilizado' });
  }
  
  stored.used = true;
  
  const isValid = stored.text === captchaText.toLowerCase();
  
  setTimeout(() => captchaStore.delete(captchaId), 1000);
  
  res.json({ valid: isValid });
};

module.exports = {
  generateCaptcha,
  verifyCaptcha,
  captchaStore
};
