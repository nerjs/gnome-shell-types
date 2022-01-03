declare namespace imports.package {
  function _findEffectiveEntryPointName(): string
  function _runningFromSource(): true
  function _runningFromMesonSource(): string
  function _makeNamePath(n: string): string

  interface IInitParams {
    name: string
    varsion: string
    prefix: string
  }

  interface IModule {
    name: string
  }

  function init(params: IInitParams): void
  function start(params: IInitParams): void
  function run(module: IModule): unknown

  interface ILib {
    [libName: string]: string
  }

  function require(libs: ILib[]): void
  function requireSymbol(lib: string, ver: string, symbol: any): void
  function checkSymbol(lib: string, ver: string, symbol: any): boolean
  function initGettext(): void
  function initFormat(): void
  function initSubmodule(moduleName: string): void
}
