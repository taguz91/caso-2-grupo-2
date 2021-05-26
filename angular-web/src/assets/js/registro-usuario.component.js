$('.form').find('input, textarea, select').on('keyup blur focus show change', function(e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

    if ($this.val() === '') {
        label.removeClass('active highlight');
    } else {
        label.addClass('active highlight');
    }
});

$('#telefono').focus();
$('#nombre').focus();
$('#apellido').focus();
$('#password').focus();
$('#rol').focus();
$('#estado').focus();
$('#email').focus();
$('#cedula').focus();
$('#confirmar_pass').focus();
$('#correo').focus();