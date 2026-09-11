// ======================================================
// GLOBAL ARRAY
// ======================================================

let groupDrinks = [];


// ======================================================
// QUESTION 1
// LOAD DEFAULT 10 DRINKS
// ======================================================

const LoadAllProduct = () => {

    fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
    )

        .then(response => response.json())

        .then(data => {

            console.log(data);


            // Take only first 10 drinks

            const drinks = data.drinks.slice(0, 10);


            // Display drinks

            displayProduct(drinks);

        })

        .catch(error => {

            console.log("Error:", error);

        });

};



// ======================================================
// QUESTION 3
// DISPLAY DRINK CARDS
// ======================================================

const displayProduct = (drinks) => {


    const productContainer =
        document.getElementById("product-container");


    // Clear previous cards

    productContainer.innerHTML = "";



    // If no drink found

    if (!drinks || drinks.length === 0) {

        productContainer.innerHTML = `

            <div class="not-found">

                <i class="fa-solid fa-face-sad-tear"></i>

                <h2>Drink Not Found</h2>

                <p>
                    Try searching another drink.
                </p>

            </div>

        `;

        return;

    }



    // Create cards

    drinks.forEach(drink => {


        const div =
            document.createElement("div");


        div.classList.add("card");



        // Instructions

        let instructions =
            drink.strInstructions ||
            "No instructions available";



        // Only 15 letters

        if (instructions.length > 15) {

            instructions =
                instructions.substring(0, 15) + "...";

        }



        // Card HTML

        div.innerHTML = `

            <img
                class="card-img"
                src="${drink.strDrinkThumb}"
                alt="${drink.strDrink}"
            >


            <div class="card-body">


                <!-- Drink Name -->

                <h3>

                    ${drink.strDrink}

                </h3>



                <!-- Category -->

                <p class="category">

                    <strong>
                        Category:
                    </strong>

                    ${drink.strCategory || "N/A"}

                </p>



                <!-- Instructions -->

                <p class="instructions">

                    <strong>
                        Instructions:
                    </strong>

                    ${instructions}

                </p>



                <!-- Buttons -->

                <div class="card-buttons">


                    <!-- Add to Group -->

                    <button
                        class="add-group-btn"
                        onclick="addToGroup(
                            '${drink.idDrink}',
                            '${drink.strDrink}',
                            '${drink.strDrinkThumb}'
                        )">

                        <i class="fa-solid fa-plus"></i>

                        Add to Group

                    </button>



                    <!-- Details -->

                    <button
                        class="details-btn"
                        onclick="showDetails(
                            '${drink.idDrink}'
                        )">

                        <i class="fa-solid fa-circle-info"></i>

                        Details

                    </button>


                </div>


            </div>

        `;



        productContainer.appendChild(div);


    });

};



// ======================================================
// QUESTION 2
// SEARCH DRINK
// ======================================================

const searchDrink = () => {


    const searchInput =
        document.getElementById("search-input");


    const searchValue =
        searchInput.value.trim();



    // Empty search

    if (searchValue === "") {

        LoadAllProduct();

        return;

    }



    fetch(

        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`

    )

        .then(response => response.json())

        .then(data => {


            console.log(data);


            // Display search results

            displayProduct(data.drinks);


        })

        .catch(error => {

            console.log("Error:", error);

        });

};



// ======================================================
// QUESTION 5 + QUESTION 6
// ADD TO GROUP
// ======================================================

const addToGroup = (id, name, image) => {


    // Maximum 7 drinks

    if (groupDrinks.length >= 7) {

        alert(
            "You cannot add more than 7 drinks to a group!"
        );

        return;

    }



    // Check duplicate

    const alreadyAdded =
        groupDrinks.find(
            drink => drink.id === id
        );



    if (alreadyAdded) {

        alert(
            "This drink is already added to the group!"
        );

        return;

    }



    // Add drink to array

    groupDrinks.push({

        id: id,

        name: name,

        image: image

    });



    // Display group

    displayGroup();



    // Update count

    updateGroupCount();

};



// ======================================================
// QUESTION 4
// DISPLAY GROUP ITEMS
// ======================================================

const displayGroup = () => {


    const groupContainer =
        document.getElementById("group-items");


    // Clear old items

    groupContainer.innerHTML = "";



    // Empty group

    if (groupDrinks.length === 0) {


        groupContainer.innerHTML = `

            <div class="empty-group">

                No drink added yet.

            </div>

        `;


        return;

    }



    // Display selected drinks

    groupDrinks.forEach((drink, index) => {


        const div =
            document.createElement("div");


        div.classList.add("group-item");



        div.innerHTML = `

            <!-- SL -->

            <div class="group-sl">

                ${index + 1}

            </div>



            <!-- IMAGE -->

            <div class="group-image">

                <img
                    src="${drink.image}"
                    alt="${drink.name}"
                >

            </div>



            <!-- NAME -->

            <div class="group-drink-name">

                ${drink.name}

            </div>



            <!-- DELETE -->

            <button
                class="delete-btn"
                onclick="removeFromGroup(
                    '${drink.id}'
                )">

                <i class="fa-solid fa-trash"></i>

            </button>


        `;



        groupContainer.appendChild(div);


    });

};



// ======================================================
// UPDATE GROUP COUNT
// ======================================================

const updateGroupCount = () => {


    document.getElementById("group-count")
        .innerText = groupDrinks.length;

};



// ======================================================
// REMOVE FROM GROUP
// ======================================================

const removeFromGroup = (id) => {


    groupDrinks =
        groupDrinks.filter(
            drink => drink.id !== id
        );



    // Update group

    displayGroup();



    // Update count

    updateGroupCount();

};



// ======================================================
// QUESTION 7
// SHOW DETAILS MODAL
// ======================================================

const showDetails = (id) => {


    fetch(

        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    )

        .then(response => response.json())

        .then(data => {


            const drink =
                data.drinks[0];



            const modalBody =
                document.getElementById("modal-body");



            // Modal information

            modalBody.innerHTML = `


                <!-- Image -->

                <img
                    class="modal-img"
                    src="${drink.strDrinkThumb}"
                    alt="${drink.strDrink}"
                >



                <!-- Name -->

                <h2>

                    ${drink.strDrink}

                </h2>



                <!-- Category -->

                <div class="detail-item">

                    <strong>

                        <i class="fa-solid fa-layer-group"></i>

                        Category:

                    </strong>

                    ${drink.strCategory || "N/A"}

                </div>



                <!-- Glass -->

                <div class="detail-item">

                    <strong>

                        <i class="fa-solid fa-wine-glass"></i>

                        Glass:

                    </strong>

                    ${drink.strGlass || "N/A"}

                </div>



                <!-- Alcoholic -->

                <div class="detail-item">

                    <strong>

                        <i class="fa-solid fa-circle-check"></i>

                        Alcoholic:

                    </strong>

                    ${drink.strAlcoholic || "N/A"}

                </div>



                <!-- Drink ID -->

                <div class="detail-item">

                    <strong>

                        <i class="fa-solid fa-hashtag"></i>

                        Drink ID:

                    </strong>

                    ${drink.idDrink}

                </div>



                <!-- Instructions -->

                <div class="detail-item">

                    <strong>

                        <i class="fa-solid fa-list"></i>

                        Instructions:

                    </strong>

                    <p>

                        ${drink.strInstructions || "N/A"}

                    </p>

                </div>


            `;



            // Show modal

            document.getElementById("details-modal")
                .style.display = "flex";


        })

        .catch(error => {

            console.log("Error:", error);

        });

};



// ======================================================
// CLOSE MODAL
// ======================================================

const closeModal = () => {


    document.getElementById("details-modal")
        .style.display = "none";

};



// ======================================================
// CLOSE MODAL BY CLICKING OUTSIDE
// ======================================================

window.onclick = function(event) {


    const modal =
        document.getElementById("details-modal");



    if (event.target === modal) {

        modal.style.display = "none";

    }

};



// ======================================================
// INITIAL LOAD
// ======================================================

LoadAllProduct();


displayGroup();


updateGroupCount();