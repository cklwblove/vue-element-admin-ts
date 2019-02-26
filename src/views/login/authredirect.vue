<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AuthRedirect extends Vue {
  created() {
    const hash = window.location.search.slice(1);
    window.opener.location.href = window.location.origin + '/login#' + hash;
    window.close();
  }
}
</script>
