const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", routes);
app.use(cors());
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
