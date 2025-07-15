import express from "express";
import fs from "fs";

import config from "./config/config.js";



const app = express();
app.get("/", (req, res) => {


    res.status(200).json({
        name: config.name,
        port: config.port,
        version: config.version,
        feature: config.enableTestFeature ? "enabled" : "Disabled"
    });

});
app.get("/Products", (req, res) => {


    const products = fs.readFileSync("./src/data/products.json", "utf-8");
    const pobject = JSON.parse(products);
    res.json(pobject);
});

app.get("/not_found", (req, res) => {
    res.status(404).send("Route Not Found");
});
app.post("/", (req, res) => {
    res.send("Data Created Successfully");
});
app.put("/", (req, res) => {
    res.send("Data update  Successfully");
});
app.listen(config.port, () => {
    console.log(`server running at port ${config.port}...`);
});