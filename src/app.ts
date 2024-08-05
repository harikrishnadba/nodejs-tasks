import express, { Request, response, Response } from 'express'; // Import types
import dbInit from './db/models/init';
import routes from './db/models/routes/routes';

const port = 3003;

const app = express();

app.use(express.json());

// Initialize the database
dbInit();

// Use defined routes
app.use('/', routes);

// Define a basic route
app.get('/hello world', (req: Request, res: Response) => {
    res.send('hello world');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
