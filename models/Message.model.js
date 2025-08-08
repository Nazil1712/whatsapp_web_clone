const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    wa_id: { type: String, required: true},
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String },
    message: { type: String, required: true },
    timestamp: { type: String, required: true },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    meta_msg_id: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: undefined },
    startedAt: { type: Date, default: undefined },
    completedAt: { type: Date, default: undefined },
  },
  {
    collection: "processed_messages",
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);

MessageSchema.virtual("id").get(function () {
  return this._id;
});
