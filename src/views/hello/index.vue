<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/img/logo.png">
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <svg-icon icon-class="cat"></svg-icon>
      <send-code class="btn btn-default" v-model="start" @click.native="sendCode"></send-code>
      <div class="demo">
        <h3>方法示例</h3>
        <pre>
          &lt;template&gt;
            &lt;div class=&quot;page page-hello&quot;&gt;
              &lt;!-- 静态资源路径写法事例 --&gt;
              &lt;img src=&quot;~@assets/images/copyfiles/logo.png&quot;&gt;
              &lt;p v-text=&quot;msg&quot;&gt;&lt;/p&gt;
            &lt;/div&gt;
          &lt;/template&gt;

          &lt;script lang=&quot;ts&quot;&gt;
            /**
             * 以下仅为事例代码，可以随意扩展修改
             */
            import {Component, Vue} from &#x27;vue-property-decorator&#x27;;
            // 工具类
            import {formatDate} from &#x27;utils&#x27;;

            @Component
            export default class Hello extends Vue {
              private msg: string = &#x27;Welcome to Your Vue.js + TypeScript App&#x27;;
              private message: string = &#x60;现在时间是：${formatDate(Date.now())}&#x60;;

              private created() {
                this.movieComingSoon();
              }

              private movieComingSoon() {
                const data = {};
                this.$services.octocat({
                  method: &#x27;get&#x27;,
                  data
                }).then((res) =&gt; {
                  console.log(&#x27;接口请求成功：&#x27; + JSON.stringify(res, null, 2));
                }).catch((err) =&gt; {
                  console.log(&#x27;接口请求异常：&#x27; + err);
                });
              }

            }
          &lt;/script&gt;

          &lt;style lang=&quot;less&quot; rel=&quot;stylesheet/less&quot;&gt;
            @import &quot;./style.less&quot;;
          &lt;/style&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  import {Component, Vue} from 'vue-property-decorator';
  // 工具类
  import {formatDate} from 'utils';

  @Component
  export default class Hello extends Vue {
    private msg: string = 'Welcome to Your Vue.js + TypeScript App';
    private message: string = `现在时间是：${formatDate(Date.now())}`;

    private created() {
      this.movieComingSoon();
    }

    private movieComingSoon() {
      const data = {};
      this.$services.octocat({
        method: 'get',
        data
      }).then((res) => {
        console.log('接口请求成功：' + JSON.stringify(res, null, 2));
      }).catch((err) => {
        console.log('接口请求异常：' + err);
      });
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
