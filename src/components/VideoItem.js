import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {ItemSelector} from './../redux/selectors/videoSelector.js';

@connect((state, props)=>{
  const VideoItemSelector = ItemSelector();
  const mapStateToProps = (state, props) => {
    return{
      data: VideoItemSelector(state, props)
      }
  };
 return mapStateToProps
})

@withRouter
class VideoItem extends Component{
  componentDidMount(){
    console.log(this.props.data);
  }
  constructor(){
    super();
    this.state={
      open:false
    };
    this.openVideoHandler=this.openVideo.bind(this);
    this.toggleCrawlHandler=this.toggleCrawl.bind(this);
  }
  openVideo(){
    this.props.history.push("/video/"+this.props.data.id);
  }
  toggleCrawl(){
    this.setState((prevState)=>{
      return{
        open: !prevState.open
      }
    })
  }
  render(){
  
    return (
         <div style={{marginTop:'70px'}}>
          <Card 
            onClick={this.openVideoHandler} 
            style={{
              maxWidth: 700,
              margin: 'auto'
            }}
          >
            <CardMedia
              style={{
                height: 0,
                paddingTop: '56.25%'
              }}
              image={this.props.data.snippet.thumbnails.medium.url}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {this.props.data.snippet.title}
              </Typography>
              {
                this.state.open && 
                <div>
                  <Typography component="p">
                    {this.props.data.snippet.channelTitle}
                  </Typography>
                  <Typography component="p">
                    {this.props.data.snippet.description}
                  </Typography>
                </div>
              }
              </CardContent>
          </Card>
           <button 
            onClick={this.toggleCrawlHandler}
            style={{
              backgroundColor: '#ff1744',
              margin:'auto',
              borderRadius: '2px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
              width:'180px',
              height:'60px',
              fontSize:'24px'
            }}
          >
              Explore
          </button>
        </div>
    )     
  }        
}

export default VideoItem






        
