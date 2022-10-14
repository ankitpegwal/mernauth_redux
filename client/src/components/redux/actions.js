import axios from "axios";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const REGISTER_USER_SUCCESS ="REGISTER_USER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAIL = "USER_PROFILE_FAIL";
// export const USER_RECORD = "USER_RECORD";

const BASE_URL = 'http://localhost:4800/api';


export const Login = (authData) => {
    console.log("kjfgfsdfdf",authData)
    var result = [];
    return async dispatch => {
   
    await  axios.post( `${BASE_URL}/login`,authData)
        .then(function (response) {
    
        result = response.data
        if(result.status == 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response
            });
        }else{
            dispatch({
                type: LOGIN_FAIL,
                payload: response.data.status
            });
        }
        // src/components/redux/actions.js
        })
        .catch(function (error) {
            result = {status:400, message:"Something went wrong."}
            console.log(error);
        });

        return result;
    }
}

// register
export const Register = (authData) => {
    console.log("fgdfdfgfg",authData)
    var result = [];
    return async dispatch => {
        // logic to make a post to REGISTER the user
    await  axios.post( `${BASE_URL}/register`, authData)
        .then(function (response) {
        // console.log(response.data);
        result = response.data
        if(result.status == 200){
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: response
            });
        }else{
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: response.data.status
            });
        }
       
        })
        .catch(function (error) {
            result = {status:500, message:"Something went wrong."}
            console.log(error);
        });

        return result;
    }
}

//  userProfile
export const UserProfile = (authData) => {
    console.log("test@test.com",authData)
    var result = [];
    return async dispatch => {
        // logic to make a post to REGISTER the user
    await  axios.get(`${BASE_URL}/getList/${authData}`)
        .then(function (response) {
        // console.log(response.data);
        result = response.data;
            console.log("&&&&&&&&", result)
        if(result.status){
          
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: result
            },
            
            );
        }else{
            dispatch({
                type:  USER_PROFILE_FAIL,
                payload: response.data.status
            });
        }
      
        })
        .catch(function (error) {
            result = {status:500, message:"Something went wrong."}
            console.log(error);
        });

        return result;
    }
}

