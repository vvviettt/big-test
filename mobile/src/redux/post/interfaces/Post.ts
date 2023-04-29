export interface Post {
  id: string;
  content: string;
  surveyTitle: string;
  surveyOptions: {
    label: string;
    vote: number;
  }[];
  time: Date;
}
