const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.textContent = "Obrigado! Em breve enviaremos a apresentação completa.";
    form.reset();
  });
}
