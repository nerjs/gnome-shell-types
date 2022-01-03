type Keyboard = any // TODO: imports.ui.status.keyboard
type Focus = any

declare namespace imports.misc.inputMethod {
  const HIDE_PANEL_TIME: number

  class InputMethod extends imports.gi.Clutter.InputMethod {
    get currentFocus(): Focus | null
  }
}
