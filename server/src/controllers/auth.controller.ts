import jwt from 'jsonwebtoken'
import to from 'await-to-js'
import type { Request, Response } from 'express'
import UserAuth from 'models/userAuth.model'
import type { IUserAuth } from 'types/types'
import { COOKIE_OPTIONS, getRefreshToken, getToken } from 'config/auth'

// https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo
// https://www.bezkoder.com/react-refresh-token/

export const login = async (
  req: Request<Empty, Empty, IUserAuth>,
  res: Response
) => {
  const { user } = req
  if (!user) return res.status(401).json({ error: new Error('invalid login') })

  const token = getToken({ _id: user._id })
  const refreshToken = getRefreshToken({ _id: user._id })

  const [error, userObj] = await to(
    UserAuth.findByIdAndUpdate(
      user._id,
      {
        $push: {
          refreshTokens: refreshToken,
        },
      },
      { returnDocument: 'after' }
    ).exec()
  )
  if (error) return res.status(500).json({ error })
  if (!userObj)
    return res.status(500).json({ error: new Error('unable to find user') })

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
  return res.json({ token })
}

export const register = async (
  req: Request<Empty, Empty, IUserAuth>,
  res: Response
) => {
  const { email, password } = req.body

  UserAuth.register(
    new UserAuth({ email }),
    password,
    async (error, user: IUserAuth) => {
      if (error) {
        console.log(error)
        return res.status(500).send({ error })
      }

      const token = getToken({ _id: user._id })
      const refreshToken = getRefreshToken({ _id: user._id })

      user.refreshTokens.push(refreshToken)
      const [err] = await to(user.save())
      if (err) {
        console.log(err)
        return res.status(500).send({ error: err })
      }

      res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)

      return res.json({ token })
    }
  )
}

export const getUser = (req: Request<Empty, Empty, IUserAuth>, res: Response) =>
  res.send({ user: req.user })

export const refreshToken = async (
  req: Request<Empty, Empty, IUserAuth>,
  res: Response
) => {
  const { signedCookies = {} } = req
  const { refreshToken: rToken } = signedCookies

  if (!rToken) return res.status(401).send('Unauthorized')

  try {
    const { _id: userId } = jwt.verify(
      rToken,
      process.env.REFRESH_TOKEN_SECRET || 'secret'
    ) as SignedUser
    const user = (await UserAuth.findById(userId)) as IUserAuth

    if (!user) return res.status(401).send('Unauthorized')

    const tokenIdx = user.refreshTokens.indexOf(rToken)

    if (tokenIdx === -1) return res.status(401).send('Unauthorized')

    const token = getToken({ _id: userId })
    const newRefreshToken = getRefreshToken({ _id: userId })
    user.refreshTokens[tokenIdx] = newRefreshToken
    await user.save()

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS)
    return res.json({ token })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const logout = async (
  req: Request<Empty, Empty, IUserAuth>,
  res: Response
) => {
  const { signedCookies = {}, user } = req
  const { refreshToken: rToken } = signedCookies

  const [error, userObj] = await to(
    UserAuth.findById(user?._id).exec() as Promise<IUserAuth>
  )
  if (error) return res.status(500).json({ error })
  if (!userObj) return res.status(401).send('Unauthorized')

  const tokenIdx = userObj.refreshTokens.indexOf(rToken)
  if (tokenIdx !== -1) userObj.refreshTokens.splice(tokenIdx, 1)

  const [err] = await to(userObj.save())
  if (err) return res.status(500).json({ error: err })

  res.clearCookie('refreshToken', COOKIE_OPTIONS)
  return res.send({ success: true })
}
