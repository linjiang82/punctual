import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RadialChart} from 'react-vis';
import './summary.css';

class Summary extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let punctualRate=Math.floor(this.props.ontime/(this.props.ontime+this.props.early+this.props.late)*100);
    return(
    <div className='sContainer'>
    <RadialChart
    data={[{angle:punctualRate,label:punctualRate.toString()},{angle:100-punctualRate}]}
    width={110}
    height={110}
    innerRadius={40}
    radius={50}
    showLabels
    labelsAboveChildren
    className='chart'
    />
    <p>
    Mike is punctual {punctualRate}% of the time. Time saved: {this.props.save} mins.
    </p>
<div className='flexbox'>
    <div className='flexitem'><span className='fontcolor'>ARRIVED LATE </span>{this.props.late}</div>
    <div className='flexitem'><span className='fontcolor'>PUNCTUAL </span>{this.props.ontime}</div>
    <div className='flexitem'><span className='fontcolor'>LEFT EARLY </span>{this.props.early}</div>
</div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
   ontime : state.ontime,
   early : state.early,
   late: state.late,
   save: state.save
  }
}
export default Summary = connect(mapStateToProps)(Summary);