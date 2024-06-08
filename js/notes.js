const theNotes = function (Notes, arrTag) {
	// console.log(Notes);
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
	var delDelete = $("#delDelete");
	var overlay = $("#overlay");
	var currentlyUpdating;
	var createNote = $("#createNote");
	var filter = $("#filter");
	var categotyOptions = $(".options");
	var tagOptions = $("#createNoteForm select");
	var tagOptionstag = $("#createNoteForm .tags option");
	var noteTitle = $("#createNoteForm input");
	var newTags = $(".selectedTags");
	var arr,
		selectedTags = [[], "<p>Tags:</p>"];
	console.log("am in 2");

	const getAll = function () {
		body = $("body");
		mainBody = $("#mainBody");
		switcher = $("#svgs svg");
		notes = $(".notes");
		dots = $(".notes .dots");
		notes_opt = $(".notes .note_option");
		notes_opt_ren = $(".notes .note_option div");
		rename = $("#rename");
		renameCancel = $("#renCancel");
		renameUpdate = $("#renUpdate");
		del = $("#delete");
		delCancel = $("#delCancel");
		delDelete = $("#delDelete");
		overlay = $("#overlay");
		createNote = $("#createNote");
		filter = $("#filter");
		categotyOptions = $(".options");
		tagOptions = $("#createNoteForm select");
		tagOptionstag = $("#createNoteForm .tags option");
		noteTitle = $("#createNoteForm input");
		newTags = $(".selectedTags");
		console.log("am in 3");
	};

	// console.log('At top');

	const handlecreateNote = function(){
		overlay.toggle("active");
		$("#createNoteForm").toggle("active");
	}

	const handleCreate = function () {
		const noteT = $("#createNoteForm input"); 
		if (noteT.val() != "") {
			let note = {
				title: noteT.val(),
				date: moment().format("YYYY-MM-DD"),
				time: moment().format("HH:mm"),
				description: "",
				tags: selectedTags[0],
				category: [''],
			};
			storeNote(note);
			console.log(note);
			window.location.reload();
		} else{ 
			console.log("No title")
			window.location.reload();
		};
	};

	const makeNotes = function (Notes) {
		for (const iterator of Notes) {
			mainBody.append(
				newNote(
					iterator.id,
					iterator.title,
					iterator.date,
					iterator.time,
					iterator.tags,
					iterator.category
				)
			);
		}
		// console.log(arr);
		arr = [...catSet];
		let i = 0;
		for (const cate of arr) {
			categories += newCat(cate, i);
			i++;
		}
		filter.children("#select").append(categories);
		filter.innerWidth(filter.children("#select").innerWidth() + 16);
		filter.children("#select").innerWidth(filter.innerWidth());

		// let j = 0
		for (const cate of arrTag) {
			tagSelect += newTagSelect(cate.name, cate.color);
		}
		tagOptions.append(tagSelect);
		// categorySelect.parent().innerWidth(categorySelect.innerWidth() + 16)
		// console.log(categotyOptions);
		getAll();
	};

	makeNotes(Notes);

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

	function filterByCat(searchTerm) {
		$("#mainBody .notes").each(function () {
			var opts = $(this).children(".selfTags").children("div");
			console.log(opts);
			for (const opt of opts) {
				console.log($(opt));
				var text = $(opt).children("p").text().toLowerCase();
				console.log(text);
				if (searchTerm == "all") {
					$(this).show();
					return;
				} else if (text.includes(searchTerm)) {
					$(this).show();
					return;
				}
			}
			$(this).hide();
		});
	}

	var noteOptionOnSite = function () {
		for (const iterator of notes_opt) {
			if (iterator.classList.contains("hidden")) continue;
			else return true;
		}
		return false;
	};

	const clickOnNote = function () {
		categotyOptions.on("click", function () {
			// console.log("am in");
			// console.log($(this).attr('index'));
			let temp = arr[$(this).attr("index")];
			arr[$(this).attr("index")] = arr[0];
			arr[0] = temp;

			// console.log(arr);

			let i = 0;
			categories = "";
			for (const cate of arr) {
				categories += newCat(cate, i);
				i++;
			}
			console.log($(this).children("p").text().toLowerCase());
			var searchTerm = $(this).children("p").text().toLowerCase();
			filterByCat(searchTerm);
			// console.log($(this));
			filter.children("#select").children(".options").remove();
			filter.children("#select").append(categories);

			categotyOptions = $(".options");
			// console.log(categotyOptions);
			clickOnNote();
		});
	};

	clickOnNote();

	const assignTags = function (array, col) {
		var there = array.filter((element) => element == col);
		// console.log(there);
		if (there.length == 0) {
			selectedTags[0].push(col);
			selectedTags[1] += newTag(col);
			newTags.empty();
			newTags.append(selectedTags[1]);
		}
	};

	tagOptions.on("change", function () {
		// console.log($(this).val());
		assignTags(selectedTags[0], $(this).val());
	});

	filter.on("click", function () {
		// console.log($(this).children('#select').children('.options'));
		// console.log(`categories: ${categories}`);
		$(this).toggleClass("choosing");
	});

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
		// console.log($(this).val().toLowerCase());
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
		console.log($(".working").attr("val"));
		updateNote($(".working").attr("val"),rename.children("input").val())
		$(".working").removeClass("working");
		closeForms(rename);
	});

	delDelete.on("click", function () {
		// delNote(noteWeOn.attr("val"))
		deleteNote(Number($(".working").attr("val")));
		window.location.reload();
	});

	createNote.on("click", function () {
		handlecreateNote()
	});

	$('#cancel').on("click", function () {
		handlecreateNote()
	});

	$("#create").on("click", function () {
		handleCreate();
	});
};
