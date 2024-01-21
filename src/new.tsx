import React, { useState } from 'react';

type FormProps = {
  isFormOpen: boolean;
  setOpenForm: (open: boolean) => void;
};

export const Form: React.FC<FormProps> = ({ isFormOpen, setOpenForm }) => {

  type ActiveTabTypeForForm = 'student' | 'mentor';
  const [activeTabForForm, setActiveTabForForm] = useState<ActiveTabTypeForForm>('student');

  return (
    <details>
      <summary onClick={() => setOpenForm(!isFormOpen)}>
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
        <form className="w-10/12 mx-auto md:max-w-md">
          <div className="mb-8">
              <label htmlFor="name" className="text-sm block">名前</label>
              <input type="text" id="name" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="田中 太郎"/>
          </div>
          <div className="mb-8">
              <label htmlFor="email" className="text-sm block">Eメール</label>
              <input type="email" id="email" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="student@example.com"/>
          </div>
          <div className="mb-8">
              <label htmlFor="age" className="text-sm block">年齢</label>
              <input type="number" id="age" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="0~"/>
          </div>
          <div className="mb-8">
              <label htmlFor="postCode" className="text-sm block">郵便番号</label>
              <input type="number" id="postCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="810-0000"/>
          </div>
          <div className="mb-8">
              <label htmlFor="phone" className="text-sm block">電話番号</label>
              <input type="number" id="phone" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="090-0000-0000"/>
          </div>
          <div className="mb-8">
              <label htmlFor="hobbies" className="text-sm block">趣味</label>
              <input type="text" id="hobbies" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="趣味"/>
          </div>
          {activeTabForForm === 'student' && (
            <>
              <div className="mb-8">
                <label htmlFor="studyMinutes" className="text-sm block">勉強時間 (分)</label>
                <input type="number" id="studyMinutes" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="0~"/>
              </div>
              <div className="mb-8">
                  <label htmlFor="taskCode" className="text-sm block">課題番号</label>
                  <input type="number" id="taskCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="500"/>
              </div>
              <div className="mb-8">
                  <label htmlFor="studyLangs" className="text-sm block">勉強中の言語</label>
                  <input type="text" id="studyLangs" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="Java,Go,PHP"/>
              </div>
              <div className="mb-8">
                  <label htmlFor="score" className="text-sm block">ハピネススコア</label>
                  <input type="number" id="score" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="700"/>
              </div>        
            </>
          )}
          {activeTabForForm === 'mentor' && (
            <>
              <div className="mb-8">
                  <label htmlFor="experienceDays" className="text-sm block">実務経験月数</label>
                  <input type="number" id="experienceDays" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="経験月数"/>
              </div>
              <div className="mb-8">
                  <label htmlFor="useLangs" className="text-sm block">使用言語</label>
                  <input type="text" id="useLangs" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="Python, Java, Ruby"/>
              </div>
              <div className="mb-8">
                  <label htmlFor="availableStartCode" className="text-sm block">担当できる課題番号 (開始)</label>
                  <input type="number" id="availableStartCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="100"/>
              </div>
              <div className="mb-8">
                  <label htmlFor="availableEndCode" className="text-sm block">担当できる課題番号 (終了)</label>
                  <input type="number" id="availableEndCode" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="200"/>
              </div>
            </>
          )}
      </form>
    </div>
  </details>
  )
}

export default Form