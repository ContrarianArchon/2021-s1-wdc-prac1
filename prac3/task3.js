var count = 0;
function CountIncrement(x){
    count++;
    x.innerHTML = count;
}

//on event: clicking the post button
const element = document.getElementById("PostBtn");
element.addEventListener("click", makePost);

function makePost(){
//make paragraph, class "post-date" with the current date in it
var d = new Date();
document.getElementById("posts").innerHTML += "<p class='post-time'>" + d + "</p>";
//extract text from the posting box
var text = document.getElementById("TextInput").value;
//make paragraph, class post-content, with the extracted text in it.
document.getElementById("posts").innerHTML += "<p class='post-content'>" + text + "</p>";
}