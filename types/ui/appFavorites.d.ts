declare namespace imports.ui.appFavorites {
  const RENAMED_DESKTOP_IDS: {
    [key: string]: string
  }

  interface FaviritesMap {
    [appId: string]: imports.gi.Shell.App
  }

  class AppFavorites extends imports.signals.Signals {
    FAVORITE_APPS_KEY: string

    connect(name: 'changed', cb: (af: this) => boolean): number

    reload(): void
    getFavoriteMap(): FaviritesMap
    getFavorites(): imports.gi.Shell.App[]
    isFavorite(appId: string): boolean
    addFavoriteAtPos(appId: string, pos: number): void
    addFavorite(appId: string): void
    moveFavoriteToPos(appId: string, pos: number): void
    removeFavorite(appId: string): void
  }

  function getAppFavorites(): AppFavorites
}
