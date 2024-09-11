$(document).ready(function () {
  let code = "";
  function cargaDatos() {
    // const alto = window.innerWidth;

    // $("#alto").text(alto);

    const codeValue = document.getElementById("code").value;
    code = codeValue;
    // Crear una instancia de QRious
    var qr = new QRious({
      element: document.getElementById("qr-code"),
      value: codeValue,
      size: 150,
      level: "H", // Nivel de corrección de errores (L, M, Q, H)
    });

    $.ajax({
      type: "POST",
      url: "_ajax/_ajax.php",
      async: true,
      data: {
        obtenerInfoInvitados: 1,
        code: codeValue,
      },
      success: function (data) {
        const jsonData = JSON.parse(data); // Decodificar el JSON
        let totalInvitados = jsonData[0].cantidad;
        let cadenaNombre = "";
        if (jsonData[0].esFamilia == 1) {
          cadenaNombre = jsonData[0].nombre;
        } else {
          if (totalInvitados == 1) {
            cadenaNombre = jsonData[0].nombre + " " + jsonData[0].App;
            // listaNombres.push(cadenaNombre);
          } else {
            cadenaNombre = concatenateArray(jsonData, "nombre", "App");
          }
        }

        $("#nombreInvitados").text(cadenaNombre);

        $("#num-pases").text(totalInvitados);
      },
      error: function (xhr, status, error) {
        console.log("Error sending data: " + error);
      },
    });
  }

  cargaDatos();

  function confirmacionAsistencia(asistentes) {

    $.ajax({
      type: "POST",
      url: "_ajax/_ajax.php",
      data: {
        guardarAsistenciaInvitados: 1,
        lista: asistentes,
      },
      success: function (data) {
        window.location.href = data;

    
      },
      error: function (xhr, status, error) {
        console.log("Error sending data: " + error);
      },
    });
  }

  // Al hacer clic en el botón, se abrirá el modal con los nombres de la lista
  document
    .getElementById("confirmacion")
    .addEventListener("click", function () {
      buscarNombres();
    });

  function copyText(id) {
    let elem = document.getElementById(id);
    if (elem) {
      let text = elem.textContent || elem.innerText;

      // Intentar copiar con la API moderna del portapapeles
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            alert(`Clabe Interbancaria copiada: ${text}`);
          })
          .catch((err) => {
            console.error("Error al copiar al portapapeles: ", err);
            fallbackCopyTextToClipboard(text);
          });
      } else {
        // Si la API moderna no está disponible, usar el método alternativo
        fallbackCopyTextToClipboard(text);
      }
    } else {
      console.error("Elemento no encontrado");
    }
  }

  function fallbackCopyTextToClipboard(text) {
    // Crear un elemento de texto temporal
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Evitar desplazamiento de la página
    document.body.appendChild(textArea);
    textArea.select();

    try {
      let successful = document.execCommand("copy");
      if (successful) {
        alert(`Clabe Interbancaria copiada: ${text}`);
      } else {
        console.error("No se pudo copiar el texto usando execCommand.");
      }
    } catch (err) {
      console.error(
        "Error al copiar al portapapeles con el método alternativo: ",
        err
      );
    }

    // Limpiar el área de texto
    document.body.removeChild(textArea);
  }
  function buscarNombres() {
    $.ajax({
      type: "POST",
      url: "_ajax/_ajax.php",
      data: {
        obtenerNombresFamilia: 1,
        code: code,
      },
      success: function (data) {
        const jsonData = JSON.parse(data); // Decodificar el JSON
        let listaNombres = [];
        jsonData.forEach((item) => {
          listaNombres.push({
            nombre: item.nombre,
            apellido: item.App,
            codigo: item.codigo,
          }); // Agregar nombre y apellido al arreglo
        });

        abrirModalConNombres(listaNombres);
      },
      error: function (xhr, status, error) {
        console.log("Error sending data: " + error);
      },
    });
  }

  function abrirModalConNombres(nombres) {
    // Generar HTML dinámico basado en la lista de nombres, los checks estarán marcados por defecto

    let checkboxesHtml = "";
    nombres.forEach((nombre, index) => {
      checkboxesHtml += `
    <label>
      <input type="checkbox" id="nom-${nombre.codigo}-${nombre.nombre}" checked> ${nombre.nombre} ${nombre.apellido} 
    </label><br>
  `;
    });
    let asistentes = [];
    // Abrir el modal de SweetAlert2
    Swal.fire({
        title: "¿Asistirá a la boda?",
        html: `
          <div style="text-align: left;">
            ${checkboxesHtml}
            <p style="font-size: 12px; margin-top: 10px;">
              En caso de no poder asistir, quita la marca del nombre. 
              Ten en cuenta que el pase no se puede ceder a otro.
            </p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6", // Botón azul
        cancelButtonColor: "#d33", // Botón rojo
        preConfirm: () => {
            const asistentesObj = {};
            nombres.forEach((nombre, index) => {
              const checkboxId = `nom-${nombre.codigo}-${nombre.nombre}`;
              const isChecked = document.getElementById(checkboxId).checked;
              asistentesObj[`${nombre.codigo}-${nombre.nombre}-${nombre.app}`] = {
                codigo: nombre.codigo,
                nombre: nombre.nombre,
                app: nombre.apellido,
                estatus: isChecked ? "confirmado" : "rechazado"
              };
              asistentes.push({ // Agregar el objeto al arreglo asistentes
                codigo: nombre.codigo,
                nombre: nombre.nombre,
                app: nombre.apellido,
                estatus: isChecked ? "confirmado" : "rechazado"
              });
            });
            // ...
            return asistentesObj;
          },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Confirmación aceptada",
            text: "Se abrirá su WhatsApp para confirmar su asistencia con la organizadora del evento.",
            showConfirmButton: false,
            timer: 4500,
            willClose: () => {
              confirmacionAsistencia(result.value);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelado", "No asistirá a la boda", "error");
        }
      });
  }

  function concatenateArray(arr, nombre, app) {
    if (arr.length === 0) return "";
    if (arr.length === 1) return `${arr[0][nombre]} ${arr[0][app]}`;

    let result = "";
    for (let i = 0; i < arr.length - 1; i++) {
      result += `${arr[i][nombre]} ${arr[i][app]}${
        i === arr.length - 2 ? " y " : ", "
      }`;
    }
    result += `${arr[arr.length - 1][nombre]} ${arr[arr.length - 1][app]}`;

    return result;
  }

  function pixelsToRem(px) {
    const rootFontSize = 16; // assuming 16px as the root font size
    return `${px / rootFontSize}`;
  }
});
