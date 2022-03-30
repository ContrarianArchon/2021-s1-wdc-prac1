var count = 0;
function CountIncrement(x){
    count++;
    x.innerHTML = count;
}

//Event listeners for buttons
const PostBtn = document.getElementById("PostBtn");
PostBtn.addEventListener("click", makePost);
const MenuBtn = document.getElementById("menuBtn");
MenuBtn.addEventListener("click", showMenu());
const BackBtn = document.getElementById("backBtn");
BackBtn.addEventListener("click", hideMenu());

function makePost(){
//make paragraph, class "post-date" with the current date in it
var d = new Date();
document.getElementById("posts").innerHTML += "<p class='post-time'>" + d + "</p>";
//extract text from the posting box
var text = document.getElementById("TextInput").value;
//make paragraph, class post-content, with the extracted text in it.
document.getElementById("posts").innerHTML += "<p class='post-content'>" + text + "</p>";
}

function showMenu(){

}

function hideMenu(){
    
}