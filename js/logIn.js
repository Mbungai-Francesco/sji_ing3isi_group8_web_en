const submit = $("#logInSubmit");
var user = {username: "", email: "", password: "", id : ""};
var currentUser = ''

function claim() {
	inputs = document.querySelectorAll("input");
	rtext = document.querySelectorAll(".red-text");
	for (i = 0; i < 3; i++) {
		if (i != 1) {
			if (inputs[i].value.length == 0) {
				inputs[i].classList.add("red-box");
				rtext[i].style.display = "block";
				return false;
			} else {
				inputs[i].classList.remove("red-box");
				rtext[i].style.display = "none";
			}
		} else {
			if (/^[^@]+@\w+(\.\w+)+\w$/.test(inputs[i].value) == false) {
				inputs[i].classList.add("red-box");
				rtext[i].style.display = "block";
				return false;
			} else {
				inputs[i].classList.remove("red-box");
				rtext[i].style.display = "none";
			}
		}
	}
  user.username = inputs[0].value;
  user.email = inputs[1].value;
  user.password = inputs[2].value;
	return true;
}

$("input").on("input", function () {
	if (this.value.length == 0) {
		this.classList.add("red-box");
		this.nextElementSibling.style.display = "block";
	} else {
		this.classList.remove("red-box");
		this.nextElementSibling.style.display = "none";
	}
});

submit.on("click", function () {
	if (claim()){
    console.log("well entered")
    console.log(user);
    users = localStorage.getItem('users');
    if(users != '') users = JSON.parse(users)
    console.log(users);
    found = false
    for (const u of users) {
      if (u.username == user.username && (u.email == user.email) && (u.password == user.password)) {
        found = true;
        currentUser = u
        break;
      }
    }
    if (users.length == 0) {
      alert('User does not exist')
    }else if(!found){
      alert("User does not exist");
    }else{
      loged = JSON.parse(localStorage.getItem('loged'));
      loged = "true"
      loged = JSON.stringify(loged);
      localStorage.setItem('loged', loged);
      alert("Welcome");
      window.location.href = "../index.html";
    }
  }
	else console.log("Faulty");
});
