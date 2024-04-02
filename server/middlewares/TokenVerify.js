const jwt= require('jsonwebtoken')
require('dotenv').config()
const verify = (req, res, next)=>{
  
  let auth = req.headers.authorization
  if (!auth){
    return res.status(401).json("No estas autorizado")
  }

  const token= auth.split(" ")[1]
  if(!token){
    return res.status(401).json("Token no valido")
  }

  jwt.verify(token, process.env.SECRET, (err, decoded)=>{
    // console.log(decoded)
    if(decoded.user.id){
      req.user = decoded.user.id 
    }

    if(err){return res.status(401).json(err)}
    next();
  })
}

module.exports = verify