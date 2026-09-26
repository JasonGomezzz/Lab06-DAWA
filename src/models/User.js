import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  age: { type: Number, required: true, min: 18 },
  phoneNumber: { type: String, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model('User', userSchema);
