import express from 'express';
import { loginController } from '../controllers/login.controller.js';
import { register } from '../controllers/login.controller.js';

const router = express.Router();

router.post('/', loginController.login);

export default router;