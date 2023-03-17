import { Command } from "commander";
import { serve } from "@my-custom-cli/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      
      // absolute path to executable console + path to needed file
      const dir = path.join(process.cwd(), path.dirname(filename));
      const name = path.basename(filename);

      //await - for catching errors, because app.listen() of express is async
      await serve(+options.port, name, dir, !isProduction);
      console.log(`opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`)
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running a different port.') 
      } else {
        console.log(error.message)
      }
      process.exit(1)
    }
  });