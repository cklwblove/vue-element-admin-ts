import localForage from 'localforage';

const TokenKey = 'Admin-Token';
const LANGUAGE = 'language';
const SIZE = 'size';
const SIDEBAR_STATUS = 'sidebarStatus';

export async function getToken() {
  return await localForage.getItem(TokenKey);
}

export function setToken(token: string) {
  return localForage.setItem(TokenKey, token);
}

export function removeToken() {
  return localForage.removeItem(TokenKey);
}

export async function getLanguage() {
  return await localForage.getItem(LANGUAGE);
}

export function setLanguage(language: string) {
  return localForage.setItem(LANGUAGE, language);
}

export async function getSize() {
  return await localForage.getItem(SIZE);
}

export function setSize(size: string) {
  return localForage.setItem(SIZE, size);
}

export async function getSidebarStatus() {
  return await localForage.getItem(SIDEBAR_STATUS);
}

export function setSidebarStatus(sidebarStatus: string) {
  return localForage.setItem(SIDEBAR_STATUS, sidebarStatus);
}

