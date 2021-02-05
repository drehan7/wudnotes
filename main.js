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
    }
})




// --------------------------------
function postNote() {
    let noteTitle = document.querySelector(".new-note-title").value;
    let noteBody = document.querySelector(".new-note-input").value;

    if (noteTitle.length > 1 || noteBody.length > 1) {
        fetch (baseNotesURL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: noteTitle,
                body: noteBody
            })})
            .then(res => res.json())
            .then(data => {
                renderNote(data)
            })
        }
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
    const listDiv = document.createElement("div");
    listDiv.className = "note"
    listDiv.id = note.id;
    const delButton = document.createElement("button");
    delButton.className = "delete-note-button";
    delButton.innerHTML = "Delete Note"
    const title = document.createElement("p")
    title.className = 'note-title'
    title.innerHTML = note.title;
    const noteBody = document.createElement('p');
    noteBody.className = 'note-body'
    noteBody.innerHTML = note.body;
    let editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = "Edit";



    listDiv.appendChild(title);
    listDiv.appendChild(noteBody);
    listDiv.appendChild(delButton);
    listDiv.appendChild(editButton);

    mainContainer.appendChild(listDiv);
}