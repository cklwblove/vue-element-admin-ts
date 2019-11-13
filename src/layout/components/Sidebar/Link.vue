<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { isExternal } from '@/utils';

@Component({
  name: 'Link'
})
export default class Link extends Vue {
  @Prop({required: true, default: ''}) to!: string;

  linkProps(url) {
    if (isExternal(url)) {
      return {
        is: 'a',
        href: url,
        target: '_blank',
        rel: 'noopener'
      };
    }
    return {
      is: 'router-link',
      to: url
    };
  }
}
</script>
