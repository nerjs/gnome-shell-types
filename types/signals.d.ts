declare namespace imports.signals {
  class Signals {
    _signalConnections: number
    connect(name: string, callback: (obj: this, ...args: unknown[]) => boolean): number
    disconnect(id: number): void
    emmit(name: string, ...args: unknown[]): void
    signalHandlerIsConnected(id: number): boolean
    disconnectAll(): void
  }

  function addSignalMethods(proto: any): void
}
