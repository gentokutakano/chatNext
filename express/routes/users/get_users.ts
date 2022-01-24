import { Request, Response } from 'express'
import { PARAMETER_INVALID } from '../../constants/error';
import { Handler } from "../../core/handler";
import User from '../../models/User';

export class GetUsers{
  handler: Handler

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
  }

  async getUsers() {
    const data = await User.find({})

    return data.map((v) => {
      return {
        _id: v.id,
        name: v.name,
        age: v.age
      }
    })
  }

  /**
   * メイン処理
  */
  async main() {
    const data = await this.getUsers()

    if (!data) {
      return this.handler.error(PARAMETER_INVALID)
    }
    ///バリデーション
    return this.handler.json(data)
  }

}