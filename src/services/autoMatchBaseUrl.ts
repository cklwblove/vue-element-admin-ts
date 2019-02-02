import {UPLOAD_PREFIX} from '../constant';

// 根据前缀，自动匹配基础的url
export default function autoMatchBaseUrl(prefix: string) {
  let baseUrl = '';
  switch (prefix) {
    case UPLOAD_PREFIX:
      prefix = '';
      baseUrl = window.LOCAL_CONFIG.API_UPLOAD;
      break;
    default:
      baseUrl = window.LOCAL_CONFIG.API_HOME;
  }

  return `${baseUrl}`;
}
