var editors = [];

function newEditor() {
    $(".editors").html($(".editors").html() + `
        <div class="editor"></div>
    `);

    editors.push({
        element: $(".editors").children().last(),
        cm: CodeMirror($(".editors").children().last()[0], {
            value: `<h1>Hi!</h1>`,
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

    editors[editors.length - 1].cm.on("keyup", function(cm, event) {
        if (!cm.state.completionActive && event.keyCode != 13) {
            CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    });
}

$(function() {
    newEditor();

    updateSyntaxHighlighting();
});