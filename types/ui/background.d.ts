// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-
/* exported SystemBackground */

// READ THIS FIRST
// Background handling is a maze of objects, both objects in this file, and
// also objects inside Mutter. They all have a role.
//
// BackgroundManager
//   The only object that other parts of GNOME Shell deal with; a
//   BackgroundManager creates background actors and adds them to
//   the specified container. When the background is changed by the
//   user it will fade out the old actor and fade in the new actor.
//   (This is separate from the fading for an animated background,
//   since using two actors is quite inefficient.)
//
// MetaBackgroundImage
//   An object represented an image file that will be used for drawing
//   the background. MetaBackgroundImage objects asynchronously load,
//   so they are first created in an unloaded state, then later emit
//   a ::loaded signal when the Cogl object becomes available.
//
// MetaBackgroundImageCache
//   A cache from filename to MetaBackgroundImage.
//
// BackgroundSource
//   An object that is created for each GSettings schema (separate
//   settings schemas are used for the lock screen and main background),
//   and holds a reference to shared Background objects.
//
// MetaBackground
//   Holds the specification of a background - a background color
//   or gradient and one or two images blended together.
//
// Background
//   JS delegate object that Connects a MetaBackground to the GSettings
//   schema for the background.
//
// Animation
//   A helper object that handles loading a XML-based animation; it is a
//   wrapper for GnomeDesktop.BGSlideShow
//
// MetaBackgroundActor
//   An actor that draws the background for a single monitor
//
// BackgroundCache
//   A cache of Settings schema => BackgroundSource and of a single Animation.
//   Also used to share file monitors.
//
// A static image, background color or gradient is relatively straightforward. The
// calling code creates a separate BackgroundManager for each monitor. Since they
// are created for the same GSettings schema, they will use the same BackgroundSource
// object, which provides a single Background and correspondingly a single
// MetaBackground object.
//
// BackgroundManager               BackgroundManager
//        |        \               /        |
//        |         BackgroundSource        |        looked up in BackgroundCache
//        |                |                |
//        |            Background           |
//        |                |                |
//   MetaBackgroundActor   |    MetaBackgroundActor
//         \               |               /
//          `------- MetaBackground ------'
//                         |
//                MetaBackgroundImage            looked up in MetaBackgroundImageCache
//
// The animated case is tricker because the animation XML file can specify different
// files for different monitor resolutions and aspect ratios. For this reason,
// the BackgroundSource provides different Background share a single Animation object,
// which tracks the animation, but use different MetaBackground objects. In the
// common case, the different MetaBackground objects will be created for the
// same filename and look up the *same* MetaBackgroundImage object, so there is
// little wasted memory:
//
// BackgroundManager               BackgroundManager
//        |        \               /        |
//        |         BackgroundSource        |        looked up in BackgroundCache
//        |             /      \            |
//        |     Background   Background     |
//        |       |     \      /   |        |
//        |       |    Animation   |        |        looked up in BackgroundCache
// MetaBackgroundA|tor           Me|aBackgroundActor
//         \      |                |       /
//      MetaBackground           MetaBackground
//                 \                 /
//                MetaBackgroundImage            looked up in MetaBackgroundImageCache
//                MetaBackgroundImage
//
// But the case of different filenames and different background images
// is possible as well:
//                        ....
//      MetaBackground              MetaBackground
//             |                          |
//     MetaBackgroundImage         MetaBackgroundImage
//     MetaBackgroundImage         MetaBackgroundImage

declare namespace imports.ui.background {
  type SettingsSchema = string

  const DEFAULT_BACKGROUND_COLOR: imports.gi.Clutter.Color
  const BACKGROUND_SCHEMA: string
  const PRIMARY_COLOR_KEY: string
  const SECONDARY_COLOR_KEY: string
  const COLOR_SHADING_TYPE_KEY: string
  const BACKGROUND_STYLE_KEY: string
  const PICTURE_URI_KEY: string
  const FADE_ANIMATION_TIME: number
  const ANIMATION_OPACITY_STEP_INCREMENT: number
  const ANIMATION_MIN_WAKEUP_INTERVAL: number

  function _fileEqual0(file1: imports.gi.Gio.File, file2: imports.gi.Gio.File): boolean

  interface AnimationParams {
    file?: imports.gi.Gio.File
    settingsSchema?: SettingsSchema
    onLoaded?: (animation: Animation) => void
  }

  class BackgroundCache extends imports.signals.Signals {
    connect(name: 'file-changed', cb: (bc: this, file: imports.gi.Gio.File) => boolean): number
    monitorFile(file: imports.gi.Gio.File): void

    getAnimation(params: AnimationParams): void
    getBackgroundSource(
      layoutManager: imports.ui.layout.LayoutManager,
      settingsSchema: SettingsSchema,
    ): BackgroundSource

    releaseBackgroundSource(settingsSchema: SettingsSchema): void
  }

  function getBackgroundCache(): BackgroundCache

  interface BackgroundParams {
    monitorIndex: number
    layoutManager: imports.ui.layout.LayoutManager
    settings: SettingsSchema
    file: imports.gi.Gio.File
    style: unknown
  }

  class Background extends imports.gi.Meta.Background {
    isLoaded: boolean

    constructor(params: Partial<BackgroundParams>)

    connect(name: 'bg-changed', cb: (b: this) => boolean): number

    destroy(): void
    updateResolution(): void
  }

  class SystemBackground extends imports.gi.Meta.BackgroundActor {}

  class BackgroundSource {
    constructor(layoutManager: imports.ui.layout.LayoutManager, settingsSchema: SettingsSchema)

    getBackground(monitorIndex: number): Background
    destroy(): void
  }

  class Animation extends imports.gi.GnomeDesktop.BGSlideShow {
    keyFrameFiles: imports.gi.Gio.File[]
    transitionProgress: number
    transitionDuration: number
    loaded: boolean

    constructor(params: imports.gi.GnomeDesktop.BGSlideShowParams)

    load(callback?: () => void): void
    update(monitor: imports.ui.layout.Monitor): void
  }

  interface BackgroundManagerParams {
    container: null | imports.gi.Clutter.Actor
    layoutManager: imports.ui.layout.LayoutManager
    monitorIndex: null | number
    vignette: boolean
    controlPosition: boolean
    settingsSchema: SettingsSchema
    useContentSize: boolean
  }

  class BackgroundManager extends imports.signals.Signals {
    backgroundActor: imports.gi.Meta.BackgroundActor

    constructor(params: Partial<BackgroundManagerParams>)

    destroy(): void
  }
}
