const API_URL = import.meta.env.PROD
  ? 'https://YOUR-BACKEND-URL' // потом заменишь
  : 'http://localhost:5000';

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return [];
  }
}

const allCardsElement = document.getElementById("all-cards");

async function writeProduct() {
  const products = await getProducts();

  products.forEach((element) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("cards");

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imgWrapper");

    const newImg = document.createElement("img");
    newImg.src = element.image;
    imgWrapper.appendChild(newImg);

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title");

    const newTitle = document.createElement("h4");
    newTitle.textContent = element.name;
    newTitle.classList.add("cursor-pointer", "hover:underline");

    newTitle.addEventListener("click", () => {
      window.location.href = `./about.html?id=${element.id}`;
    });

    const newPrice = document.createElement("p");
    newPrice.classList.add("price");
    newPrice.textContent = `$${element.price}`;

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonWrapper");

    const newButton = document.createElement("button");
    newButton.classList.add("button");
    newButton.textContent = "Приобрести товар";

    titleWrapper.appendChild(newTitle);
    buttonDiv.appendChild(newButton);

    cardElement.appendChild(imgWrapper);
    cardElement.appendChild(titleWrapper);
    cardElement.appendChild(newPrice);
    cardElement.appendChild(buttonDiv);

    allCardsElement.appendChild(cardElement);
  });
}

writeProduct();
