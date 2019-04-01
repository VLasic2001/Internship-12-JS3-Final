let isAccountRegistered = localStorage.length == 0 ? false : true;

if (isAccountRegistered) setupLoginForm();

function setupLoginForm() {
  document.querySelector(".title").innerHTML = "LOGIN";
  document.querySelector(".submit").value = "Login";
  document.getElementsByName(
    "confirm-password"
  )[0].parentElement.style.display = "none";
  document.getElementsByName("confirm-password")[0].removeAttribute("required");
}

function Submit() {
  let isAccountRegistered = localStorage.length == 0 ? false : true;
  if (!isAccountRegistered) {
    if (registerValidation()) {
      localStorage.setItem(
        document.getElementsByName("username")[0].value,
        document.getElementsByName("password")[0].value
      );
      alert("Account registered!");
      setupLoginForm();
    }
    return;
  }
  if (loginValidation()) {
    loginSuccesfull();
  }
}

function registerValidation() {
  if (
    document.getElementsByName("username")[0].value.length < 5 ||
    document.getElementsByName("username")[0].value.length > 10
  ) {
    alert(
      "\nInvalid username \n\n Username cannot be shorter than 5 characters or longer than 10."
    );
    return false;
  } else if (
    document.getElementsByName("password")[0].value.length < 5 ||
    document.getElementsByName("password")[0].value.length > 10
  ) {
    alert(
      "\nInvalid password \n\n Password cannot be shorter than 5 characters or longer than 10."
    );
    return false;
  } else if (
    document.getElementsByName("password")[0].value !=
    document.getElementsByName("confirm-password")[0].value
  ) {
    alert("\nPasswords don't match");
    return false;
  }
  return true;
}

function loginValidation() {
  if (
    localStorage[document.getElementsByName("username")[0].value] !=
    document.getElementsByName("password")[0].value
  ) {
    alert("\nInvalid username or password");
    return false;
  }
  return true;
}

function loginSuccesfull() {
  alert("Login successfull!");
  document.querySelector(".register").style.display = "none";
  document.querySelector("main").style.display = "flex";
  document.body.style.backgroundColor = "white";
  (function getDataFromApi() {
    window.onscroll = function() {
      scrollChecker();
    };
    let main = document.querySelector("main");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users =>
        users.forEach(
          user =>
            (main.innerHTML += `
          <div class="wrapper">
            <div class="user">
              <img
                src="assets/images/profile-picture.jpg"
                class="profile-picture"
                onclick="showDetails(${user.id}, this)"
              />
              <div class="user-info">
                <p class="user-name">${user.name}</p>
                <p class="user-email">Email: ${user.email}</p>
                <p class="user-city">City: ${user.address.city}</p>
              </div>
              <button
                class="posts-button"
                onclick="showPosts(${user.id}, this)"
              >
                User's posts
              </button>
            </div>
            <div class="details-popup">
              <div class="details">
              </div>
            </div>
            <div class="posts-popup">
                  <div class="posts">
                  </div>
            </div>
          </div>`)
        )
      );
    main.innerHTML += `<div class="scroll-button-wrapper" onclick="scrollToTop()"><button class="scroll-button"></button></div>`;
  })();
}

function showDetails(e) {
  document.body.classList.add("stop-scrolling");
  document.body.style.paddingRight = "17px";
  e.parentElement.parentElement.querySelector(".details-popup").style.display =
    "block";
}

function closePopup(e) {
  document.body.classList.remove("stop-scrolling");
  document.body.style.paddingRight = "0";
  e.parentElement.parentElement.style.display = "none";
  e.parentElement.parentElement.querySelector(".details").innerHTML = "";
}

function closePostsPopup(e) {
  document.body.classList.remove("stop-scrolling");
  document.body.style.paddingRight = "0";
  e.parentElement.parentElement.style.display = "none";
  e.parentElement.innerHTML = "";
}

function closeNewPostPopup() {
  document.querySelector(".new-post-popup").remove();
}

function showPosts(id, e) {
  fetch("https://jsonplaceholder.typicode.com/users/1/posts")
    .then(response => response.json())
    .then(
      posts =>
        (e.parentElement.parentElement.querySelector(
          ".posts"
        ).innerHTML += posts
          .filter(post => post.userId === id)
          .map(
            post => `
        <h2>Title: ${post.title}</h2>
        <p>Post ID: ${post.id}<p>
        <p>Post: ${post.body}<p>
        <br>
        `
          )
          .join(""))
    );

  e.parentElement.parentElement.querySelector(
    ".posts"
  ).innerHTML += `<a class="close" onclick="closePostsPopup(this)"></a>
    <button class="new-post-button" onclick="newPost(${id})">New Post</button>`;
  e.parentElement.parentElement.querySelector(".posts-popup").style.display =
    "block";
  document.body.classList.add("stop-scrolling");
  document.body.style.paddingRight = "17px";
}

function showDetails(id, e) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(
      users =>
        (e.parentElement.parentElement
          .querySelector(".details-popup")
          .querySelector(".details").innerHTML += users
          .filter(user => user.id === id)
          .map(
            user => `
            <h1>Name: ${user.name}</h1>
            <br />
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Web: ${user.website}</p>
            <br />
            <h3>Address:</h3>
            <p>Street: ${user.address.street}</p>
            <p>City: ${user.address.city}</p>
            <p>Zipcode: ${user.address.zipcode}</p>
            <p>Lat: ${user.address.geo.lat}</p>
            <p>Lng: ${user.address.geo.lng}</p>
            <br />
            <h3>Company:</h3>
            <p>Name: ${user.company.name}</p>
            <p>Phrase: ${user.company.catchPhrase}</p>
            <p>Bs: ${user.company.bs}</p>    
        `
          ))
    );

  e.parentElement.parentElement.querySelector(".details").innerHTML +=
    '<a class="close" onclick="closePostsPopup(this)"></a>';
  e.parentElement.parentElement.querySelector(".details-popup").style.display =
    "block";
  document.body.classList.add("stop-scrolling");
  document.body.style.paddingRight = "17px";
}

function newPost(id) {
  document.querySelector("main").innerHTML += `
  <div class="new-post-popup">
  <div class="new-post">
    <a class="close" onclick="closeNewPostPopup()"></a>      
    <h1 class="title">New Post</h1>
            <p>User ID: ${id}</p>
            <form class="new-post-form" action="javascript:SubmitNewPost(${id})">
          <div class="input-div">
            Title:<br />
            <input
              type="text"
              name="title-input"
              placeholder="Title"
              required
              class="title-input"
            />
          </div>
          <div class="input-div">
            Body:<br />
            <input
              type="textarea"
              name="body-input"
              placeholder="Body"
              required
              class="body-input"
            />
          </div>
          <input type="submit" value="Post" class="submit" />
        </form>
        </div>
    </div>`;
  document.body.classList.add("stop-scrolling");
  document.body.style.paddingRight = "17px";
}

function SubmitNewPost(id) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: document.getElementsByName("title-input")[0].value,
      body: document.getElementsByName("body-input")[0].value,
      userId: id
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.id == 101) {
        alert(`Post added successfully \n 
        User ID: ${json.userId} \n
        Title: ${json.title} \n
        `);
        closeNewPostPopup();
      }
      else{
          alert("There was an error when adding the post")
      }
    });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function scrollChecker() {
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 350
  ) {
    document.querySelector(".scroll-button-wrapper").style.display = "block";
  } else {
    document.querySelector(".scroll-button-wrapper").style.display = "none";
  }
}
