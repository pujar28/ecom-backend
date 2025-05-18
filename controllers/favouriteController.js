const Favourite = require("../models/Favourites");
const Product = require("../models/Products");

const addToFavourite  = async(req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const existingItem = await Favourite.findOne({
            product: product._id,
            user: req.user.userId,
        });

        if (existingItem) {
          return res.status(400).json({
            message: "Product already added to favourites",
          });
    }

    await Favourite.create({
        product: product._id,
        user: req.user.userId,
    });

    res.status(200).json({
        message: "Product added to favourites successfully",
    });
  } catch (error) {
    console.log("Eror:",error.message);
    res.status(500).json({
        message: "Internal server error",
    });
  }
};

const getFavourites = async (req, res) =>{
    try {
        const favourites = await favourites.find({ user: req.user.userId }).populate(
            "product"
        );
        res.status(200).json(cartItems);
    } catch(error) {
        console.log("Eror:",error.message);
        res.status(500).json({
           message: "Internal server error",
        });    
       
    } 
};

const removeFavourite= async (req, res) =>{
    try {
        const { id }= req.params;
      
        const item = await Favourite.findByIdAndDelete(id);
            
        if (!item) {
            return res.status(404).json({
                message:"Product not found in favourites",
            });
        }

        res.status(200).json({
            message:"Product removed from fvourites",
        });
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { addToFavourite, getFavourites, removeFavourite};