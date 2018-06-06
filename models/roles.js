import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    roleId:Number,
    roleName:String,
    fatherRole:Number,
})
const Role = mongoose.model("Role",roleSchema,"admin");
export default Role