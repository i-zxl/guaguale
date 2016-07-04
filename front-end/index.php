<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache" />
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache" />
	<META HTTP-EQUIV="Expires" CONTENT="0" />
	<title>成绩刮刮乐|资讯民大</title>
    <link rel="stylesheet" type="text/css" href="css/lib/frozenui.min.css" />
	<link rel="stylesheet" type="text/css" href="css/page/main.css" />
</head>
<body>
	<div class="main-contain hide">
		<!-- 添加canvas绘制遮罩 -->
		<div class="card-ul"></div>
		
		<div class="carfix"></div>
		<div class="not-like">
			<div class="not-like-closebtn">x</div>
			<span class="not-like-title white-color ui-nowrap-flex ui-whitespace">不喜欢这个功能？点右边可以关闭哦~</span>
			<label class="ui-switch">
                <input type="checkbox" id="ifLike" checked />
            </label>
		</div>
		<div class="ui-dialog">
			<div class="ui-dialog-cnt">
			    <div class="ui-dialog-bd">
			        <div>关闭此功能后会恢复到以前的对话消息。如果想再次打开此功能，在资讯民大直接回复关键字“刮刮乐”即可。</div>
			    </div>
			    <div class="ui-dialog-ft">
			        <button type="button" data-role="button">取消</button>
			        <button type="button" data-role="button">确定</button>
			    </div>
			</div>
		</div>
	</div>

	<div class="prompt">
		<div style="position:fixed;bottom:1em;margin:0;padding:0;width:100%;text-align:center;color:#999;font-size:0.8em;">&copy; 比特工场</div>
		<div class="err-prompt err-204 hide">
			<img src="img/watermelon-half.png" />
			<h4>过儿，不要急</h4>
			<p>成绩还没有出来噢~</p>
			<a href="http://wall.stuzone.com"><div class="prompt-btn">许个愿吧</div></a>
			<div class="prompt-btn-plain tryagain">再试一次</div>
		</div>
		<div class="err-prompt err-205 hide">
			<img src="img/watermelon-whole.png" />
			<h4>啊嘞嘞</h4>
			<p>你貌似没有评教哦</p>
			<div class="prompt-btn-grey">评教关闭</div>
		</div>
		<div class="err-prompt err-403 hide">
			<img src="img/watermelon.png" />
			<h4>吃块西瓜冷静下</h4>
			<p>你的账号密码有错误哦</p>
			<div class="prompt-btn binding">重新绑定</div>
		</div>
		<div class="err-prompt err-404 hide">
			<img src="img/juice2.png" />
			<p>教务系统出问题了</p>
			<p>吓的我果汁都掉了</p>
			<div class="prompt-btn tryagain">再试一次</div>
		</div>
		<div class="err-prompt err-407 hide">
			<img src="img/watermelon.png" />
			<h4>哎呀</h4>
			<p>你貌似没有绑定账号哦</p>
			<div class="prompt-btn binding">绑定账号</div>
		</div>
		<div class="err-prompt err-500 hide">
			<img src="img/juice.png" />
			<p>程序猿正在努力修复中</p>
			<p>喝杯果汁冷静下</p>
			<div class="prompt-btn tryagain">再试一次</div>
		</div>
		<div class="err-prompt loading">
			<div class="spinner">
				<img src="img/tea.gif">
			</div>
			<h4>Loading</h4>
			<p>一边喝饮料一边翻成绩</p>
			<div class="prompt-btn-grey" style="visibility: hidden">评教关闭</div>
		</div>
	</div>
	<script src="js/lib/jquery-1.11.3.min.js"></script>
	<!-- <script src="js/lib/zepto.min.js"></script>
	<script src="js/lib/frozen.js"></script> -->
	<script src="js/page/canvas.js"></script>
</body>
</html>
