import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const idsList = new Schema({
    admin_id:Number,
    role_id:Number
})
const Ids = mongoose.model('idsList',idsList,"ids");
Ids.findOne((err,data)=>{
    if(!data){
        const newIds=new Ids({
            admin_id:0,
            role_id:0,
        })
        newIds.save()
    }
})
export default Ids