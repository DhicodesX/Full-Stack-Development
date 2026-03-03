
const generateReceipt = (price, tip) => {
    const total = price + tip;
    console.log(`Your bill amount is ₹${price}. Tip is ₹${tip}. Total to pay: ₹${total}.`);
};

generateReceipt(700, 20);