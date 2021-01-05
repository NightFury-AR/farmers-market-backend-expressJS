const mongoose = require('mongoose');
const ComboCollection = require('../MODEL/ComboModel');

exports.addNewCombo = async (req,res) => {
    try {
        const Combo = await ComboCollection.create({
            comboName:req.body.comboName,
            comboLocation:req.body.comboLocation,
            comboPrice:req.body.comboPrice,
            comboDesc:req.body.comboDesc,
            comboStock:req.body.comboStock,
            comboItems:req.body.comboItems,
            comboOwner:req.body.comboOwner,
        });
        if(Combo.length>0)
        res.status(200).json({
            message:'new Combo created successfully',
            data:Combo,
        });
        else {
            res.status(404).json({
                message:'could not able to create a combo',
            })
        }
    } catch (err) {
        res.status(404).json({
            message:'error while creating new combo',
            error:err.message,
        })
    }
};


exports.editExistingCombo = async (req,res) => {
    try {
        const {id,comboName,comboLocation,comboPrice,comboDesc,comboStock,comboItems,comboOwner} = req.params;
        const editedData = {comboName,comboLocation,comboPrice,comboDesc,comboStock,comboItems};
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({
                message:'invalid combo id present',
            });
        }
        const Combo = await ComboCollection.findByIdAndUpdate(id,{editedData},{new:true});
        if(Combo._id===id) {
            res.status(200).json({
                message:'Combo has been successfuly updated',
                data:Combo,
            })
        }
        else {
            res.status(404).json({
                message:'error while updating Combo',
            })
        }
    } catch (err) {
        res.status(404).json({
            message:'error while updating Combo',
            error:err.message,
        });
    }
};


exports.deleteExistingCombo = async (req,res) => {
    try {
        const {id}=req.params;
        if(!mongoose.Types.ObjectId(id)) {
            res.json({
                message:'error while deleted combo',
            });
        await ComboCollection.findByIdAndRemove(id);
        res.status(200).json({
            message:'Combo deleted successfully',
        });
        }    
    } catch (err) {
        res.status(404).json({
            message:'error while deleting combo',
            error:err.message,
        });
    }
    
}


exports.soldExistingCombo = async (req,res) => {
    try {
        const {id} =req.params;
    if(mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({
            message:'error while sold the combo',
        })
    };
    const Combo = await ComboCollection.findByIdAndUpdate(id,{comboLikeCount:comboLikeCount+1},{new:true});
    if(Combo._id===id) {
        res.status(200).json({
            message:'Combo marked as sold',
        })
    }
    else {
        res.status(404).json ({
            message:'error while marking the combo to sold'
        })
    }    
    } catch (err) {
        res.status(404).json({
            message:'error while marking the combo to sold',
            error:err.message,
        })
    }
    
};


exports.getMyCombo = async (req,res) => {
    try {
        const comboOwnerID = '^'+req.params.comboOwner+'$';
        const MyCombo = await ComboCollection.find({comboOwner:{$regex:comboOwnerID,$options:'i'}},{__v:0});
        if(MyCombo.length>0) {
            res.status(200).json({
                message:'Successfully fetched your combo',
                data:MyCombo
            })
        }
        else {
            res.status(404).json({
              message:'error while fetching combo'
            })
        }
    } catch (err) {
        res.status(404).json({
            message:'error while fetching the combo',
            error:err.message,
        })
    }
};