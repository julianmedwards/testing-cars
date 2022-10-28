import {controlPanel} from './control-panel.js'

const POS = {
    FORWARD: 'FORWARD',
    REVERSE: 'REVERSE',
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
}

function reverse() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.moveIt(car, direction, REVERSE)
}

function forward() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.moveIt(car, direction, FORWARD)
}

function turnRight() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.turnIt(car, direction, RIGHT)
}

function turnLeft() {
    let car = controlPanel.getSelectedCar()
    let direction = drive.getDirection(car)
    drive.turnIt(car, direction, LEFT)
}

function turnIt(car, direction, cmd) {
    switch (direction) {
        case NORTH:
            if (cmd == RIGHT) {
                car.classList.toggle('north')
                car.classList.add('east')
            } else if (cmd == LEFT) {
                car.classList.toggle('north')
                car.classList.add('west')
            }
            break
        case SOUTH:
            if (cmd == RIGHT) {
                car.classList.toggle('south')
                car.classList.add('west')
            } else if (cmd == LEFT) {
                car.classList.toggle('south')
                car.classList.add('east')
            }
            break
        case EAST:
            if (cmd == RIGHT) {
                car.classList.toggle('east')
                car.classList.add('south')
            } else if (cmd == LEFT) {
                car.classList.toggle('east')
                car.classList.add('north')
            }
            break
        case WEST:
            if (cmd == RIGHT) {
                car.classList.toggle('west')
                car.classList.add('north')
            } else if (cmd == LEFT) {
                car.classList.toggle('west')
                car.classList.add('south')
            }
            break
    }
}
function moveIt(car, direction, cmd) {
    const MOVE_VALUE = 10

    switch (direction) {
        case NORTH:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')
            if (cmd == FORWARD) {
                car.style.top = parseInt(top) - MOVE_VALUE + 'px'
            } else if (cmd == REVERSE) {
                car.style.top = parseInt(top) + MOVE_VALUE + 'px'
            }
            break

        case SOUTH:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')
            if (cmd == FORWARD) {
                car.style.top = parseInt(top) + MOVE_VALUE + 'px'
            } else if (cmd == REVERSE) {
                car.style.top = parseInt(top) - MOVE_VALUE + 'px'
            }
            break

        case EAST:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')
            if (cmd == FORWARD) {
                car.style.left = parseInt(left) + MOVE_VALUE + 'px'
            } else if (cmd == REVERSE) {
                car.style.left = parseInt(left) - MOVE_VALUE + 'px'
            }
            break

        case WEST:
            var top = car.style.top.replace('px', '')
            var left = car.style.left.replace('px', '')

            if (cmd == FORWARD) {
                car.style.left = parseInt(left) - MOVE_VALUE + 'px'
            } else if (cmd == REVERSE) {
                car.style.left = parseInt(left) + MOVE_VALUE + 'px'
            }
            break
    }
}

function getDirection(car) {
    var classes = car.className
    var direction = ''
    if (classes.indexOf('north') > 0) {
        direction = POS.NORTH
    } else if (classes.indexOf('south') > 0) {
        direction = POS.SOUTH
    } else if (classes.indexOf('east') > 0) {
        direction = POS.EAST
    } else if (classes.indexOf('west') > 0) {
        direction = POS.WEST
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
