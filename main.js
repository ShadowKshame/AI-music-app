song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
Scoreright = 0;
Scoreleft = 0;
Status1 = "";
Status2 = "";

function preload()
{
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    Status1 = song1.isPlaying(); Status2 = song2.isPlaying();
    if(Scoreleft > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    song2.stop();
    if(Status1 == false)
    {
        song1.play();
        document.getElementById("SongName").innerHTML = "Wanna Rock";
    }
    }

    if(Scoreright > 0.2)
    {
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(Status2 == false)
    {
        song2.play();
        document.getElementById("SongName").innerHTML = "Holiday";
    }
    }
}

function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}





   
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        Scoreleft = results[0].pose.keypoints[9].score;
        Scoreright = results[0].pose.keypoints[10].score;
        console.log("Scoreleft =" + Scoreleft);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX +"leftWristY ="+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX +"rightWristY ="+ rightWristY);

    }
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

