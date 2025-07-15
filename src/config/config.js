import dotenv from "dotenv";
dotenv.config();

const config = {
    name: process.env.NAME || " ",
    port: process.env.PORT || 3000,
    version: process.env.VERSION || "1.0.0",
    enableTestFeature: parseInt(process.env.FEATURE_TEST_ENABLED) || false
};
export default config;