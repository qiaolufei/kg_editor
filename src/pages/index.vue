<template>
    <div id="d" class="d">
        <headpage></headpage>
        hello world!
    </div>
</template>
<script>
import headpage from '@/components/header'
import { login } from '../utils/api'
export default {
  data () {
    return {
    }
  },
  components: {
    headpage
  },
  methods: {
  },
  mounted () {
    // 接口调用示例
    login().then(res => {})
  }
}
</script>
<style lang="less" scoped>
</style>
