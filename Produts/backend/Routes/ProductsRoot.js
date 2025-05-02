import express from "express";
import ProductModel from "../Model/Produts.js";
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const router = express.Router();
router.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
  const upload = multer({ storage });
  
 
  router.post('/Stock', upload.single('Img'), async (req, res) => {
    try {
        const { ProductName, Brand, Qty, Description, Price } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image upload failed' });
        }

        const ImgPath = `/uploads/${req.file.filename}`;

        // **Save the new stock to the database**
        const newStock = new ProductModel({
            ProductName,
            Brand,
            Qty,
            Description,
            Img: ImgPath,
            Price
        });

        await newStock.save(); 

        console.log("New Stock Added:", newStock);
        res.status(201).json({ message: 'Stock added successfully', stock: newStock });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// GET route to retrieve all stock
router.get("/getstock", async (req, res) => {
    try {
        const inventory = await ProductModel.find({});
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: "Error slots", error: err });
    }
});

/// GET route to retrieve stock by id
router.get("/getstock/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Error fetching product", error: err });
    }
});



// DELETE route to remove stock by id
router.delete("/deletestock/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleteSlot = await ProductModel.findByIdAndDelete(id);
        if (!deleteSlot) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json({ message: "Stock details deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting", error: err });
    }
});

// PUT route to update stock details by id
// PUT route to update stock details by id
router.put('/updatestock/:id', upload.single('Img'), async (req, res) => {
    const id = req.params.id;
    const { ProductName, Brand, Qty, Description, Price } = req.body;
    let Img = req.file ? `/uploads/${req.file.filename}` : null; // Handle image upload if new image is provided
  
    try {
      const updatedStock = await ProductModel.findByIdAndUpdate(
        id, 
        { ProductName, Brand, Qty, Description, Img, Price },
        { new: true }
      );
      res.json(updatedStock);
    } catch (err) {
      res.status(500).json({ message: "Error updating stock", error: err });
    }
});


export default router;
