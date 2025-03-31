const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definition of the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Method to hash the password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  this.password = await bcrypt.hash(this.password, 10); 
  next();
});

// Method to compare the given password with the hashed one
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Creates and exports the User model
module.exports = mongoose.model('User', userSchema);