Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(date_url){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri +'"/>';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YcTBm6KTS/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classfy(img, gotResult);
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("answer").innerHTML=results[0].label;

        gesture=results[0].label;

        toSpeak="";
        if(gesture == "amazing"){
            toSpeak="This is Looking Amazing!!";
            document.getElementById("emoji").innerHTML="&#128076;";
        }
        else if(gesture == "best"){
            toSpeak="All the Best!!";
            document.getElementById("emoji").innerHTML="&#128077;";
        }
        else if(gesture == "victory"){
            toSpeak="Marvelous Victory!!";
            document.getElementById("emoji").innerHTML="&#9996;";
        }
        speak();
    }
}