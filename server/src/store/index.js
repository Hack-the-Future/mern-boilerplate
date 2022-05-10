import mongoose from 'mongoose'

const setup = () =>
  new Promise((res, rej) => {
    const mongoURL = process.env.DATABASE_URL

    if (!mongoURL) {
      console.log('missing DATABASE_URL env')
      return
    }

    mongoose.connect(mongoURL).catch((err) => {
      console.error(err)
      rej(err)
    })

    const db = mongoose.connection
    db.once('open', () => {
      console.log('connected to mongodb')
      res()
    })
  })

export default setup
