import express from "express";
const router = express.Router();

router.get("/", (req, res)=>{
  
  res.render("index")
})


router.get("/sos", (req, res)=>{
  res.render("partials/sos")
})

export default router