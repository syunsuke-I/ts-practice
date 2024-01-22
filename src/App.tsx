import React, { useState,useEffect, useMemo } from 'react';
import { useRecoilState } from "recoil";
import { studentsState, mentorsState } from './state/atoms';
import From  from "./new";

export interface User {
  id: number;
  name: string;
  role: 'student' | 'mentor';
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
}

export interface Student extends User {
  role: 'student';
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
}

export interface Mentor extends User {
  role: 'mentor';
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
}

type ActiveTabType = 'all' | 'student' | 'mentor'; // TABの状態
type sortType = 'asc' | 'desc'; // ソートの降順昇順 
type sortKeysStudent = 'studyMinutes' | 'score'; // 生徒のソートキー
type sortKeysMentor = 'experienceDays'; // メンターのソートキー

function App() {

  const [isFormOpen, setOpenForm] = useState(false); // 新規登録のフォームの開閉の状態の管理(Recoilで管理しないパターンの練習)
  const [activeTab, setActiveTab] = useState<ActiveTabType>('all'); // TABの状態管理
  const [sortKeyStudent, setSortKeyStudent] = useState<sortKeysStudent>('studyMinutes'); // 生徒のソートキーの状態管理
  const [sortKeyMentor, setSortKeyMentor] = useState<sortKeysMentor>('experienceDays'); // メンターのソートキーの状態管理
  const [sortOrder, setSortOrder] = useState<sortType>('asc'); // ソートの降順昇順の状態管理

  const [students, setStudents] = useRecoilState(studentsState); // 生徒の状態管理(Recoilで管理)
  const [mentors, setMentors] = useRecoilState(mentorsState); // メンターの状態管理(Recoilで管理)

  const isStudent = (user: User): user is Student => user.role === 'student';
  const isMentor = (user: User): user is Mentor => user.role === 'mentor';

  const USER_LIST : (Student | Mentor)[] = [
    { id: 1, name: "鈴木太郎", role: "student", email: "test1@happiness.com", age: 26, postCode: "100-0003", phone: "0120000001", hobbies: ["旅行", "食べ歩き", "サーフィン"], url: "https://aaa.com", studyMinutes: 3000, taskCode: 101, studyLangs: ["Rails", "Javascript"], score: 68 },
    { id: 2, name: "鈴木二郎", role: "mentor", email: "test2@happiness.com", age: 31, postCode: "100-0005", phone: "0120000002", hobbies: ["サッカー", "ランニング", "筋トレ"], url: "https://bbb.com", experienceDays: 1850, useLangs: ["Next.js", "GoLang"], availableStartCode: 201, availableEndCode: 302 },
    { id: 3, name: "鈴木三郎", role: "student", email: "test3@happiness.com", age: 23, postCode: "300-0332", phone: "0120000003", hobbies: ["アニメ", "ゲーム", "旅行"], url: "https://ccc.com", studyMinutes: 125000, taskCode: 204, studyLangs: ["Rails", "Next.js"], score: 90 },
    { id: 4, name: "鈴木四郎", role: "mentor", email: "test4@happiness.com", age: 31, postCode: "100-0005", phone: "0120000004", hobbies: ["食べ歩き", "ランニング", "旅行"], url: "https://ddd.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 103, availableEndCode: 408 },
    { id: 5, name: "鈴木五郎", role: "student", email: "test5@happiness.com", age: 22, postCode: "300-0005", phone: "0120000005", hobbies: ["筋トレ", "ランニング"], url: "https://eee.com", studyMinutes: 47800, taskCode: 305, studyLangs: ["Next.js", "Rails"], score: 84 },
    { id: 6, name: "鈴木六郎", role: "mentor", email: "test6@happiness.com", age: 28, postCode: "100-0007", phone: "0120000006", hobbies: ["ゲーム", "サッカー"], url: "https://fff.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 101, availableEndCode: 302 },
    { id: 7, name: "鈴木七郎", role: "student", email: "test7@happiness.com", age: 24, postCode: "300-0008", phone: "0120000007", hobbies: ["筋トレ", "ダーツ"], url: "https://ggg.com", studyMinutes: 26900, taskCode: 401, studyLangs: ["PHP", "Rails"], score: 73 },
    { id: 8, name: "鈴木八郎", role: "mentor", email: "test8@happiness.com", age: 33, postCode: "100-0009", phone: "0120000008", hobbies: ["ランニング", "旅行"], url: "https://hhh.com", experienceDays: 6000, useLangs: ["Golang", "Rails"], availableStartCode: 301, availableEndCode: 505 },
  ];

  // 生徒とメンターを分けて表示する
  useEffect(() => {
    const studentData: Student[] = USER_LIST.filter(isStudent);
    const mentorData: Mentor[] = USER_LIST.filter(isMentor);

    setStudents(studentData);
    setMentors(mentorData);
  }, []);

  // タブの切り替えやソートによるユーザを制御する
  const displayUsers = useMemo(() => {
    let sortedData;
    switch (activeTab) {
      case 'student':
        sortedData = [...students];
        break;
      case 'mentor':
        sortedData = [...mentors];
        break;
      default:
        sortedData = [...students, ...mentors];
        break;
    }
  
    return sortedData.sort((a, b) => {
      let valueA, valueB;
      if (activeTab === 'mentor' && a.role === 'mentor' && b.role === 'mentor') {
        valueA = a[sortKeyMentor];
        valueB = b[sortKeyMentor];
      } else if (activeTab === 'student' && a.role === 'student' && b.role === 'student') {
        valueA = a[sortKeyStudent];
        valueB = b[sortKeyStudent];
      } else {
        // 新規追加が一番上に来るように
        valueB = a.id;
        valueA = b.id;
      }
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }, [activeTab, students, mentors, sortKeyStudent, sortKeyMentor, sortOrder]);
 
  /**
   * 特定の生徒に対応可能なメンターのリストを返す関数。
   * 生徒が担当できる課題番号の範囲内にあるメンターを抽出する。
   *
   * @param {Student} student - 対象の生徒オブジェクト。
   * @returns {Mentor[]} 対応可能なメンターの配列。
   */
  function findAvailableMentors(student: Student): Mentor[] {
    const availableMentors: Mentor[] = [];
  
    USER_LIST.forEach((user: User) => {
      if (isMentor(user)) {
        if (user.availableStartCode <= student.taskCode && user.availableEndCode >= student.taskCode) {
          availableMentors.push(user);
        }
      }
    });
  
    return availableMentors;
  }

  /**
   * 特定のメンターが対応可能な生徒のリストを返す関数。
   * メンターが担当できる課題番号の範囲内にある生徒を抽出する。
   *
   * @param {Mentor}  mentors - 対象のメンターオブジェクト。
   * @returns {Student[]} 対応可能な生徒の配列。
   */
  function findAvailableStudents(mentors: Mentor): Student[] {
    const availableStudents: Student[] = [];
    USER_LIST.forEach((user: User) => {
      if (isStudent(user)) {
        if (mentors.availableStartCode <= user.taskCode && mentors.availableEndCode >= user.taskCode) {
          availableStudents.push(user);
        }
      }
    });
  
    return availableStudents;
  }  
  return (
    <div className="App bg-gray-100 p-5">
      <From
        isFormOpen ={isFormOpen}
        setOpenForm={setOpenForm}
      />
      {!isFormOpen && (
        <>
          <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 px-4 text-center ${activeTab === 'all' ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              全員
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${activeTab === 'student' ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              生徒のみ
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${activeTab === 'mentor' ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveTab('mentor')}
            >
              メンターのみ
            </button>
          </div>        
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">名前</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">ロール</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">メールアドレス</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">年齢</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">郵便番号</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">電話番号</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">趣味</th>
                <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">URL</th> 
                {activeTab !== 'student' && (
                  <>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">
                  <div className="flex">
                      <div>
                      実務経験月数
                      </div>
                      {activeTab === 'mentor' && (
                      <div>
                        <i className="bi bi-sort-up"
                          onClick={() => {
                            setSortKeyMentor('experienceDays');
                            setSortOrder('desc');
                          }}
                        ></i>
                        <i className="bi bi-sort-down-alt"
                          onClick={() => {
                            setSortKeyMentor('experienceDays');
                            setSortOrder('asc');
                          }}
                        ></i>
                      </div>
                      )}               
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">現場で使っている言語</th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">担当できる課題番号初め</th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">担当できる課題番号終わり</th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">対応可能な生徒</th>
                </>
                )}
                {activeTab !== 'mentor' && (
                  <>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">
                    <div className="flex">
                      <div>
                        勉強時間
                      </div>
                      {activeTab === 'student' && (
                      <div>
                        <i className="bi bi-sort-up"
                          onClick={() => {
                            setSortKeyStudent('studyMinutes');
                            setSortOrder('desc');
                          }}
                        ></i>
                        <i className="bi bi-sort-down-alt"
                          onClick={() => {
                            setSortKeyStudent('studyMinutes');
                            setSortOrder('asc');
                          }}
                        ></i>
                      </div>
                      )}
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">課題番号</th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">勉強中の言語</th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">
                  <div className="flex">
                      <div>
                      ハピネススコア
                      </div>
                      {activeTab === 'student' && (
                      <div>
                        <i className="bi bi-sort-up"
                          onClick={() => {
                            setSortKeyStudent('score');
                            setSortOrder('desc');
                          }}
                        ></i>
                        <i className="bi bi-sort-down-alt"
                          onClick={() => {
                            setSortKeyStudent('score');
                            setSortOrder('asc');
                          }}
                        ></i>
                      </div>
                      )}
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2  text-gray-600 text-xs">対応可能なメンター</th>
                </>
                )}
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((user: User) => {
                return (
                  <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.role === 'mentor' ? '卒業生' : '在校生'}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.age}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.postCode}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.phone}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.hobbies.join(', ')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs"><a href={user.url} target="_blank" rel="noopener noreferrer">Link</a></td>
                      {isStudent(user) && (
                      <>
                        {/* 生徒固有のデータ */}
                        {activeTab === 'all' && (
                          // ダミーカラム
                          <>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                          </>
                        )}
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.studyMinutes}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.taskCode}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.studyLangs.join(', ')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.score}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">
                          {findAvailableMentors(user).map(mentor => mentor.name).join(', ')}
                        </td>
                      </>
                    )}
                    {isMentor(user) && (              
                      <>
                        {/* メンター固有のデータ */}
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.experienceDays}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.useLangs.join(', ')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.availableStartCode}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">{user.availableEndCode}</td>
                        <td className="border border-gray-300 px-4 py-2 text-xs">
                          {findAvailableStudents(user).map(student => student.name).join(', ')}
                        </td>
                        {activeTab === 'all' && (
                          // ダミーカラム
                          <>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                            <td className="border border-gray-300 px-4 py-2 text-xs"></td>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>        
        </>
      )}

    </div>
  );
}

export default App;