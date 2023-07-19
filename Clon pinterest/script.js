document.addEventListener("DOMContentLoaded", function() {
  const content = document.getElementById("content");
  const baseImageUrl = "https://loremflickr.com/230/{height}/city";"https://loremflickr.com/230/{height}/nature";
  const imageUrls = [];
  
  for (let i = 0; i < 40; i++) {
    const height = 400 + i * 5;
    const imageUrl = baseImageUrl.replace("{height}", height);
    imageUrls.push(imageUrl);
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  imageUrls.sort(compareRandom);

  imageUrls.forEach(function(url) {
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-image");
  
    const image = document.createElement("img");
    image.src = url;
    image.style.objectFit = "cover";
  
    cardImage.appendChild(image);
    content.appendChild(cardImage);
  });

  initializeMasonry();
});

function initializeMasonry() {
  const grid = document.getElementById("content");
  const msnry = new Masonry(grid, {
    itemSelector: ".card-image",
    columnWidth: ".card-image",
    percentPosition: true,
    gutter: 20
  });

  msnry.reloadItems();
}
