const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const productController = require("../controllers/productController");

router.post("/", upload.single("img"), productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", upload.single("img"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
