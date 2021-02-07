console.log("Welcome to this notes app.");

/*

=> Features that can be added
#1. Title of the note
#2. A username attached with every note.
#3. Highligh important notes in specific color features.
#4. Sync and host to a webserver.

*/

// => Function to display all the notes.
function showNotes() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObject = [];
    }
    else {
        notesObject = JSON.parse(notes);
    }

    let html = "";

    notesObject.forEach(function (element, index) {

        html += `
            <div class="my-2 mx-2 card noteCards" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title"> ${element.title}</h5>
                  <p class="card-text"> ${element.text} </p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-small btn-primary">Delete</button>
                </div>
              </div>`;

    });

    let notesToDisplay = document.getElementById('notes');
    if (notesObject.length != 0) {
        notesToDisplay.innerHTML = html;
    }
    else {
        notesToDisplay.innerHTML = `No notes were to be found! Please add your first note.`
    }

}

// => Function to delete a Note

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObject = [];
    }
    else {
        notesObject = JSON.parse(notes);
    }
    notesObject.splice(index, 1); // -> This will delete one element referring to the index we provide him.
    localStorage.setItem("notes", JSON.stringify(notesObject)); // -> will affect your localStorage globally ie; change will sustain this time.
    showNotes();
}

// => If a user adds a note, we'll add it to the local storage.

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    }
    else {
        notesObject = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObject.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObject);
    showNotes(); // => Will Refresh the note list section of the page if you add a note.
});

showNotes();

// => Implimenting the search feature
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function () {
    let inputVal = searchTxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCards");

    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    });

});