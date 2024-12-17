export function plainObj(obj:any){
  return JSON.parse(JSON.stringify(obj))
}