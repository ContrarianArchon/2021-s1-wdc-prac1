var count = 0;
function CountIncrement(x){
    count++;
    x.innerHTML = count;
}

//Event listeners for buttons
const PostBtn = document.getElementById("PostBtn");
PostBtn.addEventListener("click", makePost);
const MenuBtn = document.getElementById("MenuBtn");
MenuBtn.addEventListener("click", showMenu);
const BackBtn = document.getElementById("BackBtn");
BackBtn.addEventListener("click", hideMenu);

function makePost(){
    //make paragraph, class "post-date" with the current date in it
    var d = new Date();
    //extract text from the posting box
    var text = document.getElementById("TextInput").value;
    //extract desired text-color from the form.
    var postColor = "black";
    if(document.getElementById("blue").checked){
        postColor = "blue";
    }
    if(document.getElementById("red").checked){
        postColor = "red";
    }
    //extract desired number of posts from the form.
    var postCount = document.getElementById("quantity").value;
    //loop for i < postCount.
    //make paragraph, class post-content, with the extracted text in it.
    for(let i = 0; i < postCount; i++){
        document.getElementById("posts").innerHTML += "<p class='post-time'>" + d + "</p>";
        document.getElementById("posts").innerHTML += "<p class='post-content' style='color:" + postColor +"'>" + text + "</p>";
    }
}

function showMenu(){
    document.getElementById("menu").style.display = "inline-block";
    document.getElementById("main").style.display = "none";
}

function hideMenu(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("main").style.display = "inline-block";
}