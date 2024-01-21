import { atom } from 'recoil';
import { Student,Mentor } from '../App';


export const studentsState = atom<Student[]>({
  key: 'studentsState', 
  default: [],
});

export const mentorsState = atom<Mentor[]>({
  key: 'mentorsState',
  default: [],
});
