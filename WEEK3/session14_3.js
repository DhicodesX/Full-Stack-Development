
const student = {
    name: "Dhivya",
    age: 20,
    course: "BTech",
    skills: ["Java", "Networking", "DevOps"]
};

// Object Destructuring
const { name, course } = student;

// Array Destructuring
const [skill1, skill2] = student.skills;

console.log(`Name: ${name}`);
console.log(`Course: ${course}`);
console.log(`Primary Skills: ${skill1}, ${skill2}`);