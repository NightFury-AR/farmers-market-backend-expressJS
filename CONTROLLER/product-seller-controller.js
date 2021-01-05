const { json } = require('body-parser');
const mongoose = require('mongoose');
const ProductCollection = require('../MODEL/ProductModel');

//adding a new product to product collection
exports.addNewProduct = async (req,res) => {
    
    try {
        const img = req.body.productPhoto.split(',');
        const imgData = new Buffer.from(img[1],'base64');
        const imgType = img[0].split(';')[0].substring(5);
        
        const Products = await ProductCollection.create({
           
            productName:req.body.productName,
            productCategory:req.body.productCategory,
            productPrice:req.body.productPrice,
            productStock:req.body.productStock,
            productLocation:req.body.productLocation,
            productDesc:req.body.productDesc,
            productPhoto:imgData,
            productPhotoType:imgType,
            productLikeCount:req.body.productLikeCount,
            productIsSold:false,
            productUpdatedAt:new Date(),
            productOwner:req.body.productOwner,

        });

        res.status(200).json({
            message:'Successfully created Product with id',
            data:Products,
        })

    } catch (err) {
        res.status(404).json({
            message:'Error while creating a new product',
            error:err.message,
        })
    }
};

//edit an existing Product 
exports.editExistingProduct = async (req,res) => {
    try {
      const {id,productName,productCategory,productPrice,productStock,productLocation,productDesc,productPhoto}  = req.params;
      
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({
            message:'invalid productId please try again'
        })
    }
    //checking image data if it is null use esisting image otherwise update a new image
    var EditedData,UpdatedData =null;
    if(productPhoto) {
        const img = productPhoto.split(',');
        const imgData = new Buffer.from(img[1],'base64');
        const imgType = img[0].split(';').substring(5);
        EditedData = {id,productName,productCategory,productPrice,productStock,productLocation,productDesc,productPhoto};
    }
    else {
      EditedData = {id,productName,productCategory,productPrice,productStock,productLocation,productDesc};
    }

    await ProductCollection.findByIdAndUpdate(id,EditedData,{new:true});

    } catch (err) {
        res.status(404).json({
            message:'Could not update the product',
            error:err.message
        })
    }
};

//delete an existing product
exports.deleteExistingProduct = async (req,res) =>{
    try {
        const {id} = req.params;
        if(mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({message:'Product id doesn\'t exist'});
        }
        await ProductCollection.findByIdAndRemove(id);
        res.status(200).json({message:'product deleted successfully'});
    } catch (err) {
        res.status(404).json({
            message:'error while deleting product',
            error:err.message,
        })
    }
};

//mark sold column as true
exports.soldExistingProduct = async (req,res) => {
    try {
        const {id} = req.params;
        if(mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({message:'Product id doesn\'t exist'});
        }
        const Product = await ProductCollection.findByIdAndUpdate(id,{productIsSold:true,},{new:true});
        res.status(200).json({
            message:'producted marked as sold successfully',
            data:Product,
        })
    } catch (err) {
        res.status(404).json({
            message:'error while marking as sold',
            error:err.message,
        })
    }
}

//get all my products 
exports.getAllMyProducts = async (req,res) => {
    try {
        if(!req.params.productOwner) { return res.status(404).json({message:'Invalid user session'})};
        const productOwnerID = '^'+req.params.user+'$';
        const MyProducts = await ProductCollection.find({productOwner:{$regex:productOwnerID,$options:'i'}},{__v:0});
        if(MyProducts.length>0){
            res.status(201).json({
                message:'Your Products fetched Successfully',
                data:MyProducts
            });
        }
        else{
            res.status(404).json({message:'No products Available here',});
        }
    } catch (err) {
        res.status(404).json({
            message:'error while fetching your products',
            error:err.message,
        })
    }

};


