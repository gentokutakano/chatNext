import mongoose, { Schema, Document } from 'mongoose'

export interface UserDoc extends Document {
  name: String
  age: Number
}

const userSchema: Schema = new Schema(
  {
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

userSchema.virtual('name').get(function(this: UserDoc) {
  return `${this.name}です。 ${this.age}です。`
})

export default mongoose.model<UserDoc>('User', userSchema)
