// select Elements
const cardElements = document.querySelectorAll('.card');
const cartContainerEl = document.getElementById('cart-items');
const discountPrice = document.getElementById('discountPrice');
const finalTotalAmount = document.getElementById('total')
const couponBtn = document.getElementById('couponBtn');
const totalPriceEl = document.getElementById('totalPrice');
const purchaseBtn = document.getElementById('btn-purchase')
const btnHome = document.getElementById('btn-home');

// all variables
let cart = []
let totalPurchase = 0;

// add event
cardElements.forEach(cardEl => {
    const cardTitle = cardEl.querySelector('#card-title');
    const cardPrice = cardEl.querySelector('#card-price');

    cardEl.addEventListener('click', function () {
        const title = cardTitle.textContent;
        const price = cardPrice.textContent;
        cart.push({ title, price });

        updateCartDisplay();
        updatePrice();
    });
});

function updateCartDisplay() {
    let cartContent = '';

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        cartContent += `<p class="text-xl font-semibold mb-3">
                            <span>${ i + 1 }.</span>
                            <span>${ item.title }</span>
                        </p>`;
    }

    cartContainerEl.innerHTML = cartContent;
}



function updatePrice() {
    const totalAmount = totalPriceEl.innerText;
    const amount = parseFloat(totalAmount);

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const currentPrice = parseFloat(item.price)
        const totalBalance = amount + currentPrice;
        totalPriceEl.innerText = totalBalance;
        totalPurchase = totalBalance;
        purchaseBtn.removeAttribute('disabled');
    }
    if (totalPurchase >= 200) {
        couponBtn.removeAttribute('disabled')
    }
}

// coupon apply function
// const couponBtn = document.getElementById('couponBtn');
couponBtn.addEventListener('click', function () {
    const inputEl = document.getElementById('couponValue').value;

    if (inputEl !== "SELL200") {
        alert("You provided coupon is not valid!");
        return;
    }

    // update discount section inner Text
    const calculateDiscount = (totalPurchase * 20) / 100;
    const discountPrev = parseFloat(discountPrice.innerText);
    const totalDiscount = discountPrev + calculateDiscount;
    discountPrice.innerText = totalDiscount.toFixed(2);
    totalPurchase = totalPurchase - calculateDiscount;
    // update final total amount
    const finalTotal = (totalPurchase - totalDiscount).toFixed(2);
    finalTotalAmount.innerText = finalTotal;
    couponBtn.setAttribute('disabled', true)

});


// modal home button
btnHome.addEventListener('click', function () {
    cartContainerEl.innerHTML = '';
    cart = []
    totalPriceEl.textContent = '00'
    totalPurchase = 0;
    discountPrice.innerText = '00'
    finalTotalAmount.innerText = '00'
    purchaseBtn.setAttribute('disabled', true);
    couponBtn.setAttribute('disabled', true)
})