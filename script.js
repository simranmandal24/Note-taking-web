// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Navigate to specific sections
function navigateTo(section) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach(sec => sec.style.display = "none");
    document.getElementById(section).style.display = "block";

    // Automatically close the sidebar after selection
    toggleSidebar();
}

// Render notes from localStorage
function renderNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = ""; // Clear the current list
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
            <textarea class="note-text">${note.text}</textarea>
            <div class="note-buttons">
                <button class="delete-btn" onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;

        const textArea = noteDiv.querySelector(".note-text");
        textArea.addEventListener("input", () => saveNote(index, textArea.value));

        notesList.appendChild(noteDiv);
    });
}

// Add a new note
function addNote() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ text: "" });
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

// Save a note
function saveNote(index, text) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[index].text = text;
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Delete a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

// Load notes on page load
window.onload = function () {
    renderNotes();
};







// Function to render all notebooks
function renderNotebooks() {
    const notebooksContainer = document.getElementById("notebooks-container");
    notebooksContainer.innerHTML = "";

    const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];

    notebooks.forEach((notebook, index) => {
        const notebookDiv = document.createElement("div");
        notebookDiv.classList.add("notebook");
        notebookDiv.innerHTML = `
            <h3>${notebook.name}</h3>
            <button onclick="deleteNotebook(${index})">Delete</button>
        `;
        notebookDiv.addEventListener("click", () => openNotebook(index));
        notebooksContainer.appendChild(notebookDiv);
    });
}

// Add a new notebook
function addNotebook() {
    const notebookName = prompt("Enter notebook name:");
    if (notebookName) {
        const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
        notebooks.push({ name: notebookName, entries: [] });
        localStorage.setItem("notebooks", JSON.stringify(notebooks));
        renderNotebooks();
    }
}

// Delete a notebook
function deleteNotebook(index) {
    const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
    notebooks.splice(index, 1);
    localStorage.setItem("notebooks", JSON.stringify(notebooks));
    renderNotebooks();
}

// Open a specific notebook
function openNotebook(index) {
    const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
    const notebook = notebooks[index];

    document.getElementById("notebook-title").textContent = notebook.name;
    document.querySelector(".notebook-section").style.display = "none";
    document.querySelector(".entries-section").style.display = "block";

    // Store the current notebook index
    localStorage.setItem("currentNotebookIndex", index);

    renderEntries(notebook.entries);
}

// Render entries in a notebook
function renderEntries(entries) {
    const entriesContainer = document.getElementById("entries-container");
    entriesContainer.innerHTML = "";

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
            <h4>${entry.title || "Untitled"}</h4>
            <p>${entry.content.slice(0, 50)}...</p>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        entryDiv.addEventListener("click", () => editEntry(index));
        entriesContainer.appendChild(entryDiv);
    });
}

