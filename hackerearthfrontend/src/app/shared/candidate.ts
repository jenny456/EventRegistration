export class Candidate {
  _id: string;
  name: string;
  mobile: number;
  email: string;
  image: string;
  registrationtype: string;
  numtickets: number;
  createdAt: string;
}

export const RegistrationType = ['Self', 'Group', 'Corporate', 'Others'];
