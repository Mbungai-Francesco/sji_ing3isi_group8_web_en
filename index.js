const pages = $("#sideBar .page");
const body = $("body");
const createTag = $("#createTag");
const createTagForm = $("#createTagForm");
const colorMenu = $('.dropbtn')
$('.profile_name').text(currentUser.username)
// $('header .profile_name').text(currentUser.username)

$('#sideBar-header svg').on('click', function() {
	window.location.href = "../index.html";
})

const bringTheForms = (form) => {
	$("#overlay").toggle("active");
	$(`#${form}`).toggle("active");
};

pages.on("click", function () {
	if ($(this).children("p").text().includes("Notes")) {
		window.location.href = "./notes.html";
	} else if ($(this).children("p").text().includes("Create Note")) {
		bringTheForms("createNoteForm");
	} else {
		var link = $(this).children("p").text().toLowerCase();
		window.location.href = `./${link}.html`;
	}
	console.log($(this).children("p"));
});

body.on("keydown", function (e) {
	if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "n") {
		e.preventDefault(); // Prevent the browser's default action
		bringTheForms("createNoteForm");
	} else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "t") {
		e.preventDefault(); // Prevent the browser's default action
		bringTheForms("createTagForm");
	}
	// console.log(e.key);
});

createTag.on("click", function () {
	bringTheForms("createTagForm");
});

colorMenu.on("click", function () {
	$(".dropdown-content").toggle("show");
});

$('#tagCancel').on('click', function () {
	bringTheForms("createTagForm");
})

// Function to generate a random number in a range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Animate bubbles
let bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
  let x = randomInRange(0, window.innerWidth)*(1/4);
  let y = randomInRange(0, window.innerHeight);
  let size = randomInRange(10, 50);
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  // Animate the bubble
  setInterval(() => {
    bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  }, 150);
});

$('#btn2').on('click', function () {
  $('#logOutFormSet').toggle('active')
  $('#overlay').toggle('active')
  $('#logOutFormSet p span').text(currentUser.username)
})

$('#logCreateSet').on('click', function () {
  loged = 'false'
  loged = JSON.stringify(loged);
  localStorage.setItem('loged', loged);
  window.location.href = '../index.html'
})

$('#logCancelSet').on('click', function () {
  $('#logOutFormSet').toggle('active')
  $('#overlay').toggle('active')
})

$('#btn1').on('click', function(){
	$('#deleteFormSet').toggle('active')
  $('#overlay').toggle('active')
	$('#deleteFormSet p span').text(currentUser.username)
})

$('#delCancelSet').on('click', function () {
  $('#deleteFormSet').toggle('active')
  $('#overlay').toggle('active')
})

$('#delCreateSet').on('click', function () {
	inUsers = localStorage.getItem('users');
	console.log(inUsers);
	inUsers = JSON.parse(inUsers);
	console.log(inUsers);
	console.log(currentUser);
	for (const u of inUsers) {
		if (u.username == currentUser.username && (u.email == currentUser.email) && (u.password == currentUser.password)) {
			ind = inUsers.indexOf(u)
		}
	}
	console.log(ind);
	inUsers.splice(ind, 1)
	inUsers = JSON.stringify(inUsers);
	localStorage.setItem('users', inUsers);
	loged = 'false'
  loged = JSON.stringify(loged);
  localStorage.setItem('loged', loged);
  window.location.href = '../index.html'
})

$('#sideBar-header h1').on('click', function(){
	window.location.href = './notes.html'
})