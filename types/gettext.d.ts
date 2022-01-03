declare namespace imports.gettext {
  const LocaleCategory: imports.gi.GjsPrivate.LocaleCategory

  function setlocale(category: string, locale: string): unknown
  function textdomain(dom: unknown): unknown
  function bindtextdomain(dom: unknown, location: unknown): unknown

  function gettext(msgid: string): string
  function dgettext(domain: string | null, msgid: string): string
  function dcgettext(domain: string | null, msgid: string, category: number): string
  function ngettext(msgid: string, msgid_plural: string, n: number): string
  function dngettext(domain: string | null, msgid: string, msgid_plural: string, n: number): string
  function pgettext(msgctxtid: string, msgidoffset: number): string
  function dpgettext(domain: string | null, context: string, msgid: string): string

  function domain(domainName: string): {
    gettext(msgid: string): string
    ngettext(msgid1: string, msgid2: string, n: number): string
    pgettext(context: string, msgid: string): string
  }
}
