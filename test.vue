<template>
  <div id="app" class="app">
    <transition :key="key">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  // import {mapState} from 'vuex';
  export default {
    name: 'app',
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
        
      }
    }
  };
</script>
