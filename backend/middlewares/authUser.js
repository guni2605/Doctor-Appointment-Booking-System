import jwt from "jsonwebtoken"
//admin authentication middleware
const authUser = async(req,res,next)=>{
     try{
      const {token} = req.headers;
      if(!token){
        return res.json({
          success:false,
          message:"Not authorised login again token not found"
        })
      }
      const token_decode = jwt.verify(token,process.env.JWT_TOKEN)
      
      req.body.userId = token_decode.id
      next()
     }catch(error){
      console.log(error)
      res.send({
         success:false,
         message: "Something went wrong"
      })
     }
}
export default authUser;