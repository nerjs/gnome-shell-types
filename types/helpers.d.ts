declare namespace helpers {
  type Schema = Record<string, unknown[]>

  interface MixinConnects<D extends Schema, O> {
    connect<N extends keyof D>(name: N, callback: (owner: O, ...args: D[N]) => boolean): number
  }
}
