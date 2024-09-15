let inpu=document.querySelector(".text-box");
let txt_btn=document.querySelector(".text-button");
textSec=document.querySelector(".text-section");
let lang=null;

let chatBox=document.querySelector(".chat-box");
const API_URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAbCF7eDvUkj1FcDVGOKwdkgA4q2ahzE_I`;

function createUserBox(html,className){
let div=document.createElement("div");
div.classList.add(className);
div.innerHTML=html;
return div;
}

const generateResponse= async (q)=> {
    let extractedText=q.querySelector(".about");
    try {
   const response=await fetch(API_URL,{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({
        "contents":[{"parts":[{text:lang}]}]
    })
   });
   const data=await response.json();
   console.log(data);
   const apiResponse=data?.candidates[0].content.parts[0].text;
   extractedText.innerHTML=apiResponse;
    } catch(error){
        console.log(error);
    }
    finally {
        q.querySelector(".loading").style.display="none";
    }
}

function createAiBox(){
    let html=` <div class="pic">
                <img src="./Photos/ai.png" width="60">
            </div>
            <p class="about"></p>
            <img class="loading" src="./Photos/best loading pic.webp" height="100">`;
            let q=createUserBox(html,"ai-content");
            chatBox.appendChild(q);
        generateResponse(q);
           
}
txt_btn.addEventListener("click",()=>{
    lang=inpu.value;
    if(lang==""){
        textSec.style.display="flex";
    }
    else {
        textSec.style.display="none";
    }
    if(!lang)
        return;

    let html=` <div class="pic">
                <img src="./Photos/user.png" width="40">
            </div>
            <p class="about"></p>`;

            let p=createUserBox(html,"user-content");
            p.querySelector(".about").innerHTML=lang;
chatBox.appendChild(p);
inpu.value="";
setTimeout(createAiBox,1000);
});