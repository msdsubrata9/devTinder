const adminAuthrization = (req,res,next)=>{
    console.log("validating that admin is authorized or not");
    const token = "xyz";
    const isAdminAutherized = token ==="xyz";
    if(!isAdminAutherized){
        res.status(401).send("Unauthorized Admin");
    }
    else{
        next();
    }
}

const userAuthrization = (req,res,next)=>{
    console.log("validating user is authorized or not");
    const token = "xyz";
    const isUserAutherized = token === "xyz";
    if(!isUserAutherized){
        res.status(401).send("User not autharized");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuthrization,
    userAuthrization,
}