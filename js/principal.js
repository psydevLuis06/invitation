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


    function ajusteAlturaMesaRegalo(altura, tamanioDiv) {
        // Definir los rangos y ajustes en un array de objetos
        const rangos = [
            { min: 300, max: 325, ajuste: 10 },
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



});