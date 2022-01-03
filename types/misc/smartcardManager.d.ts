declare namespace imports.misc.smartcardManager {
  class SmartcardManager extends imports.signals.Signals {
    _objectManager: imports.misc.objectManager.ObjectManager
    _insertedTokens: {
      [objectPath: string]: imports.gi.Gio.DBusProxy
    }
    _loginToken: null | imports.gi.Gio.DBusProxy

    _onLoaded(): void
    _updateToken(token: imports.gi.Gio.DBusProxy): void
    _addToken(token: imports.gi.Gio.DBusProxy): void
    _removeToken(token: imports.gi.Gio.DBusProxy): void

    hasInsertedTokens(): boolean
    hasInsertedLoginToken(): boolean

    connect(name: 'smartcard-removed', cb: (manager: this, token: imports.gi.Gio.DBusProxy) => boolean): number
  }

  function getSmartcardManager(): SmartcardManager
}
