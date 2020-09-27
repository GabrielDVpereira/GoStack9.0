import bcrypt from 'bcrypt';

export default async function hash(str) {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashed_str = await bcrypt.hash(str, salt);
    return hashed_str;
  } catch (err) {
    return err;
  }
}
