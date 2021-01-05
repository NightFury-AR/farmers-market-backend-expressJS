const mongoose = require('mongoose');
const ComboCollection = require('../MODEL/ComboModel');

//get all combo data from combo collections 
exports.getAllCombo = async (req,res) => {
    try {
        const Combo = await ComboCollection.find({},{_v:0});
        if(Combo.length>0){
            res.status(200).json(Combo);
        }
        else {
            res.status(200).json('404');
        }
    } catch (err) {
        res.status(404).json({message:'server error while fetching combo',error:err.message});
    }
};

//like combo
exports.likeCombo = async (req,res) => {
    try {
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({message:'combo id is not valid'});
        }
        const combo = await ComboCollection.findById(id);
        const updatedCombo = await ComboCollection.findByIdAndUpdate(id,{comboLikeCount:comboLikeCount+1},{new:true});
        res.status(200).json(updatedCombo);
    } catch (err) {
        console.log(err);
    }
};