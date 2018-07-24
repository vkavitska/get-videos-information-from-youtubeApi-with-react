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

const VideoItemSelector=(state, props)=>{
  return state.videos.entities[props.id]
}

export const ItemSelector=()=>createSelector(
  [VideoItemSelector],
  (data)=>data
)

const VideoInfoPageSelector=(state, props)=>{
  return props.match.params.id
} 

export const VideoInfoSelector=createSelector(
  [VideoInfoPageSelector],
  (videoId)=>videoId
)






