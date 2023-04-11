import express, { Request, Response } from 'express';
import cors from "cors";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email,password)
})

app.post("/register", (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;

  console.log(email,password, displayName)
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
