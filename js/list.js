  window.onload = function() {
        $("#s1").focus().val('');
        //����ص�����
        window.baidu = {
            sug:function(json) {
                console.log(json)
            }
        }
        //��̬���JS�ű�
        var script = document.createElement("script");
        script.src = sugurl;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    $(function(){
        //ͨ��ͷ�������л�
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
    /*���ü����¼�������������������ݣ������̰��������ʱ�򣬽������������Ϊ�������뵽����info��*/
    $("#s1").bind("keyup",function(event){
        /*�����̰������¼���ʱ�򣬲����м������������keyup�¼����ͻ*/
        if(event.keyCode == 38 || event.keyCode == 40){
            return false;
        }
        var value = $("#s1").val();
        info(value);
    })
    /*��ajax��װ��������*/
    function info(value){
        /*�ٶ�������������ʾ�Ľӿ�*/
        var url = "https://suggest.taobao.com/sug";
        /*��Ҫ����Ĳ�����cb��callback����д*/
        var data = {
            q :value,
            code :"utf-8"
        }
        /*��Ϊ�漰��������ʹ��jsonp*/
        $.ajax({
            url :url,
            data :data,
            type :"GET",
            dataType :"jsonp",
            jsonpCallback :"helloword",
            /*����ɹ���ʱ�򷵻ص�����*/
            success :function (result){
                /*���سɹ�֮������ڿ����߹������Console��ӡ��һ��*/
                console.log(result);
                /*����ȡ����������󷵻ص�ҳ��*/
                var a = result.result;
                var list = "";
                for(var i in a ){
                    var l = a[i][0];
                    list += "<option>"+l+"</option>";
                }
                $("#List").html(list);
            },
            /*����ʧ�ܵ�ʱ�򷵻ص�����*/
            error :function(){
                console.log("error");
            }
        })
    }

/*��Ӣ�ļ�+*/
function insert_spacing(str) {
  var p1=/([0-9A-Za-z_])([\u4e00-\u9fa5]+)/gi;
  var p2=/([\u4e00-\u9fa5]+)([0-9A-Za-z_])/gi;
  var str=str.replace(p1, "$1+$2").replace(p2, "$1+$2");
return str;
}
	
	
//ƽ̨���豸�Ͳ���ϵͳ
var system ={
win : false,
mac : false,
xll : false
};
//���ƽ̨
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//��ת��䣬������ֻ����ʾ��Զ���ת��wap.baidu.comҳ��
if(system.win||system.mac||system.xll){
  
}else{
window.location.href="https://www.baidu.com";
}