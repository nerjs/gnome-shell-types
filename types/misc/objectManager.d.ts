declare namespace imports.misc.objectManager {
  const ObjectManagerInfo: imports.gi.Gio.DBusInterfaceInfo

  interface IObjectManagerParams {
    connection: imports.gi.Gio.DBusConnection
    name: string
    objectPath: string
    knownInterfaces: string[]
    cancellable: imports.gi.Gio.Cancellable
    onLoaded: () => void
  }

  interface IInterfacesInfo {
    name: string
    [key: string]: any
  }

  class ObjectManager extends imports.signals.Signals {
    _connection: imports.gi.Gio.DBusConnection | null
    _serviceName: string | null
    _managerPath: string | null
    _cancellable: imports.gi.Gio.Cancellable | null
    _managerProxy: imports.gi.Gio.DBusProxy | null
    _interfaceInfos: {
      [key: string]: IInterfacesInfo
    }
    _objects: {
      [objectPath: string]: {
        [interfaceName: string]: imports.gi.Gio.DBusProxy
      }
    }
    _interfaces: {
      [interfaceName: string]: imports.gi.Gio.DBusProxy[]
    }
    _numLoadInhibitors: number

    constructor(params: Partial<IObjectManagerParams>)

    _tryToCompleteLoad(): void
    _addInterface(objectPath: string, interfaceName: string, onFinished: () => void): Promise<void>
    _removeInterface(objectPath: string, interfaceName: string): void
    _initManagerProxy(): Promise<void>
    _onNameAppeared(): void
    _onNameVanished(): void
    _registerInterfaces(interfaces: IInterfacesInfo[]): void

    getProxy(objectPath: string, interfaceName: string): imports.gi.Gio.DBusProxy
    getProxiesForInterface(interfaceName: string): imports.gi.Gio.DBusProxy[]
    getAllProxies(): imports.gi.Gio.DBusProxy[]

    connect(name: 'object-added', cb: (manager: this, objectPath: string) => boolean): number
    connect(name: 'object-removed', cb: (manager: this, objectPath: string) => boolean): number
    connect(
      name: 'interface-added',
      cb: (manager: this, interfaceName: string, proxy: imports.gi.Gio.DBusProxy) => boolean,
    ): number
    connect(
      name: 'interface-removed',
      cb: (manager: this, interfaceName: string, proxy: imports.gi.Gio.DBusProxy) => boolean,
    ): number
  }
}
