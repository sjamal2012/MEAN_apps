$(document).ready(function(){
    $("#grab_user").on("click", get)
    function get(){
        user = document.getElementById("user").value
        $.get("https://api.github.com/users/" + user,displayName)

        function displayName(data){
            console.log(data.name);
            let user = document.createElement('div')
            user.setAttribute('class', 'display_name')
            user.setAttribute('id', 'display_name')

            let name = document.createElement('h3')
            name.setAttribute('class','full_name')
            name.innerText = data.name

            user.appendChild(name)
            console.log(user);
            $('#display_wrap').html(user)
        }
    }
})
