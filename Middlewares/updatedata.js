const User = require("../Model/userSchema");

const updatedata = async (req, res, next) => {
    try {
        // for(let key in req.body)
        // {
        //     console.log("Key : " ,key," value : ",req.body.Name[key]);
        // }
        console.log("In updatedata Body is : ", req.body.Name);
        const res = await User.updateOne({ _id: req.body.id }, {
            $set: {
                ...req.body.Name
            }
        });

        console.log("response in updatedata: ", res);
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = updatedata;