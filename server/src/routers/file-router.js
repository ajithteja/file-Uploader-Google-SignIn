const express = require('express');
const multer = require('multer');
const path = require('path');

const { getUserToken } = require('../jwt/jwt');
const { File } = require('../models/filesModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}_${file.originalname}`;
    console.log('name', name);
    cb(null, name);
  },
});

const fileUploadMiddleWare = multer({
  storage: storage,
});

const fileRouter = express.Router();

// fileRouter.get('/', async (request, response) => {
//   const files = await File.find();
//   console.log(files);
//   response.json({
//     files,
//   });
// });

fileRouter.get('/', async (request, response) => {
  const token = request.headers.authorization;
  //console.log(token);
  const payload = getUserToken(token);
  //console.log(payload);
  const userId = payload._id; // assuming the user's ObjectId is stored in the 'id' field of the payload

  const files = await File.find({ user: userId });
  // console.log('files', files);
  // files.pop();
  // files.pop();
  console.log('filesfiles', files);
  response.json({ files });
});

fileRouter.post(
  '/upload',
  fileUploadMiddleWare.any(),
  async (request, response) => {
    const token = request.headers.authorization;
    console.log('token', token);
    const userId = request.user._id;
    console.log('request.files', request.files);
    const files = request.files.map(
      ({ originalname, filename, mimetype, path, size }) => {
        return {
          user: userId,
          originalname,
          filename,
          mimetype,
          path,
          size,
        };
      }
    );
    console.log(files);

    await File.create(files)
      .then((result) => {
        console.log('result', result);
        response.json({ file: result });
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  }
);

fileRouter.get('/download/:fileId', async (request, response) => {
  console.log(request.params);
  try {
    const { fileId } = request.params;
    // console.log(File);
    const fileObj = await File.findById(fileId);
    console.log(fileId);
    // console.log(fileObj);
    console.log('fileObj.user', fileObj.user);
    // const cwt = path.json(process.cwd());
    const pathFile = path.join(process.cwd(), fileObj.path);
    console.log('pathFilepathFilepathFile', pathFile);
    response.download(pathFile);
  } catch (error) {
    response.json({
      error,
    });
  }
});

module.exports = {
  fileRouter,
};
