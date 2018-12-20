import React, { Component } from 'react';
import '../App.css';
import Scatter from './Scatter';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
class Statistics extends Component {
    state={
        data:[{
                histogram:[{emp_id:'0',emp_name:'ZZ',dept_name:'ZZ',emp_ht:'0',emp_sal:'0'}],
                view:[{Name:'QQ',Designation:'QQ',Salary:'0'}],
                dept:[{dept_id:0, dept_name:'--Select--'}]
            }],
        d:[{
            label:'A',
            values:[{x:0, y:0}]
            }       
        ],
        t_dept_id:'0',
        t_dept_name:'--Select--',
        
    }

    constructor(props)
    {
        super(props);
        this.scatterplot=this.scatterplot.bind(this);
        this.renderScatter=this.renderScatter.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.renderTable=this.renderTable.bind(this);
        this.count=this.count.bind(this);
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
              this.setState({ data });
              //alert(data[0].histogram[0].emp_sal+ "-" + data[0].histogram[0].emp_name+"-"+data[0].histogram[0].dept_name);
  
            });


        

        
  
        
    }


    scatterplot(did)
    {
               


        var dataset=[];
        var i;
        
        var json={};

        d3.selectAll("svg").remove();

        
        if(this.state.data[0].histogram.length>1 && did!=0)
        {

            for ( i=0; i<this.state.data[0].histogram.length; i++)
            {
                if(parseInt(this.state.data[0].histogram[i].dept_id)==did)
                {
                    const ht=parseInt(this.state.data[0].histogram[i].emp_ht);
                    const sal=parseInt(this.state.data[0].histogram[i].emp_sal);
                    const arr=[];
                    
                    arr.push(ht);
                    arr.push(sal);
                    
                    json.x=ht;
                    json.y=sal;
                    
                    this.state.d[0].values.push(json);
                    
                    dataset.push(arr);

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
            .attr("width", 800)
            .attr("height", 530);
            
            
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


            /*
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
            */

            svg.append("g")
            .attr("className", "axis") 
            .attr("transform", "translate(50,"+(500-padding)+" )")
            .call(xAxis);

            svg.append("g")
            .attr("className","yaxis")
            .attr("transform","translate("+(padding+50)+",0)")
            .call(yAxis);

            d3.selectAll("div.SPT")
            .style("visibility","visible");
            d3.select(".xlabel").style("visibility","visible");
            d3.select(".ylabel").style("visibility","visible");
        }
        else{
            d3.selectAll("div.SPT")
            .style("visibility","hidden");
            d3.select(".xlabel").style("visibility","hidden");
            d3.select(".ylabel").style("visibility","hidden");
        }
        
    }


    renderScatter = () =>
    {
      
        return this.state.data[0].dept.map(value=>{
        return (
          <option value={value.dept_id}>{value.dept_name} </option>
        )
      
      }) 
      
    }

    renderTable =()=>{
        
        return this.state.data[0].histogram.map(value=>{
            if(this.state.t_dept_id==value.dept_id){
            return (
                
                <tr>                   
                    <td> {value.emp_id} </td>
                    <td> {value.emp_name} </td>
                    <td> {value.emp_sal} </td>
                    <td> {value.emp_ht} </td>
                </tr>
            )}
          
          }) 
          
    }


    handleChange(e)
    {
        this.setState({t_dept_id : e.target.value})
        this.scatterplot(e.target.value);
    }


    count(val,tab)
    {	
     
          
    	  
      

      
    }


    render()
    {
        
        var l=150;
        var cnt=5;
        var u=l+cnt;
        var tab=[{        
                    values:{},
                }];

        var label="";
        for(var i=0;u<=180 ; i++)
          {
                label=l+"-"+u;
                var xy={};
                xy[label]=0;
                tab[0].values[label]=0;
              
                l=u+1;
                u=u+cnt;
          }
          alert(tab[0].values.length);
          var val=0;
          for(var i=0; i<this.state.data[0].histogram.length; i++)
			  {
				val=this.state.data[0].histogram.emp_ht;
				
				this.count(val,tab);
				
			  }
              console.log(tab);

        return(
            <div> <label className="ylabel"> <b> Salary of Employees </b> </label>

                <div className="SP">
                    Select Department Name &nbsp;&nbsp; : &nbsp;&nbsp;
                    <select onChange={this.handleChange} value={this.state.t_dept_id}>               
                        <option value={0}>- - Select - -</option>
                        {this.state && this.state.data && this.renderScatter()}
                    </select>
                </div>

                <label className="xlabel"><b>  Heights of Employees </b></label>
                <br/><br/>    <br/><br/>   <br/><br/>       <br/><br/>
                <div className="SPT">
                <table >
                    <tbody>
                    <tr>
                        <th> Id </th>
                        <th> Name </th>
                        <th> Salary </th>
                        <th> Height </th>
                    </tr>
                    {this.state && this.state.data && this.renderTable()}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }

}
export default Statistics;