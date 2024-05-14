var body = $("body");
var mainBody = $("#mainBody");
var switcher = $("#svgs svg");
var notes = $(".notes");
var dots = $(".notes .dots");
var notes_opt = $(".notes .note_option");
var notes_opt_ren = $(".notes .note_option div");
var rename = $("#rename");
var renameCancel = $("#renCancel");
var renameUpdate = $("#renUpdate");
var del = $("#delete");
var delCancel = $("#delCancel");
var overlay = $("#overlay");
var currentlyUpdating;
var createNote = $("#createNote");

// const getAll = function (){
//   body = $("body");
//   mainBody = $("#mainBody");
//   switcher = $("#svgs svg");
//   notes = $(".notes");
//   dots = $(".notes .dots");
//   notes_opt = $(".notes .note_option");
//   notes_opt_ren = $(".notes .note_option div");
//   rename = $("#rename");
//   renameCancel = $("#renCancel");
//   renameUpdate = $("#renUpdate");
//   del = $("#delete");
//   delCancel = $("#delCancel");
//   overlay = $("#overlay");
// }

console.log('At top');

function Note(id, title, date, time, description, tags) {
	this.id = id;
	this.title = title;
	this.date = date;
	this.time = time;
	this.description = description;
  this.tags = tags;
}

const makeNotes = function (Notes) {
  for (const iterator of Notes) {
    mainBody.append(newNote(iterator.id,iterator.title, iterator.date, iterator.time, iterator.tags));  
  }
  // getAll()
}

makeNotes(Notes)

console.log('At bottom');
for (let i = 0; i < notes.length; i++) {
	notes[i].setAttribute("val", i);
}

noteHeight = notes.eq(0).height();
notes_opt.css("bottom", `${-1 * noteHeight}px`); // positions the note-option someway below the note

const closeForms = function (ele) {
	ele.toggle("active");
	overlay.toggle("active");
};

function filterContacts(searchTerm) {
	$("#mainBody .notes").each(function () {
		var text = $(this).children(":first").text().toLowerCase();
		if (text.includes(searchTerm)) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}

var noteOptionOnSite = function () {
	for (const iterator of notes_opt) {
		if (iterator.classList.contains("hidden")) continue;
		else return true;
	}
	return false;
};

switcher.eq(0).on("click", function () {
	$("#mainBody").toggleClass("reverse");
});

switcher.eq(1).on("click", function () {
	$("#mainBody").toggleClass("grid_mainBody");
	$("#mainBody").toggleClass("block_mainBody");
});

dots.on("click", function () {
	notes_opt.addClass("hidden");
	// console.log(notes_opt)
	this.nextElementSibling.classList.toggle("hidden");
	// console.log(this.nextElementSibling.classList);
});

notes_opt.on("focusout", function () {
	// console.log('moon');
	notes_opt.addClass("hidden");
	// notes_opt.addClass(hidden);
});

body.on("click", function (e) {
	var val = e.target.getAttribute("class");
	// console.log(val != 'note_option' && noteOptionOnSite());
	// console.log( noteOptionOnSite());
	// console.log(val != 'note_option');
	if (
		val != "note_option" &&
		noteOptionOnSite() &&
		val != "dots" &&
		val != "dot"
	) {
		notes_opt.addClass("hidden");
	}
	// console.log(val);
});

// $(document).ready(function () {

// });

$("#searchIn").on("input", function () {
	console.log($(this).val().toLowerCase());
	var searchTerm = $(this).val().toLowerCase();
	filterContacts(searchTerm);
});

notes_opt_ren.on("click", function () {
	$(this).parent().parent().parent().addClass("working");
	let name = $(this).parent().parent().parent().children(":first").text();
	if ($(this).attr("class") == "ren") {
		rename.children("input").val(name);
		rename.toggle("active");
		overlay.toggle("active");
	} else if ($(this).attr("class") == "del") {
		del.children(":first").children(":last").text(name);
		del.toggle("active");
		overlay.toggle("active");
	}
});

renameCancel.on("click", function () {
	closeForms(rename);
});
delCancel.on("click", function () {
	closeForms(del);
});

renameUpdate.on("click", function () {
	$(".working").children(":first").text(rename.children("input").val());
	$(".working").removeClass("working");
	closeForms(rename);
});

createNote.on("click", function () {
	overlay.toggle("active");
	$("#createNoteForm").toggle("active");
})