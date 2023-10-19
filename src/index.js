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
    customerReviewForm.addEventListener("submit",(e)=>{
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

    })
    




    //Lets make the above be fetched from our db.json
    fetch("http://localhost:3000/beers")
    .then(resp => resp.json())
    .then(data => {

        // Here we are selecting the first object from the fetch output
        const firstBeer = data[0]

        beerNameElement.textContent = firstBeer.name

        // Note here we need to set the Attribute not get the attribute
        beerImageElement.setAttribute("src", firstBeer.image_url)
        beerDescElement.textContent = firstBeer.description

        
        // we need to creat the nav bar beer list
        data.forEach(
            beer => {
                const navBeerName = beer.name

                // we need to create new li for each beer name
                const li = document.createElement("li")
                // We need now to add the create li our beer name
                li.textContent = navBeerName
                // Now the child li needs to be appended to the parent ul which we accessed above
                navBarElementUl.appendChild(li)
            }
        )

    })

})

