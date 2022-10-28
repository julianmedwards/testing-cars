'use strict'

var expect = chai.expect

import {controlPanel} from '../script/control-panel.js'
import {drive} from '../script/drive.js'

describe('drive.getDirection()', function () {
    let car
    before(function () {
        sinon.restore()
    })
    beforeEach(function () {
        car = document.createElement('div')
        car.classList.add('car', 'car1')
    })
    afterEach(function () {
        sinon.restore()
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

describe('Move commands', function () {
    let car, getCar, direction, getDirection, moveOrTurn
    before(function () {
        sinon.restore()
    })
    beforeEach(function () {
        getCar = sinon.stub(controlPanel, 'getSelectedCar')
        car = document.createElement('div')
        car.classList.add('car', 'car1')
        getCar.returns(car)

        getDirection = sinon.stub(drive, 'getDirection')
        direction = drive.POS.NORTH
        getDirection.returns(direction)
    })
    afterEach(function () {
        sinon.restore()
    })
    describe('drive.turnRight()', function () {
        it('should call drive.turnIt with correct args', function () {
            moveOrTurn = sinon.spy(drive, 'turnIt')
            drive.turnRight()
            sinon.assert.calledOnceWithExactly(
                moveOrTurn,
                car,
                direction,
                drive.POS.RIGHT
            )
        })
    })
    describe('drive.turnLeft()', function () {
        it('should call drive.turnIt with correct args', function () {
            moveOrTurn = sinon.spy(drive, 'turnIt')
            getDirection.returns(drive.POS.NORTH)
            drive.turnLeft()
            sinon.assert.calledOnceWithExactly(
                moveOrTurn,
                car,
                direction,
                drive.POS.LEFT
            )
        })
    })
    describe('drive.forward()', function () {
        it('should call drive.moveIt with correct args', function () {
            moveOrTurn = sinon.spy(drive, 'moveIt')
            getDirection.returns(drive.POS.NORTH)
            drive.forward()
            sinon.assert.calledOnceWithExactly(
                moveOrTurn,
                car,
                direction,
                drive.POS.FORWARD
            )
        })
    })
    describe('drive.reverse()', function () {
        it('should call drive.moveIt with correct args', function () {
            moveOrTurn = sinon.spy(drive, 'moveIt')
            getDirection.returns(drive.POS.NORTH)
            drive.reverse()
            sinon.assert.calledOnceWithExactly(
                moveOrTurn,
                car,
                direction,
                drive.POS.REVERSE
            )
        })
    })
})

describe('Moving car element', function () {
    let car, direction, cmd
    before(function () {
        sinon.restore()
    })
    beforeEach(function () {
        car = document.createElement('div')
        car.classList.add('car')
        car.style.top = '0px'
        car.style.left = '0px'
    })
    afterEach(function () {
        sinon.restore()
    })
    describe('drive.moveIt()', function () {
        describe("modifies the car's position in one direction by MOVE_VALUE.", function () {
            describe('Moving forward', function () {
                beforeEach(function () {
                    cmd = drive.POS.FORWARD
                })
                describe('vertically', function () {
                    it('should make top LESS facing NORTH', function () {
                        car.classList.add('north')
                        direction = drive.POS.NORTH

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop - drive.POS.MOVE_VALUE)
                        expect(newLeft).to.equal(prevLeft)
                    })
                    it('should make top GREATER facing SOUTH', function () {
                        car.classList.add('south')
                        direction = drive.POS.SOUTH

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop + drive.POS.MOVE_VALUE)
                        expect(newLeft).to.equal(prevLeft)
                    })
                })
                describe('horizontally', function () {
                    beforeEach(function () {})
                    it('should make left GREATER facing EAST', function () {
                        car.classList.add('east')
                        direction = drive.POS.EAST

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop)
                        expect(newLeft).to.equal(
                            prevLeft + drive.POS.MOVE_VALUE
                        )
                    })
                    it('should make left LESS facing WEST', function () {
                        car.classList.add('west')
                        direction = drive.POS.WEST

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop)
                        expect(newLeft).to.equal(
                            prevLeft - drive.POS.MOVE_VALUE
                        )
                    })
                })
            })
            describe('Reversing:', function () {
                beforeEach(function () {
                    cmd = drive.POS.REVERSE
                })
                describe('vertically', function () {
                    it('should make top GREATER facing NORTH', function () {
                        car.classList.add('north')
                        direction = drive.POS.NORTH

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop + drive.POS.MOVE_VALUE)
                        expect(newLeft).to.equal(prevLeft)
                    })
                    it('should make top LESS facing SOUTH', function () {
                        car.classList.add('south')
                        direction = drive.POS.SOUTH

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop - drive.POS.MOVE_VALUE)
                        expect(newLeft).to.equal(prevLeft)
                    })
                })
                describe('horizontally', function () {
                    beforeEach(function () {})
                    it('should make left LESS facing EAST', function () {
                        car.classList.add('east')
                        direction = drive.POS.EAST

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop)
                        expect(newLeft).to.equal(
                            prevLeft - drive.POS.MOVE_VALUE
                        )
                    })
                    it('should make left GREATER facing WEST', function () {
                        car.classList.add('west')
                        direction = drive.POS.WEST

                        let prevTop = parseInt(car.style.top)
                        let prevLeft = parseInt(car.style.left)

                        drive.moveIt(car, direction, cmd)

                        let newTop = parseInt(car.style.top)
                        let newLeft = parseInt(car.style.left)

                        expect(newTop).to.equal(prevTop)
                        expect(newLeft).to.equal(
                            prevLeft + drive.POS.MOVE_VALUE
                        )
                    })
                })
            })
        })
    })
    describe('drive.turnIt()', function () {
        describe('exchanges car direction classes.', function () {
            describe('When turning LEFT', function () {
                beforeEach(function () {
                    cmd = drive.POS.LEFT
                })
                it('should turn from north to west', function () {
                    direction = drive.POS.NORTH
                    car.classList.add('north')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'north',
                        'south',
                        'east'
                    )
                    expect(Array.from(car.classList)).to.include('west')
                })
                it('should turn from west to south', function () {
                    direction = drive.POS.WEST
                    car.classList.add('west')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'west',
                        'east',
                        'north'
                    )
                    expect(Array.from(car.classList)).to.include('south')
                })
                it('should turn from south to east', function () {
                    direction = drive.POS.SOUTH
                    car.classList.add('south')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'south',
                        'west',
                        'north'
                    )
                    expect(Array.from(car.classList)).to.include('east')
                })
                it('should turn from east to north', function () {
                    direction = drive.POS.EAST
                    car.classList.add('east')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'east',
                        'south',
                        'west'
                    )
                    expect(Array.from(car.classList)).to.include('north')
                })
            })
            describe('When turning RIGHT', function () {
                beforeEach(function () {
                    cmd = drive.POS.RIGHT
                })
                it('should turn from north to east', function () {
                    direction = drive.POS.NORTH
                    car.classList.add('north')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'north',
                        'west',
                        'south'
                    )
                    expect(Array.from(car.classList)).to.include('east')
                })
                it('should turn from east to south', function () {
                    direction = drive.POS.EAST
                    car.classList.add('east')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'east',
                        'west',
                        'north'
                    )
                    expect(Array.from(car.classList)).to.include('south')
                })
                it('should turn from south to west', function () {
                    direction = drive.POS.SOUTH
                    car.classList.add('south')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'south',
                        'east',
                        'north'
                    )
                    expect(Array.from(car.classList)).to.include('west')
                })
                it('should turn from west to north', function () {
                    direction = drive.POS.WEST
                    car.classList.add('west')

                    drive.turnIt(car, direction, cmd)

                    expect(Array.from(car.classList)).to.not.include(
                        'west',
                        'south',
                        'east'
                    )
                    expect(Array.from(car.classList)).to.include('north')
                })
            })
        })
    })
})
