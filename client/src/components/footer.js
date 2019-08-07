import React, {Component} from 'react';
import {connect} from 'react-redux';
import './footer.css';

class Footer extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div className='fContainer'>
    Showing {(this.props.page-1)*this.props.shiftPerPage+1} to {this.props.page*this.props.shiftPerPage>this.props.roster.length?this.props.recordNumber:this.props.page*this.props.shiftPerPage} of {this.props.recordNumber}
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page,
    shiftPerPage:state.shiftPerPage,
    roster:state.roster,
    recordNumber:state.recordNumber,
  }
}
export default Footer=connect(mapStateToProps)(Footer);