let express = require('express');
let router = express.Router();

router.get('/page2', function(req, res){
    res.json(req.decoded);
});


module.exports = router;