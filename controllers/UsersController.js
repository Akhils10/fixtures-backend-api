exports.logout = (req, res) => {
    if(req.session.user) {
        req.session.destroy(function(){
            res.json({
                message: "logged out"
            })
        });
    }else {
        res.json({
            message: 'user not logged in'
        })
    }
};
