interface ILocations {
  x: number
  y: number
  width: number
  height: number
}

declare namespace imports.misc.ibusManager {
  class IBusManager extends imports.signals.Signals {
    _MAX_INPUT_SOURCE_ACTIVATION_TIME: number
    _PRELOAD_ENGINES_DELAY_TIME: number
    _ready: boolean

    _spawn(extraArgs: string[]): void
    restartDaemon(extraArgs: string[]): void
    _clear(): void
    _onConnected(): void
    _initEngines(): Promise<void>
    _initPanelService(): Promise<void>
    _updateReadiness(): void
    _engineChanged(bus: any, engineName: string): void
    _updateProperty(panel: any, prop: any): void
    _setContentType(panel: any, purpose: any, hints: any): void
    activateProperty(key: any, state: any): void
    getEngineDesc(id: any): any
    setEngine(id: string | number, callback: () => unknown): Promise<void>
    preloadEngines(ids: (string | number)[]): void

    connect(name: 'ready', cb: (manager: this, ready: boolean) => boolean): number
    connect(name: 'set-cursor-location', cb: (manager: this, location: ILocations) => boolean): number
    connect(name: 'focus-in', cb: (manager: this) => boolean): number
    connect(name: 'focus-out', cb: (manager: this) => boolean): number
    connect(name: 'properties-registered', cb: (manager: this, engineName: string, props: any) => boolean): number
    connect(name: 'properties-updated', cb: (manager: this, engineName: string, props: any) => boolean): number
    connect(name: 'set-content-type', cb: (manager: this, purpose: any, hints: any) => boolean): number
  }

  function _checkIBusVersion(requiredMajor: number, requiredMinor: void, requiredMicro: void): void
  function getIBusManager(): IBusManager
}
