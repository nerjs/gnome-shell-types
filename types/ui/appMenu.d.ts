declare namespace imports.ui.popupMenu {
  class PopupMenu {}
}

declare namespace imports.ui.appMenu {
  interface AppMenuParams {
    favoritesSection: boolean
    showSingleWindow: boolean
  }

  class AppMenu extends imports.ui.popupMenu.PopupMenu {
    constructor(sourceActor: imports.gi.Clutter.Actor, side?: imports.gi.St.Side, params?: Partial<AppMenuParams>)

    setApp(app: imports.gi.Shell.App): void
  }
}
