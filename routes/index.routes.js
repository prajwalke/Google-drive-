const express = require('express');
const { upload, uploadToFirebase } = require('../config/multer.config');
const fileModel = require('../models/files.models');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const firebase = require('../config/firebase.config');

router.get('/home', authMiddleware, async (req, res) => {
  const userFile = await fileModel.find({
    user: req.user.userID
  });

  console.log(userFile);

  res.render('home', { files: userFile });
});

router.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const fileName = await uploadToFirebase(req.file);
    const newFile = await fileModel.create({
      path: fileName,
      originalname: req.file.originalname,
      user: req.user.userID
    });
    res.json({ message: 'File uploaded successfully', fileName });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

router.get('/download/:filename', authMiddleware, async (req, res) => {
  const file = await fileModel.findOne({ filename: req.params.filename, user: req.user.userID });
  if (!file) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const signedUrl = await firebase.storage().bucket().file(file.path).getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 5 // 5 minutes
    });
    res.redirect(signedUrl[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error generating signed URL', error });
  }
});

module.exports = router;