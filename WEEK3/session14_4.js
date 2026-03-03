
// i. Spread Operator
const collegeFriends = ["Anu", "Priya", "Kavya"];
const workFriends = ["Rahul", "Arjun"];

const partyList = ["Me", ...collegeFriends, ...workFriends];

console.log("Party List:", partyList);


// ii. Rest Operator
function showGuests(mainGuest, ...otherGuests) {
    console.log(`Main Guest: ${mainGuest}`);
    console.log("Other Guests:", otherGuests);
}

showGuests("Dhivya", "Anu", "Rahul", "Priya");