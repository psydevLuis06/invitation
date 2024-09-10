$(document).ready(function () {
    let code = '';
    
    function cargaDatos() {

        const alto = window.innerWidth;

        $("#alto").text(alto);

        const codeValue = document.getElementById('code').value;
        code = codeValue;
        // Crear una instancia de QRious
        var qr = new QRious({
            element: document.getElementById('qr-code'),
            value: codeValue,
            size: 150,
            level: 'H'  // Nivel de corrección de errores (L, M, Q, H)
        });
    
        $.ajax({
            type: 'POST',
            url: '_ajax/_ajax.php',
            async: true,
            data: {
                obtenerInfoInvitados: 1,
                code: codeValue
            },
            success: function (data) {
                const jsonData = JSON.parse(data); // Decodificar el JSON
                let totalInvitados = jsonData[0].cantidad;
                let cadenaNombre = '';
                if(jsonData[0].esFamilia == 1){
                    cadenaNombre = jsonData[0].nombre;
                }else{
                    if(totalInvitados == 1){
                        cadenaNombre = jsonData[0].nombre + ' ' + jsonData[0].App;
                        // listaNombres.push(cadenaNombre);
                    }else{
                        cadenaNombre = concatenateArray(jsonData,"nombre", "App");
                    }
                }
            

                $("#nombreInvitados").text(cadenaNombre);

                $("#num-pases").text(totalInvitados);

              
            },
            error: function (xhr, status, error) {
                console.log('Error sending data: ' + error);
            }
        });
    }
   
    
    
//   function handleClick() {
//     const button = document.getElementById('myButton');
//     // Añadir la clase 'active' para el efecto de clic
//     button.classList.add('active');

//     // Eliminar la clase 'active' después de un pequeño retraso
//     setTimeout(() => {
//         button.classList.remove('active');
//     }, 200); // 200 ms es suficiente para simular el efecto de clic

//     const overlayDiv = document.getElementsByClassName('overlay-div')[0];
//     const tamanioSobre = document.getElementsByClassName('centered-div')[0];

//     const observer = new MutationObserver(() => {
//         if (overlayDiv.classList.contains('show')) {
//             const alto = window.innerWidth;
//             const heightContenidoPrincipal = overlayDiv.offsetHeight;
//             const heightSobre = tamanioSobre.offsetHeight;
//             let tamanioContenidoPrincipal = 0;
//             let posicionAlturaContenidoPrincipal = 0;
//             let posicionAlturaSello = 0;


            
//             $("#alto").text(alto);
//             if (alto >= 768 && alto <= 1024) {
//                 posicionAlturaContenidoPrincipal = ajusteAlturaContenidoTablets(alto, heightSobre);
//                 tamanioContenidoPrincipal = ajusteAlturaMesaRegaloTablets(alto, heightContenidoPrincipal);
//                 posicionAlturaSello = ajusteAlturaLogoTablets(alto, heightSobre);
//                 $(".circular-button").attr("style", "top: " + 60 + "% !important; width: " + 120 + "px !important;height: " + 120 + "px !important;");
//                 $(".logo-boton").attr("style", "top: " + posicionAlturaSello + "% !important;width: " + 100 + "px !important;height: " + 100 + "px !important;");

//             } else if (alto < 768) {
//                 console.log(pixelsToRem(heightContenidoPrincipal));
//                 // tamanioContenidoPrincipal = ajusteAlturaMesaRegalo(alto, heightContenidoPrincipal);
//                 posicionAlturaContenidoPrincipal = ajusteAlturaContenido(alto, heightSobre);
//                 posicionAlturaSello = ajusteAlturaLogo(alto, heightSobre);
//                 // tamanioContenidoPrincipal = pixelsToRem(bottom)-30;
//                 $(".logo-boton").attr("style", "top: " + posicionAlturaSello + "% !important;");
//             }
//             let rect ='';
//             let bottom = '';
//             // rectSobre = tamanioSobre.getBoundingClientRect();
//             // bottomSobre = rectSobre.bottom;
//             rect = overlayDiv.getBoundingClientRect();
//             bottom = (rect.bottom)-bottomSobre;
//             prueba = pixelsToRem(bottom);
//             $("#overlayDiv").css({ top: posicionAlturaContenidoPrincipal + 'px' });
//             $(".new-div").css({ top: prueba + 'rem' });
//             // $(".logo-boton").css({ top: posicionAlturaSello + '% !important' });
//             cargaDatos();


//             // const rect = overlayDiv.getBoundingClientRect();
//             // const bottom = rect.bottom;
//             console.log(`La altura del borde inferior del elemento overlayDiv es de ${bottom}px`);
//             observer.disconnect();
//         }
//     });
//     observer.observe(overlayDiv, { attributes: true });
//     setTimeout(() => {
//         button.classList.remove('active');
//         overlayDiv.classList.toggle('show');
//     }, 200);
// }



function handleClick() {
    const button = document.getElementById('myButton');

    // Añadir la clase 'active' para el efecto de clic
    button.classList.add('active');

    // Eliminar la clase 'active' después de un pequeño retraso
    setTimeout(() => {
        button.classList.remove('active');
    }, 200); // 200 ms es suficiente para simular el efecto de clic

    const overlayDiv = document.getElementsByClassName('overlay-div')[0];
    const tamanioSobre = document.getElementsByClassName('centered-div')[0];

    const observer = new MutationObserver(() => {
        if (overlayDiv.classList.contains('show')) {
            const alto = window.innerWidth;
            const heightContenidoPrincipal = overlayDiv.offsetHeight;
            const heightSobre = tamanioSobre.offsetHeight;
            let tamanioContenidoPrincipal = 0;
            let posicionAlturaContenidoPrincipal = 0;
            let posicionAlturaSello = 0;
            $("#alto").text(alto);
            if (alto >= 768 && alto <= 1024) {
                posicionAlturaContenidoPrincipal = ajusteAlturaContenidoTablets(alto, heightSobre);
                tamanioContenidoPrincipal = ajusteAlturaMesaRegaloTablets(alto, heightContenidoPrincipal);
                posicionAlturaSello = ajusteAlturaLogoTablets(alto, heightSobre);
                $(".circular-button").attr("style", "top: " + 60 + "% !important; width: " + 120 + "px !important;height: " + 120 + "px !important;");
                $(".logo-boton").attr("style", "top: " + posicionAlturaSello + "% !important;width: " + 100 + "px !important;height: " + 100 + "px !important;");

            }
            else if (alto < 768) {
                tamanioContenidoPrincipal = ajusteAlturaMesaRegalo(alto, heightContenidoPrincipal);
                posicionAlturaContenidoPrincipal = ajusteAlturaContenido(alto, heightSobre);
                posicionAlturaSello = ajusteAlturaLogo(alto, heightSobre);
                $(".logo-boton").attr("style", "top: " + posicionAlturaSello + "% !important;");
            }
            $("#overlayDiv").css({ top: posicionAlturaContenidoPrincipal + 'px' });
            $(".new-div").css({ top: tamanioContenidoPrincipal + 'px' });
            // $(".logo-boton").css({ top: posicionAlturaSello + '% !important' });
            cargaDatos()
            observer.disconnect();
        }
    });
    observer.observe(overlayDiv, { attributes: true });
    setTimeout(() => {
        button.classList.remove('active');
        overlayDiv.classList.toggle('show');
    }, 200);
}
cargaDatos();


    
    // handleClick();

    // $("#confirmacion").click(function () {

    //     Swal.fire({
    //         title: '¿Asistirá a la boda?',
    //         html: `
    //           <div style="text-align: left;">
    //             <label>
    //               <input type="checkbox" id="nombre1"> Nombre 1
    //             </label><br>
    //             <label>
    //               <input type="checkbox" id="nombre2"> Nombre 2
    //             </label>
    //           </div>
    //         `,
    //         showCancelButton: true,
    //         confirmButtonText: 'Sí',
    //         cancelButtonText: 'No',
    //         confirmButtonColor: '#3085d6', // Color azul para el botón de "Sí"
    //         cancelButtonColor: '#d33', // Color rojo para el botón de "No"
    //         preConfirm: () => {
    //             const nombre1 = document.getElementById('nombre1').checked;
    //             const nombre2 = document.getElementById('nombre2').checked;

    //             if (!nombre1 && !nombre2) {
    //                 Swal.showValidationMessage('Debes seleccionar al menos uno');
    //             }

    //             return { nombre1, nombre2 };
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire(
    //                 'Confirmado',
    //                 `Asistirán: ${result.value.nombre1 ? 'Nombre 1' : ''} ${result.value.nombre2 ? 'Nombre 2' : ''}`,
    //                 'success'
    //             );
    //         } else if (result.dismiss === Swal.DismissReason.cancel) {
    //             Swal.fire('Cancelado', 'No asistirá a la boda', 'error');
    //         }
    //     });

    //     // Swal.fire({
    //     //     title: "¿Asistirá a la boda?",
    //     //     // text: "A continuación se abrirá WhatsApp para confirmar asistencia",
    //     //     icon: "info",
    //     //     showCancelButton: true,
    //     //     confirmButtonColor: "#3085d6",
    //     //     cancelButtonColor: "#d33",
    //     //     confirmButtonText: "Si",
    //     //     cancelButtonText: "No"
    //     // }).then((result) => {
    //     //     if (result.isConfirmed) {
    //     //         Swal.fire({
    //     //             position: "center",
    //     //             icon: "success",
    //     //             title: "Confirmación aceptada",
    //     //             text: "Se abrirá su WhatsApp para confirmar su asistencia con la organizadora del evento.",
    //     //             showConfirmButton: false,
    //     //             timer: 4500,
    //     //             willClose: () => {
    //     //                 confirmacionAsistencia();
    //     //             }
    //     //         });
    //     //     }
    //     // });

    //     //         const { value: formValues } = await Swal.fire({
    //     //   title: "Multiple inputs",
    //     //   html: `
    //     //     <input id="swal-input1" class="swal2-input">
    //     //     <input id="swal-input2" class="swal2-input">
    //     //   `,
    //     //   focusConfirm: false,
    //     //   preConfirm: () => {
    //     //     return [
    //     //       document.getElementById("swal-input1").value,
    //     //       document.getElementById("swal-input2").value
    //     //     ];
    //     //   }
    //     // });
    //     // if (formValues) {
    //     //   Swal.fire(JSON.stringify(formValues));
    //     // }
    // });

    function confirmacionAsistencia() {
        console.log("Se realiza confirmacion de invitacion")
    }




    function ajusteAlturaMesaRegalo(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 300, max: 325, ajuste: 10 },
            { min: 326, max: 350, ajuste: 25 },
            { min: 351, max: 375, ajuste: 35 },
            { min: 376, max: 400, ajuste: -400 },
            { min: 401, max: 425, ajuste: 65 },
            { min: 426, max: 450, ajuste: -5 },
            { min: 451, max: 475, ajuste: -5 },
            { min: 476, max: 500, ajuste: -150 },
            { min: 501, max: 525, ajuste: 5 },
            { min: 526, max: 550, ajuste: 15 },
            { min: 551, max: 575, ajuste: 20 },
            { min: 576, max: 600, ajuste: -280 },
            { min: 601, max: 625, ajuste: 125 },
            { min: 626, max: 650, ajuste: 145 },
            { min: 651, max: 675, ajuste: 150 },
            { min: 676, max: 700, ajuste: 160 },
            { min: 701, max: 725, ajuste: 180 },
            { min: 726, max: 750, ajuste: 190 },
            { min: 751, max: 775, ajuste: 190 },
            { min: 776, max: Infinity, ajuste: 265 } // Para alturas mayores o iguales a 775
        ];

        // Buscar el ajuste correspondiente para la altura dada
        for (const rango of rangos) {
            if (altura >= rango.min && altura <= rango.max) {
                return tamanioDiv + rango.ajuste;
            }
        }

        // Si no se encuentra ningún rango, retornar 0 (opcional)
        return 0;
    }

    function ajusteAlturaContenido(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 300, max: 325, ajuste: -135 },
            { min: 326, max: 350, ajuste: -135 },
            { min: 351, max: 375, ajuste: -145 },
            { min: 376, max: 400, ajuste: -145 },
            { min: 401, max: 425, ajuste: -155 },
            { min: 426, max: 450, ajuste: -160 },
            { min: 451, max: 475, ajuste: -170 },
            { min: 476, max: 500, ajuste: -190 },
            { min: 501, max: 525, ajuste: -185 },
            { min: 526, max: 550, ajuste: -190 },
            { min: 551, max: 575, ajuste: -195 },
            { min: 576, max: 600, ajuste: -200 },
            { min: 601, max: 625, ajuste: -200 },
            { min: 626, max: 650, ajuste: -200 },
            { min: 651, max: 675, ajuste: -205 },
            { min: 676, max: 700, ajuste: -210 },
            { min: 701, max: 725, ajuste: -220 },
            { min: 726, max: 750, ajuste: -230 },
            { min: 751, max: 775, ajuste: -240 },
            { min: 776, max: Infinity, ajuste: -250 } // Para alturas mayores o iguales a 775
        ];

        // Buscar el ajuste correspondiente para la altura dada
        for (const rango of rangos) {
            if (altura >= rango.min && altura <= rango.max) {
                return tamanioDiv + rango.ajuste;
            }
        }

        // Si no se encuentra ningún rango, retornar 0 (opcional)
        return 0;
    }
    function ajusteAlturaContenidoTablets(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 768, max: 800, ajuste: -150 },
            { min: 801, max: 850, ajuste: -165 },
            { min: 851, max: 900, ajuste: -180 },
            { min: 901, max: 1024, ajuste: -185 }
        ];

        // Buscar el ajuste correspondiente para la altura dada
        for (const rango of rangos) {
            if (altura >= rango.min && altura <= rango.max) {
                return tamanioDiv + rango.ajuste;
            }
        }

        // Si no se encuentra ningún rango, retornar 0 (opcional)
        return 0;
    }

    function ajusteAlturaMesaRegaloTablets(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 768, max: 820, ajuste: 150 },
            { min: 821, max: 875, ajuste: 165 },
            { min: 876, max: 900, ajuste: 175 },
            { min: 901, max: 950, ajuste: 200 }, // Para alturas mayores o iguales a 775
            { min: 951, max: 1000, ajuste: 220 }, // Para alturas mayores o iguales a 775
            { min: 1001, max: 1024, ajuste: 230 } // Para alturas mayores o iguales a 775
        ];

        // Buscar el ajuste correspondiente para la altura dada
        for (const rango of rangos) {
            if (altura >= rango.min && altura <= rango.max) {
                return tamanioDiv + rango.ajuste;
            }
        }

        // Si no se encuentra ningún rango, retornar 0 (opcional)
        return 0;
    }
    function ajusteAlturaLogo(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 300, max: 400, ajuste: 68 },
            { min: 401, max: 475, ajuste: 66 },
            { min: 476, max: 575, ajuste: 65 },
            { min: 576, max: 775, ajuste: 64 }
        ];
        for (const rango of rangos) {
            if (altura >= rango.min && altura <= rango.max) {
                return rango.ajuste;
            }
        }
        return 0;
    }
    function ajusteAlturaLogoTablets(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 768, max: 1024, ajuste: 62 }
            // { min: 821, max: 1024, ajuste: 62 }
            // { min: 876, max: 900, ajuste: 66 },
            // { min: 901, max: 950, ajuste: 66 },
            // { min: 951, max: 1000, ajuste: 66 },
            // { min: 1001, max: 1024, ajuste: 64 }
        ];
        for (const rango of rangos) {
            if (altura >= rango.min && altura <= rango.max) {
                return rango.ajuste;
            }
        }
        return 0;
    }


   
    // Al hacer clic en el botón, se abrirá el modal con los nombres de la lista
    document.getElementById('confirmacion').addEventListener('click', function () {
        abrirModalConNombres();
    });


});

function copyText(id) {
    let elem = document.getElementById(id);
    if (elem) {
        let text = elem.textContent || elem.innerText;

        // Intentar copiar con la API moderna del portapapeles
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert(`Clabe Interbancaria copiada: ${text}`);
            }).catch(err => {
                console.error('Error al copiar al portapapeles: ', err);
                fallbackCopyTextToClipboard(text);
            });
        } else {
            // Si la API moderna no está disponible, usar el método alternativo
            fallbackCopyTextToClipboard(text);
        }
    } else {
        console.error('Elemento no encontrado');
    }
}

function fallbackCopyTextToClipboard(text) {
    // Crear un elemento de texto temporal
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = 'fixed'; // Evitar desplazamiento de la página
    document.body.appendChild(textArea);
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        if (successful) {
            alert(`Clabe Interbancaria copiada: ${text}`);
        } else {
            console.error('No se pudo copiar el texto usando execCommand.');
        }
    } catch (err) {
        console.error('Error al copiar al portapapeles con el método alternativo: ', err);
    }

    // Limpiar el área de texto
    document.body.removeChild(textArea);
}


function abrirModalConNombres() {
    // Generar HTML dinámico basado en la lista de nombres, los checks estarán marcados por defecto
    $.ajax({
        type: 'POST',
        url: '_ajax/_ajax.php',
        data: {
            obtenerInfoInvitados: 1,
            code: codeValue
        },
        success: function (data) {
           
        },
        error: function (xhr, status, error) {
            console.log('Error sending data: ' + error);
        }
    });


    let checkboxesHtml = '';
    nombres.forEach((nombre, index) => {
        checkboxesHtml += `
        <label>
          <input type="checkbox" id="nombre${index}" checked> ${nombre}
        </label><br>
      `;
    });

    // Abrir el modal de SweetAlert2
    Swal.fire({
        title: '¿Asistirá a la boda?',
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
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6', // Botón azul
        cancelButtonColor: '#d33', // Botón rojo
        preConfirm: () => {
            // Crear un objeto con los nombres seleccionados (true/false)
            let seleccionados = {};
            nombres.forEach((nombre, index) => {
                seleccionados[nombre] = document.getElementById(`nombre${index}`).checked;
            });

            // Validar que al menos un nombre esté seleccionado
            if (!Object.values(seleccionados).some(checked => checked)) {
                Swal.showValidationMessage('Debes seleccionar al menos uno');
            }

            // Devolver el objeto con los resultados
            return seleccionados;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Resultado de la selección:', result.value);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Confirmación aceptada",
                text: "Se abrirá su WhatsApp para confirmar su asistencia con la organizadora del evento.",
                showConfirmButton: false,
                timer: 4500,
                willClose: () => {
                    confirmacionAsistencia();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado', 'No asistirá a la boda', 'error');
        }
    });
}

function concatenateArray(arr, nombre, app) {
    if (arr.length === 0) return '';
    if (arr.length === 1) return `${arr[0][nombre]} ${arr[0][app]}`;
  
    let result = '';
    for (let i = 0; i < arr.length - 1; i++) {
      result += `${arr[i][nombre]} ${arr[i][app]}${i === arr.length - 2 ? ' y ' : ', '}`;
    }
    result += `${arr[arr.length - 1][nombre]} ${arr[arr.length - 1][app]}`;
  
    return result;
  }

  function pixelsToRem(px) {
    const rootFontSize = 16; // assuming 16px as the root font size
    return `${px / rootFontSize}`;
  }
