var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
var x,y; //敵機の描写用
var move = 0,flag =1;//敵機の行動用　横移動
var tate = 0,hight = 13,flagtate=0;//　敵機の行動用　縦移動
var l = 0; //残機表示用
var score = 0;
var a = 0;//自機の移動用
var life = 3;//ライフ表示用
var byou = 46;// 残り時間初期値(91s)
var time = 0; // 追加（ゲーム開始からの経過時間（秒））
var right = false; //移動用
var left = false;   //移動用
var fighter_x = 323; // ビームの発射位置（自機のx座標の初期値
var fighter_x1 = 368;// ビームの発射位置（自機のx座標の初期値
var fighter_y = 690; // ビームの発射位置（自機のy座標の初期値）
var enemy_x = 154;
var enemy_y = 130;
var fire = false; // ビーム発射用
var beam = false; // ビーム発射制御用
var beam_x , beam_x1 , beam_y; // ビームのx座標とy座標
var random1 = Math.floor(Math.random() * 6); // 敵のビーム発射用
var random2 = Math.floor(Math.random() * 3); // 敵のビーム発射用
var attack_flag = 0;// 敵のビーム発射用
var attack_flag1 = 0;// 敵のビーム発射用
var yoko_x = [0,80,160,240,320,400];
var tate_y = [0,70,140];
var beam_enemy_x = 156;
var beam_enemy_y = 130; // 敵ビームのx座標とy座標
var myWindow; // ゲーム終了時用
var hantei=1; // ゲーム終了時用
var fX = 348+a; //自機の当たり判定用
var fY = 720+a; //自機の当たり判定用
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=450,height=420,left=560,top=150`; // ゲーム終了時用
var enemy =[
    [1, 1, 1, 1, 1, 1], 
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
];


myCanvas.width = "700";
myCanvas.height = "800";

document.addEventListener('keydown', keydownMove, false); 
document.addEventListener('keyup', keyupMove, false); 
document.addEventListener('keydown', keydownFire, false); 
document.addEventListener('keyup', keyupFire, false); 

//自機移動判定
function keydownMove(event) {
    var ck = event.keyCode; //押されたキーを取得
    if (ck === 37 ) { //＜キー(37)が入力されたら左に動く
        left = true;
    }
    if (ck === 39)  { //＞キー(39)が入力されたら右に動く
        right = true;
    }
}
function keyupMove(event) {
    var ck = event.keyCode; //離れたキーを取得
    if (ck === 37 ) { //キーが離れたら止まる
        left = false;
    }
    if (ck === 39) { //キーが離れたら止まる
        right = false;
    }
}

//ビーム発射の判定
function keydownFire(event) {
    var ck = event.code;
    if (ck == "Space") {
        fire = true;
    }
}
function keyupFire(event) {
    var ck = event.code;
    if (ck == "Space") {
        fire = false;
    }
}

//自機体の描写
function draw1() {

    ctx.beginPath();//パスの開始宣言
    //ctx.arc(347, 715, 25, 0 / 180 * Math.PI, 360 / 180 * Math.PI, true);
    ctx.moveTo(348 + a, 690);//三角形の描写
    ctx.lineTo(338 + a, 740);//三角形の描写
    ctx.lineTo(358 + a, 740);//三角形の描写
    ctx.fillStyle = "white";//色指定
    ctx.fill();//描写

    ctx.fillRect(323 + a, 705, 3, 30);//四角形の描写 X座標, Y座標, 幅, 高さ
    ctx.fillRect(368 + a, 705, 3, 30);//四角形の描写
    ctx.fillRect(323 + a, 725, 18, 10);//四角形の描写
    ctx.fillRect(353 + a, 725, 18, 10);//四角形の描写
    ctx.fill();

    ctx.closePath();

    
    fighter_x = 323 + a; 
    fighter_x1 = 368 + a;// 追加
}

//敵機の描写
function draw2() {
    x = 0; y = 0;  // 追加
    for (var i = 0; i <= 2; i++) {
        for (var k = 0; k <= 5; k++) {
            //敵機体の描写
            var eX = 156 + x + move;
            var eY = 130 + y + tate;
            if(beam == true){
                if(enemy[i][k] == 1){
                    if(Math.abs(eX - beam_x) <= 15 && Math.abs(eY - beam_y) <= 15 || Math.abs(eX - beam_x1) <= 15 && Math.abs(eY - beam_y) <= 15){
                        enemy[i][k]=0;
                        score+=1;  
                        beam = false;                 
                    }
                }
            }
            if(enemy[i][k] != 0){
            ctx.beginPath();
            //円(x,y,半径,開始角度(0なら３時の位置),終了角度,回り方(ture=反時計回り)
            ctx.arc(156 + x + move, 130 + y + tate, 15, 0 / 180 * Math.PI, 360 / 180 * Math.PI, true);

            ctx.moveTo(156 + x + move, 125 + y + tate);
            ctx.lineTo(126 + x + move, 130 + y + tate);
            ctx.lineTo(156 + x + move, 135 + y + tate);

            ctx.moveTo(156 + x + move, 125 + y + tate);
            ctx.lineTo(186 + x + move, 130 + y + tate);
            ctx.lineTo(156 + x + move, 135 + y + tate);

            ctx.arc(156 + x + move, 130 + y + tate, 15, 0 / 180 * Math.PI, 360 / 180 * Math.PI, true);
            ctx.fillStyle = "#008080";

            ctx.fillRect(126 + x + move, 110 + y  + tate, 4, 45);
            ctx.fillRect(182 + x + move, 110 + y  + tate, 4, 45);
            ctx.fillStyle = "#008080";
            ctx.fill();

            ctx.closePath();
            }
            x += 80;
            
        }
        y += 70;
        x = 0;
    }

    enemy_x = 154 + move;
    enemy_y = 130 + tate;
}

//自機ビーム発射
function attack(){
    if (fire == true && beam == false) { //ビームの描写
        beam_x = fighter_x - 3;
        beam_x1 = fighter_x1 - 3;
        beam_y = fighter_y;
        ctx.fillStyle = "red";
        ctx.fillRect(beam_x, beam_y, 4, 20);
        ctx.fillRect(beam_x1, beam_y, 4, 20);
        beam = true;
    } else if (beam == true) { //ビームの移動用
        beam_y -= 5;
        beam.y -= 5;
        ctx.fillStyle = "red";
        ctx.fillRect(beam_x, beam_y, 4, 20);
        ctx.fillRect(beam_x1, beam_y, 4, 20);
        if (beam_y < 0) {
            beam = false;
        }
    }
}

//敵機の攻撃
function enemy_attack(){
    if(attack_flag == 0){
        beam_enemy_x = enemy_x + yoko_x[random1];
        beam_enemy_y = enemy_y + tate_y[random2];
        ctx.fillStyle = "#66cdaa";
        ctx.fillRect(beam_enemy_x, beam_enemy_y, 4, 20);
        attack_flag = 1;
    } else if(attack_flag == 1){
        beam_enemy_y += 5;
        ctx.fillStyle = "#66cdaa";
        ctx.fillRect(beam_enemy_x, beam_enemy_y, 4, 20);
        if(beam_enemy_y > 800){
            attack_flag = 0;
            random1 = Math.floor(Math.random() * 6);
            random2 = Math.floor(Math.random() * 3);
        }
    }
}
//敵機の攻撃２
function enemy_attack1(){
    if(attack_flag1 == 0){
        beam_enemy_x = enemy_x + yoko_x[random1];
        beam_enemy_y = enemy_y + tate_y[random2];
        ctx.fillStyle = "#66cdaa";
        ctx.fillRect(beam_enemy_x, beam_enemy_y, 4, 20);
        attack_flag1 = 1;
    } else if(attack_flag1 == 1){
        beam_enemy_y += 5;
        ctx.fillStyle = "#66cdaa";
        ctx.fillRect(beam_enemy_x, beam_enemy_y, 4, 20);
        if(beam_enemy_y > 800){
            attack_flag1 = 0;
            random1 = Math.floor(Math.random() * 6);
            random2 = Math.floor(Math.random() * 3);
        }
    }
}

//残り時間表示
function cntdown() {
    ctx.font = "25px PixelMplus10";
    ctx.fillStyle = "Yellow";
    ctx.fillText(Math.floor(byou - time) + " s", 580, 43); // 変更
    time += 0.01 // 10ミリ秒
}

//スコア表示
function showscore() { 
    ctx.font = "25px PixelMplus10";
    ctx.fillStyle = "Yellow";
    ctx.fillText("SCORE : " + score , 45, 43);
}

//残機表示
function zanki() {
    var img = new Image();
    img.src = "ハート.png";
    for (var restlife = 0, l = 0; restlife < life; restlife++) { // 変数restlifeを追加
        ctx.drawImage(img, 21 + l, 753, 30, 30);
        l += 40;
    }
}

//ゲーム終了時
function end(){
    if(hantei!=0){
        myWindow = window.open("./end.html","myWindow",params);
    }
}

function main() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    if(Math.abs(fX - beam_enemy_x) <= 25 && Math.abs(fY - beam_enemy_y) <= 25){
        life -= 1;
        attack_flag = 0;
        a += 10;
        draw1();
        a -= 20;
        draw1();
        a += 10;
        if(life <= 0){

            clearInterval(interval); // ゲーム終了（画面停止）
            end();
        }
    }
    draw1();

    if(flagtate == 1){
        tate += 0.7;
        if(tate>hight){
            flagtate = 0;
            hight += 13;
        }
    }else if(flagtate==0){
        move += flag * 1.3; 
        if(move >= 100 || move <= -100){
            flag = -1*flag;
            flagtate = 1;
        }
    }

    draw2();
    cntdown(); 
    showscore(); 
    zanki();
    
    //自機移動
    if (left == true) {
        a -= 5;
    }
    if (right == true) {
        a += 5;
    }

    attack();
    enemy_attack();
    enemy_attack1();
    
    if (time > byou) { // 規定の秒数を超えたら
        clearInterval(interval); // ゲーム終了（画面停止）
        end();
    }
}

var interval = setInterval(main, 10); // 10ミリ秒ごとに画面書き換え
