import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string,
  constent: string,
  type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, {encoding: 'utf-8'});

      res.send(JSON.parse(result))
    } catch (error) {
      if(error.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([])
      } else {
        console.log(error);
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const {cells}: {cells: Cell[]} = req.body;

    try {
      await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

      res.send().status(200);
    } catch (error) {
      res.send().status(500);
    }

  });

  return router;
}
