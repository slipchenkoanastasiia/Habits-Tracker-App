import { sendEmail } from './services/emailService.js';

const test = async () => {
  try {
    const res = await sendEmail('stratox90@ukr.net', '<h1>Тестовий імейл</h1>');
    console.log('✅ Email відправлено:', res);
  } catch (err) {
    console.error('❌ Email error:', err);
  }
};

test();