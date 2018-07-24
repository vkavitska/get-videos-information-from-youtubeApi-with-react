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