import React from 'react';
import './App.css';

function App() {
  const USER_LIST = [
    { id: 1, name: "鈴木太郎", role: "student", email: "test1@happiness.com", age: 26, postCode: "100-0003", phone: "0120000001", hobbies: ["旅行", "食べ歩き", "サーフィン"], url: "https://aaa.com", studyMinutes: 3000, taskCode: 101, studyLangs: ["Rails", "Javascript"], score: 68 },
    { id: 2, name: "鈴木二郎", role: "mentor", email: "test2@happiness.com", age: 31, postCode: "100-0005", phone: "0120000002", hobbies: ["サッカー", "ランニング", "筋トレ"], url: "https://bbb.com", experienceDays: 1850, useLangs: ["Next.js", "GoLang"], availableStartCode: 201, availableEndCode: 302 },
    { id: 3, name: "鈴木三郎", role: "student", email: "test3@happiness.com", age: 23, postCode: "300-0332", phone: "0120000003", hobbies: ["アニメ", "ゲーム", "旅行"], url: "https://ccc.com", studyMinutes: 125000, taskCode: 204, studyLangs: ["Rails", "Next.js"], score: 90 },
    { id: 4, name: "鈴木四郎", role: "mentor", email: "test4@happiness.com", age: 31, postCode: "100-0005", phone: "0120000004", hobbies: ["食べ歩き", "ランニング", "旅行"], url: "https://ddd.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 103, availableEndCode: 408 },
    { id: 5, name: "鈴木五郎", role: "student", email: "test5@happiness.com", age: 22, postCode: "300-0005", phone: "0120000005", hobbies: ["筋トレ", "ランニング"], url: "https://eee.com", studyMinutes: 47800, taskCode: 305, studyLangs: ["Next.js", "Rails"], score: 84 },
    { id: 6, name: "鈴木六郎", role: "mentor", email: "test6@happiness.com", age: 28, postCode: "100-0007", phone: "0120000006", hobbies: ["ゲーム", "サッカー"], url: "https://fff.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 101, availableEndCode: 302 },
    { id: 7, name: "鈴木七郎", role: "student", email: "test7@happiness.com", age: 24, postCode: "300-0008", phone: "0120000007", hobbies: ["筋トレ", "ダーツ"], url: "https://ggg.com", studyMinutes: 26900, taskCode: 401, studyLangs: ["PHP", "Rails"], score: 73 },
    { id: 8, name: "鈴木八郎", role: "mentor", email: "test8@happiness.com", age: 33, postCode: "100-0009", phone: "0120000008", hobbies: ["ランニング", "旅行"], url: "https://hhh.com", experienceDays: 6000, useLangs: ["Golang", "Rails"], availableStartCode: 301, availableEndCode: 505 },
  ]
  return (
    <div className="App bg-gray-100 p-5">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-5">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">名前</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">ロール</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">メールアドレス</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">年齢</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">郵便番号</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">電話番号</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">趣味</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">URL</th>
            </tr>
          </thead>
          <tbody>
            {USER_LIST.map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role === 'mentor' ? '卒業生' : '在校生'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                <td className="border border-gray-300 px-4 py-2">{user.postCode}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{user.hobbies.join(', ')}</td>
                <td className="border border-gray-300 px-4 py-2"><a href={user.url} target="_blank" rel="noopener noreferrer">Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;