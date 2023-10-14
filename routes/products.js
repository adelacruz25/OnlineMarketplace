const express = require('express');
const {addCars, getcarsId, getcarsName, deleteCars, deletecarsId, updateCars, getCars} = require("../controllers/productControllers");


router = express.Router();

//GETS
router.get("/products", getCars) 
router.get("/products/:productId", getcarsId) 
router.get("/products/?name=:keyword", getcarsName) 
//POST
router.post("/products", addCars) 
//PUT
router.put("/products/:productId", updateCars) 
//DELETE
router.delete("/products", deleteCars)
router.delete("/products/:productId", deletecarsId)

module.exports = router