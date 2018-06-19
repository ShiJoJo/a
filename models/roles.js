import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    roleId:Number,
    name:String,
    fatherRole:Number,
    component:String,
    path:String,
},{
    versionKey:false,
})
const Role = mongoose.model("Role",roleSchema,"role");
export default Role