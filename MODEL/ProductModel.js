const mongoose=require('mongoose');
const Schema = mongoose.Schema;
//defining table structure
const ProductSchema = new Schema({
    productName:{type:String},
    productCategory:{type:String},
    productPrice:{type:String},
    productStock:{type:String},
    productLocation:{type:String},
    productDesc:{type:String},

    productPhoto:{type:Buffer},
    productPhotoType:{type:String},
    productLikeCount:{type:Number,default:0},

    productIsSold:{type:Boolean,default:false},
    productUpdatedAt:{type:Date,default:new Date()},

    productOwner:{type:String},
});

ProductSchema.virtual('imagePath').get(function(){
    if(this.productPhoto !=null && this.productPhotoType != null) {
        return `data:${this.productPhotoType};base64,${this.productPhoto.toString('base64')}`
    }
})

//creating model using our scchema
const ProductModel = mongoose.model("ProductCollection",ProductSchema);

module.exports = ProductModel;