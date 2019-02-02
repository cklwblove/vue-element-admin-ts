export function isvalidUsername(str: string) {
  const validMap = ['admin', 'editor'];
  return validMap.indexOf(str.trim()) >= 0;
}

/* 小写字母*/
export function validateLowerCase(str: string) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str: string) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validateAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
