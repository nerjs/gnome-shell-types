declare namespace imports.ui.boxpointer {
  enum PopupAnimation {
    NONE = 0,
    SLIDE = 1 << 0,
    FADE = 1 << 1,
    FULL = ~0,
  }

  const POPUP_ANIMATION_TIME: number

  class BoxPointer extends imports.gi.St.Widget {
    constructor(arrowSide: imports.gi.St.Side, binProperties?: imports.gi.St.BinInitOptions)

    vfunc_captured_event(): unknown

    get arrowSide(): imports.gi.St.Side

    open(animate: PopupAnimation, onComplete?: () => void): void
    close(animate: PopupAnimation, onComplete?: () => void): void

    vfunc_get_preferred_width(forHeight: unknown): unknown
    vfunc_get_preferred_height(forHeight: unknown): unknown
    vfunc_allocate(box: imports.gi.Clutter.ActorBox): void

    setPosition(sourceActor: imports.gi.Clutter.Actor, alignment: unknown): void
    setSourceAlignment(alignment: unknown): void
    setArrowOrigin(origin: imports.gi.St.Side): void
    setArrowActor(actor: imports.gi.Clutter.Actor): void
    updateArrowSide(side: imports.gi.St.Side): void
    getPadding(side: imports.gi.St.Side): number
    getArrowHeight(): number
  }
}
