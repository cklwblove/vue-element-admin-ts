import pkg from '../../package.json';
import store from 'store';

const {name} = pkg;

const TokenKey = `${name}/Admin-Token`;
const LANGUAGE = `${name}/language`;
const SIZE = `${name}/size`;
const SIDEBAR_STATUS = `${name}/sidebarStatus`;

export function getToken() {
  return store.get(TokenKey);
}

export function setToken(token: string) {
  return store.set(TokenKey, token);
}

export function removeToken() {
  return store.remove(TokenKey);
}

export function setLanguage(language: string) {
  return store.set(LANGUAGE, language);
}

// getLanguage -> @/lang/index

export function getSize() {
  return store.get(SIZE);
}

export function setSize(size: string) {
  return store.set(SIZE, size);
}

export function getSidebarStatus() {
  return store.get(SIDEBAR_STATUS);
}

export function setSidebarStatus(sidebarStatus: string) {
  return store.set(SIDEBAR_STATUS, sidebarStatus);
}
