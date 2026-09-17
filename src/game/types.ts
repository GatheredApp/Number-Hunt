export type Mode='quick'|'custom'|'daily'|'daily-practice';
export type Heat='cold'|'cool'|'warm'|'hot'|'blazing';
export interface Observation {tile:number;heat:Heat;scanId:number}
export interface ScanRecord {id:number;center:number;tiles:number[];entropyBefore:number;entropyAfter:number;informationGain:number}
export interface Game {version:2;mode:Mode;size:number;secret:number;observations:Observation[];scans:number;scansUsed:number;scanHistory:ScanRecord[];guesses:number[];startedAt:number;seed?:number;completed?:boolean}
export interface Result extends Game {completedAt:number;score:number;date?:string;finalConfidence:number;totalInformation:number}
export interface Stats {version:2;games:number;completed:number;totalGuesses:number;bestGuesses:number|null;bestScore:number;bySize:Record<string,{games:number;best:number}>;distribution:Record<string,number>;dailyHistory:Record<string,Result>;dailyStreak:number;longestDailyStreak:number;lastDaily?:string;totalInformation:number;totalScans:number;highestInformationScan:number;totalWinningConfidence:number}
export interface Settings {haptics:boolean;sound:boolean;onboarded:boolean;installDismissed:boolean;migrationNoticeShown?:boolean}
