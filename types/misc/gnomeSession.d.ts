declare namespace imports.misc.gnomeSession {
  enum PresenceStatus {
    AVAILABLE = 0,
    INVISIBLE = 1,
    BUSY = 2,
    IDLE = 3,
  }

  enum InhibitFlags {
    LOGOUT = 1 << 0,
    SWITCH = 1 << 1,
    SUSPEND = 1 << 2,
    IDLE = 1 << 3,
    AUTOMOUNT = 1 << 4,
  }

  function Presence(initCallback: () => unknown, cancellable: any): imports.gi.Gio.DBusProxy
  function Inhibitor(objectPath: string, initCallback: () => unknown, cancellable: boolean): imports.gi.Gio.DBusProxy

  function SessionManager(
    initCallback: () => unknown,
    cancellable: imports.gi.Gio.Cancellable,
  ): imports.gi.Gio.DBusProxy
  class SessionManager extends imports.gi.Gio.DBusProxy {
    constructor(initCallback: () => unknown, cancellable: imports.gi.Gio.Cancellable)
  }
}
