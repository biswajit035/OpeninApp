const router = require("express").Router();

router.get("/analytics", (req, res) => {
  const data = [
    {
      link: "https://img.icons8.com/nolan/96/get-revenue.png",
      title: "Total Revenue",
      value: 2129430,
      inc: 2.5,
    },
    {
      link: "https://img.icons8.com/color/transaction.png",
      title: "Total Transaction",
      value: 1520,
      inc: 1.5,
    },
    {
      link: "https://img.icons8.com/color/facebook-like--v1.png",
      title: "Total Likes",
      value: 9721,
      inc: 1.0,
    },
    {
      link: "https://img.icons8.com/ios-glyphs/30/group.png",
      title: "Total Users",
      value: 9820,
      inc: -0.2,
    },
  ];
  res.json(data);
});


router.get("/activities", (req, res) => {
  const data = [
    {
      label: "Guest",
      data: [120, 400, 323],
    },
    {
      label: "User",
      data: [220, 350, 120],
    },
    {
      label: "book",
      data: [220, 350, 110],
    },
  ];
  res.json(data);
});

router.get("/products", (req, res) => {
  const data = [
    {
      label: "Number of Votes",
      data: [12, 19, 3, 5, 2, 3, 5, 2],
    },
  ];
  res.json(data);
});

module.exports = router;