// TODO: directory - ??
type IDir = any

declare namespace imports.misc.fileUtils {
  function collectFromDatadirs(subdir: string, includeUserDir: boolean, processFile: () => unknown): void
  function recursivelyDeleteDir(dir: IDir, deleteParent?: boolean): void
  function recursivelyMoveDir(srcDir: IDir, destDir: IDir): void
  function ensureIfaceResource(): void
  function loadInterfaceXML(iface: string): string | null
  function loadSubInterfaceXML(iface: string, ifaceFile: string): string | null
}
