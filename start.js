var myCanvas2=document.getElementById('myCanvas2');
var ctx = myCanvas2.getContext('2d');
var x=300,y=0;

myCanvas2.width="700";
myCanvas2.height="500";

//タイトルロゴの表示
function title(){
    x--;
    y++;
    ctx.clearRect(0,0,myCanvas2.width,myCanvas2.height);
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.fillStyle = "yellow";
    ctx.font = x + "px PixelMplus10";
    ctx.fillText("UNIVERS",355,250);
    ctx.fillText("WARS",355,500-(y*0.75));
    if(x>100){
        setTimeout("title()", 50);}
}

title();
