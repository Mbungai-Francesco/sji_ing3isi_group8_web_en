const pages = $("#sideBar .page");
const body = $("body");
const createTag = $("#createTag");
const createTagForm = $("#createTagForm");
const colorMenu = $('.dropbtn')

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