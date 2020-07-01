/**
 * Application Main file
 */
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import './models';
import { NOT_FOUND } from './util/error';
import customErrorHandler from './middleware/customErrorHandler';
import { handleResponse, OK } from './util/success';

import { productRouter } from './routes/productsRouter';

const app = express();

/**
 * Set up middleware
 */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.status(OK).json(
    handleResponse({
      message: 'Welcome to API root...',
      data: {
        products_url: {
          add_product: '/api/v1/products',
        },
      },
    })
  );
});

app.use('/api/v1', productRouter);

// Handle invalid request
app.all('*', (req, res) => {
  res.status(NOT_FOUND).json({
    success: false,
    message: 'Route does not exist...',
    body: [],
  });
});

// handle all application level error
// eslint-disable-next-line max-len
app.use(customErrorHandler());

export default app;
