declare namespace imports.ui.dialog {
  function _setLabel(label: imports.gi.St.Label, value?: string): void

  interface DialogButtonKeyInfo {
    label: string
    action: () => void
    key?: number
    default?: boolean
  }

  class Dialog extends imports.gi.St.Widget {
    _initialKeyFocus?: null | imports.gi.Clutter.Actor
    _initialKeyFocusDestroyId: number
    _pressedKey?: number | null
    _buttonKeys: {
      [key: number]: DialogButtonKeyInfo
    }
    _parentActor: imports.gi.Clutter.Actor
    _eventId: number
    _dialog: imports.gi.St.BoxLayout
    contentLayout: imports.gi.St.BoxLayout
    buttonLayout: imports.gi.St.BoxLayout

    constructor(parentActor: imports.gi.Clutter.Actor, styleClass?: string)

    get initialKeyFocus(): imports.gi.Clutter.Actor | null

    _createDialog(): void
    _onDestroy(): void
    _modalEventHandler(actor: imports.gi.Clutter.Actor, event: unknown): unknown
    _setInitialKeyFocus(actor: imports.gi.Clutter.Actor): void

    makeInactive(): void
    addButton(buttonInfo: DialogButtonKeyInfo): imports.gi.St.Button
    clearButtons(): void
  }

  interface MessageDialogContentParams {
    style_class: string
    x_expand: boolean
    vertical: boolean
  }

  class MessageDialogContent extends imports.gi.St.BoxLayout {
    _title: imports.gi.St.Label
    _description: imports.gi.St.Label

    constructor(params: MessageDialogContentParams)

    _onDestroy(): void

    get title(): string
    set title(title: string)

    get description(): string
    set description(description: string)

    _updateTitleStyle(): void
  }

  type ListSectionParams = MessageDialogContentParams

  class ListSection extends imports.gi.St.BoxLayout {
    _title: imports.gi.St.Label
    label_actor: imports.gi.St.Label
    _listScrollView: imports.gi.St.ScrollView
    list: imports.gi.St.BoxLayout

    constructor(params: ListSectionParams)

    get title(): string
    set title(title: string)
  }

  interface ListSectionItemParams {
    style_class: string
  }

  class ListSectionItem extends imports.gi.St.BoxLayout {
    _iconActorBin: imports.gi.St.Bin
    _title: imports.gi.St.Label
    label_actor: imports.gi.St.Label
    _description: imports.gi.St.Label

    constructor(params: ListSectionItemParams)

    get iconActor(): imports.gi.Clutter.Actor
    set iconActor(actor: imports.gi.Clutter.Actor)

    get title(): string
    set title(title: string)

    get description(): string
    set description(description: string)
  }
}
