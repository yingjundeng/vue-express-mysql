var auth = function (router){
	router.use(function(req,res,next){
		if(!req.session){
			res.redirect('/')
		}
	})
}