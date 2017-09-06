
var Buttong = React.createClass({
	getInitialState: function () {
    return { 
            going:0

           };
  },
  
  componentDidMount: function() {
	  
  this.setState({
            going: this.props.going,
 
          });
  },
  
  going: function(evt) {
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
      

  },
  
  render: function () {
  return (<div><button id={this.props.id} onClick={this.going} className="material go-button going-button">{this.state.going+" GOING"}</button></div>)
  }
  
});

var Result = React.createClass({
  
  getInitialState: function () {
    return { 
            data:[]

           };
  },
  
   componentDidMount: function() {
   
  var th = this;
    this.serverRequest = 
      axios.get("/apijson?loc="+encodeURI(this.props.loc))
     
        .then(function(result) {    
      
          th.setState({
            data: result.data,
 
          });
      
        })
     
     
  },

  render: function () {
     
	 var th=this;
		 
 console.log(this.state.data);
		
	
          return (
          <div>
		  
	{this.state.data.map(function(item) {

          return (<div className='result'>
          <a href={item.url}><img src={item.image_url} className="image"/></a>

          <div>
          <b>{item.name+"\n"}</b>
          <div>{"Price: "+item.price}</div>
          <div>{"Rating: "+item.rating}</div>
          </div>
          <Buttong id={item.id} term={item.term} className="material go-button going-button" going={item.going}/>
          </div>)
		  
		  })}
	</div>
		
		)

}


  
});

var Searchform = React.createClass({

		search: function(){
		ReactDOM.unmountComponentAtNode(document.getElementById('results'));
		ReactDOM.render(<Result loc={document.getElementById('searchfield').value}/>, document.getElementById('results'));
		},
		
		searchenter:  function(e) {
				if (e.key == 'Enter') {
				ReactDOM.unmountComponentAtNode(document.getElementById('results'));
		ReactDOM.render(<Result loc={document.getElementById('searchfield').value}/>, document.getElementById('results'));
				}
		},
		
	 render: function () {
		return( <div>
		<div className="form-container">
		<h1>Plans tonight?</h1>
		<h2>See which bars are hoppin' tonight and RSVP ahead of time!</h2>
    <input id="searchfield" type="text" onKeyPress={this.searchenter} className="search material" placeholder="Enter places of your choice"/>
	<button id="go" onClick={this.search} className="go-button material">GO</button>
  </div>
  <div id="results"></div>
   </div>)
	 }

});

		function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
          return "";
      }

if(getCookie("search")!=="undefined"){
	document.getElementById('searchfield').value=getCookie("search");
	ReactDOM.render(<Result loc={document.getElementById('searchfield').value}/>, document.getElementById('results'));
}

ReactDOM.render(<Searchform />, document.getElementById('container'));