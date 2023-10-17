//https://teachablemachine.withgoogle.com/models/x27fyR7mR/
    Webcam .set({
        width:350, 
        height:300,
        image_format: "png",
        png_quality: 90,
    })

    camera=document.getElementById("camera");
    Webcam.attach("#camera"); 

    function take_snapshot(){
     Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_image' src="+data_uri+" >";
     })   
    }
    console.log("ml5.version", ml5.version);
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/x27fyR7mR/model.json", modelready);
    function modelready(){
        
        console.log("modelisready");
    }

    prediction1=""
    prediction2=""
    
    function speak(){
        var synth=window.speechSynthesis;
        speakdata1="the first prediction is "+prediction1;
        speakdata2="and the second prediction is " +prediction2;
        var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
        synth.speak(utterthis);
    }

    function check(){
        img=document.getElementById("capture_image");
        classifier.classify(img,gotresults)
    }

    function gotresults(error,results){
        if(error){
            console.log(error)
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label;
            prediction1=results[0].label;
            prediction2=results[1].label;
            speak()
            if(results[0].label=="best"){
                document.getElementById("update_emoji").innerHTML="&#128077;"
            }

            if(results[0].label=="victory"){
                document.getElementById("update_emoji").innerHTML="&#9996;"
            }

            if(results[0].label=="amazing"){
                document.getElementById("update_emoji").innerHTML="&#128076;"
            }

             if(results[1].label=="best"){
                document.getElementById("update_emoji2").innerHTML="&#128077;"
            }

            if(results[1].label=="victory"){
                document.getElementById("update_emoji2").innerHTML="&#9996;"
            }

            if(results[1].label=="amazing"){
                document.getElementById("update_emoji2").innerHTML="&#128076;"
            }
        }
    }