declare namespace imports.ui.lightbox {
  const DEFAULT_FADE_FACTOR: number
  const VIGNETTE_BRIGHTNESS: number
  const VIGNETTE_SHARPNESS: number
  const VIGNETTE_DECLARATIONS: string
  const VIGNETTE_CODE: string

  class RadialShaderEffect extends imports.gi.Shell.GLSLEffect {
    _brightness?: any
    _brightnessLocation: any //  this.get_uniform_location('brightness')
    _sharpnessLocation: any // this.get_uniform_location('vignette_sharpness')

    vfunc_build_pipeline(): void

    get brightness(): unknown
    set brightness(v: unknown)
    get sharpness(): unknown
    set sharpness(v: unknown)
  }

  interface ILightboxParams {
    inhibitEvents: boolean
    width: number
    height: number
    fadeFactor: number
    radialEffect: boolean
  }

  class Lightbox<C extends imports.gi.Clutter.Actor = any> extends imports.gi.St.Bin {
    _container: C
    _active: boolean
    _children?: imports.gi.Clutter.Actor
    _highlighted?: null | imports.gi.Clutter.Actor
    _fadeFactor: number
    _radialEffect: boolean
    _actorAddedSignalId: number
    _actorRemovedSignalId: number

    constructor(container: C, params: Partial<ILightboxParams>)

    get active(): boolean

    _actorAdded(container: imports.gi.Clutter.Actor, newChild: imports.gi.Clutter.Actor): void
    lightOn(fadeInTime?: number): void
    lightOff(fadeOutTime?: number): void
    _actorRemoved(container: imports.gi.Clutter.Actor, child: imports.gi.Clutter.Actor): void
    highlight(window: imports.gi.Clutter.Actor): void
    _onDestroy(): void
  }
}
