declare namespace imports.misc.utils {
  const SCROLL_TIME: number
  const WIGGLE_OFFSET: number
  const WIGGLE_DURATION: number
  const N_WIGGLES: number
  const _balancedParens: string
  const _leadingJunk: string
  const _notTrailingJunk: string

  const _urlRegexp: RegExp

  function findUrls(str: string): {
    url: string
    pos: number
  }[]
  function spawn(argv: string[]): void
  function spawnCommandLine(commandLine: string): void
  function spawnApp(argv: string[]): void
  function trySpawn(argv: string[]): void
  function trySpawnCommandLine(commandLine: string): void
  function _handleSpawnError(command: string, err: Error): void
  function formatTimeSpan(date: imports.gi.GLib.DateTime): string
  function formatTime(
    time: Date | imports.gi.GLib.DateTime,
    params?: {
      timeOnly: boolean
      ampm: boolean
    },
  ): string

  function createTimeLabel(
    date: Date | imports.gi.GLib.DateTime,
    params?: {
      timeOnly: boolean
      ampm: boolean
    },
  ): imports.gi.St.Label

  function lowerBound<T, N>(array: T[], val: N, cmp?: (a: T, b: N) => number): boolean | number
  function insertSorted<T>(array: T[], val: number, cmp?: (a: T, b: number) => number): number

  function ensureActorVisibleInScrollView(scrollView: imports.gi.St.ScrollView, actor: imports.gi.Clutter.Actor): void
  function wiggle(
    actor: imports.gi.Clutter.Actor,
    params?: {
      offset: number
      duration: number
      wiggleCount: number
    },
  ): void
  function lerp(start: number, end: number, progress: number): number
  function _GNOMEversionToNumber(version: string | number): number
  function GNOMEversionCompare(version1: string, version2: string): number

  class DBusSenderChecker {
    _allowlistMap: Map<string, string>
    _uninitializedNames: Set<string>
    _initializedPromise: Promise<void>
    _watchList: (string | number)[]

    constructor(allowList: string[])

    _checkAndResolveInitialized(name: string): void
    _isSenderAllowed(sender: string): Promise<boolean>

    checkInvocation(invocation: imports.gi.Gio.DBusMethodInvocation): Promise<void>
    destroy(): void
  }
}
