import adminSchema from "../../models/admin"
import roleSchema from "../../models/roles"
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
      // this.encryption = this.encryption.bind(this);
      this.editAdmin = this.editAdmin.bind(this);
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
        const {username,password,role} = fields;
        const newpassword = this.encryption(password);
        try{
          const admin_id = await this.getIds('admin_id');
          const newAdmin={
            username,
            password:newpassword,
            admin_id:admin_id,
            create_time:dtime().format('YYYY-MM-DD HH-mm-ss'),
            role
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
    async editAdmin(req,res,next){
      const admin_id = req.query.id;
      try{
        const admin = await adminSchema.findOne({admin_id:admin_id});
        const roleId = JSON.parse(admin.role);
        const roleArr = await roleSchema.find();
        const roleArrF = await roleSchema.find({childrenArr:{$exists:true}},"-_id");
        let role_id,role_arr=[];
        Object.keys(roleArrF).forEach(keys=>{
          console.log(keys)
          let role_json,role_checkAll=false,role_all=false,role_arrC=roleArrF[keys]["childrenArr"],role_children=[];
          role_id=roleArrF[keys]["id"];
          if(roleId[role_id]&&roleId[role_id].length==roleArrF[keys]['childrenArr'].length){
            role_checkAll=true;
          }else if(roleId[role_id]&&roleId[role_id].length!=roleArrF[keys]['childrenArr'].length){
            role_all=true;
          }
          role_json={
            id:role_id,
            name:roleArrF[keys]['name'],
            checkAll:role_checkAll,
            all:role_all,
            checkedRole:roleId[role_id],
            roleArr:role_arrC
          }
          for(let item=0;item<role_arrC.length;item++){
            let role_cid = role_arrC[item]-1;
            role_children.push({
              id:role_arrC[item],
              name:roleArr[role_cid]['name']
            })
          }
          Object.keys(role_arrC).forEach(aa=>{
            console.log(aa)
          })
          role_json.children=role_children;
          role_arr.push(role_json);
        })
        res.send({
          status:1,
          res:role_arr
        })
      }catch(err){
        console.log(err)
        res.send({
          status:0,
          message:"管理员信息获取失败"
        })
      }
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