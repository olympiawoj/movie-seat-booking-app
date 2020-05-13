const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

// +turns string into num, also wrap it in parseInt
// test doing typeOf
let ticketPrice = +movieSelect.value


// Update total and count
function updateSelectedCount() {
    //select all selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    console.log(selectedSeats)
    const selectedSeatsCount = selectedSeats.length;
    console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// MOVIE SELECT EVENT
// change event for select
movieSelect.addEventListener('change', (e) => {
    //+ makes it a number
    ticketPrice = +e.target.value
    updateSelectedCount()
})

// SEAT CLICK EVENT
//change class to selected to turn seat white
// we colud loop through this,  but let's add event listener to container
// when we run event, make sure it's a seat we're clicking on then add functionality
container.addEventListener('click', (e) => {
    //gives us exact element we're clicking on
    // console.log(e.target)
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        console.log(e.target)

        //our click event are working on avail seat
        //now toggle selected class to turn seat blue
        e.target.classList.toggle('selected');
        updateSelectedCount()
    }
})