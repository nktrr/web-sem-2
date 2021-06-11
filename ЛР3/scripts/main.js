$(document).ready(function(){
	var image = $("#rotateble");
	var button = $("#defaultPosButton");
	let margin = 0;
	image.click(() =>{
		margin+=15;
  		image.css("margin-left", margin);
  
  		
	});
	button.click(()=>{
		margin = 0;
		image.css("margin-left", margin);
	});
});