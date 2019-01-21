var editors = [];

function newEditor() {
    $(".editors").html($(".editors").html() + `
        <div class="editor"></div>
    `);

    editors.push({
        element: $(".editors").children().last(),
        cm: CodeMirror($(".editors").children().last()[0], {
            value: `console.log("Hello, world!");`,
            mode: "javascript",
            lineNumbers: true,
            matchBrackets: true,
            fixedGutter: true,
            tabsize: 4,
            indentUnit: 4,
            autoCloseBrackets: true
        })
    });
}

$(function() {
    newEditor();

    updateSyntaxHighlighting();
});