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
    chanceA = 3
})
input.onButtonPressed(Button.AB, function () {
    bluetooth.uartWriteString("AB")
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
    basic.showIcon(IconNames.Yes)
    basic.pause(100)
    basic.showIcon(IconNames.Happy)
    chanceB = 3
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
    } else {
        basic.showIcon(IconNames.Scissors)
    }
    if (chanceA == 3) {
        chanceA += Chance
    } else if (chanceB == 3) {
        chanceA += Chance
    } else {
        if (chanceA == 0 && chanceB == 2 || (chanceA == 1 && chanceB == 0 || chanceA == 2 && chanceB == 1)) {
            bluetooth.uartWriteString("A")
            chanceA += 3
        } else if (chanceB == 0 && chanceA == 2 || (chanceB == 1 && chanceA == 0 || chanceB == 2 && chanceA == 1)) {
            bluetooth.uartWriteString("B")
            chanceB += 3
        } else {
            bluetooth.uartWriteString("A")
            chanceA += 3
            basic.pause(100)
            bluetooth.uartWriteString("B")
            chanceB += 3
        }
    }
})
let Chance = 0
let chanceB = 0
let cmd = ""
let chanceA = 0
basic.showIcon(IconNames.Asleep)
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
