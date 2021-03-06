import React, { Component } from 'react'
import axios from 'axios'

export default class Buttong extends Component{

  constructor(props) {
     super(props)
     this.state={going:0}
  }
  
  componentDidMount() {
	  
  this.setState({
            going: this.props.going,
 
          });
  }
  
  going(evt) {
  var th=this;
  axios.get("/going?id="+evt.target.id)
     
        .then(function(result) {    
			
		  if(result.data.msg=="User is not signed")
          window.location.href="/request-token?search="+th.props.term;
		  else
		  th.setState({
            going: result.data.msg,
 
          });
			
          });
      

  }
  
  render() {
  return (<div><button id={this.props.id} onClick={(event) =>this.going(event)} className="material go-button going-button">{this.state.going+" GOING"}</button></div>)
  }
  
}
