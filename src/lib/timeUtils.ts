export function timeCalcHours(start:string, end:string){
  
  const startDate = new Date(start)
  const endDate = new Date(end)
  // console.table({start, startDate: startDate.toISOString(), end, endDate: endDate.toISOString()});
  // @ts-ignore
  const diffInMs = (endDate - startDate)
  const diffInHrs = diffInMs / (1000 * 60 * 60)
  // let diff =(startDate.getTime() - endDate.getTime());
  // diff /= (60 * 60);
  // console.log(diffInHrs);
  
  return Math.abs(Math.round(diffInHrs));
  // return diffInHrs;
}