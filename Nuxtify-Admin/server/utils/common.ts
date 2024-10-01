import crypto from "crypto";

export const getUUid = () => {
  const codes =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";

  let uuid = "";
  for (let i = 0; i < 16; i++) {
    const randomNumber = Math.floor(Math.random() * 63) + 1;
    uuid += codes[randomNumber];
  }
  return uuid;
};

// EncryptBySHA256 使用 SHA-256 算法加密字符串
export const encryptBySHA256 = (userName: string, password: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(userName + password);
  return hash.digest("hex");
};
