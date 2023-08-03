const express = require('express');
const cors = require('cors');
const Routes = require('./src/api/routes');


const app = express();
app.use(cors());

const port = 3003;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.use("/api/v1/", Routes);
app.listen(port, () => console.log(`app listening on port ${port}`));

