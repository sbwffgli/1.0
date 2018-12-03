  window.onload = function() {
        $("#s1").focus().val('');
        //定义回调函数
        window.baidu = {
            sug:function(json) {
                console.log(json)
            }
        }
        //动态添加JS脚本
        var script = document.createElement("script");
        script.src = sugurl;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    $(function(){
        //通用头部搜索切换
        $('#search-hd .search-input').on('input propertychange',function(){
            var val = $(this).val();
            if(val.length > 0){
                $('#search-hd .pholder').hide(0);
            }else{
                var index = $('#search-bd li.selected').index();
                $('#search-hd .pholder').eq(index).show().siblings('.pholder').hide(0);
            }
        })
        $('#search-bd li').click(function(){
            var index = $(this).index();
            $('#search-hd .pholder').eq(index).show().siblings('.pholder').hide(0);
            $('#search-hd .search-input').eq(index).show().siblings('.search-input').hide(0);
            $(this).addClass('selected').siblings().removeClass('selected');
            $('#search-hd .search-input').val('');
        });
        $('.btn-search').click(function () {
            var Q=$('#search-bd li.selected').index()===0?"#s1":"#s2",Q=encodeURI(insert_spacing($(Q).val()))
                ,TP=$('#search-bd li.selected').index()===0?'&q='+Q:'&usernick='+Q;
            window.open("http://s.2.taobao.com/list/list.htm?_input_charset=utf8"+TP);
        });
        				
        $(document).keyup(function(event){
            if(event.keyCode ==13){
                $('.btn-search').click();
            }
        });
    })
    /*设置监听事件，向输入框中输入内容，当键盘按键弹起的时候，将输入的内容作为参数传入到函数info中*/
    $("#s1").bind("keyup",function(event){
        /*当键盘按下上下键的时候，不进行监听，否则会与keyup事件起冲突*/
        if(event.keyCode == 38 || event.keyCode == 40){
            return false;
        }
        var value = $("#s1").val();
        info(value);
    })
    /*将ajax封装到函数中*/
    function info(value){
        /*百度搜索框智能提示的接口*/
        var url = "https://suggest.taobao.com/sug";
        /*需要传入的参数，cb是callback的缩写*/
        var data = {
            q :value,
            code :"utf-8"
        }
        /*因为涉及跨域，这里使用jsonp*/
        $.ajax({
            url :url,
            data :data,
            type :"GET",
            dataType :"jsonp",
            jsonpCallback :"helloword",
            /*跨域成功的时候返回的数据*/
            success :function (result){
                /*返回成功之后可以在开发者工具里的Console打印看一下*/
                console.log(result);
                /*将获取的数据整理后返回到页面*/
                var a = result.result;
                var list = "";
                for(var i in a ){
                    var l = a[i][0];
                    list += "<option>"+l+"</option>";
                }
                $("#List").html(list);
            },
            /*跨域失败的时候返回的数据*/
            error :function(){
                console.log("error");
            }
        })
    }

/*中英文加+*/
function insert_spacing(str) {
  var p1=/([0-9A-Za-z_])([\u4e00-\u9fa5]+)/gi;
  var p2=/([\u4e00-\u9fa5]+)([0-9A-Za-z_])/gi;
  var str=str.replace(p1, "$1+$2").replace(p2, "$1+$2");
return str;
}
	
	
//平台、设备和操作系统
var system ={
win : false,
mac : false,
xll : false
};
//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
if(system.win||system.mac||system.xll){
  
}else{
window.location.href="https://www.baidu.com";
}