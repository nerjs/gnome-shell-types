// TODO: imports.ui.extensionSystem
type IExtension = any

declare namespace imports.misc.extensionUtils {
  enum ExtensionType {
    SYSTEM = 1,
    PER_USER = 2,
  }

  enum ExtensionState {
    ENABLED = 1,
    DISABLED = 2,
    ERROR = 3,
    OUT_OF_DATE = 4,
    DOWNLOADING = 5,
    INITIALIZED = 6,
    UNINSTALLED = 99,
  }

  type SERIALIZED_PROPERTIES = 'type' | 'state' | 'path' | 'error' | 'hasPrefs' | 'hasUpdate' | 'canChange'
  function getCurrentExtension(): null | IExtension
  function initTranslations(domain: string): void
  function callExtensionGettextFunc(func: string, ...args: unknown[]): string
  function gettext(str: string): string
  function ngettext(str: string, strPlural: any, n: number): string
  function pgettext(context: string, str: string): string
  function getSettings(schema: string): imports.gi.Gio.Settings
  function openPrefs(): void
  function isOutOfDate(extension: IExtension): boolean
  function serializeExtension(extension: IExtension): {
    [key in SERIALIZED_PROPERTIES]: imports.gi.GLib.Variant<key, IExtension[key]>
  }
  // TODO: ??
  function deserializeExtension(variant: unknown): unknown
  function installImporter(extension: IExtension): void
}
