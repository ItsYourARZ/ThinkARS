/** const cookieBox = document.querySelector(".wrapper"),
    acceptBtn = cookieBox.querySelector("button");

    acceptBtn.onclick = ()=>{
      //setting cookie for 1 month, after one month it'll be expired automatically
      document.cookie = "CookieBy=ARSRealm; max-age="+60*60*24*30;
      if(document.cookie){ //if cookie is set
        cookieBox.classList.add("hide"); //hide cookie box
      }else{ //if cookie not set then alert an error
        alert("Cookie can't be set! Please unblock this site from the cookie setting of your browser.");
      }
    }
    let checkCookie = document.cookie.indexOf("CookieBy=ARSRealm"); //checking our cookie
    //if cookie is set then hide the cookie box else show it
    checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide"); **/

    const cookieBox = document.querySelector(".wrapper"),
    acceptBtn = cookieBox.querySelector("#accept-all"),
    rejectBtn = cookieBox.querySelector("#reject-all");

// Accept cookies
acceptBtn.onclick = () => {
  // Set a cookie for 1 month (expires automatically in 30 days)
  document.cookie = "CookieBy=ARSRealm; max-age=" + 60 * 60 * 24 * 30;

  if (document.cookie) { // If cookie is set
    cookieBox.classList.add("hide"); // Hide cookie box
  } else { // If cookie can't be set
    alert("Cookie can't be set! Please unblock this site from the cookie settings of your browser.");
  }
};

// Reject cookies
rejectBtn.onclick = () => {
  // Remove any existing cookies related to this site (optional)
  document.cookie = "CookieBy=ARSRealm; max-age=0";

  // Hide the cookie box
  cookieBox.classList.add("hide");
};

// Check if the cookie is set and hide or show the cookie box
let checkCookie = document.cookie.indexOf("CookieBy=ARSRealm");
checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");
