// Polyfill for IE (boooo)
if (!window.SVGElement.prototype.hasOwnProperty('outerHTML')) {
    Object.defineProperty(window.SVGElement.prototype, 'outerHTML', {
        get: function () {
            var $node, $temp;
            $temp = document.createElement('div');
            $node = this.cloneNode(true);
            $temp.appendChild($node);
            return $temp.innerHTML;
        },
        enumerable: false,
        configurable: true
    });
}

window.vue_utils.push_component('svgimg', {
    props: ['url'],
    data: function () {
        return {
            data: null,
            svgs: {},
            svgCallbacks: {}
        };
    },
    created: function () {
        var that = this;
        
        // Try to first get the svg from the cache
        var data = this.svgs[this.url];
        
        if (data) {
            if (data === 'LOADING') {
                // It's loading, so add a callback for when it's loaded
                this.svgCallbacks[this.url] = this.svgCallbacks[this.url] || [];
                this.svgCallbacks[this.url].push(function (d) {
                    that.data = d;
                });
            } else {
                // The cache exists, so use it
                this.data = data;
            }
            return;
        }
        
        // This image is now loading
        this.svgs[this.url] = 'LOADING';
        
        var url = $SCRIPT_ROOT + '/static/images/' + this.url;
        fetch(url)
        .then(function (r) { return r.text(); })
        .then(function (text) { return (new window.DOMParser()).parseFromString(text, "text/xml"); })
        .then(function (xml) {
            // Copied mostly from https://stackoverflow.com/a/35126817

            // Get the SVG tag, ignore the rest
            var $svg = xml.querySelector('svg');

            // Remove any invalid XML tags
            $svg.removeAttribute('xmlns:a');

            that.data = $svg.outerHTML;

            // Set the cache
            that.svgs[that.url] = that.data;

            // Loop through each of the callbacks
            var callbacks = that.svgCallbacks[that.url];
            if (callbacks) {
                callbacks.forEach(function (c) {
                    c(that.data);
                });
            }
        });
    }
});
