<script setup lang="ts">
import { Repl } from '@vue/repl'
import { watchEffect } from 'vue'

import { ReplStore } from './store'
import Header from './Header.vue'

const setVH = () => {
  document.documentElement.style.setProperty('--vh', window.innerHeight + 'px')
}
window.addEventListener('resize', setVH)
setVH()

const store = new ReplStore({
  serializedState: location.hash.slice(1)
})

// enable experimental features
const sfcOptions = {
  script: {
    reactivityTransform: true
  }
}

// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>

<template>
  <Header :store="store" />
  <Repl
    :store="store"
    :show-compile-output="true"
    :auto-resize="true"
    :sfc-options="sfcOptions"
    :clear-console="false"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: calc(var(--vh) - var(--nav-height));
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
