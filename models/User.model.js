const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    wa_id: { type: String, required: true},
    name: { type: String, required: true },
    isOn: { type: Boolean, default: false },
    socketId: { type: String },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

UserSchema.virtual("id").get(function () {
  return this._id;
});

module.exports = mongoose.model("User", UserSchema);
