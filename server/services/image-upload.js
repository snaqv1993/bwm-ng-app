const aws = require('aws-sdk')
const proxy = require('proxy-agent')
const multer = require('multer')
const multerS3 = require('multer-s3')
const conf = require('../config')


aws.config.update({
  secretAccessKey : conf.AWS_SECRET_ACCESS_KEY,
  accessKeyId : conf.AWS_ACCESS_KEY_ID,
  region : 'us-east-1',
  httpOptions: { 
    agent: proxy('http://proxy.tafensw.edu.au:8080') 
  }
})

const s3 = new aws.S3()


const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }
  else{
    cb(new Error('Invalid file type, Only JPEG and PNG is allowed'), false);
  }
} 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'bwm-dev-ng-ali',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "TESTING_METADATA"});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;