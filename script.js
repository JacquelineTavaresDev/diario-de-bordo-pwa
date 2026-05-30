const form = document.getElementById("entryForm");
const entriesContainer = document.getElementById("entries");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderEntries() {
  entriesContainer.innerHTML = "";

  if (entries.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nenhuma entrada cadastrada.";
    entriesContainer.appendChild(mensagem);
    return;
  }

  entries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.classList.add("entry");

    const title = document.createElement("h3");
    title.textContent = entry.title;

    const description = document.createElement("p");
    description.textContent = entry.description;

    const date = document.createElement("small");
    date.textContent = entry.date;

    const br = document.createElement("br");

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.setAttribute("aria-label", "Remover entrada");
    button.textContent = "Remover";

    button.addEventListener("click", () => {
      removeEntry(index);
    });

    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(date);
    div.appendChild(br);
    div.appendChild(button);

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

  const description = document.getElementById("description").value;

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
    navigator.serviceWorker.register("./service-worker.js")
      .then(() => {
        console.log("Service Worker registrado com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao registrar Service Worker:", error);
      });
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
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  deferredPrompt = null;

  installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
  console.log("Aplicativo instalado com sucesso.");
});
