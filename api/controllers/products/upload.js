import mongoose from 'mongoose';
import * as fs from 'fs';
import * as csv from 'fast-csv';

/**
 * @description Upload product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const uploadProduct = async (req, res) => {
  const buyRequest = [];
  const sellRequest = [];
  csv
    .parseFile(req.file.path)
    .on('error', (error) => console.error(error))
    .on('data', (row) => {
      const eachLeftRow = row.splice(0, 11).filter(Boolean);
      const eachRightRow = row.filter(Boolean);
      // only push non-empty array
      if (eachLeftRow.length > 0) {
        buyRequest.push(eachLeftRow);
      }
      // only push non-empty array
      if (eachRightRow.length > 0) {
        sellRequest.push(eachRightRow);
      }
    })
    .on('end', () => {
      const request = {};
      let values = [];
      buyRequest.forEach((current, i) => {
        if (current[0] == 'Buy Request' || current[0] == 'Sell Request') {
          request['type'] = current[0];
          return;
        }

        if (i < 6) {
          if (current[0].match(/iPhone/gi) || current[0].match(/Unlocked/gi)) {
            current.shift();
          }

          if (current.length > 0) {
            values.push(current);
          }
        }
      });

      buyRequest.splice(0, 6);
      res.json(a);

      // remove temp file
      fs.unlinkSync(req.file.path);
    });
};
