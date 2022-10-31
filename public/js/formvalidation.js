(function(){
    const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatePassword = (password) =>{
      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g; 
      let numbers = /[0-9]/g;
      if(!password.match(lowerCaseLetters)){
            return false;
      }
      if(!password.match(upperCaseLetters)){
            return false;
      }
      if(!password.match(numbers)){
            return false;
      }
      return true;
}
    let signUpForm = document.getElementById("signUpForm");
    let errorMsg =  document.querySelector(".error");
    let signUpEmail;
    let signUpPassword;
    let validEmail = false;
    let validPassword = false;
    signUpForm.addEventListener("submit", (ev)=>{
        ev.preventDefault();
        signUpEmail = signUpForm.username.value;
        validEmail = validateEmail(signUpEmail);
        signUpPassword = signUpForm.password.value;
        validPassword = validatePassword(signUpPassword);
        if(signUpPassword && validPassword){
                signUpForm.submit()
            }else{
                errorMsg.setAttribute("class", "error")
                errorMsg.innerText = "Not Valid Values"
            }
    })
})();