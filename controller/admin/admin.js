import adminSchema from "../../models/admin"
import basePro from "../../prototype/basePro"
import crypto from 'crypto'
import formidable from 'formidable'
import dtime from 'time-formater'
import qs from 'qs';
class Admin extends basePro{
    constructor(){
      super();
      this.login = this.login.bind(this);
      this.register = this.register.bind(this);
      this.encryption = this.encryption.bind(this);
    }
    async login(req,res,next){
        const form = new formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
          if(err){
            res.send({
              status:0,
              message:'网络错误'
            })
            return
          }
          const {username,password}=qs.parse(fields);
          const newpassword = this.encryption(password);
          try{
            const admin = await adminSchema.findOne({username});
            if(!admin){
              res.send({
                status: 0,
                message: '该用户不存在',
              })
            }else if(newpassword!=admin.password){
              res.send({
                status: 0,
                message: '密码不正确',
              })
            }else{
              res.send({
                status: 1,
                message: '登录成功',
                token:1
              })
            }
          }catch(err){
            res.send({
              status: 0,
              message: '登录管理员失败',
            })
          }
        })
    }
    async register(req, res, next){
      const form = new formidable.IncomingForm();
      form.parse(req,async(err,fields,files)=>{
        if(err){
          res.send({
            status:0,
            message:'网络错误'
          })
          return
        }
        const {username,password} = fields;
        const newpassword = this.encryption(password);
        try{
          const admin_id = await this.getIds('admin_id');
          const newAdmin={
            username,
            password:newpassword,
            admin_id:admin_id,
            create_time:dtime().format('YYYY-MM-DD HH-mm-ss')
          }
          await adminSchema.create(newAdmin);
          req.session.admin_id = admin_id;
          res.send({status:1,message:"注册成功"});
        }catch(err){
          res.send({
            status:0,
            message:'注册失败'
          })
        }
      })
    }
    async loginOut(req,res,next){
      res.send({
        status:1,
        message:'退出成功'
      })
    }
    encryption(password){
      const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
      return newpassword
    }
    Md5(password){
      const md5 = crypto.createHash('md5');
      return md5.update(password).digest('base64');
    }
}
export default new Admin();