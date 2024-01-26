const viewHome = (req, res) => {
  res.render("home");
};

const viewExpress = (req, res) => {
  res.render("express");
};

const viewHTTP = (req, res) => {
  res.render("http");
};

module.exports = {
  viewHome,
  viewExpress,
  viewHTTP,
};
