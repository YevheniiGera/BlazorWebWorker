
// WebWorker does not have window object but Blazor requires this
self.window = self;

// WebWorker does not have document object but Blazor requires this
self.window.document = {
    body: {
        appendChild: (child) => {
            if (child.text) {
                eval(child.text);
            } else {
                importScripts(child.src);
            }
        },
    },

    currentScript: {
        getAttribute: () => {
            return 'true'; // false if you want to disable 'autostart'
        },
    },

    addEventListener: () => {
        // do nothing
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    createElement: () => {
        return {};
    },
    createElementNS: () => {
        return {};
    },
    hasChildNodes: () => false,
};

self.window.document.baseURI = self.location.origin + '/';
self.window.document.location = self.location;

// This is called from WebAssembly
self.window.service = {
    foo: () => 'Foo'
};

importScripts('_framework/blazor.webassembly.js')