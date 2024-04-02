const multer = require('multer')
function uploadImg(folder){

  //creo la configuracion de guardado
  const storage = multer.diskStorage({
    //destino
    destination: `./public/images/${folder}`,
    //nombre del archivo
    filename: function(req, file, callback){
      callback(null, "Id-"+Date.now()+"-"+file.originalname)
    }
  })
  const upload = multer({storage: storage}).array("file")

  return upload;
}

module.exports=uploadImg