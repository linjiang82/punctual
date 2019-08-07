import {connect} from 'react-redux';
import React, {Component} from 'react';
import {shiftPerPage} from '../actions/action';
import './paging.css';

class Paging extends Component {
  constructor(props){
   super(props);
  }
  render(){
    return(
    <div className='pContainer'>
      <div>
          Show
          <select onChange={e=>this.props.onSelect(e.target.value)}>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='0'>All</option>
          </select>
          shifts
      </div>
      <div>
      <button onClick={this.props.prev}>Prev</button>
      <button onClick={this.props.next}>Next</button>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page,
    shiftPerPage:state.shiftPerPage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    prev: () => {
      dispatch({type:'prev'})
    },
    next: () => {
      dispatch({type:'next'})
    },
    onSelect:(val) => {
      dispatch(shiftPerPage(val))
    }

  }
}

export default Paging=connect(mapStateToProps,mapDispatchToProps)(Paging);