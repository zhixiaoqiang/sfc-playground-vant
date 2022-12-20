type handleVersionsFnType = (
  /** release versions */
  versions: string[],
  /** if the latest version is a pre-release, list all current pre-releases, otherwise filter out pre-releases */
  isInPreRelease: boolean
) => string[]

async function fetchVersions (ownerRepo: string, handleVersions?: handleVersionsFnType): Promise<string[]> {
  const res = await fetch(`https://api.cdnjs.com/libraries/${ownerRepo}?fields=versions`)
  const releases: { versions: string[] } = await res.json()

  const versions = releases.versions.reverse()
  // if the latest version is a pre-release, list all current pre-releases
  // otherwise filter out pre-releases
  const isInPreRelease = versions[0].includes('-')
  if (handleVersions) {
    return handleVersions(versions, isInPreRelease)
  }

  return versions
}

export type fetchVersionsType = typeof fetchVersions

export enum npmTypeEnum {
  vant = 'vant',
  vue = 'vue'
}

export const npmVersionSwitchList = [
  {
    npm: npmTypeEnum.vant,
    historyDeployments: 'https://vercel.com/zhixiaoqiang/sfc-playground-vant/deployments',
    fetchVersions: () => fetchVersions(npmTypeEnum.vant, (versions) => {
      return versions.sort((prevVersion, nextVersion) => {
        const [preMajorVersion] = prevVersion.split('.')
        const [nextMajorVersion] = nextVersion.split('.')
        return +nextMajorVersion - +preMajorVersion
      })
    })
  },
  {
    npm: npmTypeEnum.vue,
    currentCommit: __VUE_COMMIT__,
    historyDeployments: 'https://app.netlify.com/sites/vue-sfc-playground/deploys',
    fetchVersions: () => fetchVersions(npmTypeEnum.vue, (versions, isInPreRelease) => {
      const filteredVersions: string[] = []
      for (const v of versions) {
        if (v.includes('-')) {
          if (isInPreRelease) {
            filteredVersions.push(v)
          }
        } else {
          filteredVersions.push(v)
          isInPreRelease = false
        }
        if (filteredVersions.length >= 30 || v === '3.0.10') {
          break
        }
      }
      return filteredVersions
    })
  }
]
