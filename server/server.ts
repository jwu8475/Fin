import { ServerError } from '../types.ts';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/job', (_req: Request, res: Response) => {
    return res.send('in job job route');
})

app.use('*', (_req: Request, res: Response) => {
  return res.status(404).send("Page Not Found!!");
})

app.use((err: unknown, _req: Request, res: Response) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

// import { fileURLToPath } from 'url';
// import { register } from 'module';
// import { dirname, join } from 'path';
// register("ts-node/esm", pathToFileURL("./"))
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use("/", express.static(join(__dirname, "../dist")));
// const path = require("path");
// app.use("/", express.static(path.join(__dirname, "../dist")));
// app.use('/', (_req: Request, res: Response) => {
//   return res.send('in homepage');
// })