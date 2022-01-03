type ClutterInputFocus = any
type ClutterEvent = any
type ClutterInputPanelState = any
type ClutterPreeditResetMode = any

declare namespace imports.gi.Clutter {
  class InputMethod {
    commit(text: string): unknown
    delete_surrounding(offset: number, len: number): unknown
    focus_in(focus: ClutterInputFocus): unknown
    focus_out(): unknown
    forward_key(keyval: number, keycode: number, state: number, time_: number, press: boolean): void
    notify_key_event(event: ClutterEvent, filtered: boolean): void
    request_surrounding(): void
    set_input_panel_state(state: ClutterInputPanelState): void
    set_preedit_text(preedit: string | null, cursor: number, mode: ClutterPreeditResetMode): void

    connect(name: 'commit', callback: (object: any) => boolean): number
    connect(name: 'cursor-location-changed', callback: (object: any) => boolean): number
    connect(name: 'delete-surrounding', callback: (object: any, p0: any) => boolean): number
    connect(name: 'input-panel', callback: (object: any) => boolean): number
    connect(name: 'request-surrounding', callback: () => boolean): number
  }
}
