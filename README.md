# get-videos-information-from-youtubeApi-with-react

#### This project get 50 most popular yotube videos with the YouTube Data API. For more detail information you can visit [YouTube Data API](https://developers.google.com/youtube/v3/).

In videosAPI.js we fetch this video information by using fetch Api - method fetch() to the URL:
```
getURL:'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=yourApiKey'
```
In response to this request, we receive an object of the following type:
```
{etag:""XI7nbFXulYBIpL0ayR_gDh3eu1k/Ic8q4ZvH2vgXeFfMsncCN7_sfUk"",
id:"CboJMlgfyMA",
kind:"youtube#video",
snippet:
  categoryId:"20",
  channelId:"UCa_xHe7N8h1kFQsOIFWSCbQ",
  channelTitle:"Little Lizard - Fortnite",
  defaultAudioLanguage:"",
  description:"NEVER STEAL DRIFTS GOLDEN SCAR!!",
  liveBroadcastContent:"none"
  localized:{title: "NEVER STEAL DRIFTS GOLDEN SCAR!!",
  publishedAt:"2018-07-20T04:00:00.000Z"
  tags:(10) []
  thumbnails:{default: {…}, medium: {…}, high: {…}, standard: {…}, maxres: {…}}
  title:"NEVER STEAL DRIFTS GOLDEN SCAR!! * SEASON 5 *Fortnite Short Film"
}
```
 #### We use predictable state container that emits state updates in response to actions - Redux. 
 With using Redux the state of application is stored in an object tree within a single store.
 
 Actions are the source of information for the store. We have two actions: 'GET_VIDEOS' and'GET_VIDEOS_SUCCESS':
 ```
 /redux/effects/redux.js
 
 export const GET_VIDEOS='GET_VIDEOS';
 export const GET_VIDEOS_SUCCESS='GET_VIDEOS_SUCCESS';

  export function getVideosAction(){
  return{
    type: GET_VIDEOS
  }
}

export function getVideosSuccessAction(payload){
  return{
    type:GET_VIDEOS_SUCCESS,
    payload
  }
}
```
 We use [effects](https://github.com/redux-effects/redux-effects) to dispatch actions:
```
 /redux/effects/redux.js

import VIDEO_API from './../../videosAPI.js'
import * as Actions from './../actions/actions.js'

export function getVideosEffect() {
  return dispatch => {
      dispatch(Actions.getVideosAction())
    VIDEO_API.getVideo()
      .then(videos=>{      
        dispatch(Actions.getVideosSuccessAction(videos))
    })
  };
}
 ```
 
Reducers specify how the application's state changes in response to actions sent to the store:
```
/redux/reducers/ideosReducer.js

export default videosReducer
import {GET_VIDEOS, GET_VIDEOS_SUCCESS} from './../actions/actions.js'

let initialState={
  ids:[],
  entities:{},
  loading:false
}

function videosReducer(state=initialState, action){
  switch(action.type){
    case GET_VIDEOS:{
      return{
        ...state,
        loading:true
      }
    }
    case GET_VIDEOS_SUCCESS:{

      const videosArr=action.payload;
      const entities=videosArr.reduce((accumulator, video)=>{
        return{
          ...accumulator,
          [video.id]:video
        }   
      },{})
      const ids=Object.getOwnPropertyNames(entities); 
      
      return{
        ...state,
        ids,
        entities,
        loading:false
      }
    }  
  }
  return state;
}
```
So we store videos information in object entities:{} and array ids:[]. Storing information in the object entities:{} allows to quickly get the information on the key, which is a video ID:
```
entities:
{
2zMTRWZMJ-w:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/t0pfUNWHeq0Na7mrzq-cYBZvvCY"", id: "2zMTRWZMJ-w", snippet: {…}}
5MtfYjLjyGg:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/BKd36ohDpZYIWG2RyJGZnmTJaTY"", id: "5MtfYjLjyGg", snippet: {…}}
6VLqdY6rvZk:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/Bf8qdV9ujYf-4MfAYWB2mboNWM0"", id: "6VLqdY6rvZk", snippet: {…}}
8mnDBXSKAbs:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/3i58rLUkE4Zk7a-GybC-fJg4YMU"", id: "8mnDBXSKAbs", snippet: {…}}
95ghQs5AmNk:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/83ljDhx4G-He_MEIsZZjmMXo0kA"", id: "95ghQs5AmNk", snippet: {…}}
-Vo_t4pgDqA:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/QtV7wIpO5UuqmSPPss1a-KiDfGM"", id: "-Vo_t4pgDqA", snippet: {…}}
-oD7B7oiBtw:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/82KFycDBS7tyZNVhae2VbkY21Co"", id: "-oD7B7oiBtw", snippet: {…}}
CAb_bCtKuXg:{kind: "youtube#video", etag: ""XI7nbFXulYBIpL0ayR_gDh3eu1k/4q0wVqmuSIzC-LzTNEUv-awk8PE"", id: "CAb_bCtKuXg", snippet: {…}}
...
}


ids:
(50) ["MBPdKxlazD0", "w7pYhpJaJW8", "f3uVr2bZKUU", "tgBHu2D66Rg", "PV9jdolesMI", "WDkg3h8PCVU", "QUYLG94VWb4", "5MtfYjLjyGg", "vumMdSybdQg", "-oD7B7oiBtw", "wQ1CWUWivjQ", "PQIq4BUw_Hs", "rV0vcfT8WQs", "Yn60wQvKhaY", "Gp_RnJcb8Ig", "95ghQs5AmNk", "R30dTNfBi2I", "eBaKVC1wIW4", "bATPXjOKebI", "FrGRFdDzkFM", "nrAla4j8xMc", "PEMk1WWO3gg", "CGNi4Ca7XVU", "wd9Ja4evrHc", "oWm1hWXlgQs", "YHEU6WBpHMc", "E7eBb3qGuvY", "h4j_pxyQIak", "sel-yV46B0A", "k5dxFyN73Pk", "UhurAzTl5gs", "u1fa0c0ImGQ", "V9p1k5wAVvU", "6VLqdY6rvZk", "FHgm89hKpXU", "RI7WyhWZkzk", "z_yIn8V3UcU", "CAb_bCtKuXg", "2zMTRWZMJ-w", "LdH7aFjDzjI", "bhxhNIQBKJI", "CFND44Dupzw", "FEc-OQ_oqDk", "-Vo_t4pgDqA", "ucF6Qxpn_0A", "8mnDBXSKAbs", "H0ZN54zWRPE", "FpZBSrosoeU", "Rz25tn4hPik", "JcIHs0nnXsQ"]
```


We use [reselect](https://www.npmjs.com/package/reselect) - a library for creating memoized selectors. We define selectors as functions that extract fragments of the Redux state for our React components. Using memoization, we can prevent unnecessary redrawing and recalculation of the received data, which, in turn, will speed up our application.
In Redux:
```
/redux/selectors/videoSelector.js

import {createSelector} from 'reselect'

const VideosDataSelector=(state)=> {
  return state.videos.ids.map(id=>
    state.videos.entities[id]
  )
}
const VideosLoadingSelector=(state)=>{
  return state.videos.loading
}
export const VideosSelector=createSelector(
  [VideosDataSelector],
  (videosData) => videosData
)
export const LoadingSelector=createSelector(
  [VideosLoadingSelector],
  (videosLoading) => videosLoading
)
```
In React component - VideosListPage.js:
```
import {VideosSelector, LoadingSelector} from './../redux/selectors/videoSelector.js'

@connect(state=>{
  return{
  videosData:VideosSelector(state),
  videosLoading:LoadingSelector(state)
  }
})
```
#### In React we have components - AppBar, LoadingItem, VideoInfoPage, VideoItem, VideosListPage.
VideosListPage - is a smart component to getting videos data;
VideoItem - to show video data in UI. When we click on the block with a description of the video - we go to the viewing of this video (component VideoInfoPage). The component VideoItem also has an internal state - when the button is clicked, a more detailed description of the video opens and closes:
 ```
 class VideoItem extends Component{
  constructor(){
    this.state={
      open:false
    }
    this.toggleCrawlHandler=this.toggleCrawl.bind(this);
    ...
  }
    ...
  toggleCrawl(){
    this.setState((prevState)=>{
      return{
        open: !prevState.open
      }
    })
  }
    ...
    render(){
      return{
        <div>
          ...
          <button onClick={this.toggleCrawlHandler}> Explore </button>
        </div>
      }
    }
 }
  ```
  #### We use [Material-UI](https://material-ui.com/) to implement some Google's Material Design to this project.
  #### Webpack is used as a bundler system. 
