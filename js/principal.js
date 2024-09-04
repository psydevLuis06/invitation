$(document).ready(function () {

    var mensaje = "Prueba de desarrollo";

    // Crear una instancia de QRious
    var qr = new QRious({
        element: document.getElementById('qr-code'),
        value: mensaje,
        size: 150,
        level: 'H'  // Nivel de corrección de errores (L, M, Q, H)
    });



    handleClick();

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
                const alto = screen.width;
                const heightContenidoPrincipal = overlayDiv.offsetHeight;
                const heightSobre = tamanioSobre.offsetHeight;
                let tamanioContenidoPrincipal = 0;
                let posicionAlturaContenidoPrincipal = 0;

                $("#alto").text(alto);
                if (alto >= 768 && alto <= 1024) {
                    tamanioContenidoPrincipal = heightContenidoPrincipal - 115;
                }
                else if (alto < 768) {
                    
                    // tamanioContenidoPrincipal = heightContenidoPrincipal + 50;
                    tamanioContenidoPrincipal = ajusteAlturaMesaRegalo(alto, heightContenidoPrincipal);
                    // posicionAlturaContenidoPrincipal = heightSobre - 175;
                    posicionAlturaContenidoPrincipal = ajusteAlturaContenido(alto,heightSobre);
                }
                $("#overlayDiv").css({ top: posicionAlturaContenidoPrincipal + 'px' });
                $(".new-div").css({ top: tamanioContenidoPrincipal + 'px' });

                observer.disconnect();
            }
        });
        observer.observe(overlayDiv, { attributes: true });
        setTimeout(() => {
            button.classList.remove('active');
            overlayDiv.classList.toggle('show');
        }, 200);
    }

    $("#confirmacion").click(function () {
        Swal.fire({
            title: "¿Asistirá a la boda?",
            // text: "A continuación se abrirá WhatsApp para confirmar asistencia",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
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
                        confirmacionAsistencia();
                    }
                });
            }
        });
    });

    function confirmacionAsistencia() {
        console.log("Se realiza confirmacion de invitacion")
    }


    // function ajusteAlturaMesaRegalo(altura, tamanioDiv){
    //     valor = 0;
    //     switch(true){
    //         case altura >300 && altura < 326:
    //         valor = tamanioDiv - 20;
    //         break;
    //         case altura >325 && altura < 351:
    //         valor = tamanioDiv - 5;
    //         break;
    //         case altura >350 && altura < 376:
    //         valor = tamanioDiv + 10;
    //         break;
    //         case altura >375 && altura < 401:
    //         valor = tamanioDiv + 25;
    //         break;
    //     }
    //     return valor;
    // }
    // function ajusteAlturaMesaRegalo(altura, tamanioDiv) {
    //     if (altura > 300 && altura < 326) {
    //       return tamanioDiv - 20;
    //     } else if (altura > 325 && altura < 351) {
    //       return tamanioDiv - 5;
    //     } else if (altura > 350 && altura < 376) {
    //       return tamanioDiv + 10;
    //     } else if (altura > 375 && altura < 401) {
    //       return tamanioDiv + 25;
    //     } else if (altura > 400 && altura < 426) {
    //       return tamanioDiv + 40;
    //     } else if (altura > 425 && altura < 451) {
    //       return tamanioDiv + 55;
    //     } else if (altura > 450 && altura < 476) {
    //       return tamanioDiv + 70;
    //     } else if (altura > 475 && altura < 501) {
    //       return tamanioDiv + 85;
    //     } else if (altura > 500 && altura < 526) {
    //       return tamanioDiv + 100;
    //     } else if (altura > 525 && altura < 551) {
    //       return tamanioDiv + 115;
    //     } else if (altura > 550 && altura < 576) {
    //       return tamanioDiv + 130;
    //     } else if (altura > 575 && altura < 601) {
    //       return tamanioDiv + 145;
    //     } else if (altura > 600 && altura < 626) {
    //       return tamanioDiv + 160;
    //     } else if (altura > 625 && altura < 651) {
    //       return tamanioDiv + 175;
    //     } else if (altura > 650 && altura < 676) {
    //       return tamanioDiv + 190;
    //     } else if (altura > 675 && altura < 701) {
    //       return tamanioDiv + 205;
    //     } else if (altura > 700 && altura < 726) {
    //       return tamanioDiv + 220;
    //     } else if (altura > 725 && altura < 751) {
    //       return tamanioDiv + 235;
    //     } else if (altura > 750 && altura < 776) {
    //       return tamanioDiv + 250;
    //     } else if (altura >= 775) {
    //       return tamanioDiv + 265;
    //     }
    //     return 0; // default value if none of the conditions match
    //   }

    function ajusteAlturaMesaRegalo(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
          { min: 300, max: 325, ajuste: 10},
          { min: 326, max: 350, ajuste: 25 },
          { min: 351, max: 375, ajuste: 35 },
          { min: 376, max: 400, ajuste: 55 },
          { min: 401, max: 425, ajuste: 65 },
          { min: 426, max: 450, ajuste: 70 },
          { min: 451, max: 475, ajuste: 80 },
          { min: 476, max: 500, ajuste: 85 },
          { min: 501, max: 525, ajuste: 90 },
          { min: 526, max: 550, ajuste: 100 },
          { min: 551, max: 575, ajuste: 110 },
          { min: 576, max: 600, ajuste: 115 },
          { min: 601, max: 625, ajuste: 125 },
          { min: 626, max: 650, ajuste: 135 },
          { min: 651, max: 675, ajuste: 190 },
          { min: 676, max: 700, ajuste: 205 },
          { min: 701, max: 725, ajuste: 220 },
          { min: 726, max: 750, ajuste: 235 },
          { min: 751, max: 775, ajuste: 250 },
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
          { min: 300, max: 325, ajuste: -135  },
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
          { min: 651, max: 675, ajuste: 190 },
          { min: 676, max: 700, ajuste: 205 },
          { min: 701, max: 725, ajuste: 220 },
          { min: 726, max: 750, ajuste: 235 },
          { min: 751, max: 775, ajuste: 250 },
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
      
      

});