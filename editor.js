var editors = [];

function newEditor() {
    $(".editors").html($(".editors").html() + `
        <div class="editor"></div>
    `);

    editors.push({
        element: $(".editors").children().last(),
        cm: CodeMirror($(".editors").children().last()[0], {
            value: `<!DOCTYPE html>
<html>
    <head>
        <title></title>
    </head>
    <body>
    </body>
</html>`,
            mode: "htmlmixed",
            lineNumbers: true,
            matchBrackets: true,
            fixedGutter: true,
            tabsize: 4,
            indentUnit: 4,
            autoCloseBrackets: true,
            autoCloseTags: true,
            dontIndentOnAutoClose: true,
            extraKeys: {
                "Tab": function(cm) {
                    cm.replaceSelection("    ", "end");
                }
            }
        })
    });

    editors[editors.length - 1].cm.on("keydown", function(cm, event) {
        var blockedKeyCodes = [8, 9, 13, 16, 17, 27, 32, 37, 38, 39, 40, 186, 190];
        var blockedShiftKeyCodes = [190];

        console.log(event.keyCode);
        console.log(event.keyCode in blockedKeyCodes);
        console.log(!event.shiftKey, !(blockedShiftKeyCodes.indexOf(event.keyCode) > -1));

        if (
            !cm.state.completionActive &&
            !(blockedKeyCodes.indexOf(event.keyCode) > -1) &&
            (
                !event.shiftKey ||
                !(blockedShiftKeyCodes.indexOf(event.keyCode) > -1)
            )
        ) {
            CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    });
}

$(function() {
    newEditor();

    updateSyntaxHighlighting();
});