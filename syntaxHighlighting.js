var syntaxHighlighting = {
    "keyword": "#1ee2ae",
    "atom": "#1faee2",
    "number": "#a0c5ff",
    "def": "#a0c5ff",
    "variable": "#448dff",
    "variable-2": "#448dff",
    "variable-3": "#448dff",
    "s-default": "#448dff",
    "type": "#448dff",
    "comment": "@font-style: italic; color: #536889",
    "string": "#1faee2",
    "string-2": "#1faee2",
    "meta": "#1faee2",
    "qualifier": "#1faee2",
    "builtin": "#448dff",
    "bracket": "white",
    "tag": "#1ee2ae",
    "attribute": "#448dff",
    "hr": "#448dff",
    "link": "#448dff",
    "error": "#e2271e",
    "invalidchar": "#e2271e",
    "@bg": "#072047",
    "@fg": "white",
    "@caret": "white"
};

function updateSyntaxHighlighting() {
    $(".syntaxHighlighting").text("");

    for (var i = 0; i < Object.keys(syntaxHighlighting).length; i++) {
        var currentSelector = Object.keys(syntaxHighlighting)[i];
        var currentColour = syntaxHighlighting[Object.keys(syntaxHighlighting)[i]];

        if (currentSelector == "@bg") {
            $(".CodeMirror").css("background-color", currentColour);
        } else if (currentSelector == "@fg") {
            $(".CodeMirror").css("color", currentColour);
        } else if (currentSelector == "@caret") {
            if (currentColour[0] == "@") {
                $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                    .CodeMirror-cursor {
                        ` + currentColour.substring(1) + `
                    }
                `);
            } else {
                $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                    .CodeMirror-cursor {
                        border-left: 1px solid ` + currentColour + `
                    }
                `);
            }
        } else {
            if (currentColour[0] == "@") {
                $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                    .cm-s-default .cm-` + currentSelector + ` {
                        ` + currentColour.substring(1) + `
                    }
                `);
            } else {
                $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                    .cm-s-default .cm-` + currentSelector + ` {
                        color: ` + currentColour + `
                    }
                `);
            }
        }
    }
}