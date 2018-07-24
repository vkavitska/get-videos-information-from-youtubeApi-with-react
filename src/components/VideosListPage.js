import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getVideosEffect} from './../redux/effects/effects.js'
import VideoItem from './VideoItem.js'
import LoadingItem from './LoadingItem.js'
import {VideosSelector, LoadingSelector} from './../redux/selectors/videoSelector.js'

@connect(state=>{
  return{
  videosData:VideosSelector(state),
  videosLoading:LoadingSelector(state)
  }
})

class VideosListPage extends Component{
  componentDidMount(){
    if(this.props.videosData.length===0){
      this.props.dispatch(getVideosEffect());
    }    
  }
  render(){
      return(
        <div>
          <LoadingItem data={this.props.videosLoading}/>
          <h2>
          {
          this.props.videosData.map(video=>{
            return (
              <VideoItem 
                key={"id"+video.id} 
                id={video.id}
              />
            )
          })            
          }
          </h2>
        </div>
        )
  }
}

export default VideosListPage