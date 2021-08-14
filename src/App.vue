<template>
  <the-header />
  <base-dialog :show="isForceLogout" fixed title="Token expired">
    <p>You should <router-link to="/auth">re-login</router-link> to continue!</p>
  </base-dialog>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  computed : {
    isForceLogout() {
      return this.$store.getters.isForceLogout;
    }
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.route-enter-active {
  transition: all 300ms ease-out;
}
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-leave-active {
  transition: all 300ms ease-in;
}
</style>