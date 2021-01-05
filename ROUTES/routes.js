const app = require('express');
//initializing router
const router = app.Router();
//importing our controller functions here
const BUYER_PRODUCT_CONTROLLER = require('../CONTROLLER/product-buyer-controller');
const BUYER_COMBO_CONTROLLER = require('../CONTROLLER/combo-buyer-controller');
const SELLER_PRODUCT_CONTROLLER = require('../CONTROLLER/product-seller-controller');
const SELLER_COMBO_CONTROLLER = require('../CONTROLLER/combo-seller-controller');

//creating our server routes

//seller product routes
router.get('/seller/getAllMyProducts',SELLER_PRODUCT_CONTROLLER.getAllMyProducts);
router.post('/seller/addNewProduct',SELLER_PRODUCT_CONTROLLER.addNewProduct);
router.post('/seller/editExistingProduct',SELLER_PRODUCT_CONTROLLER.editExistingProduct);
router.patch('/seller/soldExistingProduct',SELLER_PRODUCT_CONTROLLER.soldExistingProduct);
router.delete('/seller/deleteExistingProduct',SELLER_PRODUCT_CONTROLLER.deleteExistingProduct);

//seller combo routes
router.get('/seller/getAllMyCombo',SELLER_COMBO_CONTROLLER.getMyCombo);
router.post('/seller/addNewCombo',SELLER_COMBO_CONTROLLER.addNewCombo);
router.post('/seller/editExistingCombo',SELLER_COMBO_CONTROLLER.editExistingCombo);
router.patch('/seller/soldExistingCombo',SELLER_COMBO_CONTROLLER.soldExistingCombo);
router.delete('/seller/deleteExistingCombo',SELLER_COMBO_CONTROLLER.deleteExistingCombo);

//buyer product routes
router.get('/buyer/getAllProducts',BUYER_PRODUCT_CONTROLLER.getAllProducts);
router.get('/buyer/getProductsByCategory',BUYER_PRODUCT_CONTROLLER.getProductsByCategory);
router.patch('/buyer/likeProduct',BUYER_PRODUCT_CONTROLLER.likeProduct);

//buyer combo routes 
router.get('/buyer/getAllCombos',BUYER_COMBO_CONTROLLER.getAllCombo);
router.patch('/buyer/likeCombo',BUYER_COMBO_CONTROLLER.likeCombo);

module.exports = router;


