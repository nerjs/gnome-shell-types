declare namespace imports.misc.introspect {
  const APP_ALLOWLIST: string[]
  const INTROSPECT_DBUS_API_VERSION: number

  class IntrospectService {
    GetRunningApplicationsAsync(params: any, invocation: any): Promise<unknown>
    GetWindowsAsync(params: any, invocation: any): Promise<unknown>

    get AnimationsEnabled(): unknown

    get ScreenSize(): [number, number]

    get version(): string
  }
}
