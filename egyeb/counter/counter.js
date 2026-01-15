let n = document.getElementById("negative");
let p = document.getElementById("positive");
let c = document.getElementById("count");
let value = 0;
c.innerHTML = `${value}`;

p.addEventListener("click", () => {
    value= value + 10;
    c.innerHTML = `${value}`;
});

n.addEventListener("click", () => {
    value= value - 10;
    c.innerHTML = `${value}`;
}); 