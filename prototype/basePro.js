import Ids from '../models/ids'
import formidable from 'formidable'

export default class baseProComponent{
    constructor(){
        this.idList = ['admin_id','role_id'];
    }
    async getIds(type){
        if(!this.idList.includes(type)){
            throw new Error('id类型错误');
            return
        }
        try{
            const idData = await Ids.findOne();
            idData[type] ++;
            await idData.save();
            return idData[type] 
        }catch(err){
            throw new Error(err)
        }
    }
}