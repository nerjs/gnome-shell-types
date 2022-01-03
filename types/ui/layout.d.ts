declare namespace imports.ui.layout {
  const STARTUP_ANIMATION_TIME: number
  const BACKGROUND_FADE_ANIMATION_TIME: number
  const HOT_CORNER_PRESSURE_THRESHOLD: number // pixels
  const HOT_CORNER_PRESSURE_TIMEOUT: number // ms

  function isPopupMetaWindow(actor: imports.gi.Clutter.Actor): boolean

  class MonitorConstraint extends imports.gi.Clutter.Constraint {
    _primary: boolean
    _index: number
    _workArea: boolean

    get primary(): boolean
    set primary(v: boolean)
    get index(): number
    set index(v: number)
    get workArea(): boolean
    set workArea(v: boolean)

    vfunc_set_actor(actor: imports.gi.Clutter.Actor): void
    vfunc_update_allocation(actor: imports.gi.Clutter.Actor, actorBox: imports.gi.Clutter.Actor): void
  }

  interface IGeometry {
    x: number
    y: number
    width: number
    height: number
  }

  class Monitor implements IGeometry {
    x: number
    y: number
    width: number
    height: number
    index: number
    geometry_scale: number

    constructor(index: number, geometry: IGeometry, geometryScale: number)

    get inFullscreen(): unknown
  }

  class UiActor extends imports.gi.St.Widget {
    vfunc_get_preferred_width(_forHeight: number): [number, number]
    vfunc_get_preferred_height(_forWidth: number): [number, number]
  }

  interface ITrackActorParams {
    trackFullscreen: boolean
    affectsStruts: boolean
    affectsInputRegion: boolean
  }

  class LayoutManager extends imports.gi.GObject.Object {
    _rtl: boolean
    monitors: Monitor[]
    primaryMonitor: null | Monitor
    bottomMonitor?: null | Monitor
    primaryIndex: number
    hotCorners: HotCorner[]
    _keyboardIndex: number
    _rightPanelBarrier: null | unknown //?
    _inOverview: boolean
    _updateRegionIdle: number
    _trackedActors: imports.gi.Clutter.Actor[]
    _topActors: unknown[] //?
    _isPopupWindowVisible: boolean
    _startingUp: boolean
    _pendingLoadBackground: boolean
    uiGroup: UiActor
    overviewGroup: imports.gi.St.Widget
    screenShieldGroup: imports.gi.St.Widget
    modalDialogGroup: imports.gi.St.Widget
    dummyCursor: imports.gi.St.Widget
    panelBox: imports.gi.St.BoxLayout
    keyboardBox: imports.gi.St.BoxLayout
    _keyboardHeightNotifyId: number
    _backgroundGroup: imports.gi.Meta.BackgroundGroup
    _bgManagers: imports.ui.background.BackgroundManager[]
    _interfaceSettings: imports.gi.Gio.Settings

    get currentMonitor(): Monitor
    get keyboardMonitor(): Monitor
    get focusIndex(): number
    get focusMonitor(): Monitor | null
    set keyboardIndex(v: number)
    get keyboardIndex(): number

    _sessionUpdated(): void
    _updateMonitors(): void
    _updateHotCorners(): void
    _addBackgroundMenu(bgManager: imports.ui.background.BackgroundManager): void
    _createBackgroundManager(monitorIndex: number): imports.ui.background.BackgroundManager
    _showSecondaryBackgrounds(): void
    _waitLoaded(bgManager: imports.ui.background.BackgroundManager): Promise<void>
    _updateBackgrounds(): Promise<void>
    _updateKeyboardBox(): void
    _updateBoxes(): void
    _panelBoxChanged(): void
    _updatePanelBarrier(): void
    _monitorsChanged(): void
    _isAboveOrBelowPrimary(monitor: Monitor): boolean
    _loadBackground(): void
    _prepareStartupAnimation(): Promise<void>
    _startupAnimation(): void
    _startupAnimationGreeter(): void
    _startupAnimationSession(): void
    _startupAnimationComplete(): void
    _findActor(actor: imports.gi.Clutter.Actor): number
    _trackActor(actor: imports.gi.Clutter.Actor, params: ITrackActorParams): void
    _untrackActor(actor: imports.gi.Clutter.Actor): void
    _updateActorVisibility(actorData: unknown): void
    _updateVisibility(): void
    _queueUpdateRegions(): void
    _updateFullscreen(): void
    _windowsRestacked(): void
    _updateRegions(): void

    init(): void
    showOverview(): void
    hideOverview(): void
    setDummyCursorGeometry(x: number, y: number, w: number, h: number): void
    addChrome(actor: imports.gi.Clutter.Actor, params: ITrackActorParams): void
    addTopChrome(actor: imports.gi.Clutter.Actor, params: ITrackActorParams): void
    trackChrome(actor: imports.gi.Clutter.Actor, params: ITrackActorParams): void
    untrackChrome(actor: imports.gi.Clutter.Actor): void
    removeChrome(actor: imports.gi.Clutter.Actor): void
    getWorkAreaForMonitor(monitorIndex: number): unknown
    findIndexForActor(actor: imports.gi.Clutter.Actor): number
    findMonitorForActor(actor: imports.gi.Clutter.Actor): Monitor | null
    modalEnded(): void

    connect(name: 'hot-corners-changed', cb: (manager: this) => void): number
    connect(name: 'monitors-changed', cb: (manager: this) => void): number
    connect(name: 'startup-prepared', cb: (manager: this) => void): number
    connect(name: 'startup-complete', cb: (manager: this) => void): number
  }

  class HotCorner extends imports.gi.Clutter.Actor {
    _entered: boolean
    _monitor: Monitor
    _x: number
    _y: number
    _corner: imports.gi.Clutter.Actor
    _pressureBarrier: PressureBarrier

    constructor(layoutManager: LayoutManager, monitor: Monitor, x: number, y: number)
    _setupFallbackCornerIfNeeded(layoutManager: LayoutManager): void
    _onDestroy(): void
    _toggleOverview(): void
    _onCornerEntered(): unknown
    _onCornerLeft(actor: any, event: unknown): unknown
    vfunc_leave_event(crossingEvent: unknown): unknown
    handleDragOver(source: unknown, _actor: any, _x: any, _y: any, _time: any): imports.ui.dnd.DragMotionResult
    setBarrierSize(size: number): void
  }

  type Barrier = any

  class PressureBarrier extends imports.signals.Signals {
    _threshold: string
    _timeout: number
    _actionMode: imports.gi.Shell.ActionMode
    _barriers: Barrier[]
    _eventFilter: null
    _isTriggered: boolean

    constructor(threshold: string, timeout: number, actionMode: imports.gi.Shell.ActionMode)

    _disconnectBarrier(barrier: Barrier): void
    _reset(): void
    _isHorizontal(barrier: Barrier): boolean
    _getDistanceAcrossBarrier(barrier: Barrier, event: unknown): number
    _getDistanceAlongBarrier(barrier: Barrier, event: unknown): number
    _trimBarrierEvents(): void
    _onBarrierLeft(barrier: Barrier, _event: unknown): void
    _trigger(): void
    _onBarrierHit(barrier: Barrier, event: unknown): void

    removeBarrier(barrier: Barrier): void
    destroy(): void
    setEventFilter(filter: unknown): void
    addBarrier(barrier: Barrier): void

    connect(name: 'trigger', cb: (m: this) => void): number
  }
}
