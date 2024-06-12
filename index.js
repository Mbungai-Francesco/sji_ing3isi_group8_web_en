const pages = $("#sideBar .page");
const body = $("body");
const createTag = $("#createTag");
const createTagForm = $("#createTagForm");
var data = ''

// $.ajax({
//   url: "https://csscolorsapi.com/api/colors",
//   type: 'GET',
//   dataType: 'json', // The type of data you're expecting back from the server
//   success: function(data) {
//     console.log(data);
//   },
//   error: function(error) {
//     console.error('Error:', error);
//   }
// });

// var xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     if (this.readyState == 4) {
//       var response = JSON.parse(xhttp.responseText);
//       Notes = response.Notes
//       console.log(Notes);
//       // console.log(arrTag);
//     }
//   };
//   xhttp.open("GET", "https://csscolorsapi.com/api/colors", true);
//   xhttp.send();

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