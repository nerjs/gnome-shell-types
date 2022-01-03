declare namespace imports.gi.Meta {
  enum MonitorSwitchConfigType {
    ALL_MIRROR = 0,
    ALL_LINEAR = 1,
    EXTERNAL = 2,
    BUILTIN = 3,
    UNKNOWN = 4,
  }

  enum Cursor {
    NONE = 0, //
    DEFAULT = 1, // — Default cursor
    NORTH_RESIZE = 2, // — Resize northern edge cursor
    SOUTH_RESIZE = 3, // — Resize southern edge cursor
    WEST_RESIZE = 4, // — Resize western edge cursor
    EAST_RESIZE = 5, // — Resize eastern edge cursor
    SE_RESIZE = 6, // — Resize south-eastern corner cursor
    SW_RESIZE = 7, // — Resize south-western corner cursor
    NE_RESIZE = 8, // — Resize north-eastern corner cursor
    NW_RESIZE = 9, // — Resize north-western corner cursor
    MOVE_OR_RESIZE_WINDOW = 10, // — Move or resize cursor
    BUSY = 11, // — Busy cursor
    DND_IN_DRAG = 12, // — DND in drag cursor
    DND_MOVE = 13, // — DND move cursor
    DND_COPY = 14, // — DND copy cursor
    DND_UNSUPPORTED_TARGET = 15, // — DND unsupported target
    POINTING_HAND = 16, // — pointing hand
    CROSSHAIR = 17, // — crosshair (action forbidden)
    IBEAM = 18, // — I-beam (text input)
    BLANK = 19, // — Invisible cursor
    LAST = 20, //
  }

  type Context = any

  type IdleMonitor = any

  type Dnd = any

  type RemoteAccessController = any

  class Backend extends imports.gi.GObject.Object {
    context: Context
    get_context(): Context
    get_core_idle_monitor(): IdleMonitor
    get_dnd(): Dnd
    get_remote_access_controller(): RemoteAccessController
    get_stage(): imports.gi.Clutter.Actor
    is_rendering_hardware_accelerated(): boolean
    lock_layout_group(idx: number): void
    set_keymap(layouts: string, variants: string, options: string): void
  }

  class MonitorManager extends imports.gi.GObject.Object {
    backend: Backend
    panel_orientation_managed: boolean
    can_switch_config(): boolean
    get_is_builtin_display_on(): boolean
    get_monitor_for_connector(connector: string): number
    get_panel_orientation_managed(): boolean
    get_switch_config(): MonitorSwitchConfigType
    switch_config(config_type: MonitorSwitchConfigType): void

    connect(name: 'confirm-display-change', cb: (manager: this) => void): number
    connect(name: 'monitors-changed', cb: (manager: this) => void): number
    connect(name: 'monitors-changed-internal', cb: (manager: this) => void): number
    connect(name: 'power-save-mode-changed', cb: (manager: this) => void): number

    static get(): MonitorManager
    static get_display_configuration_timeout(): number
  }

  class BackgroundGroup {}

  class Background extends imports.signals.Signals {}

  class BackgroundActor extends imports.gi.Clutter.Actor {}

  class Display extends imports.gi.GObject.Object {}
  class Window extends imports.gi.GObject.Object {}
  class Workspace extends imports.gi.GObject.Object {}
}
