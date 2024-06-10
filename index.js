const pages = $("#sideBar .page");

pages.on("click", function () {
	if ($(this).children("p").text().includes("Notes")) {
		window.location.href = "./notes.html";
	} else if ($(this).children("p").text().includes("Create Note")) {
    $("#overlay").toggle("active");
	  $("#createNoteForm").toggle("active");
	} else {
		var link = $(this).children("p").text().toLowerCase();
		window.location.href = `./${link}.html`;
	}
	console.log($(this).children("p"));
});
