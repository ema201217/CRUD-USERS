var express = require('express')
const upload = require('../middlewares/uploadFileAvatar')
const {
  usersList,
  userEdit,
  userAdd,
  userStore,
  userUpdated,
  userSearch,
  userDelete,
} = require('../controllers/user.controller')
var router = express.Router()

/* GET users listing. */
router.get('/', usersList)
router.get('/search', userSearch)
router.get('/add', userAdd)
router.post('/store', userStore)

router.get('/edit/:id', userEdit)
router.put('/update/:id', upload.single('avatar'), userUpdated)

router.delete('/delete/:id', userDelete)

module.exports = router
