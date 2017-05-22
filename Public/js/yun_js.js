$(function(){

		
		$(window).on("load",function(){
		imglocation();
		$(window).scroll(function(){
			if($(document).scrollTop()>=$(document).height() - $(window).height()){
				//追加
			}else{
				null;
			}
		})
	})
	
	function imglocation(){
		var box=$(".box");
		var boxWidth=box.eq(0).width();
		var num=Math.floor($(".container").width()/boxWidth);
		var boxArr=[];
		box.each(function(index,value){
			var boxHeight=box.eq(index).height();
			if(index<num){
				boxArr[index]=boxHeight
			}else{
				var minHeight=Math.min.apply(null,boxArr);
				
				var minboxindex=$.inArray(minHeight,boxArr);
				$(value).css({
					"position":"absolute",
					"top":minHeight,
					"left":box.eq(minboxindex).position().left
				})
				boxArr[minboxindex]+=box.eq(index).height();
			}
		})
		
	}



		$(".yun-dj").hover(function(){
			$(this).find(".yun-dj-fr").css("display","block");
		},function(){
			$(this).find(".yun-dj-fr").css("display","none");
		})



		$(".ewm1").css("display","none");
                $(".ewm_hover").hover(function(){

                    $(".ewm1").css("display","block");
                },function(){
                	 $(".ewm1").css("display","none");
                });

            $(".weixin_ewm").css("display","none");
                $(".weixin").hover(function () {
                    $(".weixin_ewm").css("display","block");
                },function(){
                	$(".weixin_ewm").css("display","none");
                });

        
        $(".yun-banner-r").hover(function(){
        	$(this).find("img").attr("src","/themes/default/Public/images/banner_right_bg.png");
        },function(){
        	$(this).find("img").attr("src","/themes/default/Public/images/banner_right.png");
        })

        $(".yun-banner-l").hover(function(){
        	$(this).find("img").attr("src","/themes/default/Public/images/banner_left_bg.png");
        },function(){
        	$(this).find("img").attr("src","/themes/default/Public/images/banner_left.png");
        })

        $(".ysj1_article_left>a").click(function(){
        	var len=$(".ysj1_article_left>a").index(this)+1;
        	$(".this_page").text(len);
        })
			

        


	$(window).on("load",function(){




		


		$(".gy_ul li:nth-child(3n)").css("margin-right","0");
		
		$(".ysj1_article_left>a").click(function(){
			var imgTitle=$(this).find("img").attr("title");
			var imgSrc=$(this).find("img").attr("src");
			$(".ysj1_article_kg").find("img").each(function(){
				var ysj1_article_kgImg=$(this).attr("title");
				
				if(imgTitle==ysj1_article_kgImg){
					$(this).attr("src",imgSrc);
				}
			})
			
			
		})
		var yun_suodClick=false;
		$(".yun_suod").click(function(){
			yun_suodClick=true;




			if(yun_suodClick=true){

				$(".yun-dj").css("display","block");


				$(".yun_pinggu").css("display","block");
			
				$(".ysj1_article_left").css("display","none");
				$(".ysj1_page").css("display","none");
				// $(".r_bottom5").click(function(){
				// 	$(".xiazai").css("display","block");
				// })
				// $(".r_bottom4").click(function(){
				// 	$(".fenxiang").css("display","block");
				// })
				// $(".r_bottom3").click(function(){
				// 	$(".yun_pinggu").css("display","block");
				// })
				// $(".r_bottom3").click(function(){
				// 	$(".yun_pinggu").css("display","block");
				// })


				$(".ysj1_article_kg section").click(function(){


					if($(".section_sgt").is(":hidden")){
						$(".section_sgt").css("display","block");
					}else{
						$(".section_sgt").css("display","none");
					}
					
				})



				 $(".r_bottom4").click(function () {
				 
		            $(".fenxiang").slideToggle();  
		         });
		         $(".r_bottom1").click(function () {
		                $(".fenxiang").slideToggle();
      		  });
		          $(".r_bottom3").click(function () {
                    $(".yun_pinggu").slideToggle();
                });
                $(".r_bottom5").click(function () {
                    $(".xiazai").slideToggle();
                });

                $("head").append("<link rel='stylesheet' type='text/css' href='/themes/default/Public/css/yundg.css'>");
			}
			
		})
		$(".ysj1_article_left a").css("display","block");

		function _Click(thisClass){
			var ysj1_article_left_a=1;
					$('.yun-shuluo').parent().hide();
					$("img[title='"+thisClass+"']" ,'.yun-shuluo').each(
					function(){
						$(this).parent().parent().show();
						$(this).attr("data-index",ysj1_article_left_a);
		 				ysj1_article_left_a++;
					});
					$(".ysj1_article_left a").on("click",function(){
		 				$(".this_page").text($(this).attr("data-index"))

		 			})
				}


		
					

	

		YUNbanner(0)
		function YUNbanner(aindex){


		var yun_xuanxtrue=false;
		var yunlne=1;
		$(".yun_xuanx a").click(function(){

			$(this).css("color","#00c5e8").siblings("a").css("color","#fff")

			yun_xuanxtrue=true;
			var yun_xuanxT=$(this).text();
			yunlne=0;


			var width=$(".yun-banner ul li").width();
			$(".yun-banner ul").width(width);
			$(".yun-banner ul li").each(function(){
				
				if($(this).attr("data-title").indexOf(yun_xuanxT,c)!== -1){
					$(this).css("display","block");
					
					yunlne++;
					$(".yun-banner ul").width(yunlne*443);
					
				}else{
					$(this).css("display","none");
				}
			})

				
		}).eq(0).trigger("click");


		$(".gy_ul li").click(function(){
        	index=$(".gy_ul li").index(this);
        	$(".yun_fixed").css("display","block");
        	$(".yun_xuanx a").eq(index).css("color","#00c5e8").siblings("a").css("color","#fff");
        	$(".yun_xuanx a").eq(index).click();
        })




				$(".yun-banner-r").click(function(){
						
						aindex++;

					
						if(aindex==yunlne){
							aindex=0;
						}
						$(".yun-banner ul").animate({"left":-aindex*443},500);
						
						

					})

					$(".yun-banner-l").click(function(){
						aindex--;
						if(aindex==-1){
							aindex=yunlne-1;
						}
						$(".yun-banner ul").animate({"left":-aindex*443},500);
					})

		
	

		}

	

	})

	if(window.location.search!=""){
	 	$(".yun_fixed").css("display","none");
	}else{
	 	$(".yun_fixed").css("display","block");
	}
	
	




})
