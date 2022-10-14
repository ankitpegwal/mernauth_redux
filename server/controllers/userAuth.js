const UserSchema = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')

// register
exports.register = async (req, res) => {
    const { name, password, email, mobile, zipCode, profilePic, latitude, longitude } = req.body

    const newEntry = {
        name,
        password,
        email,
        mobile,
        zipCode,
        profilePic,
        latitude,
        longitude
    }
    const salt = await bcrypt.genSalt(10);
    newEntry.password = await bcrypt.hash(req.body.password, salt);
    try {
        const emailExist = await UserSchema.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(200).json({status:false, msg: "Email already Exists" });

        } else {
            const newRegister = new UserSchema(newEntry)

            const saveData = await newRegister.save();

            res.status(200).json({status:true, data: saveData, message: "user register successfully" })
        }





    } catch (error) {
        console.log({ error })
        res.status(500).json({ error })
    }
}


exports.login = async (req, res) => {
    try {
        const check = await UserSchema.findOne({ email: req.body.email });
        if (check.email == req.body.email) {
          const validPass = await bcrypt.compare(req.body.password, check.password)
      console.log(req.body.password);
      console.log(check.password);
      console.log(validPass);


          if (!validPass) return res.status(401).json({ status: false, msg: "invalid password" })
          const token = jwt.sign({ _id: check._id, email: check.email, }, "jhjdgsadgsadasugfasufv")
        

          return res.status(200).json({ status: true, msg: "Login Successfully", "token": token,_id:check._id })

        }

    } catch (error) {
        console.log({ error })

        res.status(500).json({ error })
    }
}


exports.userList = async (req, res) => {
const id = req.params.id
console.log(id);
    try {
      const Userdata = await UserSchema.findOne({_id:id});
      const UserList = await UserSchema.find();
      console.log(UserList);
        var newArr=[]
        for (let i = 0; i < UserList.length; i++) {
        
      let distance=calcCrow(30.704649,76.717873,UserList[i].latitude,UserList[i].longitude)
      newArr.push({
        name:UserList[i].name,
        email:UserList[i].email,
        distance:`${distance.toFixed(2)}  KM`
      })
      
        }
        let sortedUser = newArr.sort((p1, p2) => (p1.distance > p2.distance) ? 1 : (p1.distance < p2.distance) ? -1 : 0);
        

        console.log(newArr)
        
      
        return res.status(200).json(({status:true,data:sortedUser.slice(0,5),Userdata:Userdata,msg:"User listed Successfully."}));
    } catch (error) {
      console.log(error)

      return res.status(400).json({error});
    }
     
};

exports.removeUser = async(req,res)=>{
    try {
        const removeData = await UserSchema.deleteMany()
        res.json({status:true})

    } catch (error) {
      return res.status(400).json(error);
        
    }
}



exports.updateProfile = async (req,res) => {

    try {
        const updatedUser =  await UserSchema.findByIdAndUpdate(req.params._id, req.body, { new: true });
        return res.json({status:true,data:updatedUser,msg:"User updated successfully"});
     
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  exports.updateUserImage = async (req,res) => {

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
                cb(null, './uploads/users');
              },
              filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
    });
    var upload = multer({
      storage: storage
    }).any();
    
    upload(req, res, function(err) {
      if (err) {
          console.log(err)
          return res.json(err);
      } else {
        
          req.files.forEach( async function(item) {
            
              const updatedUser = await UserSchema.updateOne(
                { _id: req.params._id },
                { $set: { profilePic: item.originalname} }
              );
              if(updatedUser) 
              {
                return res.status(200).json({msg:"User profile uploaded"})
              }else{
                return res.status(500).json({msg:"Image not upload"})
              }
          });
          
      }
    });
      
    }





    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // earth radius km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

 
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }