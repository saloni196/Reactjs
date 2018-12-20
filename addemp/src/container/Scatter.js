import React, { Component } from 'react';
import '../App.css';
import * as d3 from "d3";
import * as ReactD3 from 'react-d3-components';
class Statistics extends Component {
state={
    data:[{
            histogram:[{emp_id:'0',emp_name:'ZZ',dept_name:'ZZ',emp_ht:'0',emp_sal:'0'}],
            view:[{Name:'QQ',Designation:'QQ',Salary:'0'}]
        }],
        d:[{
            label:'A',
            values:[{x:0, y:0}]
            },        
        ]
}

  

    componentDidMount()
    {
      // Set the header attributes 
      const myHeaders = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
          });
      
      // fetch the employee details from server on port 5000 
     fetch("http://localhost:5002/", {
       headers: myHeaders,      
      })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
              //console.log(data);          
              this.setState({ data:data });
              //alert(data[0].histogram[0].emp_sal+ "-" + data[0].histogram[0].emp_name+"-"+data[0].histogram[0].dept_name);
  
            })
  
        
    }



    render()
    {
      
/*
        d3.selectAll('svg').style('background-color','#f7f58b'); 

        var axisScale = d3.scale.linear()
                                 .domain([0, 100])
                                 .range([0, 400]);

        var xAxis = d3.axisBottom()
                         .scale(axisScale);


        var xAxisGroup = d3.select('svg').append("g")
                                .call(xAxis);

*/

   /* var width = 400,
        height = 100;

    var d = [10, 15, 20, 25, 30];
    
    // Append SVG 
    var svg = d3.select("svg")
                .attr("width", width)
                .attr("height", height);

    // Create scale
    var scale = d3.scaleLinear()
                  .domain([d3.min(d), d3.max(d)])
                  .range([0, width - 100]);

    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(scale);

    //Append group and insert axis
    svg.append("g")
       .call(x_axis);

*/






var dataset=[];
var i;

var json={};
var max=0;
var id;

if(this.state.data[0].histogram.length>1)
{
for ( i=0; i<this.state.data[0].histogram.length; i++)
    {
        if(parseInt(this.state.data[0].histogram[i].dept_id)==7){
        const ht=parseInt(this.state.data[0].histogram[i].emp_ht);
        const sal=parseInt(this.state.data[0].histogram[i].emp_sal);
        const arr=[];

        arr.push(ht);
        arr.push(sal);

        json.x=ht;
        json.y=sal;

        this.state.d[0].values.push(json);

        dataset.push(arr);
        // alert(" id= "+this.state.data[0].histogram[i].dept_id+" name : "+this.state.data[0].histogram[i].emp_name+" eid : "+this.state.data[0].histogram[i].emp_id);
        if(sal>max)
        {
            max=sal;
        }
    }
    }

var padding = 20;

var xScale=d3.scaleLinear().domain([d3.min(dataset,function(d) {return d[0];})-5,parseInt(d3.max(dataset,function(d){return d[0]}))+(5)])
.range([padding,700-padding]).clamp(true);

var yScale=d3.scaleLinear().domain([0,1600000]).range([480,100]).clamp(true);


var xAxis=d3.axisBottom()
.scale(xScale).ticks(12);


var yAxis=d3.axisLeft().scale(yScale).ticks(8);


var svg = d3.select("div.SP")
.append("svg")
.attr("width", 1000)
.attr("height", 1000)
.attr("viewBox","-100 -100 1000 1000");


svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", function(d) {
    return xScale(d[0])+50;
})
.attr("cy", function(d) {
    return yScale(d[1]);
})
.attr("r", "1")
.style("fill","red");



svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
return "  "+ d[0] + "," + d[1];
})
.attr("x", function(d) {
return xScale(d[0]);
})
.attr("y", function(d) {
return yScale(d[1]);
})
.attr("font-family", "sans-serif")
.attr("font-size", "8px")
.attr("fill", "green");


svg.append("g")
.attr("className", "axis") 
.attr("transform", "translate(50,"+(500-padding)+" )")
.call(xAxis);

svg.append("g")
.attr("className","yaxis")
.attr("transform","translate("+(padding+50)+",0)")
.call(yAxis);

}
        return(
            <div className="SP">
            <br/>
            </div>

        )
    }

}
export default Statistics;