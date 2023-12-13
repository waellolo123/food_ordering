const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  image: {type: String},
  phone: {type: String},
  streetAdress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String}
}, {timestamps: true});


export const User = models?.User || model('User', UserSchema);

