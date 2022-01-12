import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import router from './routes/index'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/.env' })

mongoose.connect('mongodb://mongo:27017/mongoose_api', {
  user: process.env.MONGOOSE_USERNAME,
  pass: process.env.MONGOOSE_PASSWORD
});
const db = mongoose.connection;
///接続で発生するイベントを監視
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

mongoose.Promise = global.Promise

const app = express()
//セキュリティ的に堅牢化するライブラリ
app.use(helmet())

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use('/', router)

app.listen(port)
console.log('listen on port ' + port)
