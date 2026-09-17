import type {Game,Mode,Observation} from './types';
import {dailySetup,eventRng} from './daily';
import {sampleHeat} from './heat';
import {entropy,posteriorFor} from './bayes';
export const INITIAL_SCANS=3;
export function randomSecret(size:number,rng=Math.random){return Math.floor(rng()*size)+1}
export function createGame(mode:Mode,size:number,date?:string,rng=Math.random):Game{const valid=Math.max(9,Math.min(144,Math.round(size)||25));const daily=mode.startsWith('daily')&&date?dailySetup(date):undefined;const actualSize=daily?100:valid;return{version:2,mode,size:actualSize,secret:daily?.secret??randomSecret(actualSize,rng),seed:daily?.seed,observations:[],scans:INITIAL_SCANS,scansUsed:0,scanHistory:[],guesses:[],startedAt:Date.now()}}
const randomFor=(game:Game,event:string,n=0)=>game.seed!==undefined?eventRng(game.seed,event,game.scansUsed,n):Math.random;
export function scan(game:Game,center:number):Game{
  const revealed=new Set(game.observations.map(o=>o.tile));if(game.scans<1||revealed.has(center)||center<1||center>game.size||game.completed)return game;
  const cols=Math.ceil(Math.sqrt(game.size)),cr=Math.floor((center-1)/cols),cc=(center-1)%cols;
  const candidates=Array.from({length:game.size},(_,i)=>i+1).filter(n=>!revealed.has(n)&&n!==center).map(n=>({n,key:Math.hypot(Math.floor((n-1)/cols)-cr,((n-1)%cols)-cc)+randomFor(game,'cluster',n)()*2})).sort((a,b)=>a.key-b.key||a.n-b.n);
  const count=Math.min(candidates.length,3+Math.floor(randomFor(game,'count',center)()*4)),tiles=[center,...candidates.slice(0,count).map(x=>x.n)],id=game.scansUsed+1;
  const before=entropy(posteriorFor(game.size,game.observations,game.guesses));
  const observations:Observation[]=tiles.map(tile=>({tile,heat:sampleHeat(tile,game.secret,game.size,randomFor(game,'heat',tile)),scanId:id}));
  const all=[...game.observations,...observations],after=entropy(posteriorFor(game.size,all,game.guesses));
  return{...game,observations:all,scans:game.scans-1,scansUsed:id,scanHistory:[...game.scanHistory,{id,center,tiles,entropyBefore:before,entropyAfter:after,informationGain:before-after}]};
}
export function guess(game:Game,value:number):{game:Game;status:'invalid'|'duplicate'|'wrong'|'correct'}{if(!Number.isInteger(value)||value<1||value>game.size)return{game,status:'invalid'};if(game.guesses.includes(value))return{game,status:'duplicate'};const correct=value===game.secret;return{game:{...game,guesses:[...game.guesses,value],scans:game.scans+(correct?0:1),completed:correct},status:correct?'correct':'wrong'}}
