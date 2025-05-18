const mongoose = require("mongoose");

const favouriteShema = new mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const FavouriteShema = mongoose.model("Favourite",favouriteShema);

module.exports = Favourite;