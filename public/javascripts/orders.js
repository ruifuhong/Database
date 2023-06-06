const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
    const productId = section.querySelector(".product_id").innerText;
    const minusButton = section.querySelector(".order-minus");
    const addButton = section.querySelector(".order-add");
    const quantityDiv = section.querySelector(".order-quantity");

    minusButton.addEventListener("click", (event) => {
        event.stopPropagation();
        let quantity = parseInt(quantityDiv.innerText);
        if (quantity > 0) {
            quantity--;
            quantityDiv.innerText = quantity.toString();
            updateQuantity(productId, quantity);
        }
    });

    addButton.addEventListener("click", (event) => {
        event.stopPropagation();
        let quantity = parseInt(quantityDiv.innerText);
        quantity++;
        quantityDiv.innerText = quantity.toString();
        updateQuantity(productId, quantity);
    });

    const updateQuantity = (productId, quantity) => {
        fetch(`/order/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: productId, quantity: quantity }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("數量更新成功");
                } else {
                    console.error("數量更新失敗");
                }
            })
            .catch((error) => {
                console.error("數量更新失敗:", error);
            });
    };

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
