const { model, Schema } = require('mongoose')

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: Date,
    status: String,
    start: Date,
    end: Date,
    comments: String
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

taskSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

module.exports = model('Task', taskSchema)
