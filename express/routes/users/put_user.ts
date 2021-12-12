import { filter } from 'bluebird'
import { Request, Response } from 'express'
import { PARAMETER_INVALID, PARAMETER_VALIDITY } from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { getUsersResponse } from '../../types'

type TPutParams = {
  id: string
  name: string
  age: number
}

export class PutUser {
  handler: Handler
  params: TPutParams

  constructor(req: any, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }

  }

  /**
   * メイン処理
   */
  async main() {
    const validParams = ["id", "name", "age"];

    if (!this.params.id ||
      !Number(this.params.id) ||
      typeof this.params.name !== "string" ||
      !Number(this.params.age) ||
      !Object.keys(this.params).every(key => validParams.includes(key))) {
      throw this.handler.error(PARAMETER_INVALID)
    }

    const data = await this.putUser()
    return this.handler.json<void>(data)
  }

  ///指定されたユーザIDを更新する
  async putUser(updateJson?: User): Promise<void> {

    if (!updateJson) {
      updateJson = <User>{
        name: "hand3",
        age: 12,
      }
    }
    ///存在するIdか確認
    const user = await User.findByPk<User>(this.params.id)

    if (!user) {
      console.log("このユーザはいないっす")
      throw this.handler.error(PARAMETER_INVALID)
    }

    User.update(updateJson, {
      where: {
        id: this.params.id
      }
    }).then((recode) => {
      console.log(`ユーザID:[${this.params.id}]を更新しました。`)
    })
  }
}
