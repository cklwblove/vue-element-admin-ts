<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class Redirect extends Vue {
  public beforeCreate() {
    const {params, query} = this.$route;
    const {path} = params;
    this.$router.replace({path: '/' + path, query});
  }

  public render(h) {
    return h(); // avoid warning message
  }
}
</script>
