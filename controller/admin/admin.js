import adminSchema from "../../models/admin"
import formidable from 'formidable'
import dtime from 'time-formater'
export default class Admin{
    constructor(){
        super();
		this.login = this.login.bind(this);
    }
    async login(req,res,next){
        console.log(req)
    }
}