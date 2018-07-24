const VIDEO_API={
  getURL:'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=AIzaSyC7kBGILATndHu2dbDqQoEXYw8x6CswPsU',
  getVideo:function(){
    return fetch(this.getURL)
      .then(response=>{
        console.log(response.status);
        if (response.ok) {
          let video=response.json();
            return video;         
        }
        throw new Error('Network response was not ok.');
      })
      .then(json=>{
        let data = json.items;
        return data;
      })
      .catch(error=>{
        console.log('There has been a problem with your fetch operation: ' + error.message);
      })
  }
}

export default VIDEO_API