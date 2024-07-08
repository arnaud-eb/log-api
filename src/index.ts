import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req);
  // console.log(res);
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end();
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<h1>Hello World!</h1>");
    // res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
