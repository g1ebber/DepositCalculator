

// Отображение поля пополнения вклада
$('.checkbox').on('change', function() {
    if ($('.checkbox').is(':checked')){
        $('.hidden').css('visibility', 'visible');
    } else {
        $('.hidden').css('visibility', 'hidden');
        $('.hidden').val('0');
    }
});

$('#replenishment').on('click', function() {
    if ($('#replenishment').val() == '0') {
        $('#replenishment').val('');
    }
})



$('#mainForm').validate({
        
    rules: {
        date: {
            required: true,
            date: true
        },
        time: {
            required: true,
            min: 5,
            max: 60
        },
        value: {
            required: true,
            min: 1000,
            max: 3000000
        },
        percent: {
            required: true,
            min: 3,
            max: 100
        },
        replenishment: {
            min: 0,
            max: 3000000
        }
    },
    messages: {
        date: {
            required: 'Обязательно для заполнения',
            date: 'Необходимый формат: дд.мм.гггг'
        },
        time: {
            required: 'Обязательно для заполнения',
            min: 'Не меньше 5-ти месяцев',
            max: 'Не больше 60-ти месяцев'
        },
        value: {
            required: 'Обязательно для заполнения',
            min: 'Не меньше 1000-ти',
            max: 'Не больше 3 000 000'
        },
        percent: {
            required: 'Обязательно для заполнения',
            min: 'Не меньше 3%',
            max: 'Не больше 100%'
        },
        replenishment: {
            min: 'Не меньше 0',
            max: 'Не больше 3 000 000'
        }
    },
    errorPlacement: function(error, element) {
        if (element.attr("name") == "date" ) {
            $(".errorDate").append(error);
        }
        if (element.attr("name") == "time" ) {
            $(".errorTime").append(error);
        }
        if (element.attr("name") == "value" ) {
            $(".errorValue").append(error);
        }
        if (element.attr("name") == "percent" ) {
            $(".errorPercent").append(error);
        }
        if (element.attr("name") == "replenishment" ) {
            $(".errorRepl").append(error);
        }
        
    },
    submitHandler: function() {
        var formData = {
            "startDate": $('#date').val().trim(), // дата открытия вклада
            "sum": $('#value').val().trim(), // сумма вклада
            "term": time, // срок вклада в месяцах
            "percent": $('#percent').val().trim(), // процентная ставка, % годовых
            "sumAdd": $('#replenishment').val().trim() // сумма ежемесячного пополнения вклада
        }
        
    $.ajax({
        url: 'calc.php',
        method: 'post',             
        dataType: 'json',          
        data: formData,    
        success: function(data){
            if (data.result == 'error') {
                alert('Wrong variable value' + data.type);
            } else {
                $('.mess').css('visibility', 'visible');
                $('.mess-sum').text('₽ ' + data.result);
            }
        },
        error: function() {
            alert('Request not sent');
            $('.mess').css('visibility', 'visible');
            $('.mess-sum').text('₽ 0');
        }   
    })
    }
})

$('button').on('click',function(e) {
    e.preventDefault();

    var formData = {
        "startDate": $('#date').val().trim(), // дата открытия вклада
        "sum": $('#value').val().trim(), // сумма вклада
        "term": $('#time').val().trim(), // срок вклада в месяцах
        "percent": $('#percent').val().trim(), // процентная ставка, % годовых
        "sumAdd": $('#replenishment').val().trim() // сумма ежемесячного пополнения вклада
    }
    
    if (!$('#mainForm').valid()) {
        return false;
    }

    $.ajax({
        url: 'calc.php',
        method: 'post',             
        dataType: 'json',          
        data: formData,    
        success: function(data){
            if (data.result == 'error') {
                alert('Wrong variable value' + data.type);
            } else {
                $('.mess').css('visibility', 'visible');
                $('.mess-span').text(data.result);
            }
        },
        error: function() {
            alert('Request not sent');
            $('.mess').css('visibility', 'visible');
            $('.mess-span').text('0');
        }   
    })
})
