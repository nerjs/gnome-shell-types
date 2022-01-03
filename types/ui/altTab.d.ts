declare namespace imports.ui.switcherPopup {
  class SwitcherPopup {}

  class SwitcherList {}
}

declare namespace imports.ui.altTab {
  const APP_ICON_HOVER_TIMEOUT: number // milliseconds
  const THUMBNAIL_DEFAULT_SIZE: number
  const THUMBNAIL_POPUP_TIME: number // milliseconds
  const THUMBNAIL_FADE_TIME: number // milliseconds
  const WINDOW_PREVIEW_SIZE: number
  const APP_ICON_SIZE: number
  const APP_ICON_SIZE_SMALL: number

  const baseIconSizes: number[]

  enum AppIconMode {
    THUMBNAIL_ONLY = 1,
    APP_ICON_ONLY = 2,
    BOTH = 3,
  }

  function _createWindowClone(window: imports.gi.Meta.Window, size: number): imports.gi.Clutter.Clone
  function getWindows(workspace: imports.gi.Meta.Workspace): imports.gi.Meta.Window[]

  class AppSwitcherPopup extends imports.ui.switcherPopup.SwitcherPopup {
    vfunc_allocate(box: imports.gi.Clutter.ActorBox): void
  }

  class CyclerHighlight extends imports.gi.St.Widget {
    set window(w: imports.gi.Meta.Window)
  }

  class CyclerList extends imports.gi.St.Widget {
    highlight(index: number, _justOutline: any): void
  }

  class CyclerPopup extends imports.ui.switcherPopup.SwitcherPopup {}

  class GroupCyclerPopup extends CyclerPopup {}

  class WindowSwitcherPopup extends imports.ui.switcherPopup.SwitcherPopup {}

  class WindowCyclerPopup extends CyclerPopup {}

  class AppIcon extends imports.gi.St.BoxLayout {
    app: imports.gi.Shell.App
    icon: imports.gi.Clutter.Actor
    label: imports.gi.St.Label

    constructor(app: imports.gi.Shell.App)
    set_size(size: number): void
  }

  class AppSwitcher extends imports.ui.switcherPopup.SwitcherList {
    icons: AppIcon[]

    constructor(apps: imports.gi.Shell.App[], altTabPopup: unknown)

    vfunc_get_preferred_height(forWidth: number): [number, number]
    vfunc_allocate(box: imports.gi.Clutter.ActorBox): void
    highlight(n: number, justOutline: boolean): void
  }

  class ThumbnailSwitcher extends imports.ui.switcherPopup.SwitcherList {
    constructor(windows: imports.gi.Meta.Window[])

    addClones(availHeight: number): void
  }

  class WindowIcon extends imports.gi.St.BoxLayout {
    window: imports.gi.Meta.Window
    label: imports.gi.St.Label
    app: imports.gi.Shell.App

    constructor(window: imports.gi.Meta.Window, mode: AppIconMode)
  }

  class WindowSwitcher extends imports.ui.switcherPopup.SwitcherList {
    windows: imports.gi.Meta.Window[]
    icons: WindowIcon[]

    constructor(windows: imports.gi.Meta.Window[], mode: AppIconMode)

    vfunc_get_preferred_height(forWidth: number): [number, number]
    vfunc_allocate(box: imports.gi.Clutter.ActorBox): void
    highlight(index: number, justOutline: boolean): void
  }
}
