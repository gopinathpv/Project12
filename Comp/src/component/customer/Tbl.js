import React, { Component } from 'react'
import $ from 'jquery';
$.DataTable = require('datatables.net');
export class Tbl extends Component { 
    componentDidMount() {
        var datta = this.props.data;
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                "Destroy": true,
                "bFilter": false,
                "paging" :false,
                "select":true,
                data: datta,
                columns: [
                    
                        {data: 'id'},
                      
                        {
"mData": null ,
"mRender" : function ( data, type, full ) {
  return full['Elements']+' '+full['numbersel'];
}
},
                            { data: 'Energy' },
                            { data: 'Formation' },
                            {data:"forunit"}
                        ]
        });
     }  
    componentWillUnmount(){

    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        console.log("value in the table",this.props.data)
        return (
            <div>
                <table className="display" width="50%" ref={el => this.el =el}>
                <thead>
          <tr>
              <th>ID</th>
              <th>Element Atoms</th>
              <th>Energy</th>
              <th> Formation Energy</th>
              <th>Formula unit</th>
          </tr>
         </thead>
                </table>
            </div>);
    }
}

export default Tbl;