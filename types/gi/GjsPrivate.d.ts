declare namespace imports.gi.GjsPrivate {
  type LocaleCategory = any
  function setlocale(category: string, locale: string): unknown
  function textdomain(dom: unknown): unknown
  function bindtextdomain(dom: unknown, location: unknown): unknown
}
