
module.exports = (req, res, next) => {

    let isObj= false;


    Object.entries(req.body).forEach((value) => {

                if (typeof value[1] === "object") {
                    console.log('Object detected ====> '+value[0] + " Value =====>",value[1]);
                    isObj = true;
                }
                

    });

    if(isObj){
        return res.status(403).json({error : "Object detected !"});
    }
    next();
}