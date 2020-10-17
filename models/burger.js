const orm = require("../config/orm");

const Burger = {
    selectAll: function(callback){
        orm.selectAll("burgers",function(res){
            callback(res);
        })
    },
    insertOne: function(cols, vals, callback) {
        orm.insertOne("burgers",cols,vals, function(res){
            callback(res);
        })
    },
    updateOne: function(colVals, condition, callback) {
        orm.updateOne("burgers",colVals,condition,function(res){
            callback(res);
        })
    },
    delete: function(condition,callback) {
        orm.delete("burgers", condition, function(res){
            callback(res);
        })
    }
}

module.exports = Burger;