var express = require('express');
var router = express.Router();

var Mongo = require('mongodb-curd')
    /* GET home page. */
var batabaseName = "gengzeng"
var collcationName = 'user'

router.post('/api/user', function(req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    if (!name || !pwd) {
        res.json({ code: 0, user: '用户名不能为空' })
    } else {
        Mongo.find(batabaseName, collcationName, { name: name }, function(result) {
            if (result.length > 0) {
                res.json({ code: 3, user: '该用户已经存在' })
            } else {
                find();
            }
        })
    }

    function find() {
        Mongo.insert(batabaseName, collcationName, { name: name, pwd: pwd }, function(result) {
            if (!result) {
                res.json({ code: 0, user: '添加失败' })
            } else {
                res.json({ code: 1, user: result })
            }
        })
    }
});



module.exports = router;