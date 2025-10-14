export const getRiders = async (req, res) =>{
  const riders = [
    {
    name: "Mr. John",
    
  }]
  return res.render("partials/ridersList", {
    riders
  })
}