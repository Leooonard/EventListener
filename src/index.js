/* @flow */

class EventListener {
    _eventMap: {[key: string]: Array<Object>}
    _EVENT_TYPE: {[key: string]: number}

    constructor () {
        this._eventMap = {};
        this._EVENT_TYPE = {
            regular: 1,
            once: 2,
            buffer: 3
        };
    }

    on (eventName: string, callback: Function, listenerID:? string | number, listenerType:? number, triggerAfterTimes:? number): void {
        if (arguments.length === 3 && typeof listenerID === 'number') {
            listenerType = listenerID;
            listenerID = undefined;
        } else if (arguments.length === 4) {
            triggerAfterTimes = listenerType;
            listenerType = listenerID;
            triggerAfterTimes = undefined;
        }

        if (this._eventMap[eventName] === undefined) {
            this._eventMap[eventName] = [];
        }

        let eventItem: Object = {
            callback,
            listenerID,
            listenerType,
            triggerAfterTimes,
            currentTriggerTime: 0
        };

        this._eventMap[eventName].push(eventItem);
    }

    off (eventName: string, callback:? Function | string, listenerID:? string) {
        if (typeof callback === 'string') {
            listenerID = callback;
            callback = undefined;
        }

        let events = this._eventMap[eventName];

        if (listenerID !== undefined) {
            this._eventMap[eventName] = events.filter(eventItem => eventItem.listenerID !== listenerID);
        } else if (callback !== undefined) {
            this._eventMap[eventName] = events.filter(eventItem => eventItem.callback !== callback);
        } else {
            this._eventMap[eventName] = [];
        }
    }

    once (eventName: string, callback: Function): void {
        this.on(eventName, callback, this._EVENT_TYPE.once);
    }

    buffer (eventName: string, callback: Function, triggerAfterTimes: number): void {
        this.on(eventName, callback, this._EVENT_TYPE.buffer, triggerAfterTimes);
    }

    fire (eventName: string): void {
        if (this._eventMap[eventName] === undefined) {
            return;
        }

        this._addBufferTimes(this._eventMap[eventName]);
        let listenerListCopy = this._eventMap[eventName].slice();
        this._eventMap[eventName] = this._filterEvents(this._eventMap[eventName]);

        listenerListCopy.forEach(eventItem => {
            if (eventItem.listenerType === this._EVENT_TYPE.buffer) {
                if (eventItem.currentTriggerTime === eventItem.triggerAfterTimes) {
                    eventItem.callback();
                }
                return;
            }

            eventItem.callback();
        });
    }

    _addBufferTimes (events: Array<Object>): void {
        events.forEach(eventItem => {
            if (eventItem.listenerType === this._EVENT_TYPE.buffer) {
                eventItem.currentTriggerTime++;
            }
        });
    }

    _filterEvents (events: Array<Object>): Array<Object> {
        return events.filter(eventItem => {
            if (eventItem.listenerType === this._EVENT_TYPE.once) {
                return false;
            } else if (eventItem.listenerType === this._EVENT_TYPE.buffer) {
                if (eventItem.currentTriggerTime === eventItem.triggerAfterTimes) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    }
}

export {EventListener};
