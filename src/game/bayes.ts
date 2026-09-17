import {heatLikelihood} from './heat';
import type {Observation} from './types';

export function uniformPrior(size:number){return Array.from({length:size},()=>1/size)}
export function posteriorFor(size:number,observations:Observation[]=[],incorrectGuesses:number[]=[]){
  if(size<1)return [];
  const excluded=new Set(incorrectGuesses);
  const logs=Array.from({length:size},(_,i)=>excluded.has(i+1)?-Infinity:-Math.log(size)+observations.reduce((sum,o)=>sum+Math.log(heatLikelihood(o.heat,o.tile,i+1,size)),0));
  const max=Math.max(...logs);
  if(!Number.isFinite(max))return uniformPrior(size);
  const weights=logs.map(v=>Number.isFinite(v)?Math.exp(v-max):0),total=weights.reduce((a,b)=>a+b,0);
  return weights.map(v=>v/total);
}
export function entropy(distribution:number[]){return distribution.reduce((sum,p)=>p>0?sum-p*Math.log2(p):sum,0)}
export function rankedCandidates(distribution:number[]){return distribution.map((probability,i)=>({number:i+1,probability})).sort((a,b)=>b.probability-a.probability||a.number-b.number)}
export function formatProbability(p:number){const n=p*100;return n<.1?'<0.1%':n<1?`${n.toFixed(2)}%`:`${n.toFixed(1)}%`}
