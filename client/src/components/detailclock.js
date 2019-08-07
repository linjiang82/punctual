import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './detailclock.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tab } from '../../node_modules/@material-ui/core';

class DetailClock extends Component {
constructor(props){
  super(props);
  this.showTime=this.showTime.bind(this);
  this.hideTime=this.hideTime.bind(this);
  this.getNewArray=this.getNewArray.bind(this);
}
showTime(e){
  e.target.nextSibling.style.visibility='visible';
  e.target.nextSibling.style.opacity=1;
  
}
hideTime(e){
  e.target.nextSibling.style.visibility='hidden';
  e.target.nextSibling.style.opacity=0;
}
getNewArray(){
  if(this.props.roster && this.props.roster.length!=0 && this.props.shift && this.props.shift.length!=0){
    let combinedRoster=this.props.roster.map(roster=>{
      let matchedShift=this.props.shift.filter(shift=>{
      return  roster.date===shift.date
      })
      if(matchedShift.length>0)
      return {date:roster.date,
              rosterStart:roster.start,
              rosterFinish:roster.finish,
              shiftStart:matchedShift[0].start,
              shiftFinish:matchedShift[0].finish
      }
      return {
              date:roster.date,
              rosterStart:roster.start,
              rosterFinish:roster.finish,
              shiftStart:null,
              shiftFinish:null
      }
      
    })
    let combinedRosterCopy=combinedRoster.slice();
    this.props.shift.map(shift=>{
      let existedRoster=combinedRosterCopy.filter((roster)=>{
        return roster.date===shift.date;
      })
      if(existedRoster.length===0){
        combinedRoster.push({
          date:shift.date,
          rosterStart:null,
          rosterFinish:null,
          shiftStart:shift.start,
          shiftFinish:shift.finish
        })
      }
    }
    )
    combinedRoster.sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))
    this.props.dispatch({type:'recordNumber',value:combinedRoster.length})
      return combinedRoster;
  }
}
render(){
  this.props.dispatch({type:'clear'})
  let combinedRoster=this.getNewArray();
  let timediff = (a,b)=>{
   let diff = moment(a).diff(moment(b),'minutes'); 
   return diff>1?diff+'minutes':diff+'minute';
  }
  let trs=[];
  if(combinedRoster){
    for(let i=0;i<combinedRoster.length;i++)
    {
    let tds=[];
      tds.push(<TableCell>{moment(combinedRoster[i].date).format('MMM Do YYYY')}</TableCell>)
      tds.push(<TableCell>{combinedRoster[i].rosterStart===null?'Not Scheduled':moment(combinedRoster[i].rosterStart).format('h:mm a')}</TableCell>);
      //third cell
      if(combinedRoster[i].rosterStart===null)
      tds.push(<TableCell>{moment(combinedRoster[i].shiftStart).format('h:mm a')}</TableCell>);
      else if(combinedRoster[i].shiftStart===null)
      tds.push(<TableCell>No Time Clocked</TableCell>)
      else if(combinedRoster[i].rosterStart>combinedRoster[i].shiftStart)
      {this.props.dispatch({type:'ontime'});
        tds.push(<TableCell>On Time</TableCell>)}
        else {
          let diff=timediff(combinedRoster[i].shiftStart,combinedRoster[i].rosterStart)
          this.props.dispatch({type:'late',value:diff});
          tds.push(<TableCell>Late&nbsp;<span className='notOnTime'><span className='red' onMouseEnter={(e)=>this.showTime(e)} onMouseLeave={(e)=>this.hideTime(e)}>{diff}</span><div className='showTime'><div className='triangle'></div><div className='actualTime'>{moment(combinedRoster[i].shiftStart).format('h:mm a')}</div></div></span></TableCell>) 
        }
      tds.push(<TableCell>{combinedRoster[i].rosterFinish===null?'Not Scheduled':moment(combinedRoster[i].rosterFinish).format('h:mm a')}</TableCell>);
        //fifth cell
      if(combinedRoster[i].rosterFinish===null)
      tds.push(<TableCell>{moment(combinedRoster[i].shiftFinish).format('h:mm a')}</TableCell>);
      else if(combinedRoster[i].shiftFinish===null)
      tds.push(<TableCell>No Time Clocked</TableCell>)
      else if(combinedRoster[i].rosterFinish<combinedRoster[i].shiftFinish)
      {this.props.dispatch({type:'ontime'});
        tds.push(<TableCell>On Time</TableCell>)}
        else {
          let diff=timediff(combinedRoster[i].rosterFinish,combinedRoster[i].shiftFinish)
          this.props.dispatch({type:'early',value:diff});
          tds.push(<TableCell>Early&nbsp;<span className='notOnTime'><span className='red' onMouseEnter={(e)=>this.showTime(e)} onMouseLeave={(e)=>this.hideTime(e)}>{diff}</span><div className='showTime'><div className='triangle'></div><div className='actualTime'>{moment(combinedRoster[i].shiftFinish).format('h:mm a')}</div></div></span></TableCell>) 
        }
      trs.push(<TableRow>{tds}</TableRow>)
      }
  }
  return(
  <div className='dContainer'>
  <Table>
  <TableHead>
  <TableRow>
  <TableCell> Date </TableCell>
  <TableCell> Rosted Start </TableCell>
  <TableCell> Actual Start </TableCell>
  <TableCell> Rosted Finish </TableCell>
  <TableCell> Actual Finish </TableCell>
  </TableRow>
  </TableHead>
  <TableBody>
      {this.props.shiftPerPage===0?trs:trs.slice(((this.props.page-1)*this.props.shiftPerPage),(this.props.page*this.props.shiftPerPage))}
  </TableBody>
   </Table> 
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shiftPerPage: state.shiftPerPage,
    page: state.page,
    roster: state.roster,
    shift: state.shift
  }
}
export default DetailClock=connect(mapStateToProps)(DetailClock);
