import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import $ from "jquery";

class Result extends Component{
  
   constructor(props) {
    super(props);
    this.state = {data:[]} 
  }
  
   componentWillMount() {

  var th = this;
    this.serverRequest = 
      axios.get("/apijson?loc="+encodeURI(this.props.loc))
     
        .then(function(result) {    
          console.log(result)
          th.setState({
            data: result.data.businesses,
 
          });
      
        })
     
     
  }

  going(evt) {

  window.location.href="/request-token";
  }
  
  render() {
     
	 var th=this;
		 
 console.log(this.state.data);
		
	
          return (
          <div>
	{th.state.data.map(function(item) {

          return (<div className='result'>
          <a href={item.url}><img src={item.image_url} className="image"/></a>

          <div>
          <b>{item.name+"\n"}</b>
          <div>{"Price: "+item.price}</div>
          <div>{"Rating: "+item.rating}</div>
          </div>
          <button className="material go-button going-button" onClick={th.going}>GOING</button>
          </div>)
		  
		  })}
	</div>
		
		)

}
  
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(function() {

  
	$( "#searchfield" ).on( "keydown", function(event) {
      if(event.which == 13){
      ReactDOM.unmountComponentAtNode(document.getElementById('results'));
      setCookie("city", $("#searchfield").val(), 1);
	  ReactDOM.render(<Result loc={$("#searchfield").val()}/>, document.getElementById('results'));
	  }
	  
	  });

	
    $("#go").on("click", function() {
    ReactDOM.unmountComponentAtNode(document.getElementById('results'));
    setCookie("city", $("#searchfield").val(), 1);
	ReactDOM.render(<Result loc={$("#searchfield").val()}/>, document.getElementById('results'));
	});

});