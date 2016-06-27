$(document).ready(function() {
	// 画成绩的
	var CanvasWidth = 0,
		CanvasHeight = 0;
	var scoreObj = {};

	var score_data;
	
	function fillImg(str, num){
		var strCanvas = $(".score-canvas");
		strCanvas = strCanvas[num];
		var ctx = strCanvas.getContext("2d");
		//resize canvas width and height
		ctx.canvas.width = CanvasWidth;
		ctx.canvas.height = CanvasHeight;
		ctx.font = "6em sans-serif";
		// ctx.font = "5em matchFont";
		str = "" + str;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(str, CanvasWidth/2, CanvasHeight/2);
	}

	// 画阴影的 想把画阴影的和擦的放在一起了
	// todo
	function fillShadow(i){
		var shadowCanvas = $(".score-shadow");
		shadowCanvas = shadowCanvas[i];
		var ctx = shadowCanvas.getContext("2d");
		//resize canvas width and height
		ctx.canvas.width = CanvasWidth;
		ctx.canvas.height = CanvasHeight;

		ctx.fillStyle = "#dbdbdb";
		ctx.fillRect(0, 0, 2*CanvasWidth, 2*CanvasHeight);

	}
	function clearShadow(){
		var _this, ctx;
		var shadowCanvas = $(".score-shadow");
		var mousedown = false;

		function eventDown(e){
			e.preventDefault();
			mousedown = true;
		}
		function eventUp(e){
			e.preventDefault();
			mousedown = false;
		}
		function eventMove(e){
			e.preventDefault();
			if( mousedown ){
				if ( !!event.touches ) {
					console.log(event.touches);
					e = event.touches[0];
				};

				var offsetX = Math.floor( _this.offset().left ),
					offsetY = Math.floor( _this.offset().top );
				var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
					y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
				if ( x > 15 ) {
					x = x + 15;
				};
				with( ctx ){
					beginPath();
					arc(x, y, 15, 0, Math.PI * 2);
					console.log(x+"    "+y);
					if ( x > CanvasWidth*2/5 && x < CanvasWidth*4/5 && y >CanvasHeight*2/5 && y < CanvasHeight*4/5) {
						if ( _this.attr("data-ok") !== "ok" ) {
							var openId = getUrlParam("openid");
							var className = _this.parent().parent().children("h1").text();//TODO
							console.log(className);
							$.ajax({// 擦除成功 发送参数
								url: 'http://www.stuzone.com/zixunminda/scratchoff/api.php',
								type: 'POST',
								dataType: 'json',
								data: {
									openid: 'oULq3uIcO-XJhdqrNTCKFpGiWMT8',
									act: 'checked',
									data: className
								},
								success: function(res){
									// 刮完标记之后 返回正确则弹出小花
									var flower = "";
									if (res.status == 200) {

										for(k in score_data){
											// 判断被刮的课程名称的成绩是不是大于90分
											if (score_data[k].class_name == className && score_data[k].score >= 90) {
												flower = '<div class="flower"><div><img src="img/flower.png" alt="鲜花" /></div><div>';
												var _parent = _this.parent().parent();
												_parent.append(flower);
												_parent.children('.flower').delay(1000).fadeIn(1500).fadeOut(1500);

											}
										}
									}
									console.log("保存成功的效果");
								},
								error: function(err){
									console.log( err );
									console.log("请求发送失败！");
								}
							});
							console.log( "saved" );
						};

						if ( !_this.prop("data-ok") ) {
							_this.attr("data-ok", "ok");
						};
						
					};
					fill();
				}
			}
		}
		$(".main-contain").on('mousedown', '.score-shadow', function(event) {
			_this = $(this);
			ctx = _this[0].getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';
			eventDown(event);
		});
		$(".main-contain").on('mouseup', '.score-shadow', eventUp);
		$(".main-contain").on('mousemove', '.score-shadow', eventMove);

		$(".main-contain").on('touchstart', '.score-shadow', function(event) {
			_this = $(this);
			ctx = _this[0].getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';

			eventDown(event);
		});
		$(".main-contain").on('touchend', '.score-shadow', eventUp);
		$(".main-contain").on('touchmove', '.score-shadow', eventMove);
	}
	// 获取url的openid
	function getUrlParam(sParam){
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	}
	// 渲染成绩的html
	function fillHtml(){
		// console.log("技术支持：比特工场。欢迎有互联网梦想的同学加入我们！")
		var openId = getUrlParam("openid");
		$.ajax({
			url: 'http://www.stuzone.com/zixunminda/scratchoff/api.php',
			dataType: 'json',
			timeout: 15000,
			data: {
				openid: 'oULq3uIcO-XJhdqrNTCKFpGiWMT8',
				type: 'GET',
			},
		})
		.done(function(res) {
			console.log(res);
			if (res.status == 200){
				var cardLi = "", tempArr = [];
				var data = res.data;
				score_data = data;
				for (i in data) {
					var hideShadow = ""	;
					if ( data[i].is_checked ) {
						hideShadow = 'hide';
					}
					cardLi += '<div class="card-li">';
					cardLi += '<h1 class="yellow-color">'+ data[i].class_name +'</h1>';//scoreName
					cardLi += '<div class="score-show">'
							+ '<canvas class="score-canvas">浏览器暂不支持该功能</canvas>'
							+ '<canvas class="score-shadow '+ hideShadow +'">浏览器暂不支持该功能<canvas>'
							+'</div>';
					cardLi += '<div class="dash-border"></div>';
					cardLi += '<h3 class="black-color">【'+ data[i].class_type +'】</h3>';//scoreClass
					cardLi += '</div>';
				};
				$(".card-ul").empty().append( cardLi );
				$(".main-contain").removeClass("hide");
				$(".prompt").fadeOut(1000);
				CanvasWidth = $(".score-canvas").width();
				CanvasHeight = $(".score-canvas").height();
				for (i in data) {
					fillShadow(i);
					fillImg(data[i].score, i);
				};
				if (res.is_like == false) {
					$(".score-shadow").addClass("hide");
					$("#ifLike").prop("checked", false);
				};
			}
			else{
				// no results
				console.log(res.status);
				var className = ".err-"+res.status;
				$(".loading").addClass("hide");
				$(className).removeClass("hide");
			}
		})
		.fail(function(data) {
			//TODO
			console.log(data);
			$(".loading").addClass("hide");
			$(".err-500").removeClass("hide");
		})
		.always(function() {
			clearShadow();
		});
	}

	function initNotLike(){
		// 弹窗是否出现
		$("#ifLike").click(function() {
			var ifLikeChecked = $(this).prop("checked");
			if ( !ifLikeChecked ) {
				$(".ui-dialog").addClass('show');
			}else{
				fnNotLikeAndClose("1");
			}
		});
		// 点击弹窗出现的btn按钮 处理结果
		$(".ui-dialog").delegate('button', 'click', function() {
			var _this = $(this);
			_this.parent().parent().parent().removeClass('show');
			var _btnIndex = _this.index();
			if ( _btnIndex == 0 ) {// 取消
				$("#ifLike").prop("checked", true);
			}else{// 确定关闭
				fnNotLikeAndClose("0");
			}
		});
		//关闭按钮
		$(".not-like-closebtn").click(function() {
			$(this).parent().addClass('hide');
		});
	}

	// 关闭之后 确认的 函数
	function fnNotLikeAndClose(isLike){
		var openId = getUrlParam("openid");
		if (isLike == 1) {
			var likeMark = 'true';
		}else{
			var likeMark = 'false';
		}
		$.ajax({
			url: 'http://www.stuzone.com/zixunminda/scratchoff/api.php',
			type: 'POST',
			dataType: 'json',
			data: {
				openid: 'oULq3uIcO-XJhdqrNTCKFpGiWMT8',
				act: 'like',
				data: likeMark
			},
			success: function(res){
				$(".score-shadow").fadeOut();
				// $(".score-shadow").addClass('hide');
			},
			error: function(err){
				console.log( "失败，请检查你的网络问题。" );
			}
		});
		//console.log( "switch: "+isLike );
	}
	//TODO
	$(".tryagain").click(function(){
		console.log("clicked");
		$(".err-prompt").addClass("hide");
		$(".loading").removeClass("hide");
		setTimeout(function(){
			fillHtml();
			initNotLike();
		}, 1800);
	});
	$(".binding").click(function(){
		var openId = getUrlParam("openid");
		var url = "http://www.stuzone.com/zixunminda/binding/login.php?type=ssfw&tousername="+openId;
		window.location.href = url;
	});

	(function init(){
		fillHtml();
		initNotLike();
	}());
});
