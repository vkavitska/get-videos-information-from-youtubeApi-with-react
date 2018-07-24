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