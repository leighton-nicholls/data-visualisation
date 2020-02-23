window.EventTarget.prototype.addDelegatedListener = function (type, delegateSelector, listener) {
    this.addEventListener(type, function (event) {
        if (event.target && event.target.matches(delegateSelector)) {
            listener.call(event.target, event)
        }
    });
}