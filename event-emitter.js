export default class EventEmitter {
    events = {};

    subscribe(event, fn) {
        if(!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(fn);

        const unsubscribe = () => {
            this.events[event] = this.events[event].filter(eventFn => fn !== eventFn);
        }

        return unsubscribe;
    }

    emit(event, value) {
        const calledEvent = this.events[event];
        if (calledEvent) {
            calledEvent.forEach(fn => fn(value));
        }
    }
}
