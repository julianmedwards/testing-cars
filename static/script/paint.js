let carCount = 0

function addCar() {
    carCount++
    var car = document.createElement('div')
    car.id = 'c' + carCount
    car.style.top = '0px'
    car.style.left = '0px'
    car.className = 'car east car' + randomCarArtId()
    document.getElementsByTagName('body')[0].appendChild(car)

    return car.id
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
