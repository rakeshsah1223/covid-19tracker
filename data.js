
function updatemap(){

 fetch("https://api.covid19india.org/data.json")
	.then(response => response.json())
	.then(data=>{
	console.log(data) 

// start of table
	if (data.statewise.length>0) {
		var temp ="";

		data.statewise.forEach((v)=>{
			temp+="<tr>";
			temp+="<td>"+v.state+"</td>"
			temp+="<td>"+v.confirmed+"</td>"
			temp+="<td>"+v.active+"</td>"
			temp+="<td>"+v.recovered+"</td>"
			temp+="<td>"+v.deaths+"</td>"
			temp+="</tr>";
		})

		document.getElementById("data").innerHTML=temp
	}

// end of table
	 var total_active, total_recovered, total_death, total_confirmed
	 
	 var states = []
	 var confirmed = []
	 var recovered = []
	 var deaths = []
	 $.each(data.statewise,function(id,obj){
	 	states.push(obj.state)
	 	confirmed.push(obj.confirmed)
	 	recovered.push(obj.recovered)
	 	deaths.push(obj.deaths)
	 })

	 states.shift()
	 recovered.shift()
	 confirmed.shift()
	 deaths.shift()
	 // console.log(states)

	 total_active = data.statewise[0].active
	 total_confirmed = data.statewise[0].confirmed
	 total_recovered = data.statewise[0].recovered
	 total_death = data.statewise[0].deaths

	 $("#active").append(total_active)
	 $("#recover").append(total_recovered)
	 $("#confirmed").append(total_confirmed)
	 $("#death").append(total_death)

	 var myChart = document.getElementById("mychart").getContext('2d')

	 var chart = new Chart(myChart,{
	 	type:'line',
	 	data:{
	 		labels:states,
	 		datasets:[
	 			{
	 				label:"confirmed cases",
	 				data:confirmed,
	 				backgroundColor:"red",
	 				minBarLength:100,
	 			},
	 			
	 			{
	 				label:"Recovered cases",
	 				data:recovered,
	 				backgroundColor:"green",
	 				minBarLength:100,
	 			},

	 			{
	 				label:"Death cases",
	 				data:deaths,
	 				backgroundColor:"gray",
	 				minBarLength:100,
	 			}
	 		]
	 	},
	 	options:{}

	 	 })
	 //console.log(datasets)
	});	 
}

updatemap();

function darkMode(){
	var ele = document.body;
	ele.classList.toggle("dark-mode");
}

// darkMode();