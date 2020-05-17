const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

// +turns string into num, also wrap it in parseInt
// test doing typeOf
let ticketPrice = +movieSelect.value

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


// Update total and count
function updateSelectedCount() {
    //select all selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    // Copies the elements of selectedSeats node list into this array
    // map returns an array
    // seatsIndex is an array of selected seat indexes             // indexOf returns index of seats selected
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)
    )
    //console.logs a list of all selected seat indexes
    console.log(seatsIndex)

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))



    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// MOVIE SELECT EVENT
// change event for select
movieSelect.addEventListener('change', (e) => {
    //+ makes it a number
    ticketPrice = +e.target.value
    setMovieData(event.target.selectedIndex, e.target.value)
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