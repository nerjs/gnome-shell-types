declare namespace imports.ui.barLevel {
  class BarLevel extends imports.gi.St.DrawingArea {
    constructor(params: Partial<imports.gi.St.DrawingAreaInitOptions>)

    get value(): number
    set value(value: number)

    get maximumValue(): number
    set maximumValue(value: number)

    get overdriveStart(): number
    set overdriveStart(value: number)

    vfunc_repaint(): void
  }
}
