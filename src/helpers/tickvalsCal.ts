// interface Tickvals{
//   data: number[],
//   numTicks?
// }

export const TickvalsCalc = (data:number[], numTicks = 10) =>{
  const minX = Math.min(...data);
  const maxX = Math.max(...data);

  const tickInterval = (maxX - minX) / (numTicks - 1);

  const tickvals = Array.from({ length: numTicks }, (_, index) => minX + tickInterval * index);

  return tickvals
}