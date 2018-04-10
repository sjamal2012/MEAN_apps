$(document).ready(function(){

    house_01 = " Stark of Winterfell"
    house_02 = " Targaryen of King's Landing"
    house_03 = " Lannister of Casterly Rock"
    house_04 = " Baratheon of Storm's End"
    $('div').on("click", getHouse)

    function getHouse(house){
        if (this.id == "house_stark"){
            house = house_01;
        }
        else if (this.id == "house_targaryen"){
            house = house_02;
        }
        else if (this.id == "house_lannister"){
            house = house_03;
        }
        else if (this.id == "house_baratheon"){
            house = house_04;
        }
        else {
            $('#details').html("")
        }
        $.get("https://anapioficeandfire.com/api/houses?name=House" + house, displayInfo)


        function displayInfo(data){
            data = data[0];
            let el = document.createElement('div');
            el.setAttribute("class", "details")
            el.setAttribute("id", "details")

            let head = document.createElement('h4')
            head.innerText = "House Details"

            let name = document.createElement('p');
            name.innerText = "Name: " + data.name;

            let words = document.createElement('p');
            words.innerText = "Words: " + data.words;

            let titles = document.createElement('p');
            titles.innerText = "Titles: " + data.titles;

            el.appendChild(head)
            el.appendChild(name)
            el.appendChild(words)
            el.appendChild(titles)

            $('#details').replaceWith(el)
        }

    }
})
