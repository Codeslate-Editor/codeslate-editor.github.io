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
            extraKeys: {
                "Tab": function(cm) {
                    cm.replaceSelection("    ", "end");
                }
            }
        })
    });
}

$(function() {
    newEditor();

    updateSyntaxHighlighting();
});