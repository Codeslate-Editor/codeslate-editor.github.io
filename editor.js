var editors = [];
var currentEditor = 0;
var cm;

function newEditor(filename) {
    var selectContent = "";

    for (var i = 0; i < fileTypes.length; i++) {
        if (filename.endsWith(fileTypes[i].ending)) {
            selectContent = fileTypes[i].default;
        }
    }

    editors.push({
        filename: filename,
        content: selectContent
    });

    currentEditor = editors.length - 1;

    $(".files").html($(".files").html() + `
        <button class="file sidebarItem" onclick="selectEditor(` + (editors.length - 1) + `);" data-editor-id="` + (editors.length - 1) + `"></button>
    `);

    $(".files").children().last().text(filename).attr("data-name", filename);

    var orderedDivs = $(".files").children().sort(function(first, second) {
        return String.prototype.localeCompare.call($(first).attr("data-name").toLowerCase(), $(second).attr("data-name").toLowerCase());
    });

    $(".files").empty().append(orderedDivs);

    selectEditor(editors.length - 1);
}

function selectEditor(editorID) {
    currentEditor = editorID;

    cm.setValue(editors[editorID].content);

    cm.setOption("mode", null);

    for (var i = 0; i < fileTypes.length; i++) {
        if (editors[editorID].filename.endsWith(fileTypes[i].ending)) {
            cm.setOption("mode", fileTypes[i].mode);
        }
    }

    $(".file").removeClass("selected");
    $(".file[data-editor-id='" + editorID + "']").addClass("selected");
}

function promptNewFile() {
    $(".newFilename").show().focus();
}

$(function() {
    cm = CodeMirror($(".editor")[0], {
        value: "",
        mode: "htmlmixed",
        lineNumbers: true,
        matchBrackets: true,
        fixedGutter: true,
        tabsize: 4,
        indentUnit: 4,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        dontIndentOnAutoClose: true,
        extraKeys: {
            "Tab": function(cm) {
                cm.replaceSelection("    ", "end");
            }
        }
    });

    cm.on("keydown", function(cm, event) {
        var blockedKeyCodes = [8, 9, 13, 16, 17, 27, 32, 37, 38, 39, 40, 186, 190];
        var blockedShiftKeyCodes = [190];

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

    cm.on("keyup", function(cm, event) {
        editors[currentEditor].content = cm.getValue();
    });

    updateSyntaxHighlighting();

    newEditor("index.html");

    $(".newFilename").keydown(function(event) {
        if (event.keyCode == 13) {
            if ($(".newFilename").val().trim() != "") {
                var exists = false;

                for (var i = 0; i < editors.length; i++) {
                    if (editors[i]["filename"] == $(".newFilename").val().trim()) {
                        exists = true;
                    }
                }

                if (!exists && /^[0-9a-zA-Z ... ]+$/.test($(".newFilename").val().trim())) {
                    newEditor($(".newFilename").val().trim());

                    $(".newFilename").val("").hide();
                }
            }
        }
    });

    $(document).on("click", "*", function(event) {
        $(".newFilename").val("").hide();
    });

    $(".newFilenameQueue, .newFilename").click(function(event) {
        event.stopPropagation();
    });
});