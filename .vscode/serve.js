const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const name = pathname.replace(/^\/+/, "") || "index.html";
  const file = path.resolve(root, name);

  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.createReadStream(file)
    .on("error", () => {
      res.writeHead(404);
      res.end("Not found");
    })
    .pipe(res);
}).listen(8000, "127.0.0.1", () => {
  console.log("Portfolio available at http://127.0.0.1:8000");
});
