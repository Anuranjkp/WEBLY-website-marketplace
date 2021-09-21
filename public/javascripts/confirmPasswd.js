function checkPassword() {
    password1 = document.getElementById("passwd").value;
    password2 = document.getElementById("confirmPasswd").value;
    
    console.log(password1)
    console.log(password2)
    // If password not entered
    if (password1 == '')
        alert ("Please enter Password");

    // If confirm password not entered
    else if (password2 == '')
        alert ("Please enter confirm password");     
    // If Not same return False.    
    else if (password1 != password2) {
        alert ("\nPassword did not match: Please try again...")
        return false;    
    }
    // If same return True.
    else{
        alert("Password Match:  Welcome to WeBly!")
        return true;
    }
}