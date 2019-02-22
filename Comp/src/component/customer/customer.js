import React, { Component } from 'react';
import './customer.css';
import Request from 'superagent';
import {Tbl} from './Tbl'
class Customer extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      datta: []
    };
  }
  
componentDidMount(){
  this.Search();
}

handleSubmit(e){
    var x = this.refs.addInput.value;
    var y = this.refs.Exact.checked;
    var inpsp = x.split(";");
    var inpuele =[];
    var inpunele =[];
    for(var f=0;f<inpsp.length;f++){
      var val  =inpsp[f].replace(/[A-Z]/g,'').replace(/\s+/g,'').replace(/[a-z]/g,'');
      var inte = inpsp[f].replace(/[0-9.]/g,'').replace(/\s+/g, '');
      inpunele.push(parseFloat(val)*100);
      inpuele.push(inte);
      var lengd = inpuele.length;
    }
    if (x!== '' && y===false){
    this.Search(inpuele,inpunele,lengd)
    }
    else if (x!== '' && y===true){
      this.Searchexact(inpuele,inpunele,lengd)
      }
      else if(x===''){
        console.log("Please enter some data")
      }
  e.preventDefault();
}

  render() {    
    return (
      <React.Fragment>
        <hr/>
      <form onSubmit ={this.handleSubmit.bind(this)}>
  <div className="Search"> 
      <input 
          type="text"
          className="input"
          ref="addInput"
          placeholder="Enter Chemical Composition"
        />
         <button className="button-is-info">
    Submit 
  </button>
  <input type="checkbox" className= "boxinput" ref="Exact" value="Composition" /> Exact Composition only
    </div>
    </form>
    <div className="table">
     
      {
        this.state.lengthee > 0 && 
      // this.state.datta.map((item )=> (
         <Tbl data= {this.state.datta}></Tbl>
      // ))
       }
    </div>
    </React.Fragment>
    );
  }

  Search(inpuele,inpunele,lengd){
   var elements = inpuele;
   var nelements =inpunele;
    Request.post('/api/customers')
    .query({"element" : elements,"nelements":nelements,"lengthe":lengd})
   .then(res => {
    console.log( res.body.output.length);
    this.setState({
    datta :res.body.output,
    lengthee: res.body.output.length
    })
    console.log("value in search",this.state.datta);
  });
  
  }
 
  Searchexact(inpuele,inpunele,lengd){
   var elements = inpuele;
   var nelements =inpunele;
    Request.post('/api/exact')
    .query({"element" : elements,"nelements":nelements,"lengthe":lengd})
    .then(res => {
      console.log( res.body.output.length);
      this.setState({
      datta :res.body.output,
      lengthee : res.body.output.length
      })
      console.log("value in search",this.state.datta);
    });
  }


    }

  

export default Customer;
