export const shiftPerPage = (val) => {
  return {
    type:'changeShiftPerPage',
    value:val
  }
}
export const dateFrom = (val) => {
  return {
    type: 'changeDateFrom',
    value:val
  }
}
export const dateTo = (val) => {
  return {
    type: 'changeDateTo',
    value:val
  }
}