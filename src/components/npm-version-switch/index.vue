<script setup lang="ts">
import { ref, onMounted } from 'vue'

const {
  store,
  npm,
  currentCommit,
  fetchVersions
} = defineProps(['store', 'npm', 'currentCommit', 'fetchVersions'])

const originCommit = currentCommit
const activeVersion = ref(originCommit ? `@${originCommit}` : '')
const publishedVersions = ref<string[]>()
const expanded = ref(false)

async function toggle () {
  expanded.value = !expanded.value
  if (!publishedVersions.value) {
    publishedVersions.value = await fetchVersions()
  }
}

async function setVersion (v: string) {
  activeVersion.value = 'loading...'
  await store[`set${npm}Version`](v)
  activeVersion.value = `v${v}`
  expanded.value = false
}

function resetVersion () {
  store[`reset${npm}Version`]()
  activeVersion.value = `@${originCommit}`
  expanded.value = false
}

onMounted(async () => {
  window.addEventListener('click', () => {
    expanded.value = false
  })
  // if no currentCommit, set @latest version as activeVersion
  if (!currentCommit) {
    activeVersion.value = 'loading...'
    publishedVersions.value = await fetchVersions()
    // find @latest version
    const latestReleaseVersion = publishedVersions.value?.find(v => !v.includes('-'))
    activeVersion.value = latestReleaseVersion ? `v${latestReleaseVersion}` : ''
  }
})
</script>

<template>
  <div
    class="version"
    @click.stop
  >
    <span
      class="active-version"
      @click="toggle"
    >
      {{ npm }}: {{ activeVersion }}
    </span>
    <ul
      class="versions"
      :class="{ expanded }"
    >
      <li v-if="!publishedVersions">
        <a>loading versions...</a>
      </li>
      <li
        v-for="version of publishedVersions"
        :key="version"
      >
        <a @click="setVersion(version)">v{{ version }}</a>
      </li>
      <li>
        <a @click="resetVersion">This Commit ({{ originCommit }})</a>
      </li>
      <li>
        <a
          href="https://app.netlify.com/sites/vue-sfc-playground/deploys"
          target="_blank"
        >Commits History</a>
      </li>
    </ul>
  </div>
</template>

<style>
.version {
  display: inline-block;
  margin-right: 12px;
  position: relative;
}

.active-version {
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: var(--nav-height);
  padding-right: 15px;
}

.active-version:after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  position: absolute;
  right: 0;
  top: 22px;
}

.version:hover .active-version:after {
  border-top-color: var(--base);
}

.dark .version:hover .active-version:after {
  border-top-color: #fff;
}

.versions {
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  background-color: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: 4px;
  list-style-type: none;
  padding: 8px;
  margin: 0;
  width: 200px;
  max-height: calc(100vh - 70px);
  overflow: scroll;
}

.versions a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  cursor: pointer;
  color: var(--base);
}

.versions a:hover {
  color: #3ca877;
}

.versions.expanded {
  display: block;
}
</style>
