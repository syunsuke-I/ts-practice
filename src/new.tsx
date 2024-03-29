import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User , Student , Mentor } from './App';
import { useRecoilState } from "recoil";
import { studentsState, mentorsState } from './state/atoms';

interface FormData{
  // 共通のプロパティ
  id: User['id'];
  name: User['name'];
  role: 'student' | 'mentor';
  email: User['email'];
  age: User['age'];
  postCode: User['postCode'];
  phone: User['phone'];
  hobbies: string; // フォームからは文字列 関数内で配列にする
  url: string;
  // 生徒固有のプロパティ
  studyMinutes?: Student['studyMinutes'];
  taskCode?: Student['taskCode'];
  studyLangs?: string; // フォームからは文字列 関数内で配列にする
  score?: Student['score'];
  // メンター固有のプロパティ
  experienceDays?: Mentor['experienceDays'];
  useLangs?: string; // フォームからは文字列 関数内で配列にする
  availableStartCode?: Mentor['availableStartCode'];
  availableEndCode?: Mentor['availableEndCode'];
}

type FormProps = {
  isFormOpen: boolean;
  setOpenForm: (open: boolean) => void;
};

type ActiveTabTypeForForm = 'student' | 'mentor';

export const Form: React.FC<FormProps> = ({ isFormOpen, setOpenForm }) => {

  const [activeTabForForm, setActiveTabForForm] = useState<ActiveTabTypeForForm>('student');

  const [students, setStudents] = useRecoilState(studentsState);
  const [mentors, setMentors] = useRecoilState(mentorsState);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>(); // react hook form で状態管理

  // 新規登録の開閉状態の操作
  const handleToggle = (event: React.MouseEvent<HTMLMapElement, MouseEvent>) => {
    event.preventDefault();
    setOpenForm(!isFormOpen);
  };

  function getNewId(): number{
    return students.length + mentors.length + 1;
  }

  // 共通項目の保存処理
  function createUserCommonFields(data: FormData): Omit<User, 'role'> {
    return {
      id: getNewId(),
      name: data.name,
      email: data.email,
      age: data.age,
      postCode: data.postCode,
      phone: data.phone,
      hobbies: data.hobbies.split(',').map(hobby => hobby.trim()),
      url: data.url
    };
  }

  const onSubmit = (data: FormData) => {
    const commonFields : Omit<User, 'role'> = createUserCommonFields(data);
    if (activeTabForForm === 'student') {
      const newStudent: Student = {
        ...commonFields,
        role: 'student',
        studyMinutes: data.studyMinutes ?? 0,
        taskCode: data.taskCode ?? 0,
        studyLangs: data.studyLangs?.split(',').map(lang => lang.trim()) ?? [],
        score: data.score ?? 0,
      };
      setStudents([...students, newStudent]);
    } else {
      const newMentor: Mentor = {
        ...commonFields,
        role: 'mentor',
        experienceDays: data.experienceDays ?? 0,
        useLangs: data.useLangs?.split(',').map(lang => lang.trim()) ?? [],
        availableStartCode: data.availableStartCode ?? 0,
        availableEndCode: data.availableEndCode ?? 0,
      }
      setMentors([...mentors, newMentor]);
    }
    setOpenForm(!isFormOpen);
    reset();
  };

  return (
    <details open={isFormOpen}>
      <summary onClick={handleToggle}>
        新規登録
      </summary>
      <div className="mt-10 md-10">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTabForForm === 'student' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTabForForm('student')}
          >
            生徒
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTabForForm === 'mentor' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTabForForm('mentor')}
          >
            メンター
          </button>
        </div>
        <form  onSubmit={handleSubmit(onSubmit)} className="w-10/12 mx-auto md:max-w-md">
          <div className="mb-8">
              <label htmlFor="name" className="text-sm block">名前</label>
              <input type="text" {...register('name', { required: true })} id="name" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="田中 太郎"/>
              {errors.name && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          <div className="mb-8">
              <label htmlFor="email" className="text-sm block">Eメール</label>
              <input type="email"  {...register('email', { required: true })} className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="student@example.com"/>
              {errors.email && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          <div className="mb-8">
              <label htmlFor="age" className="text-sm block">年齢</label>
              <input type="number" {...register('age', { required: true })}  id="age" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="0~"/>
              {errors.age && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          <div className="mb-8">
              <label htmlFor="postCode" className="text-sm block">郵便番号</label>
              <input type="text" {...register('postCode', { required: true })}  id="postCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="810-0000"/>
              {errors.postCode && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          <div className="mb-8">
              <label htmlFor="phone" className="text-sm block">電話番号</label>
              <input type="text"  {...register('phone', { required: true })}  id="phone" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="090-0000-0000"/>
              {errors.phone && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          <div className="mb-8">
              <label htmlFor="hobbies" className="text-sm block">趣味</label>
              <input type="text" {...register('hobbies', { required: true })} id="hobbies" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="サッカー,テニス,相撲"/>
              {errors.hobbies && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          <div className="mb-8">
              <label htmlFor="hobbies" className="text-sm block">URL</label>
              <input type="text" {...register('url', { required: true })} id="hobbies" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="https://..."/>
              {errors.url && <span className='text-red-500'>このフィールドは必須です</span>}
          </div>
          {activeTabForForm === 'student' && (
            <>
              <div className="mb-8">
                <label htmlFor="studyMinutes" className="text-sm block">勉強時間 (分)</label>
                <input type="number"   {...register('studyMinutes', { required: true })}  id="studyMinutes" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="0~"/>
                {errors.studyMinutes && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
              <div className="mb-8">
                  <label htmlFor="taskCode" className="text-sm block">課題番号</label>
                  <input type="number" {...register('taskCode', { required: true })}  id="taskCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="500"/>
                  {errors.taskCode && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
              <div className="mb-8">
                  <label htmlFor="studyLangs" className="text-sm block">勉強中の言語</label>
                  <input type="text"  {...register('studyLangs', { required: true })}  id="studyLangs" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="Java,Go,PHP"/>
                  {errors.studyLangs && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
              <div className="mb-8">
                  <label htmlFor="score" className="text-sm block">ハピネススコア</label>
                  <input type="number" {...register('score', { required: true })} id="score" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="700"/>
                  {errors.score && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>        
            </>
          )}
          {activeTabForForm === 'mentor' && (
            <>
              <div className="mb-8">
                  <label htmlFor="experienceDays" className="text-sm block">実務経験月数</label>
                  <input type="number" {...register('experienceDays', { required: true })} id="experienceDays" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="経験月数"/>
                  {errors.experienceDays && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
              <div className="mb-8">
                  <label htmlFor="useLangs" className="text-sm block">使用言語</label>
                  <input type="text" {...register('useLangs', { required: true })}  id="useLangs" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="Python, Java, Ruby"/>
                  {errors.useLangs && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
              <div className="mb-8">
                  <label htmlFor="availableStartCode" className="text-sm block">担当できる課題番号 (開始)</label>
                  <input type="number" {...register('availableStartCode', { required: true })}  id="availableStartCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="100"/>
                  {errors.availableStartCode && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
              <div className="mb-8">
                  <label htmlFor="availableEndCode" className="text-sm block">担当できる課題番号 (終了)</label>
                  <input type="number" {...register('availableEndCode', { required: true })}  id="availableEndCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="200"/>
                  {errors.availableEndCode && <span className='text-red-500'>このフィールドは必須です</span>}
              </div>
            </>
          )}
          <div className='flex flex-row-reverse'>
            <button type="submit" className="bg-blue-500 text-white px-3">保存</button>
          </div>
      </form>
    </div>
  </details>
  )
}

export default Form