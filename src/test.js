// Code here

document.addEventListener("DOMContentLoaded", () => {

    //We need to access Beer Name
    //"<h2 id="beer-name">Beer Name Goes Here</h2>"
    let beerNameElement = document.getElementById("beer-name");
    // let beerName = beerNameElement.textContent; //This is what we will use to display beers/1 -> name:

    // We need to access beer Image
    //"<img id="beer-image" alt="Beer Name Goes Here" src="assets/image-placeholder.jpg/>"
    let beerImageElement = document.getElementById("beer-image")
    // let beerImage = beerImageElement.getAttribute("src")

    // We need to access beer Description
    //<p> <em id="beer-description">Beer Description Goes Here</em></p>
    let beerDescElement = document.getElementById("beer-description")
    // let beerDescription = beerDescElement.textContent

    // We need to access the nav
    // "<ul id="beer-list">"
    let navBarElementUl = document.getElementById("beer-list")

    // We need to acces the customer review form
    // <form id="review-form">
    const customerReviewForm = document.getElementById("review-form")
    customerReviewForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // lets access the textArea content
        // <textarea id="review"></textarea>
        const customerRemarks = document.getElementById("review")

        // lets get the customer review content input
        const customerReviewText = customerRemarks.value

        // Lets grab the section where the reviews are stored
        // <ul id="review-list">
        const listReviewStorage = document.getElementById("review-list")
        // Now we need to create a li, insert customer review and append to listReviewStorage
        const newCustomerReviewli = document.createElement("li")
        newCustomerReviewli.textContent = customerReviewText
        listReviewStorage.appendChild(newCustomerReviewli)
        customerReviewForm.reset()

        // Lets delete the customer review when we click it
        newCustomerReviewli.addEventListener("click", () => {
            console.log(newCustomerReviewli.remove())
        })
    })

    // We need to grab the form that will update review in our db.json
    // <form id="description-form">
    const grabFormDesc = document.getElementById("description-form")
    const descFormTextAreaElement = document.getElementById("description")
    grabFormDesc.addEventListener("submit", (e) => {
        e.preventDefault()
        let productOneDescriptionUpdate = descFormTextAreaElement.value
    })

    // base URL
    const baseURL = "http://localhost:3000"

    function beersOutput(data){

        beerNameElement.textContent = data.name

        // // // Note here we need to set the Attribute not get the attribute
        beerImageElement.setAttribute("src", data.image_url)
        beerDescElement.textContent = data.description
    }

    //Lets make the above be fetched from our db.json
    fetch(`${baseURL}/beers/1`)
        .then(resp => resp.json())
        .then(data => {

            beersOutput(data)

        })
    
})

