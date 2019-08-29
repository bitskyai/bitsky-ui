var scope = 'app.containers.SignupPage';
var msg = {
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign up for FREE',
  },
  passwordNotSame: {
    id: `${scope}.passwordNotSame`,
    defaultMessage: 'Two passwords that you enter is inconsistent!',
  },
  passwordInvalid: {
    id: `${scope}.passwordInvalid`,
    defaultMessage: "Make sure it's at least 5 characters, and at most 20 characters",
  },
  signUp:{
    id: `${scope}.signUp`,
    defaultMessage: 'SIGN UP',
  },
  typeName:{
    id: `${scope}.typeName`,
    defaultMessage: 'Please input your name!',
  },
  hasAccount:{
    id: `${scope}.hasAccount`,
    defaultMessage: 'Already has an account?',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'LOG IN',
  },
  invalid:{
    id: `${scope}.invalid`,
    defaultMessage: "Email isn't valid, password or display name is too short"
  },
  nameInvalid:{
    id: `${scope}.nameInvalid`,
    defaultMessage: "Make sure it's at least 3 characters, and at most 20 characters"
  },
};
var obj = {};

for(var key in msg){
    if(msg.hasOwnProperty(key)){
        obj[msg[key].id]=msg[key].defaultMessage
    }
}

console.log(JSON.stringify(obj));
