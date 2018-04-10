$(document).ready(function(){

    function fib() {
        var counter = [0]
        var sum = 1
        function nacci() {
            counter.push(sum)
            console.log(sum);
            sum = counter[counter.length-1] + counter[counter.length-2]

        }
        return nacci
    }
    var fibCounter = fib();
    fibCounter() // should console.log "1"
    fibCounter() // should console.log "1"
    fibCounter() // should console.log "2"
    fibCounter() // should console.log "3"
    fibCounter() // should console.log "5"
    fibCounter() // should console.log "8"
})
