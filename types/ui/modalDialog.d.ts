declare namespace imports.ui.modalDialog {
  const OPEN_AND_CLOSE_TIME: number
  const FADE_OUT_DIALOG_TIME: number

  enum State {
    OPENED = 0,
    CLOSED = 1,
    OPENING = 2,
    CLOSING = 3,
    FADED_OUT = 4,
  }

  interface IModalDialog {
    shellReactive: boolean
    styleClass: string
    actionMode: imports.gi.Shell.ActionMode
    shouldFadeIn: boolean
    shouldFadeOut: boolean
    destroyOnClose: boolean
  }

  class ModalDialog extends imports.gi.St.Widget {
    _state: State
    _hasModal: boolean
    _actionMode: imports.gi.Shell.ActionMode
    _shellReactive: boolean
    _shouldFadeIn: boolean
    _shouldFadeOut: boolean
    _destroyOnClose: boolean
    backgroundStack: imports.gi.St.Widget
    _backgroundBin: imports.gi.St.Bin
    _monitorConstraint: imports.ui.layout.MonitorConstraint
    dialogLayout: imports.ui.dialog.Dialog
    // this.contentLayout = this.dialogLayout.contentLayout
    // this.buttonLayout = this.dialogLayout.buttonLayout
    _lightbox?: imports.ui.lightbox.Lightbox
    _initialKeyFocus: null | imports.gi.Clutter.Actor
    _initialKeyFocusDestroyId: number
    _savedKeyFocus: null | any

    constructor(params?: Partial<IModalDialog>)

    get state(): State

    _setState(state: State): void
    _fadeOpen(onPrimary?: boolean): void
    _closeComplete(): void
    _fadeOutDialog(timestamp: number): void

    setInitialKeyFocus(actor: imports.gi.Clutter.Actor): void
    close(timestamp: number): void
    popModal(timestamp: number): void
    pushModal(timestamp: number): boolean
    open(timestamp: number, onPrimary?: boolean): boolean
    clearButtons(): void
    setButtons(buttons: unknown): void
    addButton(buttonInfo: unknown): void
  }
}
