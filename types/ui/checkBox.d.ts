declare namespace imports.ui.checkBox {
  class CheckBox extends imports.gi.St.Button {
    _box: imports.gi.St.Bin
    _label: imports.gi.St.Label

    constructor(label: string)

    setLabel(label: string): void

    getLabelActor(): imports.gi.St.Label
  }
}
