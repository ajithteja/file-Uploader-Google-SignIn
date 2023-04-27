const express = require('express');
const cors = require('cors');

const { mongooseConnection } = require('./db');
const { User } = require('./models/userModel');
const { createUserToken } = require('./jwt/jwt');

const { authMiddleWare } = require('./middlewares/middleware');
const { fileRouter } = require('./routers/file-router');

mongooseConnection(() => console.log('Mongo DB connected'));

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/hello', (request, response) => {
  response.json('Hello express');
});

app.post('/user/login', async (request, response) => {
  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      user = await new User({
        ...request.body,
      }).save();
      console.log('SAVE');
    }

    const token = createUserToken({
      uid: user.uid,
      _id: user._id,
    });
    console.log('token');
    console.log(user);

    response.json({
      message: 'Login Success',
      accessToken: token,
    });
  } catch (error) {
    response.json({
      error: error.message,
    });
  }
});

app.use('/', authMiddleWare, fileRouter);
//app.use('/', fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
