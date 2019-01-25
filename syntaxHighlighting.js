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
    "@main-bg": "#072047",
    "@main-fg": "white",
    "@lines-bg": "#0b2f68",
    "@lines-fg": "#98b4e0",
    "@autocomplete-bg": "#0b2f68",
    "@autocomplete-fg": "white",
    "@autocomplete-highlight": "#4688f2",
    "@caret": "white",
    "@highlight": "#0d3d87",
};

function updateSyntaxHighlighting() {
    $(".syntaxHighlighting").text("");

    for (var i = 0; i < Object.keys(syntaxHighlighting).length; i++) {
        var currentSelector = Object.keys(syntaxHighlighting)[i];
        var currentColour = syntaxHighlighting[Object.keys(syntaxHighlighting)[i]];

        if (currentSelector == "@main-bg") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                .CodeMirror {
                    background-color: ` + currentColour + `
                }
            `);
        } else if (currentSelector == "@main-fg") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                .CodeMirror {
                    color: ` + currentColour + `
                }
            `);
        } else if (currentSelector == "@lines-bg") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                .CodeMirror-gutter {
                    background-color: ` + currentColour + `
                }
            `);
        } else if (currentSelector == "@lines-fg") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                .CodeMirror-linenumber {
                    color: ` + currentColour + `
                }
            `);
        } else if (currentSelector == "@autocomplete-bg") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                .CodeMirror-hints, .CodeMirror-hint {
                    background-color: ` + currentColour + `
                }
            `);
        } else if (currentSelector == "@autocomplete-fg") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                .CodeMirror-hint {
                    color: ` + currentColour + `
                }
            `);
        } else if (currentSelector == "@autocomplete-highlight") {
            $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                li.CodeMirror-hint-active {
                    background-color: ` + currentColour + `
                }
            `);
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
        } else if (currentSelector == "@highlight") {
            if (currentColour[0] == "@") {
                $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                    .CodeMirror-selected {
                        ` + currentColour.substring(1) + `
                    }
                `);
            } else {
                $(".syntaxHighlighting").text($(".syntaxHighlighting").text() + `
                    .CodeMirror-selected {
                        background-color: ` + currentColour + `!important
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

    cm.refresh();
}