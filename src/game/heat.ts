import type {Heat} from './types';
export const HEATS:Heat[]=['cold','cool','warm','hot','blazing'];
export const heatLabel:Record<Heat,string>={cold:'Cold',cool:'Cool',warm:'Warm',hot:'Hot',blazing:'Blazing'};

/** Sensor likelihoods ordered Cold, Cool, Warm, Hot, Blazing. Tune here only. */
export const LIKELIHOOD_ROWS=[
  {max:.05,probabilities:[.005,.020,.075,.250,.650]},
  {max:.12,probabilities:[.010,.060,.200,.550,.180]},
  {max:.25,probabilities:[.050,.200,.500,.200,.050]},
  {max:.45,probabilities:[.190,.520,.220,.060,.010]},
  {max:Infinity,probabilities:[.700,.200,.075,.020,.005]},
] as const;
export function relativeDistance(a:number,b:number,size:number){return Math.abs(a-b)/Math.max(1,size-1)}
export function likelihoodsAtDistance(distance:number):readonly number[]{return LIKELIHOOD_ROWS.find(row=>distance<=row.max)!.probabilities}
export function heatLikelihood(observed:Heat,tile:number,target:number,size:number){return likelihoodsAtDistance(relativeDistance(tile,target,size))[HEATS.indexOf(observed)]}
export function sampleHeat(tile:number,target:number,size:number,rng:()=>number):Heat{const probabilities=likelihoodsAtDistance(relativeDistance(tile,target,size));let draw=Math.max(0,Math.min(1-Number.EPSILON,rng()));for(let i=0;i<probabilities.length;i++){draw-=probabilities[i];if(draw<0)return HEATS[i]}return 'blazing'}
