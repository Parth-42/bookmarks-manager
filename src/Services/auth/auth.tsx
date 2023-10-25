import firebase from "../config/firebase";

const GoogleAuth = (provider: firebase.auth.AuthProvider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      return error;
    });
};

export default GoogleAuth;
