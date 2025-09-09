require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/api");
const {getHomePage} = require("./controllers/homeController");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8888;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);

const webApi = express.Router();
webApi.get("/", getHomePage);
app.use("/", webApi);

app.use("/v1/api/", apiRoutes);
(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect to the database", error);
    }
})();