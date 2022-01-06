declare namespace imports.ui.audioDeviceSelection {
  // TODO: ??
  type Invocation = any

  enum AudioDevice {
    HEADPHONES = 1 << 0,
    HEADSET = 1 << 1,
    MICROPHONE = 1 << 2,
  }

  class AudioDeviceSelectionDialog extends imports.ui.modalDialog.ModalDialog {
    constructor(devices: AudioDevice)
  }

  class AudioDeviceSelectionDBus {
    OpenAsync(params: string[][], invocation: Invocation): void
    CloseAsync(_params: any, invocation: Invocation): void
  }
}
