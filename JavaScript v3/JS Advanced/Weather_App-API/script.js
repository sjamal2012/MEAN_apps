$(document).ready(function(){
    $('button').click(function() {
        var key = 'e4262ab6c297d63f4f6021c221616850'
        var city = $('input#city').val();
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + key;
        $.get(url, function(data) {
            let wrap = document.createElement('div')
            wrap.setAttribute('class','results')
            wrap.setAttribute('id','results')
            let city = $('input#city').val()

            let name = document.createElement('h2')
            name.innerText = city;

            let temp = document.createElement('p');
            temp.innerText = data.main.temp + " °F";

            wrap.appendChild(name)
            wrap.appendChild(temp)
            $('#results').replaceWith(wrap)
        });
    });
})
