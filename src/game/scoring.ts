export function scoreFor(size:number,guesses:number){if(!Number.isFinite(size)||!Number.isFinite(guesses)||size<1||guesses<1)return 0;return Math.max(0,Math.round(1000*Math.log2(size)/guesses))}
export function ratingFor(g:number){return g===1?'Perfect':g===2?'Elite':g===3?'Excellent':g<=5?'Strong':g<=8?'Solid':'Found It'}
