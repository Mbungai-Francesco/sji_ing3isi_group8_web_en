// Open a connection to the IndexedDB database
const request = indexedDB.open('MyNotesDB', 1);

// Create the object store and define the object's structure
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('title', 'title', { unique: true });
    objectStore.createIndex('description', 'description', { unique: false });
    objectStore.createIndex('tags', 'tags', { unique: false });
    objectStore.createIndex('date', 'date', { unique: false });
    objectStore.createIndex('time', 'time', { unique: false });
};

// Handle successful database connection
request.onsuccess = function(event) {
    const db = event.target.result;

    // Add a new note to the database
    function addNote(note) {
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');
        const request = objectStore.add(note);

        request.onsuccess = function(event) {
            console.log('Note added to the database');
        };

        request.onerror = function(event) {
            console.error('Error adding note to the database');
        };
    }

    // Retrieve all notes from the database
    function getAllNotes() {
        const transaction = db.transaction(['notes'], 'readonly');
        const objectStore = transaction.objectStore('notes');
        const request = objectStore.getAll();

        request.onsuccess = function(event) {
            const notes = event.target.result;
            console.log('All notes:', notes);
        };

        request.onerror = function(event) {
            console.error('Error retrieving notes from the database');
        };
    }

    // Update a note in the database
    function updateNote(id, updatedNote) {
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');
        const request = objectStore.get(id);

        request.onsuccess = function(event) {
            const note = event.target.result;
            if (note) {
                const updatedObject = Object.assign({}, note, updatedNote);
                const updateRequest = objectStore.put(updatedObject, id);

                updateRequest.onsuccess = function(event) {
                    console.log('Note updated in the database');
                };

                updateRequest.onerror = function(event) {
                    console.error('Error updating note in the database');
                };
            } else {
                console.error('Note not found in the database');
            }
        };

        request.onerror = function(event) {
            console.error('Error retrieving note from the database');
        };
    }

    // Delete a note from the database
    function deleteNote(id) {
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');
        const request = objectStore.delete(id);

        request.onsuccess = function(event) {
            console.log('Note deleted from the database');
        };

        request.onerror = function(event) {
            console.error('Error deleting note from the database');
        };
    }

    // Usage example
    const note = {
        title: 'My First Note',
        description: 'This is a sample note',
        tags: ['important', 'casual', 'hobby']
    };

    addNote(note);
    getAllNotes();
};

// Handle database connection errors
request.onerror = function(event) {
    console.error('Error opening the database');
};