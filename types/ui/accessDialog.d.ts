declare namespace imports.ui.accessDialog {
  enum DialogResponse {
    OK = 0,
    CANCEL = 1,
    CLOSED = 2,
  }

  interface IAccessDialogOptions {
    [key: string]: any
  }

  class AccessDialog<I = any, H = any> extends imports.ui.modalDialog.ModalDialog {
    _invocation: I
    _handle: H
    _requestExported: boolean
    _request: any
    _choices: Map<string, imports.ui.checkBox.CheckBox>

    constructor(
      invocation: I,
      handle: H,
      title: string,
      description: string,
      body: string,
      options: IAccessDialogOptions,
    )

    _buildLayout(title: string, description: string, body: string, options: IAccessDialogOptions): void
    open(): boolean
    CloseAsync(invocation: I, _params: any): void
    _sendResponse(response: DialogResponse): void
  }

  type Params<H> = [H, string, any, string, string, string, IAccessDialogOptions]

  class AccessDialogDBus<I = any, H = any> {
    _accessDialog?: AccessDialog<I, H>
    _windowTracker: imports.gi.Shell.WindowTracker
    _dbusImpl: imports.gi.Gio.DBus

    AccessDialogAsync(params: Params<H>, invocation: I): void
  }
}
