declare namespace imports.ui.iconGrid {
  enum AnimationDirection {
    IN,
  }

  class IconGrid {}

  interface BaseIconParams {}

  class BaseIcon {}
}

declare namespace imports.ui.search {
  class GridSearchResult {}
}

declare namespace imports.ui.appDisplay {
  interface PageData {
    [itemId: string]: {
      position: number
    }
  }

  interface AppMeta {
    id: string
    name: string
    createIcon: (size: number) => imports.gi.St.Icon
  }

  type SearchResult = string
  type Source = any
  type Folder = imports.gi.Gio.Settings
  type Button = 1 | 2 | 3

  const MENU_POPUP_TIMEOUT: number
  const POPDOWN_DIALOG_TIMEOUT: number
  const FOLDER_SUBICON_FRACTION: number
  const VIEWS_SWITCH_TIME: number
  const VIEWS_SWITCH_ANIMATION_DELAY: number
  const SCROLL_TIMEOUT_TIME: number
  const APP_ICON_SCALE_IN_TIME: number
  const APP_ICON_SCALE_IN_DELAY: number
  const APP_ICON_TITLE_EXPAND_TIME: number
  const APP_ICON_TITLE_COLLAPSE_TIME: number
  const FOLDER_DIALOG_ANIMATION_TIME: number
  const PAGE_PREVIEW_ANIMATION_TIME: number
  const PAGE_PREVIEW_ANIMATION_START_OFFSET: number
  const PAGE_PREVIEW_FADE_EFFECT_MAX_OFFSET: number
  const PAGE_PREVIEW_MAX_ARROW_OFFSET: number
  const PAGE_INDICATOR_FADE_TIME: number
  const MAX_PAGE_PADDING: number
  const OVERSHOOT_THRESHOLD: number
  const OVERSHOOT_TIMEOUT: number
  const DELAYED_MOVE_TIMEOUT: number

  const DIALOG_SHADE_NORMAL: imports.gi.Clutter.Color
  const DIALOG_SHADE_HIGHLIGHT: imports.gi.Clutter.Color

  enum SidePages {
    NONE = 0,
    PREVIOUS = 1 << 0,
    NEXT = 1 << 1,
    DND = 1 << 2,
  }

  class BaseAppView extends imports.gi.St.Widget {
    constructor(params?: Partial<imports.gi.St.WidgetInitOptions>)

    handleDragOver(source: Source): imports.ui.dnd.DragMotionResult
    acceptDrop(source: Source): boolean
    getAllItems(): AppIcon[]
    selectApp(id: string): void

    vfunc_allocate(box: imports.gi.Clutter.ActorBox): void

    vfunc_map(): void
    vfunc_unmap(): void
    animateSwitch(animationDirection: imports.ui.iconGrid.AnimationDirection): void
    goToPage(pageNumber: number, animate?: boolean): void
    adaptToSize(width: number, height: number): void
    updateDragFocus(dragFocus: unknown): void
  }

  class PageManager extends imports.gi.GObject.Object {
    getAppPosition(appId: string): [number, number]
    set pages(p: PageData[])
    get pages(): PageData[]
  }

  class AppDisplay extends BaseAppView {
    vfunc_map(): void
    vfunc_unmap(): void
    adaptToSize(width: number, height: number): void

    getAppInfos(): imports.gi.Gio.AppInfo[]

    animateSwitch(animationDirection: imports.ui.iconGrid.AnimationDirection): void

    goToPage(pageNumber: number, animate?: boolean): void

    addFolderDialog(dialog: imports.gi.Clutter.Actor): void

    acceptDrop(source: Source): boolean
    createFolder(apps: string[]): boolean
  }

  class AppSearchProvider {
    id: string
    isRemoteProvider: boolean
    canLaunchSearch: boolean

    getResultMetas(apps: string[], callback: (matas: AppMeta[]) => void): void
    filterResults<T>(results: T[], maxNumber: number): T[]
    getInitialResultSet(terms: string[], callback: (results: SearchResult[]) => void, _cancellable?: boolean): void
    getSubsearchResultSet(
      previousResults: SearchResult[],
      terms: string[],
      callback: (results: unknown[]) => void,
      cancellable?: boolean,
    ): void
    createResultObject(resultMeta: AppMeta): AppIcon | SystemActionIcon
  }

  class AppViewItem extends imports.gi.St.Button {
    constructor(params?: Partial<imports.gi.St.ButtonInitOptions>, isDraggable?: boolean, expandTitleOnHover?: boolean)

    scaleIn(): void
    scaleAndFade(): void
    undoScaleAndFade(): void
    handleDragOver(source: Source, _actor: imports.gi.Clutter.Actor, x: number): imports.ui.dnd.DragMotionResult
    acceptDrop(source: Source, _actor: imports.gi.Clutter.Actor, x: number): boolean
    cancelActions(): void
    get id(): string
    get name(): string
  }

  class FolderGrid extends imports.ui.iconGrid.IconGrid {
    adaptToSize(width: number, height: number): void
  }

  class FolderView extends BaseAppView {
    constructor(folder: Folder, id: string, parentView: AppDisplay)

    createFolderIcon(size: number): imports.gi.St.Widget
    addApp(app: imports.gi.Shell.App): void
    removeApp(app: imports.gi.Shell.App): void
    get deletingFolder(): unknown
  }

  class FolderIcon extends AppViewItem {
    icon: imports.ui.iconGrid.BaseIcon
    label_actor: imports.gi.St.Label
    view: FolderView

    constructor(id: string, path: string, parentView: AppDisplay)

    vfunc_clicked(): void
    vfunc_unmap(): void
    open(): void
    getAppIds(): string[]

    getDragActor(): imports.ui.iconGrid.BaseIcon

    getDragActorSource(): this

    acceptDrop(source: Source): boolean
  }

  class AppFolderDialog extends imports.gi.St.Bin {
    child: imports.gi.St.Bin

    constructor(source: Source, folder: Folder, appDisplay: AppDisplay)

    vfunc_key_press_event(keyEvent: unknown): unknown
    handleDragOver(
      source: Source,
      actor: imports.gi.Clutter.Actor,
      x: number,
      y: number,
    ): imports.ui.dnd.DragMotionResult
    acceptDrop(source: Source): boolean
    toggle(): void
    popup(): void
    popdown(callback: () => void): void
  }

  type AppIconParams = imports.ui.iconGrid.BaseIconParams & {
    isDraggable: boolean
    expandTitleOnHover: boolean
  }

  class AppIcon extends AppViewItem {
    app: AppDisplay

    constructor(app: AppDisplay, iconParams?: Partial<AppIconParams>)

    vfunc_clicked(button: Button): void
    getId(): string
    popupMenu(side?: imports.gi.St.Side): boolean
    activate(button: Button): void
    animateLaunch(): void
    animateLaunchAtPos(x: number, y: number): void
    getDragActor(): unknown
    getDragActorSource(): unknown
    shouldShowTooltip(): boolean
    acceptDrop(source: Source, actor: imports.gi.Clutter.Actor, x: number): boolean
    cancelActions(): void
  }

  class SystemActionIcon extends imports.ui.search.GridSearchResult {
    activate(): void
  }
}
