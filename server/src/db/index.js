const mongoose = require('mongoose');

const mongooseConnection = () => {
  mongoose
    .connect(
      'mongodb+srv://AjithTeja:Ajithteja@cluster0.s2irefp.mongodb.net/test?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('mongoDb Initialized');
    })
    .catch((error) => {
      console.log('ERRERRRRRRRRRRRRR');
      console.log(error);
    });
};

// mongodump --uri mongodb+srv://AjithTeja:<PASSWORD>@cluster0.s2irefp.mongodb.net/<DATABASE>

// mongodb+srv://AjithTeja:Ajithteja@cluster0.s2irefp.mongodb.net/mydatabase?retryWrites=true&w=majority

// mongodb+srv://AjithTeja:Ajithteja@cluster0.s2irefp.mongodb.net/?retryWrites=true&w=majority

module.exports = {
  mongooseConnection,
};
