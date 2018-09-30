import path from 'path';
import csv from 'csvtojson';

const createDocument = (docToSave, collection, callback) => {
  const res = new collection(docToSave);
  res
    .save()
    .then((doc) => {
      callback('', doc);
    })
    .catch((e) => {
      callback(e, '');
    });
};

module.exports = (app) => {
  const csvFilePath = path.resolve('./file/battles.csv');
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      // TODO Change this
      const collection = app.schema.battles;
      jsonObj.forEach((object) => {
        createDocument(object, collection, (err) => {
          if (err) {
            console.log('Error in saving doc : ', err);
          } else {
            console.log('Documents inserted successfully');
          }
        });
      });
    });
};
