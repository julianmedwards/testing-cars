'use strict'

var expect = chai.expect

import {drive} from '../script/drive.js'

describe('drive.moveIt()', function () {
    before(function () {
        sinon.restore()
    })
})
describe('drive.turnIt()', function () {
    before(function () {
        sinon.restore()
    })
})
describe('drive.getDirection()', function () {
    let car
    before(function () {
        sinon.restore()
    })
    beforeEach(function () {
        car = document.createElement('div')
        car.classList.add('car', 'car1')
    })
    it("should return NORTH when car has 'north' class", function () {
        car.classList.add('north')
        let direction = drive.getDirection(car)
        expect(direction).to.equal(drive.POS.NORTH)
    })
    it("should return SOUTH when car has 'south' class", function () {
        car.classList.add('south')
        let direction = drive.getDirection(car)
        expect(direction).to.equal(drive.POS.SOUTH)
    })
    it("should return EAST when car has 'east' class", function () {
        car.classList.add('east')
        let direction = drive.getDirection(car)
        expect(direction).to.equal(drive.POS.EAST)
    })
    it("should return WEST when car has 'west' class", function () {
        car.classList.add('west')
        let direction = drive.getDirection(car)
        expect(direction).to.equal(drive.POS.WEST)
    })
    it('should return empty str when car has no direction class', function () {
        let direction = drive.getDirection(car)
        expect(direction).to.equal('')
    })
})
describe('drive.turnRight()', function () {
    before(function () {
        sinon.restore()
    })
})
describe('drive.turnLeft()', function () {
    before(function () {
        sinon.restore()
    })
})
describe('drive.forward()', function () {
    before(function () {
        sinon.restore()
    })
})
describe('drive.reverse()', function () {
    before(function () {
        sinon.restore()
    })
})
