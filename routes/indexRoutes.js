import express from "express";
const router = express.Router();

router.get("/", (req, res)=>{
  const account = {
    name: "Zoie Foundation Operation Feed The Street Initiative",
    number: "6360207920"
  }
  res.render("index", {account})
})

router.get("/page", (req, res)=>{
  res.render("partials/page", {layout: false})
})

export default router