<template>
  <div :id="id"/>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  // deps for editor
  import 'codemirror/lib/codemirror.css'; // codemirror
  import 'tui-editor/dist/tui-editor.css'; // editor ui
  import 'tui-editor/dist/tui-editor-contents.css'; // editor content

  import Editor from 'tui-editor';
  import defaultOptions from './defaultOptions';

  @Component({
    name: 'MarkdownEditor'
  })
  export default class MarkdownEditor extends Vue {
    @Prop({default: ''}) value!: string;
    @Prop({
      required: false,
      default: () => 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    }) id!: string;
    @Prop({default: () => defaultOptions}) options!: any;
    @Prop({default: 'markdown'}) mode!: string;
    @Prop({default: '300px', required: false}) height!: string;
    // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    @Prop({default: 'en_US', required: false}) language!: string;

    editor: any = null;

    get editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options);
      options.initialEditType = this.mode;
      options.height = this.height;
      options.language = this.language;
      return options;
    }

    @Watch('value')
    onValueChange(newVal, preVal) {
      if (newVal !== preVal && newVal !== this.editor.getValue()) {
        this.editor.setValue(newVal);
      }
    }

    @Watch('language')
    onLanguageChange() {
      this.destroyEditor();
      this.initEditor();
    }

    @Watch('height')
    onHeightChange(newValue) {
      this.editor.height(newValue);
    }

    @Watch('mode')
    onModeChange(newValue) {
      this.editor.changeMode(newValue);
    }

    mounted() {
      this.initEditor();
    }

    destroyed() {
      this.destroyEditor();
    }

    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions
      });
      if (this.value) {
        this.editor.setValue(this.value);
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getValue());
      });
    }

    destroyEditor() {
      if (!this.editor) return;
      this.editor.off('change');
      this.editor.remove();
    }

    setValue(value) {
      this.editor.setValue(value);
    }

    getValue() {
      return this.editor.getValue();
    }

    setHtml(value) {
      this.editor.setHtml(value);
    }

    getHtml() {
      return this.editor.getHtml();
    }
  }
</script>
