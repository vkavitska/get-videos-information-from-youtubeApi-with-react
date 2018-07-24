import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {VideoInfoSelector} from './../redux/selectors/videoSelector.js';

@withRouter

@connect((state, props)=>{
  return{
    videoId:VideoInfoSelector(state, props)
  }
})

class VideoInfoPage extends Component{
  componentDidMount(){
    console.log(this.props.videoId)
  }
  render(){
    const url = `https://www.youtube.com/embed/${this.props.videoId}?autoplay=1`;
    return(
      <div style={{margin: 'auto'}}>
        <iframe 
          src={url} 
          style={{
            width: 700,
            height:700
          }}>
        </iframe> 
    </div>
    )
  }
}

export default VideoInfoPage

