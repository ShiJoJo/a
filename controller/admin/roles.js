import roleSchema from "../../models/roles"
import basePro from "../../prototype/basePro"
class Role extends basePro{
    constructor(){
        super();
        this.getAdminRole = this.getAdminRole.bind(this);
    }
    async getAdminRole(req,res,next){
        res.send([{
                path:'关于我们',
                name:'关于我们',
                children:[{
                    path: '/companyFile',
                    filePath:'/',
                    component: "companyFile",
                    meta: ['关于我们', '公司简介'],
                },{
                    path: '/culture',
                    filePath:'/',
                    component: "culture",
                    meta: ['关于我们', '企业文化'],
                },{
                    path: '/chart',
                    filePath:'/',
                    component: "chart",
                    meta: ['关于我们', '组织架构'],
                }]
            },{
                path:'权限管理',
                name:'权限管理',
                children:[{
                    filePath:'/admin/',
                    path:'/adminList',
                    component: "adminList",
                    meta: ['权限管理', '管理员列表'],
                }]
            }
        ])
    }
}
export default new Role();