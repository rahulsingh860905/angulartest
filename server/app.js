var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

var router = express.Router();

router.get("/sum", function(req, res) {
    var a = req.query.a;
    var b = req.query.b;

    var sum = parseInt(a) + parseInt(b);
    res.status(200).json(sum);

});

app.use("/", router);

app.listen("4467", function() {
    console.log("Express Node server started..");
});
