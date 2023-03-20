export interface Item {
    ticker: string;
    daily: any;
    monthly: any;
    yearly: any;
    ranking: { year: number; month: number; day: number };
    rank: number[];
  }
export interface Info {
    Exchange: string;
    ISIN: string;
    Location: string;
    Name: string;
    RelatedCompanies: any;
    Sector: string;
    class: string;
    currency: string;
    market: string;
    ticker: string;
    dailyScores: [string, number][];
    monthlyScores: [string, number][];
    yearlyScores: [string, number][];
    rank:number[];
  }