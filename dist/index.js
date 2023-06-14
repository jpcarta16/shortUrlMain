"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./models/models");
// import router from './routes/routes'
models_1.sequelize.sync({ force: true })
    .then(() => {
    console.log('Synced db.');
})
    .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
});
const APP_PORT = 8090;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const welcomeMessage = (res) => {
    res.status(200).send({ message: 'Welcome to the URL-Shortener API.' });
};
app.get('/', (req, res) => {
    var _a, _b;
    if ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.accept) === null || _b === void 0 ? void 0 : _b.includes('text/html')) {
        res.sendFile(path_1.default.resolve('.', 'index.htm'));
    }
    else {
        return welcomeMessage(res);
    }
});
// app.use('/', router)
app.listen(APP_PORT, () => {
    console.log(`Shortening url service App listening on port: ${APP_PORT}`);
});
