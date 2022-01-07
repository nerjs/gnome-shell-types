declare namespace imports.ui.messageList {
  class Message {}

  class MessageListSection {}
}

declare namespace imports.ui.messageTray {
  class Notification {}
}

declare namespace imports.ui.popupMenu {
  class Switch {}
}

declare namespace imports.ui.calendar {
  const SHOW_WEEKDATE_KEY: string

  const MESSAGE_ICON_SIZE: number

  function sameYear(dateA: Date, dateB: Date): boolean
  function sameMonth(dateA: Date, dateB: Date): boolean
  function sameDay(dateA: Date, dateB: Date): boolean

  class CalendarEvent<ID extends string, D extends Date, E, S> {
    id: ID
    date: D
    end: E
    summary: S
    constructor(id: ID, date: D, end: E, summary: S)
  }

  class EventSourceBase extends imports.gi.GObject.Object {}

  class EmptyEventSource extends EventSourceBase {
    get isLoading(): boolean
    get hasCalendars(): boolean

    requestRange(_begin: any, _end: any): void
    getEvents(_begin: any, _end: any): any[]
    hasEvents(_day: any): boolean
  }

  class CalendarServer extends imports.gi.Gio.DBusProxy {}

  class DBusEventSource extends EventSourceBase {
    destroy(): void

    get hasCalendars(): boolean
    get isLoading(): boolean

    requestRange(begin: Date, end: Date): void
    getEvents(begin: Date, end: Date): EventSourceBase[]
    hasEvents(day: number): boolean
  }

  class Calendar extends imports.gi.St.Widget {
    setEventSource(eventSource: EventSourceBase): void
    setDate(date: Date): void
    updateTimeZone(): void

    vfunc_scroll_event(scrollEvent: imports.gi.Clutter.ScrollEvent): unknown
  }

  class NotificationMessage<N extends imports.ui.messageTray.Notification> extends imports.ui.messageList.Message {
    notification: N

    constructor(notification: N)

    vfunc_clicked(): void
    canClose(): boolean
  }

  class NotificationTimeLabel extends imports.gi.St.Label {
    constructor(datetime: imports.gi.GLib.DateTime)
  }

  class NotificationSection extends imports.ui.messageList.MessageListSection {
    get allowed(): boolean
  }

  class Placeholder extends imports.gi.St.BoxLayout {}

  class DoNotDisturbSwitch extends imports.ui.popupMenu.Switch {}

  class CalendarMessageList extends imports.gi.St.Widget {}
}
