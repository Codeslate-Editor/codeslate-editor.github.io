fileTypes = [
    {
        name: "HTML",
        ending: ".html",
        mode: "htmlmixed",
        default: `<!DOCTYPE html>
<html>
    <head>
        <title></title>
    </head>
    <body>
    </body>
</html>`
    },
    {
        name: "CSS",
        ending: ".css",
        mode: "css",
        default: `body {
    font-family: "sans-serif";
}`
    },
    {
        name: "JavaScript",
        ending: ".js",
        mode: "javascript",
        default: `console.log("Hello, world!");`
    }
];