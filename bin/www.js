#!/usr/bin/env node
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const app_1=require("../app"),Debug=require("debug"),debug=Debug("demo:server"),http=require("http"),config_1=require("../config"),port=normalizePort(process.env.PORT||config_1.default.PORT),server=http.createServer(app_1.default.callback());function normalizePort(e){var r=parseInt(e,10);return isNaN(r)?e:0<=r&&r}function onError(e){if("listen"!==e.syscall)throw e;port,port;switch(e.code){case"EACCES":case"EADDRINUSE":process.exit(1);break;default:throw e}}function onListening(){var e=server.address(),e="string"==typeof e?"pipe "+e:"port "+e.port;debug("Listening on "+e)}server.listen(port),server.on("error",onError),server.on("listening",onListening);