// Встроенные данные продуктов (вместо fetch с localhost)
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Ноутбук HP 15-FC0002NIA, Ryzen 5-7520U",
    price: "4 349 000",
    image: "/card1-1.png"
  },
  {
    id: 2,
    name: "HP Laptop 15-FD0133WM I3-N305",
    price: "4 389 000",
    image: "/card2-1.webp"
  },
  {
    id: 3,
    name: "ACER ASPIRE GO 15 AG15-31P-3947",
    price: "3 609 000",
    image: "/card3-1.webp"
  },
  {
    id: 4,
    name: "HP Desktop Pro G2 Micro Tower",
    price: "4 969 000",
    image: "/card4-1.jpg"
  },
  {
    id: 5,
    name: "Apple iMac 24 4K, M3 8/512GB",
    price: "17 079 000",
    image: "/card5-1.webp"
  },
  {
    id: 6,
    name: "THUNDEROBOT Shark i7-14700KF RTX 4060 Ti",
    price: "17 079 000",
    image: "/card6-1.jpg"
  },
  {
    id: 7,
    name: "Thermaltake Versa J24 TG RGB",
    price: "1 200 000",
    image: "/card7-1.webp"
  }
];

async function getProduct() {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS_DATA);
    }, 100);
  });
}

const allCardsElement = document.getElementById("all-cards");

async function writeProduct() {
  try {
    const products = await getProduct();

    if (!products || products.length === 0) {
      console.error("Нет продуктов для отображения");
      return;
    }

    products.forEach((element) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("cards");

      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("imgWrapper");

      const newImg = document.createElement("img");
      newImg.src = element.image;
      newImg.alt = element.name;
      newImg.onerror = function() {
        console.error("Ошибка загрузки изображения:", this.src);
        this.src = "/placeholder.png"; // Fallback изображение
      };
      imgWrapper.appendChild(newImg);

      const titleWrapper = document.createElement("div");
      titleWrapper.classList.add("title");

      const newTitle = document.createElement("h4");
      newTitle.textContent = element.name;
      newTitle.style.cursor = "pointer";

      newTitle.addEventListener("click", () => {
        console.log("Переход на страницу товара ID:", element.id);
        window.location.href = `about.html?id=${element.id}`;
      });

      const newPrice = document.createElement("p");
      newPrice.classList.add("price");
      newPrice.textContent = `${element.price} сум`;

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

    console.log("Продукты успешно отрендерены:", products.length);
  } catch (err) {
    console.error("Ошибка рендера:", err);
  }
}


if (!window.location.pathname.includes("about.html")) {
  console.log("Загружаем продукты на главной странице");
  writeProduct();
}


if (window.location.pathname.includes("about.html")) {
  console.log("Страница about.html");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  console.log("ID продукта из URL:", productId);

  if (productId) {
    const targetBlock = document.getElementById(`product-${productId}`);

    if (targetBlock) {
      targetBlock.classList.remove('hidden');
      targetBlock.classList.add('flex');
      console.log("Показан блок товара с ID:", productId);
    } else {
      console.error("Блок для товара с ID " + productId + " не найден в HTML");
      console.log("Проверьте, что в about.html есть секция с id='product-" + productId + "'");
    }
  } else {
    console.warn("ID товара не найден в URL");
  }
}
