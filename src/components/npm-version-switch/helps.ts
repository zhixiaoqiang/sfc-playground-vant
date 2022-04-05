type handleVersionsFnType = (
  /** release versions */
  versions: string[],
  /** if the latest version is a pre-release, list all current pre-releases, otherwise filter out pre-releases */
  isInPreRelease: boolean
) => string[]

async function fetchVersions(ownerRepo: string, handleVersions?: handleVersionsFnType): Promise<string[]> {
  const res = await fetch(`https://api.github.com/repos/${ownerRepo}/releases?per_page=100`)
  const releases: any[] = await res.json()
  const versions = releases.map(r =>
    /^v/.test(r.tag_name) ? r.tag_name.slice(1) : r.tag_name
  )
  // if the latest version is a pre-release, list all current pre-releases
  // otherwise filter out pre-releases
  let isInPreRelease = versions[0].includes('-')
  if (handleVersions) {
    return handleVersions(versions, isInPreRelease)
  }

  return versions
}

export type fetchVersionsType = typeof fetchVersions

export enum npmTypeEnum {
  Vant = 'Vant',
  Vue = 'Vue'
}

export const npmVersionSwitchList = [
  {
    npm: npmTypeEnum.Vant,
    fetchVersions: () => fetchVersions('youzan/vant', (versions) => {
      return versions.sort((prevVersion, nextVersion) => {
        const [preMajorVersion] = prevVersion.split('.')
        const [nextMajorVersion] = nextVersion.split('.')
        return +nextMajorVersion - +preMajorVersion
      })
    })
  },
  {
    npm: npmTypeEnum.Vue,
    currentCommit: __VUE_COMMIT__,
    fetchVersions: () => fetchVersions('vuejs/core', (versions, isInPreRelease) => {
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