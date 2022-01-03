declare namespace imports.misc.systemActions {
  const LOCKDOWN_SCHEMA: 'org.gnome.desktop.lockdown'
  const LOGIN_SCREEN_SCHEMA: 'org.gnome.login-screen'
  const DISABLE_USER_SWITCH_KEY: 'disable-user-switching'
  const DISABLE_LOCK_SCREEN_KEY: 'disable-lock-screen'
  const DISABLE_LOG_OUT_KEY: 'disable-log-out'
  const DISABLE_RESTART_KEY: 'disable-restart-buttons'
  const ALWAYS_SHOW_LOG_OUT_KEY: 'always-show-log-out'

  const POWER_OFF_ACTION_ID: 'power-off'
  const RESTART_ACTION_ID: 'restart'
  const LOCK_SCREEN_ACTION_ID: 'lock-screen'
  const LOGOUT_ACTION_ID: 'logout'
  const SUSPEND_ACTION_ID: 'suspend'
  const SWITCH_USER_ACTION_ID: 'switch-user'
  const LOCK_ORIENTATION_ACTION_ID: 'lock-orientation'

  interface IAction {
    name: string
    iconName: string
    keywords: string[]
    available: boolean
  }

  type ActionType =
    | typeof LOCKDOWN_SCHEMA
    | typeof LOGIN_SCREEN_SCHEMA
    | typeof DISABLE_USER_SWITCH_KEY
    | typeof DISABLE_LOCK_SCREEN_KEY
    | typeof DISABLE_LOG_OUT_KEY
    | typeof DISABLE_RESTART_KEY
    | typeof ALWAYS_SHOW_LOG_OUT_KEY
    | typeof POWER_OFF_ACTION_ID
    | typeof RESTART_ACTION_ID
    | typeof LOCK_SCREEN_ACTION_ID
    | typeof LOGOUT_ACTION_ID
    | typeof SUSPEND_ACTION_ID
    | typeof SWITCH_USER_ACTION_ID
    | typeof LOCK_ORIENTATION_ACTION_ID

  class SystemActions extends imports.gi.GObject.Object {
    _canHavePowerOff: boolean
    _canHaveSuspend: boolean
    _actions: Map<ActionType, IAction>
    _loginScreenSettings: imports.gi.Gio.Settings
    _lockdownSettings: imports.gi.Gio.Settings
    _orientationSettings: imports.gi.Gio.Settings
    _session: imports.misc.gnomeSession.SessionManager
    _loginManager: imports.misc.loginManager.LoginManagerDummy | imports.misc.loginManager.LoginManagerSystemd
    _monitorManager: imports.gi.Meta.MonitorManager
    _userManager: imports.gi.AccountsService.UserManager
    _suspendNeedsAuth?: boolean

    get canPowerOff(): boolean
    get canRestart(): boolean
    get canSuspend(): boolean
    get canLockScreen(): boolean
    get canSwitchUser(): boolean
    get canLogout(): boolean
    get canLockOrientation(): boolean
    get orientationLockIcon(): boolean

    _updateOrientationLock(): void
    _updateOrientationLockStatus(): void
    _sessionUpdated(): void
    _updateLockScreen(): void
    _updateHaveShutdown(): void
    _updatePowerOff(): void
    _updateHaveSuspend(): void
    _updateSuspend(): void
    _updateMultiUser(): void
    _updateSwitchUser(): boolean
    _updateLogout(): boolean

    forceUpdate(): void
    getMatchingActions(terms: string): ActionType[]
    getName(id: ActionType): string
    getIconName(id: ActionType): string
    activateAction(id: ActionType): void
    activateLockOrientation(): void
    activateLockScreen(): void
    activateSwitchUser(): void
    activateLogout(): void
    activatePowerOff(): void
    activateRestart(): void
    activateSuspend(): void

    connect(name: 'can-lock-orientation', cb: (t: this) => void): number
    connect(name: 'can-lock-screen', cb: (t: this) => void): number
    connect(name: 'can-power-off', cb: (t: this) => void): number
    connect(name: 'can-restart', cb: (t: this) => void): number
    connect(name: 'orientation-lock-icon', cb: (t: this) => void): number
    connect(name: 'can-suspend', cb: (t: this) => void): number
    connect(name: 'can-switch-user', cb: (t: this) => void): number
    connect(name: 'can-logout', cb: (t: this) => void): number
  }

  function getDefault(): SystemActions
}
