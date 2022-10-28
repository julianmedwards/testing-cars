let carCount = 0

function addCar() {
    paint.carCount++
    var car = document.createElement('div')
    car.id = 'c' + paint.carCount
    car.style.top = '0px'
    car.style.left = '0px'
    car.className = 'car east ' + paint.randomCarArtId()
    let body = document.getElementsByTagName('body')[0]
    body.appendChild(car)

    return car
}

function randomCarArtId() {
    let id = Math.floor(Math.random() * 7) + 1
    return 'car' + id
}

export const paint = {
    addCar,
    randomCarArtId,
    carCount,
}
