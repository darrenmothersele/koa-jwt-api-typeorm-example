import { sign } from 'jsonwebtoken';

const genTokenAsync = payload => new Promise(((resolve, reject) => {
  sign(payload, process.env.JWT_SECRET, ((err, encoded) => {
    if (err) return reject(err);
    resolve(encoded);
  }));
}));

export async function generateToken({ uuid, roles }) {
  const exp = Math.floor(Date.now() / 1000) + (60 * 60);
  const token = await genTokenAsync({ uuid, roles, exp });
  return { token, exp };
}
