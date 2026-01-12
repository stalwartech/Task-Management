const isAdmin = async (req, res, next) => {
    const myrole = req.user.role;
    if(myrole !== "ADMIN"){
        res.status(403).json({message: "Unauthorized Access"})
    }
    next()
}