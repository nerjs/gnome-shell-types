declare namespace imports.ui.dnd {
  const SCALE_ANIMATION_TIME: number
  const SNAP_BACK_ANIMATION_TIME: number
  const REVERT_ANIMATION_TIME: number

  enum DragMotionResult {
    NO_DROP = 0,
    COPY_DROP = 1,
    MOVE_DROP = 2,
    CONTINUE = 3,
  }

  enum DragState {
    INIT = 0,
    DRAGGING = 1,
    CANCELLED = 2,
  }

  const DRAG_CURSOR_MAP: {
    0: imports.gi.Meta.Cursor.DND_UNSUPPORTED_TARGET
    1: imports.gi.Meta.Cursor.DND_COPY
    2: imports.gi.Meta.Cursor.DND_MOVE
  }

  enum DragDropResult {
    FAILURE = 0,
    SUCCESS = 1,
    CONTINUE = 2,
  }

  const dragMonitors: imports.ui.layout.Monitor[]
  const eventHandlerActor: null | imports.gi.Clutter.Actor
  const currentDraggable: null | _Draggable

  function _getEventHandlerActor(): imports.gi.Clutter.Actor
  function _getRealActorScale(actor: imports.gi.Clutter.Actor): number
  function addDragMonitor(monitor: imports.ui.layout.Monitor): void
  function removeDragMonitor(monitor: imports.ui.layout.Monitor): void

  interface _DraggableParams {
    manualMode: boolean
    timeoutThreshold: number
    restoreOnSuccess: boolean
    dragActorMaxSize?: unknown
    dragActorOpacity?: unknown
  }

  class _Draggable extends imports.signals.Signals {
    actor: imports.gi.Clutter.Actor
    constructor(actor: imports.gi.Clutter.Actor, params: Partial<_DraggableParams>)

    /**
     * fakeRelease:
     *
     * Fake a release event.
     * Must be called if you want to intercept release events on draggable
     * actors for other purposes (for example if you're using
     * PopupMenu.ignoreRelease())
     */
    fakeRelease(): void

    connect(name: 'drag-begin', cb: (d: this) => boolean): number
    connect(name: 'drag-end', cb: (d: this, eventTime: number, p: boolean) => boolean): number
    connect(name: 'drag-cancelled', cb: (d: this, eventTime: number) => boolean): number

    /**
     * startDrag:
     * @param {number} stageX: X coordinate of event
     * @param {number} stageY: Y coordinate of event
     * @param {number} time: Event timestamp
     * @param {Clutter.EventSequence=} sequence: Event sequence
     * @param {Clutter.InputDevice=} device: device that originated the event
     *
     * Directly initiate a drag and drop operation from the given actor.
     * This function is useful to call if you've specified manualMode
     * for the draggable.
     */
    startDrag(
      stageX: number,
      stageY: number,
      time: number,
      sequence?: imports.gi.Clutter.EventSequence,
      device?: imports.gi.Clutter.InputDevice,
    ): void
  }

  function makeDraggable(actor: imports.gi.Clutter.Actor, params: Partial<_DraggableParams>): _Draggable
}
