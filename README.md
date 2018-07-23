# get-videos-information-from-youtubeApi-with-react

#### This project get 50 most popular yotube videos with the YouTube Data API. For more detail information you can visit [YouTube Data API](https://developers.google.com/youtube/v3/).

In videosAPI.js we fetch this video information by using fetch Api - method fetch() to the URL:
```
getURL:'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=AIzaSyC7kBGILATndHu2dbDqQoEXYw8x6CswPsU'.
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
 
Reducers
```
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




Webpack is used as a bundler system. 
