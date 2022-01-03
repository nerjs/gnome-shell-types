declare namespace imports.gi.Gio {
  class MakeProxyWrapper extends imports.gi.Gio.DBusProxy {
    constructor(
      bus: imports.gi.Gio.DBusConnection,
      name: string,
      object: string,
      asyncCallback?: (initanle: unknown, error: Error) => void,
      cancellable?: imports.gi.Gio.Cancellable | null,
      flags?: imports.gi.Gio.DBusProxyFlags,
    )
  }

  class DBus {}
}
