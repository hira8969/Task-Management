import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const refreshCookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
  signed: true
};

export function signAccessToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, env.jwtAccessSecret, { expiresIn: env.jwtAccessExpires });
}

export function signRefreshToken(user) {
  return jwt.sign({ sub: user._id, tokenVersion: user.tokenVersion }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpires });
}

export function setRefreshCookie(res, token) {
  res.cookie('refreshToken', token, {
    ...refreshCookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export function clearRefreshCookie(res) {
  res.clearCookie('refreshToken', refreshCookieOptions);
}
