$(document).ready(() => {
    $('.date').hide();

    console.log("TABLE")
    $('#studentTable').DataTable();
    $('.dataTables_length').addClass('bs-select');
    $('#datetimepicker').datetimepicker({ format: 'MM/DD/YYYY HH:mm' });

    $('.slider').click(() => {
        if (!$('.slider')[0].checked) {
            $('.slider')[0].checked = true;
            $('#date').prop('required', true);
            $('.date').show();
            $('#date').val(moment().add(1, 'minutes').format('MM/DD/YYYY HH:mm'));
        } else {
            $('.slider')[0].checked = false;
            $('#date').prop('required', false);
            $('.date').hide();
        }
    });

    $('.broadcast').click(() => {
        console.log('Broadcast button clicked');

        const message = $('.message').val().trim();
        console.log('Message', message);

        const reminderOn = !!$('.slider')[0].checked;
        console.log('Reminder', reminderOn);

        const date = $('#date').val().trim();
        console.log('Date', date);

        const modul = $('.modul').val().trim();
        console.log('Modul', modul);

        if (message === '' || (reminderOn && date === '')) {
            console.error(`Fields are qureired: message empty -> ${message === ''} date empty -> ${reminderOn && date === ''}`);
        } else {
            $.ajax({
                url: '/broadcast',
                method: 'post',
                // dataType: 'json',
                data: {
                    message,
                    reminderOn,
                    date: (new Date(date)).toLocaleString(),
                    modul
                },
                success: (result) => {
                    console.log('success ajax broadcast');
                    // document.write(result);
                },
                error: (xhr, status, error) => {
                    console.error('broadcast ajax error!');
                    console.error('Status', status);
                    console.error('Error', error);
                }
            });
        }
    });


    $(".dropdown-menu li a").click(() => {
        console.log('something')
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
     });


});