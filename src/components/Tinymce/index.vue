<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * docs:
   * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
   */
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import EditorImage from './components/EditorImage.vue';
  import plugins from './plugins';
  import toolbar from './toolbar';
  import load from './dynamicLoadScript';

  // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
  const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';

  @Component({
    name: 'Tinymce',
    components: {
      EditorImage
    }
  })
  export default class Tinymce extends Vue {
    @Prop({default: () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')}) id!: string;
    @Prop({default: ''}) value!: string;
    @Prop({required: false, default: () => []}) toolbar!: any[];
    @Prop({default: 'file edit insert view format table'}) menubar!: string;
    @Prop({required: false, default: 360}) height!: number | string;
    @Prop({required: false, default: 'auto'}) width!: number | string;

    hasChange: boolean = false;
    hasInit: boolean = false;
    tinymceId: string = this.id;
    fullscreen: boolean = false;
    languageTypeList: object = {
      'en': 'en',
      'zh': 'zh_CN',
      'es': 'es',
      'ja': 'ja'
    };

    get language() {
      return this.languageTypeList[this.$store.getters.language];
    }

    get containerWidth() {
      const width = this.width;
      // Test matches `100`, `'100'`
      if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
        return `${width}px`;
      }
      return width;
    }

    @Watch('value')
    onValueChange(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    }

    @Watch('language')
    onLanguageChange() {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    }

    mounted() {
      this.init();
    }

    activated() {
      if (window.tinymce) {
        this.initTinymce();
      }
    }

    deactivated() {
      this.destroyTinymce();
    }

    destroyed() {
      this.destroyTinymce();
    }

    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    }

    initTinymce() {
      const that = this;
      window.tinymce.init({
        language: this.language,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          if (that.value) {
            editor.setContent(that.value);
          }
          that.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent());
          });
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            that.fullscreen = e.state;
          });
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = that.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      });
    }

    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen');
      }

      if (tinymce) {
        tinymce.destroy();
      }
    }

    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    }

    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    }

    imageSuccessCBK(arr) {
      const that = this;
      arr.forEach((v) => {
        window.tinymce.get(that.tinymceId).insertContent(`<img class='wscnph' src='${v.url}' >`);
      });
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative;
    line-height: normal;
  }

  .tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }

  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }

  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>
