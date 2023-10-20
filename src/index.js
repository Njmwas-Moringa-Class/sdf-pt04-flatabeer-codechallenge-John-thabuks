// Code here

document.addEventListener("DOMContentLoaded", () => {

    // base URL
    const baseURL = "http://localhost:3000"

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
        const customerReviewText = customerRemarks.value.trim()

        if(customerReviewText !== ""){

        // Lets grab the section where the reviews are stored
        // <ul id="review-list">
            const listReviewStorage = document.getElementById("review-list")
        // Now we need to create a li, insert customer review and append to listReviewStorage
            const newCustomerReviewli = document.createElement("li")
            newCustomerReviewli.textContent = customerReviewText
            listReviewStorage.appendChild(newCustomerReviewli)
            customerReviewForm.reset()

            // Here we need to have our reviews sent to the server db.json
            const ourReviewData = { ...getReviewsFromThePage, customerReviewText}            

            //we now need to do an PATCH on the server
            fetch(`${baseURL}/beers`)
            .then(response => response.json)
            .then(data => {
                if(Array.isArray(data)){
                data.forEach(beer =>{
                    fetch(`${baseURL}/beers/${beer.id}`,{
                        method: "PATCH",
                        "Content-Type": "application/json",
                        body: JSON.stringify(ourReviewData)
                    })
                    .then(response => response.json())
                    .then(responseBeerData =>{
                        console.log(`This is the server response for ${beer.id}:  ${responseBeerData}`)
                    })
                })}
            })

        // Lets delete the customer review when we click it
        newCustomerReviewli.addEventListener("click", () => {
            console.log(newCustomerReviewli.remove())
        })
        }
    })

    // Lets create the getReviewsFromThePage function here 
    function getReviewsFromThePage(){
        const reviews = []
        const getAllReviewItems = document.querySelectorAll("#review-list li")
        getAllReviewItems.forEach(reviewEachItem =>{
            reviews.push(reviewEachItem.textContent)
        })
        return reviews
    }
    // We need to grab the form that will update review in our db.json
    // <form id="description-form">
    const grabFormDesc = document.getElementById("description-form")
    const descFormTextAreaElement = document.getElementById("description")
    grabFormDesc.addEventListener("submit", (e) => {
        e.preventDefault()
        let productOneDescriptionUpdate = descFormTextAreaElement.value.trim()

        if(productOneDescriptionUpdate !== ""){
            // here we need to display the new description
            beerDescElement.textContent = productOneDescriptionUpdate
            grabFormDesc.reset()

            // we attempt to send our new description to the server
            const descriptionInfo = {
                description: productOneDescriptionUpdate
            }
            
            // lets fetch the list of beers first using the GET so that we can update
            fetch(`${baseURL}/beers`)
            .then(response => response.json())
            .then(beers =>{
                if(Array.isArray(beers)){
                    beers.forEach(beer =>{
                        // on each beer lets do a PATCH 
                        fetch(`${baseURL}/beers/${beer.id}`,{
                            method: "PATCH",
                            "Content-Type": "application/json",
                            body: JSON.stringify(descriptionInfo)
                        })
                        .then(response => response.json())
                        .then(post => console.log(`Description ${beer.description} has be updated to ${post}`))
                    })
                }
            })
        }
    })

    
    //Lets make the above be fetched from our db.json
    fetch(`${baseURL}/beers`)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                return Promise.reject(new Error(resp))
            }
        })
        .then(data => {

            // // Here we are selecting the first object from the fetch output
            // const firstBeer = data[0]



            // beerNameElement.textContent = firstBeer.name

            // // // // Note here we need to set the Attribute not get the attribute
            // beerImageElement.setAttribute("src", firstBeer.image_url)
            // beerDescElement.textContent = firstBeer.description



            // we need to creat the nav bar beer list
            data.forEach(
                beer => {
                    const navBeerName = beer.name

                    // we need to create new li for each beer name
                    const li = document.createElement("li")
                    // We need now to add the create li our beer name
                    li.textContent = navBeerName

                    //we need to add an eventListener to the li so that when we click any 
                    // beer on navbar it gets displayed at the main
                    li.addEventListener("click", () => {
                        fetch(`${baseURL}/beers/${beer.id}`)
                            .then(response => response.json())
                            .then(beerData => {
                                beerNameElement.textContent = beerData.name
                                beerImageElement.setAttribute("src", beerData.image_url)
                                beerDescElement.textContent = beerData.description

                                // we need to look into reviews for each beer
                                const listReviewStorage = document.getElementById("review-list")

                                // lets loop through the reveiws 
                                beerData.reviews.forEach(review => {                                    
                                    const newCustomerReviewli = document.createElement("li")
                                    newCustomerReviewli.textContent = review
                                    listReviewStorage.appendChild(newCustomerReviewli)
                                    customerReviewForm.reset()
                                })

                            })
                    })

                    navBarElementUl.appendChild(li)
                }
            )


        })

})

