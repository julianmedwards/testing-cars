'use strict'

import {controlPanel} from '../script/control-panel.js'

describe('Control Panel Tests', function () {
    let getButton, dummyButton, listenerTarget, listenerName, listener
    this.beforeEach(function () {
        getButton = sinon.stub(document, 'querySelector')
        dummyButton = document.createElement('btn')
        getButton.returns(dummyButton)
    })
    this.afterEach(function () {
        sinon.restore()
    })
    describe('Buttons', function () {
        describe("clicking 'new car'", function () {
            listenerName = 'newCarAndUpdateUi'
            this.beforeEach(function () {
                listener = sinon.stub(controlPanel, listenerName)
            })
            it(
                "should append '" + listenerName + "' eventListener",
                function () {
                    listenerTarget = sinon.spy(dummyButton, 'addEventListener')

                    controlPanel.addButtonListeners()

                    sinon.assert.calledOnce(listenerTarget)
                    sinon.assert.calledWith(listenerTarget, 'click', listener)
                }
            )
            it('should call correct listener when clicked', function () {
                controlPanel.addButtonListeners()

                dummyButton.click()
                sinon.assert.calledOnce(listener)
            })
        })
        // })
        // describe("clicking 'turn right'", function () {
        //     listenerName = 'getSelectedCars'
        //     this.beforeEach(function () {
        //         listener = sinon.stub(controlPanel, listenerName)
        //     })
        //     it(
        //         "should append '" + listenerName + "' eventListener",
        //         function () {
        //             listenerTarget = sinon.spy(dummyButton, 'addEventListener')

        //             controlPanel.addButtonListeners()

        //             sinon.assert.calledOnce(listenerTarget)
        //             sinon.assert.calledWith(listenerTarget, 'click', listener)
        //         }
        //     )
        //     it('should call correct listener when clicked', function () {
        //         controlPanel.addButtonListeners()

        //         dummyButton.click()
        //         sinon.assert.calledOnce(listener)
        //     })
        // })
    })
})
