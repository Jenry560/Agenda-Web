document.addEventListener("DOMContentLoaded", () => {
  const contactosDiv = document.getElementById("contactos");
  const nuevoContactoForm = document.getElementById("nuevoContacto");

  async function cargarContactos() {
    const contactos = await response.json();

    contactosDiv.INNERhtml = "";

    contactos.forEach((contacto) => {
      const contactoDiv = document.createElement("div");
      contactoDiv.innerHTML = `
         <p><strong>${contacto.nombre} ${contacto.apellido}</strong></p>
         <p>Telefono: ${contacto.telefono}</p>
         `;
      contactosDiv.appendChild(contactoDiv);
    });
  }
  async function agregarContacto(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;

    const nuevoContacto = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
    };

    const response = await fetch("http://www.raydelto.org/agenda.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoContacto),
    });

    if (response.ok) {
      cargarContactos();
      nuevoContactoForm.reset();
      alert("Contacto guardado correctamente.");
    } else {
      alert("Error al guardar el contacto.");
    }
  }

  cargarContactos();
  nuevoContactoForm.addEventListener("submit", agregarContacto);
});
