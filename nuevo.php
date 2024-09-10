<?php
$id = isset($_GET['code']) ? $_GET['code'] : null;
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación Boda Alexia y Luis</title>
    <!-- Bootstrap CSS -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Pogo Slider CSS -->
    <link rel="stylesheet" href="css/pogo-slider.min.css">
    <!-- Site CSS -->
    <link rel="stylesheet" href="css/style.css">
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">




    <link rel="stylesheet" href="css/font-awesome.min.css">
    <style>
        /* Estilos generales */
        .container {
            max-width: 100% !important;
            display: flex;
            flex-direction: column;

            padding: 10px;
        }

        .principal-columns {
            flex: 1 !important;
            width: 100%;
            margin-bottom: 10px !important;
        }

        .centered-div {
            width: 85%;
            height: 300px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            margin: 30px auto 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .imagen-escalada {
            width: 100%;
            height: 100%;
        }

        .circular-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            /* background-color: rgb(201,136,42); */
            background-image: url('images/sello1.png');
            background-color: initial;
            /* mix-blend-mode: darken; */
            background-size: cover;
            border: none;
            /* color: rgb(114, 53, 53); */
            /* font-size: 16px; */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: absolute;
            z-index: 1;
        }

        .logo-boton {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            mix-blend-mode: multiply;
            background-image: url('images/a&l.jpeg');
            border: none;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: absolute;
            z-index: 1;
        }


        #myButton.active {
            background-color: #0056b3;
            transform: scale(0.95);
        }


        /* .overlay-div {
            width: 80%;
            min-height: 150px;
            background-image: url(images/background2.avif);
            position: absolute;
            top: -14rem;
            left: 50%;
            transform: translateX(-50%) translateY(-200%);
            padding: 10px;
            box-sizing: border-box;
            opacity: 0;
        } */
        .overlay-div {
            width: 80%;
            min-height: 150px;
            background-image: url(images/background2.avif);
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-200%);
            padding: 10px;
            box-sizing: border-box;
            opacity: 0;
        }

        .row {
            justify-content: center;
            background-image: url(images/background2.avif);

        }

        /* .new-div {
            position: absolute;
            left: 50%;
            transform: translateX(-50%) translateY(98.9%);
            width: 55%;
            min-height: 190px;
            background-color: #fff;
            box-sizing: border-box;
            background-image: url(images/background2.avif);
            box-shadow: 0 17px 25px rgba(0, 0, 0, 1.2);
        } */

        .new-div {
            position: absolute;
            left: 50%;
            transform: translateX(-50%) translateY(98.9%);
            width: 55%;
            min-height: 190px;
            height: auto;
            background-color: #fff;
            box-sizing: border-box;
            background-image: url(images/background2.avif);
            box-shadow: 0 17px 25px rgba(0, 0, 0, 1.2);
        }

        /* .new-div {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
            min-height: 190px;
            height: auto;
            background-color: #fff;
            box-sizing: border-box;
            background-image: url(images/background2.avif);
            box-shadow: 0 17px 25px rgba(0, 0, 0, 1.2);
            bottom: 0;
            margin-bottom: 20px;
        } */

        .segment {
            padding: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #08554c;
        }

        .overlay-div.show {
            animation: slideDown 0.5s forwards;
            box-shadow: 0 0 25px rgba(0, 0, 0, 1.2);
        }

        .sombra {
            box-shadow: 0 0 25px rgba(0, 0, 0, 1.2);
        }

        @keyframes slideDown {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(-100%);
            }

            100% {
                opacity: 1;
                transform: translateX(-50%) translateY(4%);
            }
        }

        .hide-bg {
            mix-blend-mode: multiply;
        }

        .parents {
            display: flex;
            justify-content: space-between;
        }

        .parents p {
            text-align: center;
        }

        p {
            margin-bottom: 0 !important;
        }

        #ContenidoRegalo {
            margin-top: 5%;
        }


        .regalo {
            top: -4rem;
        }

        /* Media Queries */
        @media (min-width: 1025px) {
            .centered-div {
                width: 90%;
            }

            .center-btn {
                margin-top: 25px;
            }

            .space {
                display: none;
            }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
            .centered-div {
                width: 80%;
                height: 250px;
            }

            .overlay-div {
                width: 60%;
            }

            .space {
                display: block;
            }

            .asistencia {
                margin-bottom: 100px;
            }

            .simply-section {
                background: #fff;
                width: 50px;
                height: 50px;
                margin: 0px 30px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .simply-word {
                font-weight: 500;
                font-size: 15px;
                margin-top: 30px;
            }

            .simply-amount {
                margin-top: 40px;
                margin-bottom: 10px;
            }

            .simply-amount,
            .simply-word {
                /* Tus estilos aquí */
                text-align: center !important;
            }



        }

        @media (max-width: 767px) {
            .space {
                display: block;
            }

            .centered-div {
                width: 95%;
                height: 200px;
                margin: 20px auto 0 auto;
            }

            .circular-button {
                width: 90px;
                height: 90px;
                font-size: 14px;
                top: 60%;
                border: 1p;
            }

            /* .logo-boton {
                top: 68%;
            } */

            .overlay-div {
                width: 80%;
                top: 95px;
            }

            .segment {
                font-size: 12px;
                margin: 0 3px;
                /* Reduce el margen entre segmentos en móviles */
            }

            .simply-section {
                background: #fff;
                width: 30px;
                height: 30px;
                margin: 0px 15px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .simply-amount {
                margin-top: 20px;
            }

            .simply-amount,
            .simply-word {
                /* Tus estilos aquí */
                text-align: center !important;
            }

            .asistencia {
                margin-bottom: 60px;
            }


        }
    </style>
</head>

<body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
    <input type="hidden" id="code" value="<?= $id ?>">
    <!-- LOADER Parametrizar-->
    <div id="preloader">
        <div class="preloader pulse">
            <h3>Alexia & Luis </h3>
        </div>
    </div>
    <!-- end loader -->

    <div class="container">
        <p id="alto"></p>
        <div class="centered-div principal-columns" id="sobre">
            <img class="imagen-escalada" id="FotoBanner" src="images/sobre1.png" alt="Foto representativa de mi Banner">
            <button class="circular-button" id="myButton"></button>
            <img class="logo-boton" id="FotoBanner" src="images/a&l.jpeg" alt="Foto representativa de mi Banner">
        </div>
        <div class="col-10 mx-auto sombra">
            <div class="row ">

                <div class="segment" style="padding-top: 30px;">
                    <p style="text-align: center;" class="CooperLight">Con la bendición de Dios y nuestros padres: </p>
                    <br>
                    <div class="parents">
                        <p class="CooperBook">Carolina <br class="space"> Ventura Garrido</p>
                        <p class="CooperBook">Ruvi Luz <br class="space"> Arellano Zuñiga</p>
                    </div>

                    <div class="parents" style="margin-top: 1rem;">
                        <p class=" CooperBook"><img src="images/cruz.png" id="cruz"> Rodolfo <br class="space"> Ozuna Gutierrez</p>
                        <p class="CooperBook">José Raúl <br class="space"> de León García</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="segment" id="novios">
                    <p style="text-align: center;">TENEMOS EL HONOR DE
                        INVITARLOS A NUESTRA BODA</p>
                    <div class="home-slider">
                        <div class="lbox-details">
                            <h1>Alexia Ozuna</h1>
                            <h1>&</h1>
                            <h1>Luis De León</h1>
                            <h2 class="CooperLight">¡Nos vamos a casar!</h3>
                        </div>
                    </div>
                </div>
                <!-- Segmento de imagenes -->
            </div>
            <div class="row">

                <div class="segment" id="fotos">
                    <div class="timeLine">
                        <div class="row">
                            <div class="lineHeader hidden-sm hidden-xs"></div>
                            <div class="lineFooter hidden-sm hidden-xs"></div>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 item">
                                <div class="caption">
                                    <div class="star center-block">
                                        <span class="h6 CooperLight">26</span>
                                        <span class="CooperLight">Agosto </span>
                                        <span class="CooperLight">2014</span>
                                    </div>
                                    <div class="image">
                                        <img src="images/times-02.jpg" alt />
                                        <div class="title">
                                            <h2 class="CooperLight">Primer encuentro </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 item">
                                <div class="caption">
                                    <div class="star center-block">
                                        <span class="h6 CooperLight">05</span>
                                        <span class="CooperLight">Septiembre</span>
                                        <span class="CooperLight">2014</span>
                                    </div>
                                    <div class="image">
                                        <img src="images/times-01.jpg" alt />
                                        <div class="title">
                                            <h2 class="CooperLight">Primera Cita </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 item">
                                <div class="caption">
                                    <div class="star center-block">
                                        <span class="h6 CooperLight">22</span>
                                        <span class="CooperLight">Septiembre</span>
                                        <span class="CooperLight">2023</span>
                                    </div>
                                    <div class="image">
                                        <img src="images/propuesta.jpg" alt />
                                        <div class="title">
                                            <h2 class="CooperLight">Nos Comprometimos </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 item">
                                <div class="caption">
                                    <div class="star center-block">
                                        <span class="h6 CooperLight">09</span>
                                        <span class="CooperLight">Noviembre</span>
                                        <span class="CooperLight">2024</span>
                                    </div>
                                    <div class="image">
                                        <img src="images/times-04.jpg" alt />
                                        <div class="title">
                                            <h2 class="CooperLight">Nuestra Boda </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="segment" style="text-align: center;">
                    <p>ACOMPAÑAMOS A CELEBRAR EL DÍA </p>
                    <p>SÁBADO 09 DE NOVIEMBRE 2024</p>
                </div>
            </div>
            <div class="row">
                <div class="segment">
                    <div id="wedding" class="wedding-box">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="title-box">
                                        <h2>¡Nuestra Boda!</h2>
                                        <p class="CooperLight">El día más esperado de nuestras vidas
                                            finalmente ha llegado. <spam id="nombreInvitados" class="nombreInvitado"></spam> acompañanos en nuestra
                                            boda y se parte de esta historia.
                                        </p>
                                    </div>
                                </div>
                                <div class="center-btn" style="width: 100%;">
                                    <div id="cuenta"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <div class="serviceBox">
                                        <div class="service-icon"><i class="flaticon-reception-bell"></i></div>
                                        <h3 class="title">Recepción</h3>
                                        <h4>09 Noviembre 2024 a las 06:00
                                            pm</h4>
                                        <p class="description CooperBook" style="font-weight: 750 !important;">
                                            <!-- Acompáñanos a celebrar nuestra unión en una recepción llena de amor, alegría y felicidad en el Jardín El Pedregal. -->
                                            <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;Jardín
                                            El Pedregal.
                                        </p>
                                        <br class="space">
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="serviceBox">
                                        <div class="service-icon"><i class="flaticon-wedding"></i></div>
                                        <h3 class="title">Ceremonia Boda Civil
                                        </h3>
                                        <h4>09 Noviembre 2024 a las 7:00 pm</h4>
                                        <p class="description">
                                            <!-- Te invitamos a presenciar nuestra ceremonia civil, donde uniremos nuestras vidas en matrimonio. ¡Tu presencia será un honor! -->
                                            &nbsp;
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="center-btn">
                                <a href="https://maps.app.goo.gl/wv2sZYjk3gw5Vrw78" class="btn btn-green btn-lg"
                                    tabindex="-1" role="button" aria-disabled="true">VER MAPA</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="segment" style="position: relative;">
                    <div class="col-lg-12">
                        <div class="title-box">
                            <h2 style="text-align: center;">Hemos Reservado</h2>
                            <div class="center-btn" style="margin-bottom: 10px;">
                                <div class="inner"
                                    style="width: 50px; height: 50px; border: 4px solid #08554C; display: flex; justify-content: center;">
                                    <p style="font-size: 20px;" id="num-pases"></p>
                                </div>
                            </div>
                            <p style="text-align: center;"> PASES EN SU LUGAR</p>
                            <br>
                            <p style="text-align: center;"> RESPETUOSAMENTE NO NIÑOS,</p>
                            <p style="text-align: center;">LOS ADORAMOS PERO CREEMOS QUE SE MERECEN UNA NOCHE LIBRE.</p>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="title-box">
                            <h2 style="text-align: center;">Código de Vestimenta</h2>
                            <div class="center-btn">
                                <br>
                                <img class="hide-bg" src="images/dresscode2.png" width="100px" height="100px">
                            </div>
                            <p style="text-align: center;">FORMAL</p>
                            <!-- <p style="text-align: center;">El blanco es un color hermoso, pero en nuestra boda, es exclusivo para la novia, y el verde esmeralda para las damas.</p> -->
                            <p style="text-align: center;" class="CooperLight">El blanco es un color
                                hermoso, pero en nuestra boda es exclusivo para la
                                novia, y el verde esmeralda, para las damas.</p>
                            <p style="text-align: center;" class="CooperLight">¡Todos los demás colores
                                están disponibles.!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="segment asistencia">
                    <div class="col-lg-12">
                        <div class="title-box">
                            <h2 style="text-align: center;">Confirmar Asistencia</h2>
                            <h3 style="text-align: center;">Antes del 05 de Octubre
                                2024</h3>
                            <div class="center-btn" style="display: inline-grid;">
                                <!-- <a href="https://wa.me/523327834905?text=I'm%20interested%20in%20your%20car%20for%20sale"
                                        class="btn btn-green btn-lg" tabindex="-1" role="button" aria-disabled="true">CLICK AQUI</a> -->
                                <button class="btn btn-green btn-lg" id="confirmacion"> CLICK AQUI</button>

                                <p style="text-align: center; font-size: 10px; margin-top: 10px;">AGRADECEMOS
                                    NOS CONFIRMES TU ASISTENCIA </p>
                                <p style="text-align: center; font-size: 10px;">TU PRESENCIA
                                    ES IMPORTANTE PARA NOSOTROS</p>
                                <div class="center-btn qrcode">
                                    <canvas id="qr-code"></canvas>
                                    <!-- <img src="images/qr.png"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 mx-auto sombra" style="margin-top: -2rem;">
            <div class="row">
                <div id="RegaloImg"
                    style="width: 100%; border-radius: 50%; overflow: hidden; display: flex; justify-content: center; align-items: center;">
                    <img src="images/regalo.png" class="regalo hide-bg">
                </div>

                <div class="segment" id="ContenidoRegalo">
                    <div class="col-lg-12">
                        <div class="title-box">
                            <h2 style="text-align: center;">Regalos</h2>

                            <p style="text-align: center; padding: 0px 15px 0px 15px;" class="CooperLight"> Nuestro mejor regalo es tu compañía en este día tan especial. Sin embargo, si deseas hacernos un obsequio, te agradeceríamos que lo hicieras a través de nuestra mesa de regalos o a las siguientes cuentas: </p>
                            <div class="center-btn" style="display: block !important; padding-top:10px;">
                                <p class="CooperBook">Alexia Ozuna</p>
                                <p>BBVA</p>
                            </div>
                            <div class="center-btn">
                                <a id="BrideAccount" class="btn btn-green btn-lg" onclick="copyText('BrideAccount')"
                                    tabindex="0" role="button" aria-disabled="true">0121 8001 5347 565952</a>
                            </div>
                            <div class="center-btn" style="display: block !important; margin-top:0.5rem;">
                                <p class="CooperBook">Luis de León</p>
                                <p>BBVA</p>
                            </div>
                            <div class="center-btn">
                                <a id="GroomAccount" class="btn btn-green btn-lg" onclick="copyText('GroomAccount')"
                                    tabindex="0" role="button" aria-disabled="true">0121 8001 5614 770726</a>
                            </div>
                            <br class="spaces">
                            <div class="center-btn">
                                <p class="CooperBook">LIVERPOOL</p>
                            </div>
                            <div class="center-btn">
                                <a href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51380099"
                                    class="btn btn-green btn-lg" tabindex="-1" role="button" aria-disabled="true">VER MESA</a>
                            </div>
                            <div class="center-btn">
                                <p class="CooperBook">AMAZON</p>
                            </div>
                            <div class="center-btn">
                                <a href="https://www.amazon.com.mx/wedding/share/BodaAlexiaOzunayLuisDeLeon"
                                    class="btn btn-green btn-lg" tabindex="-1" role="button" aria-disabled="true">VER MESA</a>
                            </div>

                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>



    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/qrious@latest/dist/qrious.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>



    </script>
    <!-- ALL JS FILES -->
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- ALL PLUGINS -->
    <script src="js/jquery.magnific-popup.min.js"></script>
    <!-- <script src="js/jquery.pogo-slider.min.js"></script> -->
    <!-- <script src="js/slider-index.js"></script> -->
    <script src="js/smoothscroll.js"></script>
    <script src="js/responsiveslides.min.js"></script>
    <script src="js/timeLine.min.js"></script>
    <script src="js/form-validator.min.js"></script>
    <script src="js/contact-form-script.js"></script>
    <script src="js/custom.js"></script>
    <!-- controlador de timer -->
    <script src="js/simplyCountdown.min.js"></script>
    <script src="js/countdown.js"></script>
    <!-- <script src="js/principal.js?v=<?php echo time(); ?>"></script> -->
    <script src="js/principal.js?"></script>
</body>

</html>