    const videoSection = document.querySelector('section')
    //Fetch youtube api
    function getVideo(){
    fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLor0BmxGjyxnVN8xVFTGASCnwiflTyjtj&key={KEYAPI}')   
    .then(res => res.json())  //do not push apikey with github
    .then(data=>{
    data.items.forEach(el => { //iteratet through each video
        
        videoSection.innerHTML += `    
        <a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class=youTube-PlayList">
        <img src="${el.snippet.thumbnails.maxres.url}" />
        <h3>${el.snippet.title}</h3> 
        </a>` //youtube url attached to properties within 
    });

    }).catch(err =>{      //if there's an error in page. message will display
    console.log(err); 
    videoSection.innerHTML = '<h3> Opps something went wrong, try again </h3>'
    });
    }

    getVideo();