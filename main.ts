bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    bluetooth.startUartService()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
input.onButtonPressed(Button.A, function () {
    bluetooth.uartWriteString("Player A")
    basic.showString("A")
    basic.showIcon(IconNames.Yes)
    basic.pause(100)
    basic.showIcon(IconNames.Happy)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    basic.showString(cmd)
    bluetooth.uartWriteString(cmd)
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    bluetooth.uartWriteString("Player A")
    basic.showString("A")
    basic.showIcon(IconNames.Yes)
    basic.pause(100)
    basic.showIcon(IconNames.Happy)
})
let cmd = ""
basic.showIcon(IconNames.Asleep)
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
