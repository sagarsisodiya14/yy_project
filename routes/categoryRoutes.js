const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const categoryController = require("../controllers/categoryController");

router.post("/", upload.single("img"), categoryController.addCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", upload.single("img"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
