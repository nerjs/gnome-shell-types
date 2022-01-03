declare namespace imports.misc.permissionStore {
  function PermissionStore(initCallback: () => void, cancellable: imports.gi.Gio.Cancellable): imports.gi.Gio.DBusProxy
  class PermissionStore extends imports.gi.Gio.DBusProxy {
    constructor(initCallback: () => void, cancellable: imports.gi.Gio.Cancellable)
  }
}
