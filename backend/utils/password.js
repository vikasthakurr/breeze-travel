import crypto from "crypto";

const HASH_ITERATIONS = 64;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

const hashPassword = (plainPassword) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(plainPassword, salt, HASH_ITERATIONS * 1000, KEY_LENGTH, DIGEST)
    .toString("hex");
  return `pbkdf2$${salt}$${hash}`;
};

const comparePassword = (plainPassword, storedValue) => {
  if (!storedValue || !storedValue.startsWith("pbkdf2$")) {
    return false;
  }
  const [, salt, storedHash] = storedValue.split("$");
  const hash = crypto
    .pbkdf2Sync(plainPassword, salt, HASH_ITERATIONS * 1000, KEY_LENGTH, DIGEST)
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
};

export {
  hashPassword,
  comparePassword,
};
