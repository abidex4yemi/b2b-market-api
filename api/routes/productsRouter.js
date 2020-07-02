import express from 'express';
import multer from 'multer';
import path from 'path';

import * as productController from '../controllers/products';

const productRouter = express.Router();

const upload = multer({
  dest: 'tmp/csv/',
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== '.csv') {
      return cb(new Error('Only CSV format accepted'));
    }

    cb(null, true);
  },
});

productRouter
  .route('/products/upload')
  .post(upload.single('file'), productController.uploadProduct);

export { productRouter };
