/* Copyright 2018-2022, University of Adelaide */

/* AJAX Load Blog Posts */
function loadPosts(){

    console.log("Load Post Data");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if (getCookie('role')=="admin"){
                document.querySelector( '#delete' ).style.display = 'block';
                document.querySelector( '.nav-list.anon' ).style.display = 'none';
                document.querySelector( '.nav-list.user' ).style.display = 'block';
            } else if (getCookie('role')=="user"){
                document.querySelector( '#delete' ).style.display = 'none';
                document.querySelector( '.nav-list.anon' ).style.display = 'none';
                document.querySelector( '.nav-list.user' ).style.display = 'block';
            } else {
                document.querySelector( '#delete' ).style.display = 'none';
                document.querySelector( '.nav-list.user' ).style.display = 'none';
                document.querySelector( '.nav-list.anon' ).style.display = 'block';
            }

            let data = JSON.parse(this.responseText);

            let container = document.querySelector( '#posts' );

            // Clear old posts
            let old_posts = document.querySelectorAll( 'section.post' );
            for(let post of old_posts){
                container.removeChild(post);
            }

            // Display new posts
            for (let post of data) {
                container.appendChild(renderPost(post));
            }
        }
    };

    xhttp.open("GET", "/posts", true);
    xhttp.send();

}

/* AJAX Submit New Blog Post */
function submitPost(){

    console.log("Submit Post");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {

            // Post Successful, redirect to home
            document.querySelector( '#status' ).innerText = "Blog Post Successful...";

            window.location.pathname = "/";

        } else if (this.readyState == 2 && this.status == 401) {

            // Not logged in
            document.querySelector( '#status' ).innerText = "Please log in.";

            window.location.pathname = "/login.html";

        } else if (this.readyState == 2 && this.status >= 400) {

            // Error
            document.querySelector( '#status' ).innerText = "Error Adding Blog Post.";

        }
    };

    var blogPost = { title: document.querySelector( '#postTitle' ).value,
                     content:  document.querySelector( '#postBody'  ).value  };

    xhttp.open("POST", "/posts/new", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(blogPost));

}

/* AJAX Delete Blog Post */
function deletePost(){

    console.log("Delete Post");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {

            // Post Successful, redirect to home
            document.querySelector( '#delStatus' ).innerText = "Delete Successful...";

        } else if (this.readyState == 2 && this.status == 401) {

            // Not logged in
            document.querySelector( '#delStatus' ).innerText = "Please log in.";

        } else if (this.readyState == 2 && this.status >= 400) {

            // Error
            document.querySelector( '#delStatus' ).innerText = "Error Adding Blog Post.";

        }
        loadPosts();
    };

    let delId = document.querySelector( '#delPostId' ).value;
    xhttp.open("POST", "/posts/"+delId+"/delete", true);
    xhttp.send();

}

/* AJAX Login */
function login(){

    console.log("Login");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {

            // Login Successful, redirect to URL paramter "target"
            document.querySelector( '#status' ).innerText = "Login Successful...";

            let path = (new URLSearchParams(window.location.search)).get("target");
            if(path === null){
                path = '/';
            }

            window.location.pathname = path;

        } else if (this.readyState == 2 && this.status >= 400) {

            // Login Failed
            document.querySelector( '#status' ).innerText = "Login Failed.";

        }
    };

    var credentials = { username: document.querySelector( '#uname' ).value,
                        password: document.querySelector( '#pword' ).value  };
    xhttp.open("POST", "/users/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(credentials));

}

/* AJAX Signup */
function signup(){

    console.log("Sign Up");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {

            // Login Successful, redirect to URL paramter "target"
            document.querySelector( '#status' ).innerText = "Sign up Successful... Please Log In to confirm";

        } else if (this.readyState == 2 && this.status >= 400) {

            // Login Failed
            document.querySelector( '#status' ).innerText = "Signup Failed.";

        }
    };

    var credentials = { username: document.querySelector( '#newuname' ).value,
                        password: document.querySelector( '#newpword' ).value,
                        given_name: document.querySelector( '#newgname' ).value,
                        family_name: document.querySelector( '#newfname' ).value,
                        email: document.querySelector( '#newemail' ).value  };
    xhttp.open("POST", "/users/signup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(credentials));

}

/* AJAX Logout */
function logout(){

    console.log("Logout");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {

            // Logout Successful, redirect to home
            window.location.pathname = "/";

        }
    };

    xhttp.open("POST", "/users/logout", true);
    xhttp.send();

}

/* Build Blog Post HTML */
function renderPost(postData){

    var postStructure = `
    <header class="post-header">
        <h2 class="post-title"></h2>
        <p class="post-meta">
            By <a class="post-author" href="#">${postData.author_name}</a> on <span class="post-date">${(new Date(postData.timestamp)).toLocaleString()}</span>
        </p>
    </header>
    <div class="post-body"><p></p></div>`;
    var post = document.createElement('SECTION');
    post.id = `post-${postData.post_id}`;
    post.className = "post";
    post.innerHTML = postStructure;

    post.querySelector('h2.post-title'  ).innerText = postData.title;
    post.querySelector('div.post-body p').innerHTML = postData.content;

    return(post);

}

/* Get Cookie; From W3Schools https://www.w3schools.com/js/js_cookies.asp */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }