export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
