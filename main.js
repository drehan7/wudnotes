/* globals moment */


const mainContainer = document.querySelector(".all-notes");
const addNoteButton = document.querySelector(".add-note");
const baseNotesURL = 'http://localhost:3000/notes/';
let form = document.querySelector('form');
// ---------------------------------------------------------------

showAllNotes();


window.addEventListener('submit', e => {
    e.preventDefault();
})


form.addEventListener('submit', e => {
    postNote();
})


document.addEventListener('click', e => {
    if (e.target.className === 'delete-note-button') {
        console.log("del button clicked")
        delNote(e.target);
    } else if (e.target.className === 'edit-button') {
        console.log("Edit button clicked", e.target.parentElement.id)
        toggleEditMode(e.target)
    } else if (e.target.className === 'edit-submit-button') {
        console.log("edit submit clicked");
    }
})





// --------------------------------
function postNote() {
    let noteTitle = document.querySelector(".new-note-title").value;
    let noteBody = document.querySelector(".new-note-input").value;
    let dateCreated = new Date();

    if (noteTitle.length > 1 || noteBody.length > 1) {
        fetch (baseNotesURL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: noteTitle,
                body: noteBody,
                date_created: moment(dateCreated).format('llll')
            })})
            .then(res => res.json())
            .then(data => {
                renderNote(data)
            })
        }

    noteTitle.value = "";
    noteBody.value = '';
}

function toggleEditMode(note) {
    let editInputblock = note.parentElement.querySelector('.edit-container');
    if (editInputblock.style.display === 'none') {
        editInputblock.style.display = 'block'
    } else {
        editInputblock.style.display = 'none'
    }

}

function editNote (note) {

}


function delNote(note) {
    const noteID = note.parentElement.id;
    fetch (baseNotesURL+noteID, {method: 'DELETE'})
        .then(() => {
            note.parentElement.remove();
        })

    showAllNotes();
}



function showAllNotes() {
    fetch (baseNotesURL)
        .then(res => res.json())
        .then(data => {
            for (let d of data) {
                renderNote(d)
            }
            console.log('notes: ', data.length)
        })


}

function renderNote(note) {
    let listDiv = document.createElement("div");
    listDiv.className = "note"
    listDiv.id = note.id;
    let delButton = document.createElement("button");
    delButton.className = "delete-note-button";
    delButton.innerHTML = "Delete Note"
    let title = document.createElement("p")
    title.className = 'note-title'
    title.innerHTML = note.title;
    let noteBody = document.createElement('p');
    noteBody.className = 'note-body'
    noteBody.innerHTML = note.body;
    let noteDate = document.createElement('p');
    noteDate.innerHTML = "Last updated: " + note.date_created



    let editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = "Edit";
    let editDiv = document.createElement('div');
    editDiv.className = 'edit-container';
    let editInput = document.createElement('input');
    editInput.className = 'edit-input';
    let editSubmit = document.createElement('button');
    editSubmit.className = 'edit-submit-button';
    editSubmit.innerHTML = "Edit Note";

    editDiv.appendChild(editInput);
    editDiv.appendChild(editSubmit);
    editDiv.style.display = 'none';



    listDiv.appendChild(title);
    listDiv.appendChild(noteDate);
    listDiv.appendChild(noteBody);
    listDiv.appendChild(delButton);
    listDiv.appendChild(editButton);
    listDiv.appendChild(editDiv);

    mainContainer.appendChild(listDiv);
}