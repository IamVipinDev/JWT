const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.get("/", (req, res) => {
  res.json({
    greet: "hello vipin this work",
  });
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}....`);
});
