const form = document.getElementById("entryForm");
const entriesContainer = document.getElementById("entries");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderEntries() {
  entriesContainer.innerHTML = "";

  entries.forEach((entry, index) => {
    const div = document.createElement("div");

    div.classList.add("entry");

    div.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      <small>${entry.date}</small>
      <br>
      <button
        class="delete-btn"
        aria-label="Remover entrada"
        onclick="removeEntry(${index})"
      >
        Remover
      </button>
    `;

    entriesContainer.appendChild(div);
  });
}

function removeEntry(index) {
  entries.splice(index, 1);

  saveEntries();

  renderEntries();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;

  const description =
    document.getElementById("description").value;

  const date = document.getElementById("date").value;

  const entry = {
    title,
    description,
    date
  };

  entries.push(entry);

  saveEntries();

  renderEntries();

  form.reset();
});

renderEntries();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  deferredPrompt = e;

  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

    installBtn.hidden = true;
  }
});
