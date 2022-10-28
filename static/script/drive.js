import {controlPanel} from './control-panel.js'

// Positional keywords
const POS = {
    FORWARD: 'FORWARD',
    REVERSE: 'REVERSE',
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    MOVE_VALUE: 10,
}

function reverse() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.moveIt(car, direction, drive.POS.REVERSE)
}

function forward() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.moveIt(car, direction, drive.POS.FORWARD)
}

function turnRight() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.turnIt(car, direction, drive.POS.RIGHT)
}

function turnLeft() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.turnIt(car, direction, drive.POS.LEFT)
}

function turnIt(car, direction, cmd) {
    switch (direction) {
        case drive.POS.NORTH:
            if (cmd == drive.POS.RIGHT) {
                car.classList.toggle('north')
                car.classList.add('east')
            } else if (cmd == drive.POS.LEFT) {
                car.classList.toggle('north')
                car.classList.add('west')
            }
            break
        case drive.POS.SOUTH:
            if (cmd == drive.POS.RIGHT) {
                car.classList.toggle('south')
                car.classList.add('west')
            } else if (cmd == drive.POS.LEFT) {
                car.classList.toggle('south')
                car.classList.add('east')
            }
            break
        case drive.POS.EAST:
            if (cmd == drive.POS.RIGHT) {
                car.classList.toggle('east')
                car.classList.add('south')
            } else if (cmd == drive.POS.LEFT) {
                car.classList.toggle('east')
                car.classList.add('north')
            }
            break
        case drive.POS.WEST:
            if (cmd == drive.POS.RIGHT) {
                car.classList.toggle('west')
                car.classList.add('north')
            } else if (cmd == drive.POS.LEFT) {
                car.classList.toggle('west')
                car.classList.add('south')
            }
            break
    }
}
function moveIt(car, direction, cmd) {
    switch (direction) {
        case drive.POS.NORTH:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')
            if (cmd == drive.POS.FORWARD) {
                car.style.top = parseInt(top) - drive.POS.MOVE_VALUE + 'px'
            } else if (cmd == drive.POS.REVERSE) {
                car.style.top = parseInt(top) + drive.POS.MOVE_VALUE + 'px'
            }
            break

        case drive.POS.SOUTH:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')
            if (cmd == drive.POS.FORWARD) {
                car.style.top = parseInt(top) + drive.POS.MOVE_VALUE + 'px'
            } else if (cmd == drive.POS.REVERSE) {
                car.style.top = parseInt(top) - drive.POS.MOVE_VALUE + 'px'
            }
            break

        case drive.POS.EAST:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')
            if (cmd == drive.POS.FORWARD) {
                car.style.left = parseInt(left) + drive.POS.MOVE_VALUE + 'px'
            } else if (cmd == drive.POS.REVERSE) {
                car.style.left = parseInt(left) - drive.POS.MOVE_VALUE + 'px'
            }
            break

        case drive.POS.WEST:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')

            if (cmd == drive.POS.FORWARD) {
                car.style.left = parseInt(left) - drive.POS.MOVE_VALUE + 'px'
            } else if (cmd == drive.POS.REVERSE) {
                car.style.left = parseInt(left) + drive.POS.MOVE_VALUE + 'px'
            }
            break
    }
}

function getDirection(car) {
    var classes = car.className
    var direction = ''
    if (classes.indexOf('north') > 0) {
        direction = drive.POS.NORTH
    } else if (classes.indexOf('south') > 0) {
        direction = drive.POS.SOUTH
    } else if (classes.indexOf('east') > 0) {
        direction = drive.POS.EAST
    } else if (classes.indexOf('west') > 0) {
        direction = drive.POS.WEST
    }
    return direction
}

export const drive = {
    POS,
    reverse,
    forward,
    turnRight,
    turnLeft,
    turnIt,
    moveIt,
    getDirection,
}
