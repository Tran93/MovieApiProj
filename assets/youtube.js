const videoSection = document.querySelector('section')
//Fetch youtube api
function getVideo(){
fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLor0BmxGjyxnVN8xVFTGASCnwiflTyjtj&key=AIzaSyAiXQnWOzRCPzTm2PwIH6ahy_Hqt0_qA58')
.then(res => res.json())
.then(data=>{
  data.items.forEach(el => { //iteratet through each video
    
    videoSection.innerHTML += `    
    <a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class=youTube-PlayList">
    <h2>${el.snippet.title}</h2> 
    <img src="${el.snippet.thumbnails.high.url}" />
    </a>` //youtube url attached with items 
  });

}).catch(err =>{      //if there's an error in page. message will display
console.log(err); 
videoSection.innerHTML = '<h3> Opps something went wrong, try again </h3>'
});
}

getVideo();