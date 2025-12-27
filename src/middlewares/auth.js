// WITH MIDDLEWARE
// purpose: this middleware will check authorization of all request(GET,POST,PUT etc) which matches "/admin"
//          we can also use app.get("/admin",...) if we want to chk authorization for only GET requests
const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        next();
    }
    else{
        res.status(401).send("unauthorized token");
    }
};

module.exports = {
    adminAuth,
}