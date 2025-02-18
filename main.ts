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
    chanceA = Chance
})
input.onButtonPressed(Button.AB, function () {
    if (chanceA == 0 && chanceB == 2 || (chanceA == 1 && chanceB == 0 || chanceA == 2 && chanceB == 1)) {
        basic.showString("G A")
        bluetooth.uartWriteString("A")
    } else if (chanceB == 0 && chanceA == 2 || (chanceB == 1 && chanceA == 0 || chanceB == 2 && chanceA == 1)) {
        basic.showString("G B")
        bluetooth.uartWriteString("B")
    } else {
        basic.showString("G AB")
        bluetooth.uartWriteString("AB")
    }
    chanceA += 3
    chanceB += 3
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    basic.showString(cmd)
    bluetooth.uartWriteString(cmd)
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    bluetooth.uartWriteString("Player B")
    basic.showString("B")
    chanceB = Chance
})
input.onGesture(Gesture.Shake, function () {
    Chance = randint(0, 2)
    if (Chance == 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (Chance == 1) {
        basic.showLeds(`
            # # # # .
            # . . # #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (Chance == 2) {
        basic.showIcon(IconNames.Scissors)
    }
})
let cmd = ""
let Chance = 0
let chanceB = 0
let chanceA = 0
basic.showIcon(IconNames.Asleep)
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
chanceA += 3
chanceB += 3
