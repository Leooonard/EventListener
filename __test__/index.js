'use strict';
/* global describe it afterEach*/

require('chai').should();
let EventListener = require('../dist/index.bundle.js').EventListener;

let listener = new EventListener();

afterEach(function () {
    listener = new EventListener();
});

describe('on', function () {
    it('should have one event item in eventMap', function () {
        // case. 注册一个A事件。
        const EVENT_NAME = 'A';
        let callback = () => {
            console.log('triggered');
        };

        listener.on(EVENT_NAME, callback);
        let eventMap = listener._eventMap;
        let hasCallback = eventMap[EVENT_NAME].some(eventItem => eventItem.callback === callback);

        hasCallback.should.be.true;
    });

    it('should trigger callback in the eventMap', function () {
        // case. 注册一个A事件，然后执行。
        const EVENT_NAME = 'A';
        let result = 0;
        let callback = () => {
            result = 1;
        };

        listener.on(EVENT_NAME, callback);
        listener.fire(EVENT_NAME);

        result.should.be.equal(1);
    });

    it('should only trigger the right event type callback', function () {
        // case. 注册一个A事件，然后注册一个B事件，然后触发A事件。
        const A_EVENT_NAME = 'A';
        const B_EVENT_NAME = 'B';
        let result = 0;
        let callbackA = () => {
            result = 1;
        };
        let callbackB = () => {
            result = 2;
        };

        listener.on(A_EVENT_NAME, callbackA);
        listener.on(B_EVENT_NAME, callbackB);

        listener.fire(A_EVENT_NAME);

        result.should.be.equal(1);
    });
});

describe('off', function () {
    it('should not have an event item in eventMap after off event', function () {
        // case. 注册一个A事件，执行后，off该注册函数。
        const EVENT_NAME = 'A';
        let callback = () => {};

        listener.on(EVENT_NAME, callback);
        listener.fire(EVENT_NAME);
        listener.off(EVENT_NAME, callback);

        let eventMap = listener._eventMap;
        let hasCallback = eventMap[EVENT_NAME].some(eventItem => eventItem.callback === callback);

        hasCallback.should.be.false;
    });

    it('should be empty callback array in eventMap after off event', function () {
        // case. 使用callbackA注册一个A事件，再用callbackB注册A事件，off A事件。
        const EVENT_NAME = 'A';
        let callback = () => {};
        let callback2 = () => {};

        listener.on(EVENT_NAME, callback);
        listener.on(EVENT_NAME, callback2);
        listener.off(EVENT_NAME);

        let eventMap = listener._eventMap;
        let callbackArray = eventMap[EVENT_NAME];

        callbackArray.should.be.lengthOf(0);
    });

    it('should happen nothing when listener off the event', function () {
        // case. 注册一个A事件，off该事件，触发A事件。
        const EVENT_NAME = 'A';
        let result = 0;
        let callback =  () => {
            result = 1;
        };

        listener.on(EVENT_NAME, callback);
        listener.off(EVENT_NAME);
        listener.fire(EVENT_NAME);

        result.should.be.equal(0);
    });
});

describe('once', function () {
    it('should be once event item', function () {
        // case. 注册一个一次性事件C。
        const EVENT_NAME = 'A';
        let callback = () => {};

        listener.once(EVENT_NAME, callback);
        let eventMap = listener._eventMap;
        let hasOnceCallback = eventMap[EVENT_NAME].some(registedEventItem => registedEventItem.listenerType === listener._EVENT_TYPE.once);

        hasOnceCallback.should.be.true;
    });

    it('should be trigger only once', function () {
        // case. 注册一个一次性事件C，然后触发，再次触发。
        const EVENT_NAME = 'A';
        let result = 0;
        let callback = () => {
            result++;
        }

        listener.once(EVENT_NAME, callback);
        listener.fire(EVENT_NAME);
        listener.fire(EVENT_NAME);

        result.should.be.equal(1);
    });

    it('should only remain on register callback', function () {
        // case. 注册一个一次性事件D，注册一个事件D，触发D。
        const EVENT_NAME = 'A';
        let callback = () => {};

        listener.on(EVENT_NAME, callback);
        listener.once(EVENT_NAME, callback);
        listener.fire(EVENT_NAME);

        let eventMap = listener._eventMap;
        let callbackLength = eventMap[EVENT_NAME].length;

        callbackLength.should.be.equal(1);
    });

    it('should only trigger once in nested fire call', function () {
        const EVENT_NAME = 'A';
        let result = 0;
        let callback = () => {
            result++;
            listener.off(EVENT_NAME);
        };

        listener.once(EVENT_NAME, callback);
        listener.fire(EVENT_NAME);
        listener.fire(EVENT_NAME);

        result.should.be.equal(1);
    });
});

describe('fire', function () {
    it('should happen nothing', function () {
        // case. 触发事件E。
        const EVENT_NAME = 'A';
        let result = 0;
        listener.fire(EVENT_NAME);

        result.should.be.equal(0);
    });
});
