const mongoose = require("mongoose");
const ProductCollection = require("../MODEL/ProductModel");

//get all products data
exports.getAllProducts = async (req, res) => {
  try {
    //here we will be fetching all the products from productcolletion excluding _V,productPhoto,productPhotoType columns
    const Products = await ProductCollection.find({},{ _v: 0, productPhoto: 0, productPhotoType: 0 });

    if (Products.length > 0) {
      res.status(200).json(Products);
    } else {
      res.status(200).json("404");
    }
  } catch (err) {
    res.status(404).json({ message: "unable to get products data", error: err.message });
  }
};

//get products by their category
exports.getProductsByCategory = async (req, res) => {
  try {
    const param = "^" + req.params.category + "$";
    const Products = await ProductCollection.find({ productCategory: { $regex: param, $options: "i" } },{ __v: 0 });
    if (Products.length > 0) {
        res.status(200).json(Products);
      } else {
        res.status(200).json("404");
      }
  } catch (err) {
    res.status(404).json({ message: "unable to get products data", error: err.message });
  }
};

//like a product
exports.likeProduct = async (req,res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json("404").end();
        }
        const product = await ProductCollection.findById(id);
        const updatedItem = await ProductCollection.findByIdAndUpdate(id,{ productLikeCount: product.productLikeCount + 1 },{ new: true });
        res.json(updatedItem).end();
      } catch (error) {
        console.log(error);
      }
};
