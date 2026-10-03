// ACTIVE BUTTON
function setActiveButton(btn, id){
  document.querySelectorAll(id+" button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

// SEARCH
function searchFood() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const result = document.getElementById("searchResult");

  if (!input) {
    result.innerHTML = "<p>Type a food to search</p>";
    return;
  }

  // 🔍 KEYWORD MATCHING
  if (input.includes("sandwich")) {
    result.innerHTML = `
      <div class="recipe">
        <h3>Sandwich Swaps</h3>
        <p><b>Bread:</b> Sourdough / Whole Grain</p>
        <p><b>Condiments:</b> Primal Kitchen mayo / Mustard</p>
        <p><b>Protein:</b> Grilled chicken / Tofu</p>
        <p><b>Add-ons:</b> Spinach, tomato, avocado</p>
      </div>
    `;
    return;
  }

  // 🍕 RECIPE SEARCH (this is the important part)
  const recipeKeys = Object.keys(recipes);

  const match = recipeKeys.find(r =>
    r.toLowerCase().includes(input)
  );

  if (match) {
    // show recipe directly
    const recipe = recipes[match];

    result.innerHTML = `
      <div class="recipe">
        <h3>${recipe.title}</h3>
        <div class="meta">${recipe.details.join(" • ")}</div>

        <div class="section-title">Ingredients</div>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>

        <div class="section-title">Instructions</div>
        <ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      </div>
    `;
    return;
  }

  // ❌ fallback
  result.innerHTML = `
    <div class="recipe">
      <p>No results found. Try: pizza, tacos, burger, curry</p>
    </div>
  `;
}

// SWAPS
function handleCategoryClick(e,c){
  setActiveButton(e.target,"#categoryRow");
  showCategory(c);
}

function handleItemClick(e,i){
  setActiveButton(e.target,"#itemButtons");
  showSwaps(i);
}

function showCategory(c){
  const itemButtons = document.getElementById("itemButtons");
  const swapResults = document.getElementById("swapResults");

  itemButtons.innerHTML = "";
  swapResults.innerHTML = "";

 const data = {
  sweeteners: ["Sugar", "Artificial Dyes"],
  drinks: ["Soda", "Creamer"],
  snacks: ["Candy", "Chips/Crackers"],
  dairy: ["Yogurt", "Milk"],
  pantry: ["Bread", "Cereal"],
  condiments: ["Ketchup", "Peanut Butter"]
};

  itemButtons.innerHTML =
  data[c].map(i=>`<button class="item-btn" onclick="handleItemClick(event,'${i}')">${i}</button>`).join("");
}

function showSwaps(i){
  const swapResults = document.getElementById("swapResults");

  swapResults.innerHTML = "";

 const swaps = {
  "Sugar": ["Monkfruit", "Honey", "Maple Syrup", "Dates", "Coconut Sugar"],
  "Artificial Dyes": ["Beet Juice", "Turmeric", "Spirulina", "Annatto"],
  "Soda": ["Olipop", "Poppi", "Zevia", "Spindrift", "Culture Pop"],
  "Creamer": ["Malk", "Califia", "Forager", "Laird"],
  "Candy": ["Hu Chocolate", "Unreal", "Yum Earth", "Soley"],
  "Chips/Crackers": ["Siete", "Simple Mills", "Mary’s Gone Crackers"],
  "Yogurt": ["Fage", "Siggi’s", "Stonyfield", "Chobani Plain"],
  "Milk": ["Malk", "Califia Organic", "Mooala"],
  "Bread": ["Sourdough", "Base Culture", "One Mighty Mill"],
  "Cereal": ["Purely Elizabeth", "Seven Sundays", "Ezekiel"],
  "Ketchup": ["Primal Kitchen"],
  "Peanut Butter": ["Santa Cruz Organic"]
};

  swapResults.innerHTML =
  (swaps[i]||[]).map(s=>`<div class="swap-chip">${s}</div>`).join("");
}

// RECIPES
function handleCuisineClick(e,c){
  setActiveButton(e.target,"#cuisineRow");
  showCuisine(c);
}

function handleRecipeClick(e,r){
  setActiveButton(e.target,"#recipeItems");
  showRecipe(r);
}

function showCuisine(c){
  const data = {
    chinese: ["Spring Rolls", "Chow Mein"],
    italian: ["Pizza", "Pasta"],
    mexican: ["Tacos", "Enchiladas"],
    thai: ["Pad Thai", "Curry"],
    indian: ["Tikka Masala", "Samosa"],
    japanese: ["Katsu"],
    american: ["Burger", "Fries"]
  };

  document.getElementById("recipeItems").innerHTML =
  data[c].map(r => 
    `<button class="recipe-btn" onclick="handleRecipeClick(event,'${r}')">${r}</button>`
  ).join("");

  document.getElementById("recipeCard").innerHTML = "";
}

  
function showRecipe(r){
  const recipe = recipes[r];

  if(!recipe){
    document.getElementById("recipeCard").innerHTML = "<p>No recipe found</p>";
    return;
  }

  document.getElementById("recipeCard").innerHTML = `
  <div class="recipe">
    <h3>${recipe.title}</h3>
    <div class="meta">${recipe.details.join(" • ")}</div>

    <div class="section-title">Ingredients</div>
    <ul>${recipe.ingredients.map(i=>`<li>${i}</li>`).join("")}</ul>

    <div class="section-title">Instructions</div>
    <ol>${recipe.steps.map(s=>`<li>${s}</li>`).join("")}</ol>

    <p><a href="${recipe.link}" target="_blank">View Full Source</a></p>
  </div>`;
}