// Open a connection to the IndexedDB database
const request = indexedDB.open("myMEMORYDB", 1);

var storeNote;
var getNote_id;
var deleteNote;
var updateNote;
var updateNoteDescription;
var storeTag;
var deleteTag;
var updateTag;

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
	objectStoreTags.createIndex("name", "name", { unique: true });
	objectStoreTags.createIndex("color", "color", { unique: true });
};

// Handle successful database connection

const onStartUp = function () {
	console.log("am first in app");
	request.onsuccess = function (event) {
		var appNotes = [],
			appTags = [];
		console.log(event);
		const db = event.target.result;

		function addNote(note) {
			const noteTransaction = db.transaction(["notes"], "readwrite");
			const notesStore = noteTransaction.objectStore("notes");
			const request = notesStore.put(note);

			request.onsuccess = function (event) {
				console.log("Note added to the database");
			};

			request.onerror = function (event) {
				console.error("Error adding note to the database");
			};
		}

		function delNote(note) {
			const noteTransaction = db.transaction(["notes"], "readwrite");
			const notesStore = noteTransaction.objectStore("notes");
			const request = notesStore.delete(note);

			request.onsuccess = function (event) {
				console.log("Note deleted from database");
			};

			request.onerror = function (event) {
				console.error("Error deleting note from database");
			};
		}

		function getNote(id) {
			const noteTransaction = db.transaction(["notes"], "readwrite");
			const notesStore = noteTransaction.objectStore("notes");
			const request = notesStore.get(id);

			request.onsuccess = function (event) {
				console.log(event.target.result);
				return event.target.result;
			};

			request.onerror = function (e) {
				console.log("Error", e.target.error.name);
			};
		}

		// Retrieve all notes from the database
		function getAllNotes() {
			const noteTransaction = db.transaction(["notes"], "readwrite");
			const notesStore = noteTransaction.objectStore("notes");
			const request = notesStore.getAll();

			request.onsuccess = function (event) {
				const notes = event.target.result;
				// console.table(notes);
				appNotes = sortNotes(notes, "date");
				// console.log(appNotes);
				let promise = new Promise(function (resolve, reject) {
					resolve(appNotes);
					// if (appTags.length>0 && appNotes.length>0) {
					// 	resolve(appNotes)
					// }
				});
				promise.then((result) => {
					console.log(result);
					getAllTags();
				});
				// console.table(appNotes);
				// return notes
			};

			request.onerror = function (event) {
				console.error("Error retrieving notes from the database");
			};
		}

		function addTags(tag) {
			const tagTransaction = db.transaction(["tags"], "readwrite");
			const tagStore = tagTransaction.objectStore("tags");
			const request = tagStore.add(tag);

			request.onsuccess = function (event) {
				console.log("Tag added to the database");
			};

			request.onerror = function (event) {
				console.error("Error adding note to the database");
			};
		}

		function getAllTags() {
			const tagTransaction = db.transaction(["tags"], "readwrite");
			const tagStore = tagTransaction.objectStore("tags");
			const request = tagStore.getAll();

			request.onsuccess = function (event) {
				const tags = event.target.result;
				// console.table(tags);
				appTags = tags;
				let promise = new Promise(function (resolve, reject) {
					resolve(appTags);
					// if (appTags.length>0 && appNotes.length>0) {
					// 	resolve(appNotes)
					// }
				});
				promise.then((result) => {
					console.log(result);
					theNotes(appNotes, appTags, arrColor);
				});
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
		storeNote = function (param) {
			console.log("am in storeNote");
			addNote(param);
		};
		getNote_id = function (param) {
			console.log("am in getNote_id");
			getNote(param);
		};
		storeTag = function (param) {
			console.log("am in storeTag");
			addTags(param);
		};
		deleteNote = function (param) {
			console.log("in del");
			delNote(param);
		};
		updateNote = function (id, title) {
			appNotes.forEach((element) => {
				if (element.id == id) {
					element.title = title;
					console.log(element);
					addNote(element);
				}
			});
		};
		updateNoteDescription = function (note) {
			addNote(note);
		};
		storeTag({ name: "Important", color: "red" });
		storeTag({ name: "Casual", color: "green" });
		storeTag({ name: "Daily", color: "yellow" });
		getAllNotes();

		// theNotes(appNotes, appTags);
		// console.table(Notes);
		// console.table(arrTag);
		// Notes = sortNotes(Notes)
		// console.log(Notes);
		console.log("am in app");
	};

	// Handle database connection errors
	request.onerror = function (event) {
		console.error("Error opening the database");
	};
};

onStartUp();

// storeNote = function (param) {
// 	console.log('am in storeNote');
// 	request.onsuccess = function (event) {
// 		const db = event.target.result;
// 		const noteTransaction = db.transaction(["notes"], "readwrite");
// 		const notesStore = noteTransaction.objectStore("notes");
// 		// Add a new note to the database
// 		function addNote(note) {
// 			const request = notesStore.add(note);

// 			request.onsuccess = function (event) {
// 				console.log("Note added to the database");
// 			};

// 			request.onerror = function (event) {
// 				console.error("Error adding note to the database");
// 			};
// 		}
// 		addNote(param);
// 	};
// };

// delNote = function (param) {
// 	console.log('in del');
// 	request.onsuccess = function (event) {
// 		console.log('in del2');
// 		const db = event.target.result;
// 		const noteTransaction = db.transaction(["notes"], "readwrite");
// 		const notesStore = noteTransaction.objectStore("notes");
// 		notesStore.delete(param);
// 	};
// };
