    const cookieBox = document.querySelector(".wrapper"),
    acceptBtn = cookieBox.querySelector("#accept-all"),
    rejectBtn = cookieBox.querySelector("#reject-all");

acceptBtn.onclick = () => {
  document.cookie = "CookieBy=ARSRealm; max-age=" + 60 * 60 * 24 * 30;

  if (document.cookie) {
    cookieBox.classList.add("hide");
  } else {
    alert("Cookie can't be set! Please unblock this site from the cookie settings of your browser.");
  }
};


rejectBtn.onclick = () => {
  document.cookie = "CookieBy=ARSRealm; max-age=0";

  cookieBox.classList.add("hide");
};

let checkCookie = document.cookie.indexOf("CookieBy=ARSRealm");
checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");
