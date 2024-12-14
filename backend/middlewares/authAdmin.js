import jwt from "jsonwebtoken"
//admin authentication middleware
const authAdmin = async(req,res,next)=>{
     try{
      const {atoken} = req.headers;
      if(!atoken){
        return res.json({
          success:false,
          message:"Not authorised login again token not found"
        })
      }
      const token_decode = jwt.verify(atoken,process.env.JWT_TOKEN)
      if(token_decode !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)){
        return res.json({
          success:false,
          message:"Not authorised login again not correct token"
        })
      }
      next()
     }catch(error){
      console.log(error)
      res.send({
         success:false,
         message: "Something went wrong"
      })
     }
}
export default authAdmin;