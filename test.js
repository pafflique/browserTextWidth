var cases = [
    {
        text: 'Hello, World!',
        fontFamily: 'Arial',
        fontSize: '12px'
    },
    {
        text: 'The text is getting bigger.',
        fontFamily: 'Arial',
        fontSize: '18px'
    }
];

function draw(text, fontFamily, fontSize) {
    var span = document.createElement('span');
    span.style.fontFamily = fontFamily;
    span.style.fontSize = fontSize;
    span.style.whiteSpace = 'nowrap';
    span.innerHTML = text;

    document.getElementById('preview').appendChild(span);

    return span.clientWidth;
}

describe('TextWidth', function () {
    var tw = new TextWidth();

    cases.forEach(function (c, i) {
        it('should calculate "'+ c.text +'" text width for font-family: "'+ c.fontFamily +'" and font-size: "'+ c.fontSize +'"', function () {
            var expected = tw.single(c.text, c.fontFamily, c.fontSize);
            var actual = draw(c.text, c.fontFamily, c.fontSize);

            expect(expected).toEqual(actual);
        });
    });
});