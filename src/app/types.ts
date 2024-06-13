export interface Department {
  id: number;
  name: string;
  director: string;
  membersQuantity: number;
}

export interface Indicator {
  id: number;
  name: string;
  index: number;
  description: string;
}

export interface Criterion {
  id: number;
  name: string;
  index: number;
  description: string;
  indicator: Indicator;
}
