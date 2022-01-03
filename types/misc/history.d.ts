// TODO: ??
type HistoryEvent = any

declare namespace imports.misc.history {
  const DEFAULT_LIMIT: 512

  interface IHistoryManagerParams<K, E> {
    gsettingsKey: K
    limit: number
    entry: E
  }

  class HistoryManager<K extends string, E extends imports.signals.Signals> extends imports.signals.Signals {
    _key: K
    _limit: number
    _entry: E
    _history: string[]

    constructor(params: IHistoryManagerParams<K, E>)

    _historyChanged(): void
    _setPrevItem(text: string): boolean
    _setNextItem(text: string): boolean

    lastItem(): string | null
    addItem(input: string): string

    _onEntryKeyPress(entry: E, event: HistoryEvent): boolean | number
    _indexChanged(): unknown
    _save(): void

    connect(name: 'changed', cb: (manager: this, current: string) => boolean): number
  }
}
