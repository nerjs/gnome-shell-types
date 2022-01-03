// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-

// const { Geoclue, Gio, GLib, GWeather, Shell } = imports.gi
// const Signals = imports.signals

// const PermissionStore = imports.misc.permissionStore

// const { loadInterfaceXML } = imports.misc.fileUtils

// Gio._promisify(Geoclue.Simple, 'new', 'new_finish')

// const WeatherIntegrationIface = loadInterfaceXML('org.gnome.Shell.WeatherIntegration')

declare namespace imports.misc.weather {
  const WEATHER_BUS_NAME: string
  const WEATHER_OBJECT_PATH: string
  const WEATHER_INTEGRATION_IFACE: string
  const WEATHER_APP_ID: string
  const UPDATE_THRESHOLD: number

  class WeatherClient extends imports.signals.Signals {
    _loading: boolean
    _locationValid: boolean
    _lastUpdate: imports.gi.GLib.DateTime
    _autoLocationRequested: boolean
    _gclueStarted: boolean
    _gclueStarting: boolean
    _gclueLocationChangedId: number
    _needsAuth: boolean
    _weatherAuthorized: boolean
    _permStore: imports.misc.permissionStore.PermissionStore
    _locationSettings: imports.gi.Gio.Settings
    _mostRecentLocation: null
    _gclueService: null | imports.gi.Geoclue.Simple
    _world: imports.gi.GWeather.Location
    _weatherInfo: imports.gi.GWeather.Info
    _settings: imports.gi.Gio.Settings
    _appSystem: imports.gi.Shell.AppSystem

    connect(name: 'changed', cb: (w: this) => boolean): number

    get available(): boolean
    get loading(): boolean
    get hasLocation(): boolean
    get info(): imports.gi.GWeather.Info

    activateApp(): void
    update(): void

    get _useAutoLocation(): boolean

    _createWeatherProxy(): Promise<void>
    _onWeatherPropertiesChanged(): void
    _onInstalledChanged(): void
    _loadInfo(): void
    _locationsEqual(loc1?: imports.gi.GWeather.Location | null, loc2?: imports.gi.GWeather.Location | null): boolean
    _setLocation(location: imports.gi.GWeather.Location): void
    _updateLocationMonitoring(): void
    _startGClueService(): Promise<void>
    _onGClueLocationChanged(): void
    _onAutomaticLocationChanged(): void
    _updateAutoLocation(): void
    _onLocationsChanged(): void
    _onPermStoreChanged(proxy: any, sender: any, params: any): void
  }
}
