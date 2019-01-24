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
    var fileStructure = filename.split("/");
    var hierachyPosition = $("[data-folder='" + fileStructure.slice(0, fileStructure.length - 1).join("/") + "']");

    // Create any non-existent directories

    for (var f = 0; f < fileStructure.length; f++) {
        var exists = 0;

        for (var i = 0; i < editors.length; i++) {
            if (editors[i]["filename"].split("/").slice(0, editors[i]["filename"].split("/").length - 1).join("/") + "#folder" == fileStructure.slice(0, fileStructure.length - 1).join("/") + "#folder") {
                exists++;
            }
        }

        if (exists < 2) {
            var exists = false;

            for (var i = 0; i < editors.length; i++) {
                if (editors[i]["filename"] == fileStructure.slice(0, f).join("/") + "#folder") {
                    exists = true;
                }
            }
            
            if (!exists) {
                editors.push({
                    filename: fileStructure.slice(0, f).join("/") + "#folder"
                });

                if (fileStructure.slice(0, f).join("/") != "") {
                    $("[data-folder='" + fileStructure.slice(0, f - 1).join("/") + "']").html($("[data-folder='" + fileStructure.slice(0, f - 1).join("/") + "']").html() + `
                        <div class="folder sidebarItem" data-name="#` + fileStructure[fileStructure.slice(0, f).length - 1] + `" data-folder="` + fileStructure.slice(0, f).join("/") + `">
                            <div class="folderLabel" data-name="#"><i>folder</i> ` + fileStructure[fileStructure.slice(0, f).length - 1] + `</div>
                        </div>
                    `);

                    if (f == fileStructure.length - 1) {
                        newEditor(filename);
                    }
                }
            }
        }
    }

    // Create a file button

    hierachyPosition.html(hierachyPosition.html() + `
        <button class="file sidebarItem" onclick="selectEditor(` + (editors.length - 1) + `);" data-editor-id="` + (editors.length - 1) + `"></button>
    `);

    hierachyPosition.find("button.file:contains('#init')").remove();
    hierachyPosition.find("button.file").last().text(fileStructure[fileStructure.length - 1]).attr("data-name", filename);

    // Sort out order of files

    for (var i = 0; i < editors.length; i++) {
        if (editors[i].filename.endsWith("#folder")) {
            var hierachyPosition = $("[data-folder='" + editors[i].filename.replace("#folder", "") + "']");

            var orderedDivs = hierachyPosition.children().sort(function(first, second) {
                return String.prototype.localeCompare.call($(first).attr("data-name").toLowerCase(), $(second).attr("data-name").toLowerCase());
            });

            hierachyPosition.empty().append(orderedDivs);
        }
    }

    // Select the correct editor

    selectEditor(editors.length - 1);
}

function selectEditor(editorID) {
    if (!editors[editorID].filename.endsWith("#folder")) {
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
}

function promptNewFile() {
    $(".newFilename").show().focus();
    $(".newFilenameHint").show();
}

function openSidebar() {
    $(".sidebar").show();
}

function closeSidebar() {
    $(".sidebar").hide();
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

    newEditor("#init");
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

                if (
                    !exists &&
                    /^[0-9a-zA-Z ... ]+$/.test($(".newFilename").val().trim().replace(/\//g, "")) &&
                    !$(".newFilename").val().trim().startsWith("/") &&
                    !/\/\//g.test($(".newFilename").val().trim().replace(/  /g, "").replace(/ \//g, "/"))
                ) {
                    newEditor($(".newFilename").val().trim());

                    $(".newFilename").val("").hide();
                    $(".newFilenameHint").hide();
                }
            }
        }
    });

    $(document).on("click", "*", function(event) {
        $(".newFilename").val("").hide();
        $(".newFilenameHint").hide();
    });

    $(".newFilenameQueue, .newFilename").click(function(event) {
        event.stopPropagation();
    });
});