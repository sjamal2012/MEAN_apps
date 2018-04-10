module.exports = function (){
    return {
    add: function(num1, num2){
        let sum = num1 + num2;
        return sum;
    },
    multiply: function(num1, num2){
        let product = num1 * num2;
        return product;
    },
    square: function(num){
        let square = num * num;
        return square;
    },
    random: function(num1, num2){
        let diff = num2 - num1;
        let rand_num = num1 + Math.floor(Math.random()*diff);
        return rand_num;
    }
    }
}
