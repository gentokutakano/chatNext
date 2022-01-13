import { Request, Response } from 'express'
import { UserValidProperty } from '../../constants/api_value';
import { Handler } from "../../core/handler";
import User from '../../models/User';

export class getUsers{
  handler: Handler

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
  }

  async getUsers() {
    const data = await User.find({})
    
  }

  async main() {
    const data = await this.getUsers()


  }

}