var mongoose = require('mongoose');
var chalk = require('chalk');
mongoose.connect("mongodb://localhost:27017/elm",{useMongoClient:true});
mongoose.Promise=global.Promise;
const db = mongoose.connection;
db.once('open',()=>{
    console.log(chalk.green('链接数据库成功'));
})
db.on('error',function(error){
    console.error(chalk.red('Error in MongDB connection:'+error))
    mongoose.disconnect();
})
db.on('close',function(){
    console.log(console.log(chalk.red('数据库断开，重新链接数据库')))
    mongoose.connect("mongodb://localhost:27017/elm",{server:{auto_reconnect:true}});
})