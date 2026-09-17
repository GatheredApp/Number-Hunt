import type {Heat} from './types';
export const HEATS:Heat[]=['cold','cool','warm','hot','blazing'];
export function heatFor(value:number,secret:number,size:number):Heat {const d=Math.abs(value-secret); if(d<=Math.max(1,Math.floor(size*.04)))return 'blazing';if(d<=Math.max(2,Math.ceil(size*.10)))return 'hot';if(d<=Math.max(3,Math.ceil(size*.22)))return 'warm';if(d<=Math.max(4,Math.ceil(size*.40)))return 'cool';return 'cold'}
export const heatLabel:Record<Heat,string>={cold:'Cold',cool:'Cool',warm:'Warm',hot:'Hot',blazing:'Blazing'};
