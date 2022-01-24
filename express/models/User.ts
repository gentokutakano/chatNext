import mongoose, { Schema, Document } from 'mongoose'
export interface UserDoc extends Document {
  name: String
  age: Number
}

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<UserDoc>('User', userSchema)