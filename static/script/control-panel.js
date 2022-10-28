import {drive} from './drive.js'
import {paint} from './paint.js'

function toggleActiveCar() {
    let cars = document.querySelector('#cars')
    controlPanel.getSelectedCar().classList.toggle('selected-car')

    if (cars.options.length - 1 == cars.selectedIndex) {
        cars.selectedIndex = 0
    } else {
        cars.selectedIndex = cars.selectedIndex + 1
    }

    controlPanel.getSelectedCar().classList.toggle('selected-car')
}

function newCarAndUpdateUi() {
    let cars = document.querySelector('#cars')
    if (cars.selectedIndex > -1) {
        controlPanel.getSelectedCar(cars).classList.toggle('selected-car')
    }
    let car = paint.addCar()
    var opt = document.createElement('option')
    opt.value = car.id
    opt.innerHTML = car.id
    cars.appendChild(opt)
    cars.selectedIndex = cars.length - 1
    controlPanel.getSelectedCar(cars).classList.toggle('selected-car')
}

function getSelectedCar() {
    let cars = document.querySelector('#cars')
    let car = document.querySelector('#' + cars[cars.selectedIndex].value)
    return car
}

function addButtonListeners() {
    controlPanel.addNewCarBtn()
    controlPanel.addTurnRightBtn()
    controlPanel.addTurnLeftBtn()
    controlPanel.addForwardBtn()
    controlPanel.addReverseBtn()
}
function addNewCarBtn() {
    let btnNewCar = document.querySelector('#new-car')

    btnNewCar.addEventListener('click', controlPanel.newCarAndUpdateUi)
}
function addTurnRightBtn() {
    let btnTurnRight = document.querySelector('#turn-right')

    btnTurnRight.addEventListener('click', drive.turnRight)
}
function addTurnLeftBtn() {
    let btnTurnLeft = document.querySelector('#turn-left')

    btnTurnLeft.addEventListener('click', drive.turnLeft)
}
function addForwardBtn() {
    let btnForward = document.querySelector('#forward')

    btnForward.addEventListener('click', drive.forward)
}
function addReverseBtn() {
    let btnReverse = document.querySelector('#reverse')

    btnReverse.addEventListener('click', drive.reverse)
}

function addKeypressListeners() {
    //Press n (78)
    //spawn new car
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 78) {
            controlPanel.newCarAndUpdateUi()
        }
    })

    //Press q (81)
    //cycle selected car
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 81) {
            controlPanel.toggleActiveCar()
        }
    })

    //Press arrow-right (39), d (68)
    //turn right
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 39 || event.keyCode === 68) {
            drive.turnRight()
        }
    })

    //Press arrow-left (37), a (65)
    //turn left
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 37 || event.keyCode === 65) {
            drive.turnLeft()
        }
    })

    //Press arrow-down (40), s (83)
    //move backward
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 40 || event.keyCode === 83) {
            drive.reverse()
        }
    })

    //Press arrow-up (38), w (87)
    //move forward
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 38 || event.keyCode === 87) {
            drive.forward()
        }
    })
}

function init() {
    controlPanel.addButtonListeners()
    controlPanel.addKeypressListeners()
}

export const controlPanel = {
    toggleActiveCar,
    newCarAndUpdateUi,
    getSelectedCar,
    addButtonListeners,
    addNewCarBtn,
    addTurnRightBtn,
    addTurnLeftBtn,
    addForwardBtn,
    addReverseBtn,
    addKeypressListeners,
    init,
}
