/**
 * @description class imports.gi.GnomeDesktop.XkbInfo
 */
type XkbInfo = any

declare namespace imports.misc.keyboardManager {
  const DEFAULT_LOCALE: string
  const DEFAULT_LAYOUT: string
  const DEFAULT_VARIANT: string

  interface ILocaleLayout {
    layout: string
    variant: string
  }

  interface ILayoutInfo extends ILocaleLayout {
    id: string
    groupIndex: string
    group: ILayoutInfo[]
  }

  interface IKeyMap {
    layouts: string
    variants: string
    options: string
  }

  class KeyboardManager {
    MAX_LAYOUTS_PER_GROUP: number
    _xkbInfo: XkbInfo
    _localeLayoutInfo: ILocaleLayout
    _layoutInfos: Record<string, ILayoutInfo>
    _current: ILayoutInfo | null
    _xkbOptions?: string[]
    _currentKeymap: IKeyMap | null

    get currentLayout(): ILayoutInfo | null

    _applyLayoutGroup(group: ILocaleLayout[]): void
    _applyLayoutGroupIndex(idx: string[]): void
    _getLocaleLayout(): ILocaleLayout
    _buildGroupStrings(_group: ILocaleLayout[]): [string, string]
    _buildOptionsString(): string

    apply(id: string): void
    reapply(): void
    setUserLayouts(ids: string[]): void
    setKeyboardOptions(options: string[]): void
  }

  function getXkbInfo(): XkbInfo
  function getKeyboardManager(): KeyboardManager
  function releaseKeyboard(): void
  function holdKeyboard(): void
}
