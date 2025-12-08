const multer=require('multer')
//we are saving image in memory storage not disk storage
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

module.exports=upload;