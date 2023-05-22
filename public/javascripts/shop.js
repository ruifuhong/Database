const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  const productId = section.querySelector(".product_id");
  const productName = section.querySelector(".product_name");
  const productPrice = section.querySelector(".product_price");
  const productImage = section.querySelector(".image").getAttribute("src");

  section.addEventListener("click", () => {
    const data = {
      productId: productId.innerText,
      productName: productName.innerText,
      productPrice: productPrice.innerText,
      productImage: productImage,
    };

    console.log(data);
    fetch("/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("對了對了");
        console.log(result);
      })
      .catch((error) => {
        console.log("錯了錯了");
        console.error("資料插入失敗：", error);
      });
  });
});
