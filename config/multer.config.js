const multer = require('multer');
const admin = require('./firebase.config');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadToFirebase = async (file) => {
  const bucket = admin.storage().bucket();
  const blob = bucket.file(uuidv4() + '-' + file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', () => {
      resolve(blob.name);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { upload, uploadToFirebase };