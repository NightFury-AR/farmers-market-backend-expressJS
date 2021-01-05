const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ComboSchema = new schema({
    comboName:{type:String,required:true},
    comboLocation:{type:String,required:true},
    comboPrice:{type:Number,required:true},
    comboDesc:{type:String,required:true},
    comboStock:{type:Number},

    comboItems:{type:Array,},

    comboLikeCount:{type:Number,default:0},
    comboIsSold:{type:Boolean,default:false},
    comboUpdatedAt: {type: Date,default: new Date()},

    comboOwner:{type:String},
});

const ComboModel = mongoose.model("ComboCollection",ComboSchema);

module.exports = ComboModel;