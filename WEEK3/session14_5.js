
function orderPizza() {
    return new Promise((resolve, reject) => {
        const isPizzaAvailable = true;

        console.log("Ordering pizza...");

        setTimeout(() => {
            if (isPizzaAvailable) {
                resolve(" Pizza is ready! Enjoy your meal.");
            } else {
                reject("Sorry, pizza is out of stock.");
            }
        }, 2000);
    });
}

orderPizza()
    .then(message => console.log(message))
    .catch(error => console.log(error));