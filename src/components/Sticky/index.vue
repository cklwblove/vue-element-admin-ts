<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className"
         :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class Sticky extends Vue {
    @Prop({default: 0}) stickyTop!: number;
    @Prop({default: 1}) zIndex!: number;
    @Prop({default: ''}) className!: string;

    active: boolean = false;
    position: string = '';
    width: string = '';
    height: number = 0;
    isSticky: boolean = false;

    mounted() {
      this.height = this.$el.getBoundingClientRect().height;
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleReize);
    }

    activated() {
      this.handleScroll();
    }

    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleReize);
    }

    sticky() {
      if (this.active) {
        return;
      }
      this.position = 'fixed';
      this.active = true;
      this.width = this.width + 'px';
      this.isSticky = true;
    }

    handleReset() {
      if (!this.active) {
        return;
      }
      this.reset();
    }

    reset() {
      this.position = '';
      this.width = 'auto';
      this.active = false;
      this.isSticky = false;
    }

    handleScroll() {
      const clientRect = this.$el.getBoundingClientRect();
      if (clientRect) {
        const width = clientRect.width as number + '';
        this.width = width || 'auto';
        const offsetTop = this.$el.getBoundingClientRect().top;
        if (offsetTop < this.stickyTop) {
          this.sticky();
          return;
        }
        this.handleReset();
      }
    }

    handleReize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px';
      }
    }
  }
</script>
