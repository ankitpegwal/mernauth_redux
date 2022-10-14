import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from './redux/actions'
import Logout from './Logout';


export default function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.main.user)
    const userDetails = useSelector(state => state.main.userRecord.Userdata)
    const data = useSelector(state => state.main.userRecord.data)

    const [state ,setState] = useState()
    const [list ,setList] = useState()

    // console.log("jghfffe",state);

const navigate =  useNavigate()
useEffect(()=>{
let token = localStorage.getItem("token")
let id =localStorage.getItem("id")
if(!token){
    navigate("/login")
}
    dispatch(actions.UserProfile(id)).then((result)=>{
        console.log("result",result);
       
        setState(result?.Userdata)
        setList(result?.data)
    })
  console.log(userDetails,"ss");
},[])

useEffect(() => {
    console.log(data,"userDetails");
}, [userDetails])




  return (
    <div  style={{display:"flex",justifyContent: "center",gap: "32px"}}>
<Logout />

<div class="card">
        <div class="card_background_img"></div>
        <div class="card_profile_img"></div>
        <div class="user_details">
            
                <h3>{userDetails?.name}</h3>
                <p>{userDetails?.email}</p>
        </div>
        <div class="card_count">
            <div class="count">
            <div class="following">
                    <h3>Mobile</h3>
                    <p>{userDetails?.mobile}</p>
                </div>
                <div class="following">
                    <h3>Zip code</h3>
                    <p>{userDetails?.zipCode}</p>
                </div>
                <div class="following">
                    <h3>Phone</h3>
                    <p>{userDetails?.phone?userDetails?.phone:"-"}</p>
                </div>
            </div>
            
             <div class="btn">Edit Profile</div>
        </div>
    </div>
    
<div class="card">
    <div class="card_background"></div>
<div class="user_details">
            
            <h1>Users Near Me</h1>
            {
data && data.map((item)=>{
    return (
        <>
        <h4>User Name: {item.name} </h4>
        <p>Distance : {item.distance} </p>
        </>
    )
})
            }
            
    </div>
  </div>

    
    </div>
  )
}
