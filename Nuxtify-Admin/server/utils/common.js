// 生成加密测试密码
var crypto = await import("node:crypto");

var encryptBySHA256 = function (userName, password) {
  var hash = crypto.createHash("sha256");
  hash.update(userName + password);
  return hash.digest("hex");
};
// exports.encryptBySHA256 = encryptBySHA256;
console.log(encryptBySHA256("admin", "admin"));
