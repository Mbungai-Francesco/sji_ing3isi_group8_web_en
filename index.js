const pages = $("#sideBar .page");
const body = $("body");
const createTag = $("#createTag");
const createTagForm = $("#createTagForm");
const colorMenu = $('.dropbtn')

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

// Animate bubbles
// let bubbles = document.querySelectorAll('.bubble');
// bubbles.forEach(bubble => {
//   let x = randomInRange(0, window.innerWidth);
//   let y = randomInRange(0, window.innerHeight);
//   let size = randomInRange(10, 50);
//   bubble.style.width = `${size}px`;
//   bubble.style.height = `${size}px`;
//   bubble.style.left = `${x}px`;
//   bubble.style.top = `${y}px`;

//   // Animate the bubble
//   function moveBubble() {
//     x += randomInRange(-5, 5);
//     y += randomInRange(-5, 5);

//     // Check boundaries
//     if (x < 0) x = 0;
//     if (x > window.innerWidth) x = window.innerWidth;
//     if (y < 0) y = 0;
//     if (y > window.innerHeight) y = window.innerHeight;

//     bubble.style.left = `${x}px`;
//     bubble.style.top = `${y}px`;

//     requestAnimationFrame(moveBubble);
//   }

//   moveBubble();
// });