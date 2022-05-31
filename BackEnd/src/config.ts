import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '.env') });

function required(key: any, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key[${key}] is undefined`);
  }
  return value;
}

const config = {
  jwt: {
    secure_key: required('JWT_SECURE_KEY', 'HVGpk-P6z^TaG3F8'),
    expiresInSec: parseInt(required('JWT_EXPIRE_SEC', 60 * 60 * 24 * 365)),
  },
  bcrypt: {
    salt_rouunds: parseInt(required('BCRYPT_SALT_ROUNDS', 10)),
  },
  host: {
    port: parseInt(required('PORT', 5500)),
    url: required('HOST_URL', 'http://localhost:5500'),
    client_url: required('CLIENT_HOST_URL', 'http://localhost:3000'),
  },
  db: {
    id: required('MONGODB_ID', 'wemet'),
    pwd: required('MONGODB_PW', 'WmL9XiWZ5WXQKHTi'),
  },
  csrf: {
    plainToken: required('CSRF_SECURE_KEY', '8s25jMpzVBCDG5v9'),
  },
  email: {
    userid: required('SEND_EMAIL_ID', 'wemetmaster@gmail.com'),
    client_id: required(
      'CLIENT_ID',
      '431745332301-6g5maknvsi737hu677ppts4hfksketmp.apps.googleusercontent.com'
    ),
    client_secret: required(
      'CLIENT_SECRET',
      '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'
    ),
    refresh_token: required(
      'GOOGLE_EMAIL_REFRESH_TOKEN',
      '1//04IclppXxb66UCgYIARAAGAQSNwF-L9IrJ-PThPCPaImVng9_WeyFktwpp1ZmE9rjBgi0Lwktkh1RitLo3bPfFAi0lsxLl65NKxQ'
    ),
    access_token: required(
      'GOOGLE_EMAIL_ACCESS_TOKEN',
      'ya29.a0ARrdaM-7nSSgtZEJ0WFJReaiyea6YXATtplXFthITNPBx9dZ46i6JBF_G7dxZcqJkDy_NctuMkIYhIjNJHkp0X0OU0Fj8c6e_lxaI9GS7_y-nr0wf_g6-j9IbzNwQ7oOY7Rh_r_50Dv1xiFDJRdmMKzBdfh1'
    ),
  },
};

export default config;
