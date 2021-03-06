import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import $ from "jquery";
import Buttong from "./Buttong"

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
			console.log(result.data)
			th.setState({
				data: result.data,
				
			});
			
		})
		
		
	}

	going(evt) {

		window.location.href="/request-token";
	}
	
	render() {

		var th=this
		console.log(this.state.data.length)
		if (this.state.data.length==0)
			return(<img id="loading" src="/load-gif-12.gif" height="80" width="80" />)
		else{
			return (
				<div>

				{this.state.data.map(function(item) {
					return (<div className='result container'>
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
					
					)}

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

			if(getCookie("search")!=="undefined"){
				document.getElementById('searchfield').value=getCookie("search");
				ReactDOM.render(<Result loc={document.getElementById('searchfield').value}/>, document.getElementById('results'));
			}