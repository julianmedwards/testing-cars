'use strict'

import {controlPanel} from '../script/control-panel.js'
import {drive} from '../script/drive.js'

describe('Buttons', function () {
    let getButton, dummyButton
    beforeEach(function () {
        getButton = sinon.stub(document, 'querySelector')
        dummyButton = document.createElement('btn')
        getButton.returns(dummyButton)
    })
    afterEach(function () {
        sinon.restore()
    })
    describe('selectings car with dropdown', function () {})
    describe("clicking 'new car'", function () {
        let listenerTarget, listener
        let listenerName = 'newCarAndUpdateUi'
        it("should append '" + listenerName + "' eventListener", function () {
            listener = sinon.stub(controlPanel, listenerName)
            listenerTarget = sinon.spy(dummyButton, 'addEventListener')

            controlPanel.addNewCarBtn()

            sinon.assert.calledOnce(listenerTarget)
            sinon.assert.calledWith(listenerTarget, 'click', listener)
        })
        it('should call correct listener when clicked', function () {
            listener = sinon.stub(controlPanel, listenerName)
            controlPanel.addNewCarBtn()

            dummyButton.click()
            sinon.assert.calledOnce(listener)
        })
    })
    describe("clicking 'turn right'", function () {
        let listenerTarget, listener
        let listenerName = 'turnRight'
        it("should append '" + listenerName + "' eventListener", function () {
            listener = sinon.stub(drive, listenerName)
            listenerTarget = sinon.spy(dummyButton, 'addEventListener')

            controlPanel.addTurnRightBtn()

            sinon.assert.calledOnce(listenerTarget)
            sinon.assert.calledWith(listenerTarget, 'click', listener)
        })
        it('should call correct listener when clicked', function () {
            listener = sinon.stub(drive, listenerName)
            controlPanel.addTurnRightBtn()

            dummyButton.click()
            sinon.assert.calledOnce(listener)
        })
    })
    describe("clicking 'turn left'", function () {
        let listenerTarget, listener
        let listenerName = 'turnLeft'
        it("should append '" + listenerName + "' eventListener", function () {
            listener = sinon.stub(drive, listenerName)
            listenerTarget = sinon.spy(dummyButton, 'addEventListener')

            controlPanel.addTurnLeftBtn()

            sinon.assert.calledOnce(listenerTarget)
            sinon.assert.calledWith(listenerTarget, 'click', listener)
        })
        it('should call correct listener when clicked', function () {
            listener = sinon.stub(drive, listenerName)
            controlPanel.addTurnLeftBtn()

            dummyButton.click()
            sinon.assert.calledOnce(listener)
        })
    })
    describe("clicking 'forward'", function () {
        let listenerTarget, listener
        let listenerName = 'forward'
        it("should append '" + listenerName + "' eventListener", function () {
            listener = sinon.stub(drive, listenerName)
            listenerTarget = sinon.spy(dummyButton, 'addEventListener')

            controlPanel.addForwardBtn()

            sinon.assert.calledOnce(listenerTarget)
            sinon.assert.calledWith(listenerTarget, 'click', listener)
        })
        it('should call correct listener when clicked', function () {
            listener = sinon.stub(drive, listenerName)
            controlPanel.addForwardBtn()

            dummyButton.click()
            sinon.assert.calledOnce(listener)
        })
    })
    describe("clicking 'reverse'", function () {
        let listenerTarget, listener
        let listenerName = 'reverse'
        it("should append '" + listenerName + "' eventListener", function () {
            listener = sinon.stub(drive, listenerName)
            listenerTarget = sinon.spy(dummyButton, 'addEventListener')

            controlPanel.addReverseBtn()

            sinon.assert.calledOnce(listenerTarget)
            sinon.assert.calledWith(listenerTarget, 'click', listener)
        })
        it('should call correct listener when clicked', function () {
            listener = sinon.stub(drive, listenerName)
            controlPanel.addReverseBtn()

            dummyButton.click()
            sinon.assert.calledOnce(listener)
        })
    })
})
describe('Keyboard controls', function () {
    let toggleActiveCar,
        newCarAndUpdateUi,
        turnRight,
        turnLeft,
        forward,
        reverse
    before(function () {
        toggleActiveCar = sinon.stub(controlPanel, 'toggleActiveCar')
        newCarAndUpdateUi = sinon.stub(controlPanel, 'newCarAndUpdateUi')
        turnRight = sinon.stub(drive, 'turnRight')
        turnLeft = sinon.stub(drive, 'turnLeft')
        forward = sinon.stub(drive, 'forward')
        reverse = sinon.stub(drive, 'reverse')

        controlPanel.addKeypressListeners()
    })
    afterEach(function () {
        sinon.reset()
    })
    describe('Toggling active car', function () {
        it("should call toggleActiveCar on pressing 'q'", function () {
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 81}))
            // Check other used key, n, doesn't also call it.
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 78}))
            sinon.assert.calledOnce(toggleActiveCar)
        })
    })
    describe('Spawning new car', function () {
        it("should call newCarAndUpdateUi on pressing 'n'", function () {
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 78}))
            // Check other used key, q, doesn't also call it.
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 81}))
            sinon.assert.calledOnce(newCarAndUpdateUi)
        })
    })
    describe('Turning right', function () {
        it("should call turnRight on pressing 'd'", function () {
            // Test d key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 68}))
            // Test w, s, a keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 87}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 83}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 65}))
            sinon.assert.calledOnce(turnRight)
        })
        it("should call turnRight on pressing 'right arrow'", function () {
            turnRight.reset()
            // Test right arrow key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 39}))
            // Test up, down, left arrow keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 38}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 37}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 40}))
            sinon.assert.calledOnce(turnRight)
        })
    })
    describe('Turning left', function () {
        it("should call turnLeft on pressing 'a'", function () {
            // Test a key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 65}))
            // Test w, s, d keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 87}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 83}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 68}))
            sinon.assert.calledOnce(turnLeft)
        })
        it("should call turnLeft on pressing 'left arrow", function () {
            turnLeft.reset()
            // Test left arrow key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 37}))
            // Test up, down, right arrow keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 38}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 40}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 39}))
            sinon.assert.calledOnce(turnLeft)
        })
    })
    describe('Moving forward', function () {
        it("should call forward on pressing 'w'", function () {
            // Test w key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 87}))
            // Test s, d, a keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 83}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 68}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 65}))
            sinon.assert.calledOnce(forward)
        })
        it("should call forward on pressing 'up arrow'", function () {
            forward.reset()
            // Test right arrow key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 38}))
            // Test down, right, left arrow keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 40}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 39}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 37}))
            sinon.assert.calledOnce(forward)
        })
    })
    describe('Reversing', function () {
        it("should call reverse on pressing 's'", function () {
            // Test s key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 83}))
            // Test w, d, a keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 87}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 68}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 65}))
            sinon.assert.calledOnce(reverse)
        })
        it("should call reverse on pressing 'down arrow'", function () {
            reverse.reset()
            // Test down arrow key
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 40}))
            // Test up, right, left arrow keys don't trigger
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 38}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 39}))
            document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 37}))
            sinon.assert.calledOnce(reverse)
        })
    })
})
