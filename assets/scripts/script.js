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
      alert("Account registered!")
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
  document.querySelector(".register").style.display = "none";
  document.querySelector("main").style.display = "flex";
}

(function getDataFromApi() {
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
                onclick="showDetails(this)"
              />
              <div class="user-info">
                <p class="user-name">${user.name}</p>
                <p class="user-email">Email: ${user.email}</p>
                <p class="user-city">City: ${user.address.city}</p>
              </div>
              <button
                class="posts-button"
                onclick="showPosts(${
                    user.id
                  }, this)"
              >
                User's posts
              </button>
            </div>
            <div class="details-popup">
              <div class="details">
                <a class="close" onclick="closePopup(this)"></a>
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
              </div>
            </div>
            <div class="posts-popup">
                  <div class="posts">
                  </div>
            </div>
          </div>`)
      )
    );
})();

function showDetails(e) {
  document.body.classList.add("stop-scrolling");
  document.body.style.paddingRight = "17px";
  e.parentElement.parentElement.querySelector(".details-popup").style.display = "block";
}

function closePopup(e) {
    document.body.classList.remove("stop-scrolling");
    document.body.style.paddingRight = "0";
    e.parentElement.parentElement.style.display = "none";
  }

function closePostsPopup(e) {
  document.body.classList.remove("stop-scrolling");
  document.body.style.paddingRight = "0";
  e.parentElement.parentElement.style.display = "none";
  e.parentElement.innerHTML = '';
;
}

function showPosts(id, e) {
    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
    .then(response => response.json())
    .then(posts => e.parentElement.parentElement.
        querySelector(".posts").innerHTML += posts.filter(post => post.userId === id).map(post =>`
        <h2>Title: ${post.title}</h2>
        <p>Post ID: ${post.id}<p>
        <p>Post: ${post.body}<p>
        <br>
        `).join('')
    )

    e.parentElement.parentElement.
    querySelector(".posts").innerHTML += '<a class="close" onclick="closePostsPopup(this)"></a>';
    e.parentElement.parentElement.querySelector(".posts-popup").style.display = "block";
    document.body.classList.add("stop-scrolling");
    document.body.style.paddingRight = "17px";
}
