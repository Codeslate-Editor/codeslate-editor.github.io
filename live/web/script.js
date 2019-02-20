(function() {
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
    }

    function interpretPath(path, current) {
        var pathList = path.split("/");
        var currentList = current.split("/");

        for (var i = 0; i < pathList.length; i++) {
            if (pathList[i] != ".") {
                if (pathList[i] == "..") {
                    currentList.pop();
                } else {
                    currentList.push(pathList[i]);
                }                
            }
        }

        var joinedList = currentList.join("/");

        if (joinedList[0] == "/") {
            joinedList = joinedList.substring(1);
        }

        return joinedList;
    }

    var structure = {};
    var error = "";

    addEventListener("message", function(event) {
        if (event.data.for == "CodeslateLive") {
            if (typeof(event.data.structure) == "object") {
                structure = event.data.structure;

                if (structure[getURLParameter("page")] == undefined) {
                    $("body").text("Sorry, couldn't find that page.");

                    error = "Error 404: The page at " + getURLParameter("page") + " couldn't be found.";
                }

                var path = getURLParameter("page").split("/");
                path.pop();
                path = path.join("/");

                $("body").html(structure[getURLParameter("page")]);

                $("body").find("title").each(function() {
                    if ($(this).text().trim() != "") {
                        $("head").find("title").text($(this).text());
                    }
                });

                $("body").find("[src]").each(function() {
                    if (!($(this).attr("src").startsWith("http://") || $(this).attr("src").startsWith("https://"))) {
                        var target = interpretPath($(this).attr("src"), path);

                        if ($(this).is("script")) {
                            if (structure[target] == undefined) {
                                error = "Error 404: The script at + " + target + " + couldn't be found.";
                            }

                            $("<script>")
                                .text(structure[target])
                                .appendTo($(this).parent())
                            ;

                            $(this).remove();
                        }
                    }
                });

                $("body").find("[href]").each(function() {
                    if (!($(this).attr("href").startsWith("http://") || $(this).attr("href").startsWith("https://"))) {
                        var target = interpretPath($(this).attr("href"), path);

                        if ($(this).is("link") && $(this).attr("rel") == "stylesheet") {
                            if (structure[target] == undefined) {
                                error = "Error 404: The stylesheet at + " + target + " + couldn't be found.";
                            }

                            $("<style>")
                                .text(structure[target])
                                .appendTo($(this).parent())
                            ;

                            $(this).remove();
                        } else if ($(this).is("a")) {
                            $(this).attr("href", "index.html?page=" + interpretPath($(this).attr("href"), path));
                        }
                    }
                });
            }
        }
        
        if (error != "") {
            console.error(error);
        }
    });

    parent.opener.postMessage({
        for: "CodeslateLive",
        getData: true
    }, "*");
})();