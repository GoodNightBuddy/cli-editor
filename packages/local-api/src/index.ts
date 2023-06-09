import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  //Is it local development or running on users machine
  if (useProxy) {
  app.use(createProxyMiddleware({
    target: 'http://localhost:3000',
    ws: true,
    logLevel: 'silent'
  }))
  } else {
  // Serve static build of react-client app
  // Find build directory of local-api inside node-modules and serve it.
  const packagePath = require.resolve('@my-custom-cli/local-client/build/index.html');
  app.use(express.static(path.dirname(packagePath)))
  }

  // for ability to catch error in cli
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}