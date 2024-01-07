require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const catRoutes = require('./routes/catRoutes');
const { errorMiddleware } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.info('Connected to MongoDB');
})
.catch((error) => {
  // console.error('MongoDb cannot be connected:', error);
})

app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({storage}).single('image'));

app.use('/auth', authRoutes);
app.use('/pic', catRoutes);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
