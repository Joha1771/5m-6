
async function getProduct() {
  try {
    const res = await fetch("http://localhost:5000/products");
    const data1 = await res.json();
    return data1.data;
  } catch (err) {
    console.error("Ошибка запроса:", err);
  }
}


const allCardsElement = document.getElementById("all-cards");

if (allCardsElement) {
  async function writeProduct() {
    const products = await getProduct();
    if (!products) return;

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
      newTitle.style.cursor = "pointer";


      newTitle.addEventListener("click", () => {
        window.location.href = `about.html?id=${element.id}`;
      });

      titleWrapper.appendChild(newTitle);


      const newPrice = document.createElement("p");
      newPrice.classList.add("price");
      newPrice.textContent = `$${element.price}`;


      const buttonDiv = document.createElement("div");
      buttonDiv.classList.add("buttonWrapper");

      const newButton = document.createElement("button");
      newButton.classList.add("button");
      newButton.textContent = "Приобрести товар";

      buttonDiv.appendChild(newButton);


      cardElement.appendChild(imgWrapper);
      cardElement.appendChild(titleWrapper);
      cardElement.appendChild(newPrice);
      cardElement.appendChild(buttonDiv);


      allCardsElement.appendChild(cardElement);
    });
  }
  writeProduct();
}


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {

    const showTargetProduct = () => {
        const targetBlock = document.getElementById(`product-${productId}`);
        if (targetBlock) {
            targetBlock.classList.remove('hidden');
            targetBlock.classList.add('flex');
        } else {
            console.warn("Блок для товара с ID " + productId + " не найден в HTML");
        }
    };

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', showTargetProduct);
    } else {
        showTargetProduct();
    }
}
