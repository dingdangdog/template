export const checkSignIn = () => {
  // console.log(useAuth().status.value);
  return useAuth().status.value === "authenticated";
};

export const getUUID = (num: number) => {
  const codes =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

  let uuid = "";
  for (let i = 0; i < num; i++) {
    const randomNumber = Math.floor(Math.random() * 62) + 1;
    uuid += codes[randomNumber];
  }
  return uuid;
};

export const formatDate = (time?: number | Date | string): string => {
  let date;
  if (!time) {
    date = new Date();
  } else if (time instanceof Date) {
    date = time;
  } else {
    date = new Date(time);
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从 0 开始，需要加 1
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
