// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-
/* exported Animation, AnimatedIcon, Spinner */

// const { Clutter, GLib, GObject, Gio, St } = imports.gi

// const Params = imports.misc.params

declare namespace imports.ui.animation {
  const ANIMATED_ICON_UPDATE_TIMEOUT: number
  const SPINNER_ANIMATION_TIME: number
  const SPINNER_ANIMATION_DELAY: number

  class Animation extends imports.gi.St.Bin {
    constructor(file: imports.gi.Gio.File, width: number, height: number, speed: number)

    play(): void

    stop(): void
  }

  class AnimatedIcon extends Animation {
    constructor(file: imports.gi.Gio.File, size: number)
  }

  class Spinner extends AnimatedIcon {
    opacity: number
    visible: boolean

    constructor(size: number, params?: { animate?: boolean; hideOnStop?: boolean })
  }
}
