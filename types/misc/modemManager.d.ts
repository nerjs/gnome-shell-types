declare namespace imports.misc.modemManager {
  function _getMobileProvidersDatabase(): imports.gi.NMA.MobileProvidersDatabase | null
  function _findProviderForMccMnc(operatorName: string, operatorCode: string): string | null
  function _findProviderForSid(sid?: string): string | null

  class ModemBase extends imports.gi.GObject.Object {
    get operatorName(): string | null
    get signalQuality(): number
    _setOperatorName(operatorName: string): void
    _setSignalQuality(signalQuality: string): void
  }

  class ModemGsm extends ModemBase {
    _proxy: imports.gi.Gio.DBusProxy
  }

  class ModemCdma extends ModemBase {
    _proxy: imports.gi.Gio.DBusProxy

    _refreshServingSystem(): void
  }

  class BroadbandModem extends ModemBase {
    _proxy: imports.gi.Gio.DBusProxy
    _proxy_3gpp: imports.gi.Gio.DBusProxy
    _proxy_cdma: imports.gi.Gio.DBusProxy

    _reloadSignalQuality(): void

    _reloadOperatorName(): void

    _reload3gppOperatorName(): void

    _reloadCdmaOperatorName(): void
  }
}
