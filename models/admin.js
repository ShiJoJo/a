import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    username:String,
    password:String,
    admin_id:Number,
    create_time:String,
    role:String,
},{
    versionKey:false,
})

adminSchema.index({admin_id: 1});
const Admin = mongoose.model('Admin', adminSchema,"admin");
export default Admin