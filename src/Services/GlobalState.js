class GlobalState {
    constructor() {
        this.watchers = {
            // entity: [callbackFunc()];
        }
    }

    watch(entity, callbackFunc) {
        if (this.watchers[entity]) {
            this.watchers[entity].push(callbackFunc);
        } else {
            this.watchers[entity] = [callbackFunc];
        }
    }

    update(entity, newValue) {
        if(this.watchers[entity]) {
            this.watchers[entity].forEach(callbackFunc => callbackFunc(newValue)); 
        }
    }
}

export default new GlobalState();
