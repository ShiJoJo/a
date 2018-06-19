import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const roleIdSchema = new Schema({
    roleId:Number,
    admin_id:Number,
},{
    versionKey:false,
})
const roleId = mongoose.model("roleId",roleIdSchema,"roleId");
export default roleId