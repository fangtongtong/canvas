window.onload=function(){
    var canvasBox=document.querySelector(".canvas-box");
    var canvasBoxW=canvasBox.offsetWidth;
    var canvasBoxH=canvasBox.offsetHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    canvas.width=canvasBoxW;
    canvas.height=canvasBoxH;


    var drawObj=new shape(canvas,copy,cobj);
    /*菜单操作*/

    /*$(".menu-list").click(function(){
        var index=$(".menu-list").index(this);
        $(".aside-menu-list").hide().eq(index).slideToggle(100);;
    })*/

    /*画图*/
    $(".aside-menu-list:eq(1) li").click(function(){
        var fn=$(this).attr("data-role");
        if(fn=="bian"){
            drawObj.bianNum=prompt("请输入边数",drawObj.bianNum)
        }
        if(fn=="jiao"){
            drawObj.jiaoNum=prompt("请输入角数",drawObj.jiaoNum)
        }
        if(fn!=="pen") {
            drawObj.type = fn;
            drawObj.draw();
        }else{
            drawObj.pen();
        }
    })

    /*画图的方式*/
    $(".aside-menu-list:eq(2) li").click(function(){
        var fn=$(this).attr("data-role");
        drawObj.style=fn;
        drawObj.draw();
    })

    /*画图的颜色*/
    $(".aside-menu-list:eq(2) input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })

    /*线条的粗细*/
    $(".aside-menu-list:eq(3) li").click(function(){

        var num=$(this).attr("data-role");
        if(num!=="null") {
            drawObj.linew =num
            drawObj.draw();
        }
    })

    $(".aside-menu-list:eq(3) li input").change(function(){
        var num=$(this).val();
        drawObj.linew =num
        drawObj.draw();

    })
    /*橡皮*/
    /*$(".aside-menu-list:eq(3):last-child").click(function(){
        drawObj.clear();
    })*/


    /*文件*/
    $(".aside-menu-list:eq(0) li ").click(function(){
        var index=$(".aside-menu-list:eq(0) li").index(this);
        if(index==0){
            if(drawObj.historys.length>0){
                var yes=confirm("是否保存");
                if(yes){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet")
                    location.href=newurl;
                }
            }

            cobj.clearRect(0,0,canvas.width,canvas.height);
            drawObj.historys=[];

        }else if(index==1){
            //返回
            if(drawObj.historys.length==0){
                //no
                cobj.clearRect(0,0,canvas.width,canvas.height);
                setTimeout(function(){
                    alert("不能返回");
                },10)
            }else{
                if (drawObj.isback){
                    if (drawObj.historys.length == 1) {
                        drawObj.historys.pop();
                        cobj.clearRect(0, 0, canvas.width, canvas.height);
                    } else {
                        drawObj.historys.pop();
                        cobj.putImageData(drawObj.historys[drawObj.historys.length-1], 0, 0);
                    }
                } else {
                    cobj.putImageData(drawObj.historys.pop(), 0, 0);
                }

                drawObj.isback = false;

            }
        }else if(index==2) {
            var url=canvas.toDataURL();
            var newurl=url.replace("image/png","stream/octet")
            location.href=newurl;
        }
    })
    /*视觉橡皮  擦除指定的区域*/
    $(".aside-menu-list:eq(3):last-child").click(function(){
        drawObj.isshowxp=true;
        var xpObj=$(".xp");
        drawObj.clear(xpObj);

    })
    /*橡皮大小*/
    $(".aside-menu-list:eq(3):last-child input").change(function(){
        drawObj.xpsize=$(this).val();
        $(".xp").css({
            width:$(this).val()+"px",
            height:$(this).val()+"px"
        })

    })





}