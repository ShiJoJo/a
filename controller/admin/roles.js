import roleSchema from "../../models/roles"
import basePro from "../../prototype/basePro"
class Role extends basePro{
    constructor(){
        super();

    }
    async getAdminRole(req,res,next){
        res.send([{
                name:'关于我们',
                children:[{
                    path: '/companyFile',
                    component: "companyFile",
                    meta: ['关于我们', '公司简介'],
                },{
                    path: '/culture',
                    component: "culture",
                    meta: ['关于我们', '企业文化'],
                },{
                    path: '/chart',
                    component: "chart",
                    meta: ['关于我们', '组织架构'],
                }]
            },{
                name:'权限管理',
                children:[{
                    path:'/admin',
                    component: "admin",
                    meta: ['权限管理', '新增管理员'],
                }]
            },{
                name:'权限管理',
                path:'/admin',
                component: "admin",
                meta: ['权限管理']
            }
        ])
    }
}
export default new Role();