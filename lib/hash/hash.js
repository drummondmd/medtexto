import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function checkPassword(password, hashedPassword) {
  if (!hashedPassword || !password) {
    return false
  }
  const match = await bcrypt.compare(password, hashedPassword);
  return match; // true ou false
}
