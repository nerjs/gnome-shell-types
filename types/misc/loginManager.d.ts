declare namespace imports.misc.loginManager {
  class LoginManagerDummy extends imports.signals.Signals {
    getCurrentSessionProxy(callback: (currentSession: imports.gi.Gio.DBusProxy) => void): void
    canSuspend(asyncCallback: (canSuspend: boolean, needsAuth: boolean) => void): void
    canRebootToBootLoaderMenu(asyncCallback: (canSuspend: boolean, needsAuth: boolean) => void): void
    setRebootToBootLoaderMenu(): void
    listSessions(asyncCallback: (result: any) => void): void
    suspend(): void
    inhibit(reason: any, cancellable: imports.gi.Gio.Cancellable): Promise<imports.gi.Gio.UnixInputStream>
  }

  class LoginManagerSystemd extends LoginManagerDummy {
    _proxy: imports.gi.Gio.DBusProxy
    _userProxy: imports.gi.Gio.DBusProxy
    _currentSession?: imports.gi.Gio.DBusProxy

    _prepareForSleep(proxy: any, sender: any, aboutToSuspend: [any]): void
    connect(name: 'prepare-for-sleep', cb: (manager: this, aboutToSuspend: unknown) => boolean): number
  }

  function haveSystemd(): boolean
  function versionCompare(required: string, reference: string): boolean
  function canLock(): boolean
  function registerSessionWithGDM(): Promise<void>
  function getLoginManager(): LoginManagerDummy | LoginManagerSystemd
}
