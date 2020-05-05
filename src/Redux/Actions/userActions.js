import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_AUTHENTICATED,
  } from '../Types';
  import Requests from '../../Libraries/Requests'
  
  export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    
    Requests.signIn(userData)
          .then(data => {
              if (data.token){
                dispatch({ type: SET_AUTHENTICATED, payload: data });
                localStorage.token = data.token;
                history.push('/');
              }
              else alert('nope');
          })
          .catch(err => {
              dispatch({type: SET_ERRORS,
              payload: "Something went wrong"})
          });

  };
  
  export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    Requests.signUp(newUserData)
      .then(res => {
        if (res.token){
          localStorage.token = res.token;
          dispatch({ type: SET_AUTHENTICATED, payload: res });
          history.push('/');
        }
        else alert('nope');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: "Something went wrong"
        });
      });
  };

  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: SET_UNAUTHENTICATED });
  };

  export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    Requests.updateUser(userDetails)
        .then(data => {
          console.log(data);
          dispatch({type: SET_USER, payload: data})
        });
  };

  
  // export const getUserData = () => (dispatch) => {
  //   dispatch({ type: LOADING_USER });
  //   axios
  //     .get('/user')
  //     .then((res) => {
  //       dispatch({
  //         type: SET_USER,
  //         payload: res.data
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  // export const uploadImage = (formData) => (dispatch) => {
  //   dispatch({ type: LOADING_USER });
  //   axios
  //     .post('/user/image', formData)
  //     .then(() => {
  //       dispatch(getUserData());
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  // export const editUserDetails = (userDetails) => (dispatch) => {
  //   dispatch({ type: LOADING_USER });
  //   axios
  //     .post('/user', userDetails)
  //     .then(() => {
  //       dispatch(getUserData());
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  // export const markNotificationsRead = (notificationIds) => (dispatch) => {
  //   axios
  //     .post('/notifications', notificationIds)
  //     .then((res) => {
  //       dispatch({
  //         type: MARK_NOTIFICATIONS_READ
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  // const setAuthorizationHeader = (token) => {
  //   const FBIdToken = `Bearer ${token}`;
  //   localStorage.setItem('FBIdToken', FBIdToken);
  //   axios.defaults.headers.common['Authorization'] = FBIdToken;
  // };