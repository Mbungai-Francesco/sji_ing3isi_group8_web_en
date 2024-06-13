const submit = $("#signUpSubmit");
var user = {username: "", email: "", password: "", id : ""};

function claim() {
	inputs = document.querySelectorAll("input");
	rtext = document.querySelectorAll(".red-text");
	for (i = 0; i < 4; i++) {
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
  if (inputs[2].value != inputs[3].value) {
    inputs[3].classList.add("red-box");
    rtext[3].style.display = "block";
    return false;
  }
  else{
    inputs[3].classList.remove("red-box");
    rtext[3].style.display = "none";
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
const addUser = function (users){
  currentUser = localStorage.getItem('currentUser');
  currentUser = JSON.parse(currentUser);
  currentUser = user;
  currentUser = JSON.stringify(currentUser);
  localStorage.setItem('currentUser', currentUser);
  loged = JSON.parse(localStorage.getItem('loged'));
  loged = "true"
  loged = JSON.stringify(loged);
  localStorage.setItem('loged', loged);
  users = JSON.stringify(users);
  localStorage.setItem('users', users);
  console.log(users);
  alert("User saved successfully")
  window.location.href = "../index.html";
}

submit.on("click", function () {
	if (claim()){
    console.log("well entered")
    console.log(user);
    users = localStorage.getItem('users');
    if(users != '') users = JSON.parse(users)
    console.log(users);
    found = false
    for (const u of users) {
      if (u.username == user.username) {
        found = true;
        break;
      }
      if (u.email == user.email) {
        found = true;
        break;
      }
    }
    if (users.length == 0) {
      user.id = 1;
      users = [user];
      addUser(users)
    }else if(!found){
      user.id = users[users.length - 1].id + 1;
      users.push(user);
      addUser(users)
    }else{
      alert("User already exists");
    }
  }
	else console.log("Faulty");
});
