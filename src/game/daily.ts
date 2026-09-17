export function dateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function hashSeed(text:string){let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
export function seeded(seed:number){let s=seed>>>0;return ()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
export function dailySetup(date:string){const seed=hashSeed(`number-hunt:${date}`);return {seed,secret:Math.floor(seeded(seed)()*100)+1}}
export function eventRng(seed:number,...parts:(string|number)[]){return seeded(hashSeed([seed,...parts].join(':')))}
