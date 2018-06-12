// import roleSchema from "../../models/roles"
import basePro from "../../prototype/basePro"
class Role extends basePro{
    constructor(){
        super();
        this.getAdminMenu = this.getAdminMenu.bind(this);
        this.getAdminRole = this.getAdminRole.bind(this);
    }
    async getAdminMenu(req,res,next){
        res.send([{
                path:'关于我们',
                name:'关于我们',
                children:[{
                    path: '/companyFile',
                    component: "companyFile",
                    name:"公司简介"
                },{
                    path: '/culture',
                    component: "culture",
                    name: '企业文化',
                },{
                    path: '/chart',
                    component: "chart",
                    name:'组织架构',
                }]
            },{
                path:'权限管理',
                name:'权限管理',
                children:[{
                    path:'/adminList',
                    component: "adminList",
                    name: '管理员列表',
                }]
            }
        ])
    }
}
export default new Role();