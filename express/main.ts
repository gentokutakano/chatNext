import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import router from './routes/index'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

mongoose.connect('mongodb://mongo:27017/mongoose_api', {
  // dbName: "usrdb",
  // user: "gentokutakano",
  // pass: "gentoku2424"
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
