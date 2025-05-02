import express from "express";
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import Cart from '../Model/Cart.js'

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

// Add this POST route to handle "Add to Cart" functionality
router.post('/AddToCart', async (req, res) => {
    try {
        const { ProductName, Brand, Qty, Description, Img, Price } = req.body;

        const newCartItem = new Cart({
            ProductName,
            Brand,
            Qty,
            Description,
            Img,
            Price
        });

        await newCartItem.save();

        res.status(201).json({ message: 'Product added to cart successfully', cart: newCartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
});

// Make sure the get stock endpoint works as expected for retrieving all products in the cart
router.get("/getcart", async (req, res) => {
    try {
        const cartItems = await Cart.find({});
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart items", error: err });
    }
});

router.delete("/deleteAddToCart/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleteSlot = await Cart.findByIdAndDelete(id); // Changed from ProductModel to Cart
        if (!deleteSlot) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json({ message: "Stock details deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting", error: err });
    }
});
export default router;