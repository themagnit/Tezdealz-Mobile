import * as SecureStore from "expo-secure-store";
export const guid = () => {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const nameValidator = (name: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!name || name.length <= 0) return "This field is required.";
  // if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";
  if (password.length <= 7) return "Password must be 8 charactors long";
  return "";
};
export const userNameValidator = (userName: string) => {
  if (!userName || userName.length <= 4)
    return "Username must be 5 characters long.";

  return "";
};

export async function getToken(key: any) {
  let result = await SecureStore.getItemAsync(key);
  return result ? result : "";
}

export async function save(key: any, value: any) {
  await SecureStore.setItemAsync(key, value);
}
