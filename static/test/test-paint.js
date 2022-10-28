'use strict'

var expect = chai.expect

import {paint} from '../script/paint.js'

describe('paint.addCar()', function () {
    let getBody, dummyBodyArr
    before(function () {
        sinon.restore()
    })
    beforeEach(function () {
        paint.carCount = 0
        getBody = sinon.stub(document, 'getElementsByTagName')
        // Object is an array containing body, not body itself.
        dummyBodyArr = [document.createElement('body')]
        getBody.returns(dummyBodyArr)
    })
    this.afterEach(function () {
        sinon.restore()
    })
    describe('increments current carCount by 1 and appends to id', function () {
        it('should return c1 at carCount 0', function () {
            // paint.carCount starts at 0
            let carCount = paint.carCount
            let car = paint.addCar()
            expect(car.id).to.equal('c1')
            expect(car.id).to.equal('c' + (carCount + 1))
        })
        it('should return c2 at carCount 1', function () {
            paint.carCount = 1
            let carCount = paint.carCount
            let car = paint.addCar()
            expect(car.id).to.equal('c2')
            expect(car.id).to.equal('c' + (carCount + 1))
        })
        it('should return c273 at carCount 272', function () {
            paint.carCount = 272
            let carCount = paint.carCount
            let car = paint.addCar()
            expect(car.id).to.equal('c273')
            expect(car.id).to.equal('c' + (carCount + 1))
        })
    })
    describe('creates a div element', function () {
        it('should set car position to top-left corner of page', function () {
            let car = paint.addCar()
            expect(car.style.top).to.equal('0px')
            expect(car.style.left).to.equal('0px')
        })
        it("should add classes 'car', 'east', and a randomCarArtId", function () {
            let car = paint.addCar()
            let carImages = [
                'car1',
                'car2',
                'car3',
                'car4',
                'car5',
                'car6',
                'car7',
            ]
            expect(car.classList).to.include(['car', 'east'])
            // DOMTokenList object incompatible, change to Array
            expect(Array.from(car.classList)).to.include.oneOf(carImages)
        })
        it('should append car to body el', function () {
            let car = paint.addCar()
            let cars = dummyBodyArr[0].children
            expect(cars[cars.length - 1]).to.equal(car)
        })
    })
})
describe('paint.randomCarArtId()', function () {
    before(function () {
        sinon.restore()
    })
    it('should not return a number below 1 or over 7 in 10,000 iterations', function () {
        let id,
            outofRange = false
        for (let i = 0; i < 10000; i++) {
            id = paint.randomCarArtId().replace('car', '')
            if (Number(id) > 7 || Number(id) < 1) {
                outofRange = true
            }
        }

        expect(outofRange).to.be.false
    })
})
