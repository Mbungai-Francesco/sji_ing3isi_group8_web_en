// Open a connection to the IndexedDB database
const request = indexedDB.open("myMEMORYDB", 1);

// Create the object store and define the object's structure
request.onupgradeneeded = function (event) {
	const db = event.target.result;
	const objectStore = db.createObjectStore("notes", {
		keyPath: "id",
		autoIncrement: true,
	});
	objectStore.createIndex("title", "title", { unique: true });
	objectStore.createIndex("date", "date", { unique: false });
	objectStore.createIndex("time", "time", { unique: false });
	objectStore.createIndex("description", "description", { unique: false });
	objectStore.createIndex("tags", "tags", { unique: false });
	objectStore.createIndex("category", "category", { unique: false });

	const dbTags = event.target.result;
	const objectStoreTags = dbTags.createObjectStore("tags", {
		keyPath: "id",
		autoIncrement: true,
	});
	objectStoreTags.createIndex("tagName", "tagName", { unique: true });
	objectStoreTags.createIndex("color", "color", { unique: true });
};

// Handle successful database connection

request.onsuccess = function (event) {
  var appNotes = [], appTags = [];
	console.log(event);
	const db = event.target.result;

	// Add a new note to the database
	function addNote(note) {
		const transaction = db.transaction(["notes"], "readwrite");
		const objectStore = transaction.objectStore("notes");
		const request = objectStore.add(note);

		request.onsuccess = function (event) {
			console.log("Note added to the database");
		};

		request.onerror = function (event) {
			console.error("Error adding note to the database");
		};
	}

	// Retrieve all notes from the database
	function getAllNotes() {
		const transaction = db.transaction(["notes"], "readonly");
		const objectStore = transaction.objectStore("notes");
		const request = objectStore.getAll();

		request.onsuccess = function (event) {
			const notes = event.target.result;
			// console.table(notes);
			appNotes = notes;
			let promise = new Promise(function (resolve, reject){
				resolve(appNotes)
				// if (appTags.length>0 && appNotes.length>0) {
				// 	resolve(appNotes)
				// }
			})
			promise.then(
				result => console.log(result)
			)
			// console.table(appNotes);
			// return notes
		};

		request.onerror = function (event) {
			console.error("Error retrieving notes from the database");
		};
	}

	function addTags(tag) {
		const transaction = db.transaction(["tags"], "readwrite");
		const objectStore = transaction.objectStore("tags");
		const request = objectStore.add(tag);

		request.onsuccess = function (event) {
			console.log("Tag added to the database");
		};

		request.onerror = function (event) {
			console.error("Error adding note to the database");
		};
	}

	function getAllTags() {
		const transaction = db.transaction(["tags"], "readonly");
		const objectStore = transaction.objectStore("tags");
		const request = objectStore.getAll();

		request.onsuccess = function (event) {
			const tags = event.target.result;
			// console.table(tags);
			appTags = tags;
			let promise = new Promise(function (resolve, reject){
				resolve(appTags)
				// if (appTags.length>0 && appNotes.length>0) {
				// 	resolve(appNotes)
				// }
			})
			promise.then(
				result => theNotes(appNotes, appTags)
			)
			// console.log(appTags);
			// return tags
		};

		request.onerror = function (event) {
			console.error("Error retrieving tags from the database");
		};
	}
	// for (const iterator of Notes) {
	//     addNote(iterator)
	// }
	// for (const iterator of arrTag) {
	//     addTags(iterator)
	// }

	// addNote(Notes);
	$("#create").on("click", function () {
		if (noteTitle.val() != "") {
			let note = {
				title: noteTitle.val(),
				date: moment().format("YYYY-MM-DD"),
				time: moment().format("HH:mm"),
				description: "Annual check-up",
				tags: selectedTags[0],
				category: ["Health", "Personal"],
			};
			console.log(note.title);
			console.log(note.tags);
			console.log(note.date);
			console.log(note.time);
		} else console.log("No title");
	});
	getAllNotes();
	getAllTags();
	// theNotes(appNotes, appTags);
	// console.table(Notes);
	// console.table(arrTag);
	// Notes = sortNotes(Notes)
	// console.log(Notes);
};

// Handle database connection errors
request.onerror = function (event) {
	console.error("Error opening the database");
};
