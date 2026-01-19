import { express } from 'express';
import { cors } from 'cors';
import registerRoutes from './routes/register.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use (express.json());
app.use (cors());

