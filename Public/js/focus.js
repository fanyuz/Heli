$(function(){
	var index=0;
	var length=$(".focus ul li").length;
	var width=$(".focus ul li").width();
	var lengthh=$(".banner ul li").length;
	var widtht=$(".banner ul li").width();
	var gnjs_len=$(".gnjs_banner ul li").length;
	var gnjs_left=$(".gnjs_left");
	var gnjs_right=$(".gnjs_right");
	
	
	
	
	var time;
	var nav_a=$(".header_center_right nav a");
	$(".focus ul").width(length*width);
	$(".banner ul").width(lengthh*widtht);
	$(".gnjs_banner ul li").eq(0).css("opacity","1").siblings().css("opacity","0");
	


			
					$(".section2-content-fl").hover(function(){
						$(this).find("img").attr("src","/themes/default/Public/images/banner_left_bg.png")
					},function(){
						$(this).find("img").attr("src","/themes/default/Public/images/banner_left.png")
					})
					$(".section2-content-fr").hover(function(){
						$(this).find("img").attr("src","/themes/default/Public/images/banner_right_bg.png")
					},function(){
						$(this).find("img").attr("src","/themes/default/Public/images/banner_right.png")
					})
		


	
	gnjs_left.click(function(){
		index--;
		if(index==-1){
			index=gnjs_len-1;
		};
		c(index);
	
	});
	gnjs_right.click(function(){
		index++;
		if(index==gnjs_len){
			index=0;
		};
		c(index);
	});
	
	
	
	$(".gnjs_banner").hover(function(){
		clearInterval(time);
	},function(){
			time=setInterval(function(){
			index++;
			if(index==gnjs_len){
				index=0;
			};
			c(index);
		},3000);
	}).trigger("mouseleave");
	
	
	
	
	$(".left").click(function(){
		index-=1;
		if(index==-1){
			index=length-1;
		};

		a(index);
	});
	$(".rightt").click(function(){
		index++;
		if(index==length){
			index=0;
		};

		
		a(index);
	});
	$(".focus").hover(function(){
		clearInterval(time);
	},function(){
		time=setInterval(function(){
			index++;
			if(index==length){
				index=0;
			}
			a(index);	
		},8000);
	}).trigger("mouseleave");
	
	
	
	$(".leftt").click(function(){
		index-=1;
		if(index==-1){
			index=lengthh-1;
		};
		if(index>0){
			$(".leftt").css("display","block");
		}else if(index<=0){
			$(".leftt").css("display","none");
		};	
		b(index);
	});
	$(".righttt").click(function(){
		index++;
		if(index==lengthh){
			index=0;
		};
		if(index>0){
			$(".leftt").css("display","block");
		}else if(index<=0){
			$(".leftt").css("display","none");
		};
		b(index);
	});
	
	
	
	
	function a(index){
		var move=-index*width;
		$(".focus ul").stop(true,false).animate({"left":move},1000);
	};
	
	function b(index){
		var b=-index*widtht;
		$(".banner ul").stop(true,false).animate({"left":b},1000);
	};
	
	function c(index){
		$(".gnjs_banner ul li").eq(index).css("opacity","1").siblings().css("opacity","0");
	}
	

	
	
	
	
	

	$(".center_ul li").css("opacity","0.6");
	$(".center_ul li").hover(function(){
		$(this).css("opacity","1").siblings().css("opacity","0.6");
	}).trigger("mouseover");
	
	
	
	

	
	
	
	
	
});