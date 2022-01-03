declare namespace imports.gi.Shell {
  function get_app_filter_async(): number

  // TODO: ??
  class App extends imports.gi.GObject.Object {}

  // TODO: ??
  class WindowTracker {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IGLSLEffect {}
  // TODO: ??
  class GLSLEffect {}

  type ActionMode = any

  class AppSystem extends imports.gi.GObject.Object {
    get_installed(): imports.gi.Gio.AppInfo[]
    get_running(): App[]
    lookup_app(id: string): App
    lookup_desktop_wmclass(wmclass: string): App
    lookup_heuristic_basename(id: string): App
    lookup_startup_wmclass(wmclass: string): App

    connect(name: 'app-state-changed', cb: (t: this, object: App) => void): number
    connect(name: 'installed-changed', cb: (t: this) => void): number

    static get_default(): AppSystem
    static search(search_string: string): string[][]
  }
}
