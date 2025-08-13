import express from "express";
const router = express.Router();

router.get("/", (req, res)=>{
  res.render("index")
})

router.get("/page", (req, res)=>{
  res.render("partials/page", {layout: false})
})

export default router