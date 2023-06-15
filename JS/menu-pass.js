const insert = (c) => {
  if (typeof Storage !== "undefined") {
    localStorage.menu = c;
  } else {
    console.log("error");
  }
};

const setpage = (c) => {
  insert(c);
  location.href = "menu.html";
};

const setpageHome = (c) => {
  insert(c);
  location.href = "./HTML/menu.html";
};
