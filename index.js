import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))


const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', handleValidationErrors, loginValidation, UserController.login)
app.post('/auth/register', handleValidationErrors, registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
})
