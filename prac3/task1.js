const element = document.getElementById("button");
element.addEventListener("click", myFunction);

function myFunction() {
const date = new Date();
document.getElementById("current_time").innerHTML = date;
}
