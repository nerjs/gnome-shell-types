declare namespace imports.ui.backgroundManu {
  class BackgroundMenu extends imports.ui.popupMenu.PopupMenu {
    constructor(layoutManager: imports.ui.layout.LayoutManager)
  }

  function addBackgroundMenu(actor: imports.gi.Clutter.Actor, layoutManager: imports.ui.layout.LayoutManager): void
}
