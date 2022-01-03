declare namespace imports.misc.parentalControlsManager {
  class ParentalControlsManager extends imports.gi.GObject.Object {
    _initialized: boolean
    _disabled: boolean
    _manager?: imports.gi.Malcontent.Manager
    _appFilter: null | imports.gi.Malcontent.Filter
    get initialized(): boolean

    _initializeManager(): Promise<void>
    _onAppFilterChanged(manager: any, uid: string): Promise<void>
    shouldShowApp(appInfo: imports.gi.Gio.DesktopAppInfo): boolean

    connect(name: 'app-filter-changed', cb: (manager: this) => void): number
  }

  const HAVE_MALCONTENT: boolean
  function getDefault(): ParentalControlsManager
}
