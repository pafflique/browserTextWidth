(function (window, document) {
    window.TextWidth = TextWidth;

    if (typeof window.define === 'function' && window.define.amd) {
        window.define('TextWidth', [], function() {
            return window.TextWidth;
        });
    }

    var SPLIT_RE = /\s+/;
    var DEFAULT_OPTIONS = {
        fontFamily: 'Arial',
        fontSize: '12px'
    };

    function TextWidth(options) {
        this.options = options || DEFAULT_OPTIONS;
    }

    TextWidth.prototype.single = singleLine;
    TextWidth.prototype.multi = multiLine;

    function singleLine(text, fontFamily, fontSize) {
        fontFamily = fontFamily || this.options.fontFamily;
        fontSize = fontSize || this.options.fontSize;

        var span = prepareContainer(fontFamily, fontSize);
        span.innerHTML = text.trim();

        document.body.appendChild(span);
        var width = span.clientWidth;
        document.body.removeChild(span);

        return width;
    }

    function multiLine(text, fontFamily, fontSize, maxWidth) {
        fontFamily = fontFamily || this.options.fontFamily;
        fontSize = fontSize || this.options.fontSize;
        maxWidth = maxWidth || Infinity;

        var testStr = '';
        var width = 0;
        var lines = 0;
        var lineWidth = [];

        text.trim().split(SPLIT_RE).forEach(function (part) {
            //TODO: consider strings with multiple spaces & tabs
            var space = testStr ? ' ' : '';
            testStr += space + part;
            width = singleLine(testStr, fontFamily, fontSize);

            if (width > maxWidth) {
                lines++;
                testStr = part;
                width = singleLine(testStr, fontFamily, fontSize);
            }

            lineWidth[lines] = width;
        });

        return lineWidth;
    }

    function prepareContainer(fontFamily, fontSize) {
        this.container = this.container || document.createElement('span');

        var containerStyle = this.container.style;
        containerStyle.fontFamily = fontFamily;
        containerStyle.fontSize = fontSize;
        containerStyle.whiteSpace = 'nowrap';
        containerStyle.visibility = 'hidden';

        return this.container;
    }
})(window, document);