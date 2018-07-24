import React, {Component} from 'react'

class LoadingItem extends Component{
  render(){
    return(
      this.props.data ? <p>loading...</p> : null
    )
  }
}

export default LoadingItem 