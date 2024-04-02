const multer = require('multer')
function uploadImg(folder){

  //creo la configuracion de guardado
  const storage = multer.diskStorage({
    //destino
    destination: './public/resource/',
    //nombre del archivo
    filename: function(req, file, callback){
      callback(null, "Id-"+Date.now()+"-"+file.originalname)
    }
  })
  const upload = multer({storage: storage}).single("file")

  return upload;
}

module.exports=uploadImg