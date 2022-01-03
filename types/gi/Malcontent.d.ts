declare namespace imports.gi.Malcontent {
  type Filter = any

  enum ManagerGetValueFlags {
    NONE,
  }

  enum ManagerError {
    DISABLED,
  }

  interface IManagerParams {
    connection: imports.gi.Gio.DBus
  }

  class Manager {
    constructor(params: IManagerParams)

    get_app_filter_async(uid: number, flag: ManagerGetValueFlags, n?: any): Filter
  }
}
