/*Handle What i will Send to The FUnction to Call Api*/
const showData = document.getElementById("MyData");
const li = document.querySelectorAll(".linksHere li");

$(document).ready(() => {
  $(".lds-roller").fadeOut(500);
  $("body").css("overflow", "visible");
});

for (let i = 0; i < li.length; i++) {
  li[i].addEventListener("click", (e) => {
    let WhatWillWork = e.target.getAttribute("value");
    if (WhatWillWork == "search") {
      $("#search").css("display", "block");
      $("#mainShow").css("display", "none");
      $("#DeatilsShow").css("display", "none");
      $("#contact").css("display", "none");
    } else if (WhatWillWork == "categories") {
      $("#search").css("display", "none");
      $("#mainShow").css("display", "block");
      $("#DeatilsShow").css("display", "none");
      $("#contact").css("display", "none");
      GetCategory();
    } else if (WhatWillWork == "area") {
      getArea();
      $("#search").css("display", "none");
    } else if (WhatWillWork == "ingredients") {
      getIngredients();
    } else if (WhatWillWork == "contact") {
      $("#search").css("display", "none");
      showContacts();
    }
  });
}

/*---------------------------------------------------------------------------------------------*/
/*Fist Show section*/
async function MainFoodShow() {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let res = await data.json();
  displayAllFoods(res.meals);
  $("#contact").css("display", "none");
  $("#Loading").css("display", "none");
  $(".lds-roller").fadeOut(500);
}

MainFoodShow();
function displayAllFoods(food) {
  let cartona = ``;

  for (let i = 0; i < food.length; i++) {
    let myID = food[i].idMeal;
    cartona += `
        <div class="col-md-3">
        <div class="box">
        <div onclick="getFoodDetails('${myID}')">
            <img src="${food[i].strMealThumb}" alt="">
            <div class="layer">
                <h2>${food[i].strMeal}</h2>
            </div>
        </div>
    </div>
    </div>

        `;
  }

  showData.innerHTML = cartona;
}

async function getFoodDetails(myID) {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${myID}`
  );
  let res = await data.json();
  displayFoodDetails(res.meals);
  $(".lds-roller").fadeOut(500);
}

function displayFoodDetails(food) {
  console.log(food);
  let cartona = `
    <div class="col-md-5 p-5">
    <div class="box-img mb-3">
        <img src="${food[0].strMealThumb}" class="w-100 p-2" alt="">
    </div>
    <h3 class="text-white fs-2">${food[0].strMeal}</h3>
   </div>
   <div class="col-md-7 p-4 mt-3 text-white">
    <h2>Instructions</h2>
   <p>${food[0].strInstructions}</p>
   <p class="fs-2">Area :<span>${food[0].strArea}</span></p>
   <p class="fs-2">Category  :<span> ${food[0].strCategory}</span></p>
    <p class="fs-2"> Recipes :</p>
    <ul>
    <li class="alert alert-info m-2 p-1">${food[0].strMeasure1} ${
    food[0].strIngredient1
  }
    ${food[0].strMeasure2} ${food[0].strIngredient2}
    ${food[0].strMeasure3} ${food[0].strIngredient3}
    ${food[0].strMeasure4} ${food[0].strIngredient4}
    ${food[0].strMeasure5} ${food[0].strIngredient5}
    ${food[0].strMeasure6} ${food[0].strIngredient6}
    ${food[0].strMeasure7} ${food[0].strIngredient7}
    ${food[0].strMeasure8} ${food[0].strIngredient8}
    
    </li>
    </ul>
    <p class="fs-2">tage :</p>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    <li class="alert alert-danger m-2 p-1">${
      food[0].strTags ? food[0].strTags : "No Tags"
    }</li>
    </ul>
    <a target="_blank" href="${
      food[0].strSource
    }" class="btn btn-success">Source</a>
    <a target="_blank" href="${
      food[0].strYoutube
    }" class="btn btn-danger">Youtube</a>

</div>
   `;
  //    showData.innerHTML=cartona

  document.getElementById("DeatilsHere").innerHTML = cartona;
  $("#search").css("display", "none");
  $("#mainShow").css("display", "none");
}

/*---------------------------------------------------------------------------------------------*/

/*Search Section*/
async function GetSearchName(search) {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  let res = await data.json();
  $(".lds-roller").fadeOut(300);
  displaySearchCategory(res.meals);
}

function displaySearchCategory(data) {
  if (data.length == 1) {
    console.log("yes");
    cartona = `
            <div class="col-md-3">
             <div class="box">
              <img src="${data[0].strMealThumb}" alt="">
              <div class="layer">
                  <h2>${data[0].strMeal}</h2>
              </div>
                </div>
             </div>
         </div>
             `;
    document.getElementById("SearchData").innerHTML = cartona;
    document.querySelector(".inputs").innerHTML = ``;
  } else {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
      cartona += `
            <div class="col-md-3">
            <div class="box">
             <img src="${data[i].strMealThumb}" alt="">
             <div class="layer">
                 <h2>${data[i].strMeal}</h2>
             </div>
               </div>
            </div>
        </div>
            `;
    }
    document.getElementById("SearchData").innerHTML = cartona;
    document.querySelector(".inputs").innerHTML = ``;
  }
}

async function searchByFirstLetter(letter) {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let res = await data.json();
  displaySearchCategory(res.meals);
  $(".lds-roller").fadeOut(300);
}

/*---------------------------------------------------------------------------------------------*/

/*Category Section*/
async function GetCategory() {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let res = await data.json();
  displayCategory(res.categories);
  $(".lds-roller").fadeOut(300);
}
function displayCategory(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
        <div class="col-md-3" >
        <div class="box" onclick="getCategoryFoodDeatils('${
          data[i].strCategory
        }') ">
            <img src="${data[i].strCategoryThumb}" alt="">
            <div class="layer">
                <h2 >${data[i].strCategory}</h2>
                <p>${data[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
            </div>
        </div>
    </div>
        `;
  }
  showData.innerHTML = cartona;
}

async function getCategoryFoodDeatils(category) {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let res = await data.json();
  displayAllFoods(res.meals.slice(0, 20));
  $(".lds-roller").fadeOut(300);
}

/*---------------------------------------------------------------------------------------------*/
/*Area Section  */
async function getArea() {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let res = await data.json();
  displayAreaZone(res.meals);
  $(".lds-roller").fadeOut(300);
}

function displayAreaZone(area) {
  let cartona = ``;

  for (let i = 0; i < area.length; i++) {
    cartona += `
        <div class="col-md-3" id="getAreasDeatils" onclick="getAreaFood('${area[i].strArea}') ">
                <div '${area[i].strArea}' class="rounded-2 text-center  mt-3 ">
                        <i class="text-white fa-solid fa-house-laptop fa-4x AreaPointr"></i>
                        <h3 class="AreaPointr text-white">${area[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  showData.innerHTML = cartona;
}
async function getAreaFood(Food) {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Food}`
  );
  let res = await data.json();
  displayAllFoods(res.meals.slice(0, 20));
  $(".lds-roller").fadeOut(300);
}

/*---------------------------------------------------------------------------------------------*/
/*INgredients Section*/
async function getIngredients() {
  showData.innerHTML = "";
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let res = await data.json();
  displayIntgredient(res.meals.slice(0, 20));
  $(".lds-roller").fadeOut(300);
}

function displayIntgredient(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div class="card-box" onclick="getIngredientsFood('${
          data[i].strIngredient
        }')">
            <i class="fa-solid fa-drumstick-bite"></i>
            <div class="card-body">
              <h5 class="title">${data[i].strIngredient}</h5>
              <p class="card-text">${data[i].strDescription.slice(0, 100)}</p>
             
            </div>
          </div>
      </div>
      
        `;
  }
  showData.innerHTML = cartona;
}

async function getIngredientsFood(Food) {
  $(".lds-roller").fadeIn(300);
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Food}`
  );
  let res = await data.json();
  displayAllFoods(res.meals.slice(0, 20));
  $(".lds-roller").fadeOut(300);
}

/*---------------------------------------------------------------------------------------------*/
/*Handle SideBar Section*/

let WidthforSide = $(".navhead").innerWidth();
$("#sideBar").css("left", -WidthforSide);
$(".rightSide .aft7").on("click", () => {
  if ($("#sideBar").css("left") == "0px") {
    $("#sideBar").animate({ left: -WidthforSide }, 500);
    $(".close").css("display", "none");
    $(".menu").css("display", "block");
    $(".links-sideBar ul li").animate(
      {
        top: 300,
      },
      500
    );
  } else {
    $("#sideBar").animate({ left: 0 }, 500);
    $(".close").css("display", "block");
    $(".menu").css("display", "none");
    for (let i = 0; i < 5; i++) {
      $(".links-sideBar ul li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
  }
});
/*Contact Section*/

function showContacts() {
  showData.innerHTML = ` <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`;
  submitBtn = document.getElementById("submitBtn");
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameLabel = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailLabel = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneLabel = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageLabel = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordLabel = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordLabel = true;
  });
}

let nameLabel = false;
let emailLabel = false;
let phoneLabel = false;
let ageLabel = false;
let passwordLabel= false;
let repasswordLabel = false;

function inputsValidation() {
  if (nameLabel) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailLabel) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneLabel) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageLabel) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordLabel) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordLabel) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value
  );
}
