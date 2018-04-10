$(document).ready(function(){

    (function (id_button){

        function on_click() {
            console.log(this.innerText + " was clicked!")
        }
        function on_hover() {
            console.log(this.innerText + " is being hovered on!")
        }
        function on_unhover() {
            console.log(this.innerText + " was hovered on!")
        }

        function $Dojo(){
            obj_01 = document.getElementById(id_button)
            obj_01.addEventListener("click", on_click)
            obj_01.addEventListener("mouseover", on_hover);
            obj_01.addEventListener("mouseleave", on_unhover);
        }

        return $Dojo()

    })("id_button_01")
})
