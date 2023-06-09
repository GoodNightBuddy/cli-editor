"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var cells_1 = require("./routes/cells");
var serve = function (port, filename, dir, useProxy) {
    var app = (0, express_1.default)();
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    //Is it local development or running on users machine
    if (useProxy) {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent'
        }));
    }
    else {
        // Serve static build of react-client app
        // Find build directory of local-api inside node-modules and serve it.
        var packagePath = require.resolve('@my-custom-cli/local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    // for ability to catch error in cli
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
