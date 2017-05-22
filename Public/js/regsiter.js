$(function(){
	//	注册

		$(".zc").click(function(){
		if($(".loginbar").is(":visible")==false){
			$(".regsiter").stop(true,false).slideToggle();
		};
		});
		$(".shut").click(function(){
			$(".regsiter").css("display","none");
		});

		


//	end
	
	
	
	
	
	
//	登录
		$(".deng").click(function(){
			if($(".regsiter").is(":visible")==false){
				$(".loginbar").stop(true,false).slideToggle();
			};
		});
		$(".shut").click(function(){
			$(".loginbar").css("display","none");
		});
	//end
});
