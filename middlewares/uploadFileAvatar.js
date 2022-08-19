const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatars')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname) + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})

const upload = multer({ storage })

module.exports = upload
