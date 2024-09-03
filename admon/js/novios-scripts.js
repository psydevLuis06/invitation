$(document).ready(function () {
    $('#lista-invitados').click(function () {
        $('#contenido').html('');
        $('#contenido').append('<button class="btn btn-primary" id="agregar-familia" data-target="#AgregarFamilia" data-toggle="modal">Agregar Familia</button>');
        $('#contenido').append('<table class="table table-striped"><thead><tr><th>Nombre</th><th>Apellido</th></tr></thead><tbody></tbody></table>');
    });

    $('#lista-proveedores').click(function () {
        $('#contenido').html('');
        $('#contenido').append('<button class="btn btn-primary" id="agregar-proveedor">Agregar Proveedor</button>');
        $('#contenido').append('<table class="table table-striped"><thead><tr><th>Nombre</th><th>Dirección</th></tr></thead><tbody></tbody></table>');
    });

    $('#lista-pedidos').click(function () {
        $('#contenido').html('');
        $('#contenido').append('<button class="btn btn-primary" id="agregar-pedido">Agregar Pedido</button>');
        $('#contenido').append('<table class="table table-striped"><thead><tr><th>Nombre</th><th>Descripción</th></tr></thead><tbody></tbody></table>');
    });


    $('#add-integrante').on('click', function () {
        let integranteHTML = '<div class="row-group">' +
            '<div>' +
            '<div class="form-group" style="display: inline-block; width: 40%">' +
            '<input type="text" class="form-control" placeholder="Nombre" maxlength="100" name="integrantes[]">' +
            '</div>' +
            '<div class="form-group" style="display: inline-block; width: 40%">' +
            '<input type="text" class="form-control" placeholder="Apellidos" maxlength="100" name="integrantes[]">' +
            '</div>' +
            '<div class="form-group" style="display: inline-block; width: 15%">' +
            '<button type="button" class="btn btn-danger" id="eliminar"><i class="fa fa-trash-o" aria-hidden="true"></i></button>' +
            '</div>' +
            '</div>' +
            '<div style="display: flex; align-items: center;">' +
            '<div class="form-group" style="width: 40%">' +
            '<input type="text" class="form-control" placeholder="Celular" maxlength="100" name="integrantes[]">' +
            '</div>' +
            '<div class="form-check" style="width: 55%; margin-left: 10px;">' +
            '<input class="form-check-input" type="checkbox" value="" id="llamar1">' +
            '<label class="form-check-label" for="llamar1">Llamar para confirmar asistencia</label>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#integrantes').append(integranteHTML);
    });

    $(document).on('click', '#eliminar', function () {
        $(this).closest('.form-group').remove();
    });


    $('#guardar-familia').click(function () {
        const familia = $("#familia").val();
        let integrantes = [];

        $('.row-group').each(function (index) {
            let nombre = $(this).find('input[name="integrantes[]"][placeholder="Nombre"]').val();
            let apellidoPaterno = $(this).find('input[name="integrantes[]"][placeholder="Apellidos"]').val();
            let celular = $(this).find('input[name="integrantes[]"][placeholder="Celular"]').val();
            let llamar = $(this).find('input[type="checkbox"][id="llamar1"]').prop('checked');

            let segmentData = {
                nombre: nombre,
                apellidoPaterno: apellidoPaterno,
                celular: celular,
                llamar: llamar
            };

            integrantes.push(segmentData);
        });

        $.ajax({
            type: 'POST',
            url: '_ajax/_ajax.php',
            data: {
                guardarInvitados: 1,
                integrantes: integrantes,
                familia: familia
             },
            success: function (data) {
                console.log('Data sent successfully!');
            },
            error: function (xhr, status, error) {
                console.log('Error sending data: ' + error);
            }
        });
    });

});