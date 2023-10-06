
// ? don't forget 'await' before calling. 
export function wait(ms:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}