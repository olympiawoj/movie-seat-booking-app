const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

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

// Get data from localstorage and populate UI
function populateUI() {
    //GET selected seats from local storage
    //Parse from string to array
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    //Check to see if any seats in local storage & if length of selectedSeats is greater than 0 
    if (selectedSeats != null && selectedSeats.length > 0) {

        //If there are selectedSeats, loop through and add selectedClass in UI0
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                //index is in selectedSeat array so add class
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }


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



// Initial count and total set
// updateSelectedCount is where our # of seats and price get updated - let's call this on page load
updateSelectedCount()