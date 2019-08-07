import React, {Component, Fragment, PureComponent} from 'react';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import axios from 'axios';
import {connect} from 'react-redux';
import './datepicker.css';
import logo from '../logo.svg';
import { dateFrom, dateTo } from '../actions/action';

class Datepicker extends Component {
  constructor(props){
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(date,which){
    if(which==='from'){
      this.props.dispatch(dateFrom(date.format('YYYY-MM-DD')))
    }
    else if(which==='to'){
      this.props.dispatch(dateTo(date.format('YYYY-MM-DD')))
    }
  }
  showProfile(e){
    e.stopPropagation();
    document.querySelector('.profile').style.opacity=1;
    document.querySelector('.profile').style.visibility='visible';
    
  }
  hideProfile(e){
    e.stopPropagation();
    document.querySelector('.profile').style.opacity=0;
    document.querySelector('.profile').style.visibility='hidden';
  }
  render(){
    this.props.dispatch({type:'readRoster', payload:axios.get(`/rosters/${this.props.from}/${this.props.to}`)});
    this.props.dispatch({type:'readShift',payload:axios.get(`/shifts/${this.props.from}/${this.props.to}`)})
    return(
    <div className='container'>
      <div className='user' onMouseEnter={this.showProfile} onMouseLeave={this.hideProfile}>
        <div className='profile'>
          <div>Employee Type: Casual</div> 
          <div>Hour rate: $25</div> 
        </div>
        <img className='avatar' src={logo}/>
        <span>Mark</span>
      </div>
      <div className='datepicker'>
      <Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="picker">
        <DatePicker
          keyboard
          label="From"
          format="DD/MM/YYYY"
          value={this.props.from}
          // handle clearing outside => pass plain array if you are not controlling value outside
          mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
          onChange={date=>this.handleDateChange(date,'from')}
          disableOpenOnEnter
          animateYearScrolling={false}
        />
      </div>
      <div className="picker">
        <DatePicker
          keyboard
          label="To"
          format="DD/MM/YYYY"
          value={this.props.to}
          // handle clearing outside => pass plain array if you are not controlling value outside
          mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
          onChange={date=>this.handleDateChange(date,'to')}
          disableOpenOnEnter
          animateYearScrolling={false}
        />
      </div>
      </MuiPickersUtilsProvider>
    </Fragment>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    from: state.from,
    to:state.to
  }
}
export default Datepicker=connect(mapStateToProps)(Datepicker);