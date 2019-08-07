import moment from 'moment';
let init={
  roster:[],
  shift:[],
  page:1,
  shiftPerPage:10,
  ontime:0,
  late:0,
  early:0,
  save:0,
  recordNumber:0,
  from:'2013-09-15',
  to:'2014-04-12'
};

export default (state=init,action)=>{
  switch(action.type){
    case 'readRoster_FULFILLED':{
    return state={
      ...state,
      roster:action.payload.data,
    }
    break;
  }
  case 'readShift_FULFILLED':{
    return state={
      ...state,
      shift:action.payload.data,
    }
    break;
  } 
  case 'prev':{
    if(state.page>1)
    {
    return state={
      ...state,
      page:state.page-1,
    }
  }
  else return state;
    break;
  } 
  case 'next':{
    if(state.page<(state.roster.length/state.shiftPerPage))
    return state={
      ...state,
      page:state.page+1,
    }
    else return state;
    break;
  } 
  case 'ontime':{
    return state={
      ...state,
      ontime:state.ontime+1
    }
    break;
  } 
  case 'early':{
    return state={
      ...state,
      early:state.early+1,
      save:state.save+parseInt(action.value)
    }
    break;
  } 
  case 'late':{
    return state={
      ...state,
      late:state.late+1,
      save:state.save+parseInt(action.value)
    }
    break;
  } 
  case 'changeShiftPerPage':{
    return state={
      ...state,
      shiftPerPage:parseInt(action.value),
      page:1
    }
    break;
  } 
  case 'clear':{
    return state={
      ...state,
      ontime:0,
      early:0,
      late:0,
      save:0
    }
    break;
  } 
  case 'recordNumber':{
    return state={
      ...state,
      recordNumber:action.value
    }
    break;
  }  
  case 'changeDateFrom':{
    return state={
      ...state,
      from:action.value,
      page:1
    }
    break;
  }  
  case 'changeDateTo':{
    return state={
      ...state,
      to:action.value,
      page:1
    }
    break;
  }  
  default:
  return state;
  }
}