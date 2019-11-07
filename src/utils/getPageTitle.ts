import i18n from '@/lang';
import settings from '@/settings';

export default function getPageTitle(key: string) {
  const hasKey = i18n.te(`route.${key}`);
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`);
    return `${pageName} - ${settings.title}`;
  }
  return `${settings.title}`;
}
