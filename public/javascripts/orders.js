const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  const productId = section.querySelector(".product_id").innerText;

  section.addEventListener("click", () => {
    console.log("product id is " + productId);

    fetch(`/order/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("資料刪除成功");
          window.location.reload();
        } else {
          console.error("資料刪除失敗");
        }
      })
      .catch((error) => {
        console.error("資料刪除失敗:", error);
      });
  });
});
