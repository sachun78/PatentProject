import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, ".env")});

function required(key: any, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
      throw new Error(`key[${key}] is undefined`);
  }
  return value;
}

const config = {
  jwt: {
    secure_key: required('JWT_SECURE_KEY', "HVGpk-P6z^TaG3F8"),
    expiresInSec: parseInt(required('JWT_EXPIRE_SEC', 60 * 60* 24 * 365))
  },
  bcrypt: {
    salt_rouunds: parseInt(required('BCRYPT_SALT_ROUNDS', 10))
  },
  host: {
    port: parseInt(required('HOST_PORT', 4000))
  },
  db: {
    host: required('DB_HOST', "mongodb://192.168.11.108:27017/wemet")
  },
  csrf: {
    plainToken: required('CSRF_SECURE_KEY', "8s25jMpzVBCDG5v9")
  },
  email: {
    userid: required('EMAIL_SEND_ID', "wemetsuperuser@gmail.com"),
    passwd: required("EMAIL_SEND_PW", "Wemetadmin12!@")
  }

};

export default config;
