declare namespace imports.gi.GObject {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interface Object {
    _init(): void
    connect(name: string, callback: (...params: unknown[]) => void): number
    // connect(signal: string | 'notify', callback: (owner: this, pspec: any) => void): number
  }
}
