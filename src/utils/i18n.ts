import Vue from 'vue';
// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = Vue.prototype.$te('route.' + title);

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = Vue.prototype.$t('route.' + title);

    return translatedTitle;
  }
  return title;
}
