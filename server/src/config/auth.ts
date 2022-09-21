import passport from 'passport'
import jwt from 'jsonwebtoken'
import type { CookieOptions } from 'express'
import ms from 'ms'

const dev = process.env.NODE_ENV !== 'production'

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  // Since localhost is not having https protocol, secure cookies does not work correctly
  secure: !dev,
  signed: true,
  maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY || '30d'),
  sameSite: 'none',
}

export const getToken = (user: SignedUser) =>
  jwt.sign(user, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.SESSION_EXPIRY || '15m',
  })

export const getRefreshToken = (user: SignedUser) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || 'secret', {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '30d',
  })

export const verifyUser = passport.authenticate('jwt', {
  session: false,
})
