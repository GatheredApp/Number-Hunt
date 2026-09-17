export type Mode='quick'|'custom'|'daily'|'daily-practice';
export type Heat='cold'|'cool'|'warm'|'hot'|'blazing';
export interface Game {version:1;mode:Mode;size:number;secret:number;revealed:number[];scans:number;scansUsed:number;guesses:number[];startedAt:number;seed?:number;completed?:boolean}
export interface Result {mode:Mode;size:number;secret:number;guesses:number[];scansUsed:number;startedAt:number;completedAt:number;score:number;date?:string}
export interface Stats {version:1;games:number;completed:number;totalGuesses:number;bestGuesses:number|null;bestScore:number;bySize:Record<string,{games:number;best:number}>;distribution:Record<string,number>;dailyHistory:Record<string,Result>;dailyStreak:number;longestDailyStreak:number;lastDaily?:string}
export interface Settings {haptics:boolean;sound:boolean;onboarded:boolean;installDismissed:boolean}
