const theNotes = function (Notes, arrTag, arrColor) {
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
	var filterTag = $("#filterTag");
	var categotyOptions = $("#filter .options");
	var filterTagOptions = $("#filterTag .options");
	var tagOptions = $("#createNoteForm select");
	var tagOptionstag = $("#createNoteForm .tags option");
	var noteTitle = $("#createNoteForm input");
	var newTags = $(".selectedTags");
	var arr, arrTagSet,
		selectedTags = [[], "<p>Tags:</p>"];
	console.log("am in 2");
	var currentBody = localStorage.getItem("currentBody");
	// $('#tagsKey .tags').append(adminTags)

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
		filterTag = $("#filterTag");
		categotyOptions = $("#filter .options");
		filterTagOptions = $("#filterTag .options");
		tagOptions = $("#createNoteForm select");
		tagOptionstag = $("#createNoteForm .tags option");
		noteTitle = $("#createNoteForm input");
		newTags = $(".selectedTags");
		console.log("am in 3");
	};

	// console.log('At top');

	const handlecreateNote = function () {
		overlay.toggle("active");
		$("#createNoteForm").toggle("active");
	};

	const handleCreate = function () {
		const noteT = $("#createNoteForm input");
		if (noteT.val() != "") {
			let note = {
				title: noteT.val(),
				date: moment().format("YYYY-MM-DD"),
				time: moment().format("HH:mm"),
				description: "",
				tags: selectedTags[0],
				category: [""],
				userId : ""
			};
			storeNote(note);
			console.log(note);
			window.location.reload();
		} else {
			console.log("No title");
			window.location.reload();
		}
	};

	const handleCreateTag = function () {
		const tagT = $("#createTagForm input");
		const tagCol = $('.dropbtn');
		if (tagT.val() != "" && tagCol.val() != ""){
			let tag = {
				name: tagT.val(),
				color: tagCol.val().toLowerCase(),
				userId: '',
				default:false
			};
			storeTag(tag);
			console.log(tag);
			window.location.reload();
		} else {
			console.log("No tag title");
			window.location.reload();
		}
	};

	const makeNotes = function (Notes) {
		$("#mainBody").removeClass("grid_mainBody");
		$("#mainBody").removeClass("block_mainBody");
		$("#mainBody").addClass(currentBody);
		if (currentBody.includes("reverse")) {
			Notes = Notes.reverse();
		}
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

		console.log(tagSet);
		arrTagSet = [...tagSet];
		let j = 0;
		for (const cate of arrTagSet) {
			tags += newTagSort(cate, j, arrTag);
			j++;
		}
		filterTag.children("#select").append(tags);
		filterTag.innerWidth(filterTag.children("#select").innerWidth() + 20);
		filterTag.children("#select").innerWidth(filterTag.innerWidth());

		// let j = 0
		for (const cate of arrTag) {
			tagSelect += newTagSelect(cate.name, cate.color);
		}
		tagOptions.append(tagSelect);
		for (const col of arrColor) {
			colorSelect += newColorSelect(col.name);
		}
		$('.dropdown-content').append(colorSelect);
		// categorySelect.parent().innerWidth(categorySelect.innerWidth() + 16)
		// console.log(categotyOptions);
		getAll();
	};

	makeNotes(Notes);

	const makeTags = function (arrTag) {
		for (const iterator of arrTag) {
			$('#tagsKey .tags').append(
				tagKeys(
					iterator.name,
					iterator.color,
				)
			);
		}
	}

	makeTags(arrTag)

	noteHeight = notes.eq(0).height();
	notes_opt.css("bottom", `${-1 * noteHeight}px`); // positions the note-option someway below the note

	const closeForms = function (ele) {
		ele.toggle("active");
		overlay.toggle("active");
	};

	function filterColor(searchTerm) {
		$(".dropdown-content .cols").each(function () {
			var text = $(this).text().toLowerCase();
			if (text.includes(searchTerm)) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	}

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

	function filterByTag(searchTerm) {
		$("#mainBody .notes").each(function () {
			var opts = $(this).children(".notesBottom").children(".details").children(".tags").children("div");
			console.log(opts);
			for (const opt of opts) {
				console.log($(opt));
				var text = $(opt).attr('col').toLowerCase();
				console.log(text);
				if (searchTerm == "all tags") {
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

	const clickOnTag = function () {
		filterTagOptions.on("click", function () {
			// console.log("am in");
			// console.log($(this).attr('index'));
			let temp = arrTagSet[$(this).attr("index")];
			arrTagSet[$(this).attr("index")] = arrTagSet[0];
			arrTagSet[0] = temp;

			// console.log(arr);

			let i = 0;
			tags = "";
			for (const cate of arrTagSet) {
				tags += newTagSort(cate, i);
				i++;
			}
			console.log($(this).children("p").text().toLowerCase());
			var searchTerm = $(this).children("p").text().toLowerCase();
			filterByTag(searchTerm);
			// console.log($(this));
			filterTag.children("#select").children(".options").remove();
			filterTag.children("#select").append(tags);

			filterTagOptions = $(".options");
			// console.log(categotyOptions);
			clickOnTag();
		});
	};

	clickOnTag();

	const assignTags = function (array, col) {
		var there = array.filter((element) => element == col);
		// console.log(there);
		if (there.length == 0) {
			selectedTags[0].push(col);
			selectedTags[1] += newTag(col);
			newTags.empty();
			newTags.append(selectedTags[1]);
		} else {
			selectedTags[0].splice(selectedTags[0].indexOf(col), 1);
			selectedTags[1] = "<p>Tags:</p>";
			for (const iterator of selectedTags[0]) {
				selectedTags[1] += newTag(iterator);
			}
			newTags.empty();
			newTags.append(selectedTags[1]);
		}
		tagOptions.val("");
	};

	tagOptions.on("change", function () {
		// console.log($(this).val());
		// assignTags(selectedTags[0], $(this).val());
	});
	tagOptions.on("click", function () {
		console.log($(this).val());
		if ($(this).val() != "") assignTags(selectedTags[0], $(this).val());
	});

	filter.on("click", function () {
		// console.log($(this).children('#select').children('.options'));
		// console.log(`categories: ${categories}`);
		$(this).toggleClass("choosing");
	});

	filterTag.on("click", function () {
		// console.log($(this).children('#select').children('.options'));
		// console.log(`categories: ${categories}`);
		$(this).toggleClass("choosing");
	});

	switcher.eq(0).on("click", function () {
		$("#mainBody").toggleClass("reverse");
		localStorage.setItem("currentBody", $("#mainBody").attr("class"));
		window.location.reload();
	});

	switcher.eq(1).on("click", function () {
		$("#mainBody").toggleClass("grid_mainBody");
		$("#mainBody").toggleClass("block_mainBody");
		localStorage.setItem("currentBody", $("#mainBody").attr("class"));
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

	$(".dropbtn").on("input", function () {
		// console.log($(this).val().toLowerCase());
		var searchTerm = $(this).val().toLowerCase();
		filterColor(searchTerm);
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
		updateNote($(".working").attr("val"), rename.children("input").val());
		$(".working").removeClass("working");
		closeForms(rename);
	});

	delDelete.on("click", function () {
		// delNote(noteWeOn.attr("val"))
		deleteNote(Number($(".working").attr("val")));
		window.location.reload();
	});

	// createNote.on("click", function () {
	// 	handlecreateNote()
	// });

	$("#cancel").on("click", function () {
		handlecreateNote();
	});

	$("#create").on("click", function () {
		handleCreate();
	});

	$(".dropdown-content .cols").on('click', function () {
		$('.dropbtn').css('background-color', $(this).attr('value'));
		$('.dropbtn').val($(this).attr('value'));
		// $(this).children('p').css('color', $(this).attr('value'));
		// $(this).children('p').css("filter", "invert(1)");
	})

	$('#tagCreate').on('click', function () {
		handleCreateTag();
	})

	$('#noteContent .back').on('click', function () {
		$('#noteContent').toggle('active');
		$('#overlay').toggle('active');
	})

	$('.notes').on('click', function (e){
		let clas = e.target.getAttribute("class")
		console.log(clas);
		if (clas.includes("dots") || clas.includes("dot")) return;
		let val = $(this).attr('val')
		console.log(val);
		let note = Notes.find(note => note.id == val);
		console.log(note);
		$('#noteContent textarea').val('')
		$('#noteContent textarea').val(note.description)
		$('#noteContent textarea').attr('val', val)
		$('#noteContent').toggle('active');
		$('#overlay').toggle('active');
	})

	$('#noteContent .done').on('click', function () {
		let val = $('#noteContent textarea').attr('val')
		console.log(val);
		let note = Notes.find(note => note.id == val);
		console.log(note);
		note.description = $('#noteContent textarea').val()
		updateNoteDescription(note)
		$('#noteContent').toggle('active');
		$('#overlay').toggle('active');
		console.log(note);
	})
};
