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
document.getElementById("posts").innerHTML += "<p class='post-date'>" + date + "</p>"
//extract text from the posting box

//make paragraph, class post-content, with the extracted text in it.
}