export type PostProps = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export type NaiseiProps = {
  id: number
  naisei: string
  evaluation_type: EvaluationType
}

// export enum EvaluationType {
//   A,
//   B,
//   C,
//   D,
//   E,
// }

export enum EvaluationType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}