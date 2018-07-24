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