function toggleActiveCar() {
    let cars = document.querySelector('#cars')
    controlPanel.getSelectedCar(cars).classList.toggle('selected-car')

    if (cars.options.length - 1 == cars.selectedIndex) {
        cars.selectedIndex = 0
    } else {
        cars.selectedIndex = cars.selectedIndex + 1
    }

    controlPanel.getSelectedCar(cars).classList.toggle('selected-car')
}

function newCarAndUpdateUi() {
    let cars = document.querySelector('#cars')
    if (cars.selectedIndex > -1) {
        controlPanel.getSelectedCar(cars).classList.toggle('selected-car')
    }
    let carId = addCar()
    var opt = document.createElement('option')
    opt.value = carId
    opt.innerHTML = carId
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
    let btnNewCar = document.querySelector('#new-car')
    // let btnTurnRight = document.querySelector('#turn-right')
    // let btnTurnLeft = document.querySelector('#turn-left')
    // let btnForward = document.querySelector('#forward')
    // let btnReverse = document.querySelector('#reverse')

    btnNewCar.addEventListener('click', controlPanel.newCarAndUpdateUi)

    // btnTurnRight.addEventListener('click', function () {
    //     turnRight(controlPanel.getSelectedCar)
    // })

    // btnTurnLeft.addEventListener('click', function () {
    //     turnLeft(getSelectedCar(cars))
    // })

    // btnForward.addEventListener('click', function () {
    //     forward(getSelectedCar(cars))
    // })

    // btnReverse.addEventListener('click', function () {
    //     reverse(getSelectedCar(cars))
    // })
}

function init() {
    let cars = document.querySelector('#cars')

    controlPanel.addButtonListeners()

    //right 39
    //w 87
    //left 37
    //s 83
    //down 40
    //a 65
    //up 38
    //d 68

    //right arrow pressed
    //turn right
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 39 || event.keyCode === 68) {
            turnRight(controlPanel.getSelectedCar())
        }
    })

    //left arrow pressed
    //turn left
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 37 || event.keyCode === 65) {
            turnLeft(controlPanel.getSelectedCar())
        }
    })

    //down arrow pressed
    //move backward
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 40 || event.keyCode === 83) {
            reverse(controlPanel.getSelectedCar())
        }
    })

    //up arrow pressed
    //move forward
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 38 || event.keyCode === 87) {
            forward(controlPanel.getSelectedCar())
        }
    })

    //N pressed
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 78) {
            controlPanel.newCarAndUpdateUi()
        }
    })

    //q pressed
    //cycle selected car
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 81) {
            controlPanel.toggleActiveCar()
        }
    })
}

export const controlPanel = {
    toggleActiveCar,
    newCarAndUpdateUi,
    getSelectedCar,
    addButtonListeners,
    init,
}
