import { useState } from 'react';
import './App.css';
import Medal from './components/Medal';
import Button from './components/Button';

function App() {
  const [nationInfo, setNationInfo] = useState([]);
  const [nation, setNation] = useState('');
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const [seleted, setSeleted] = useState('');

  const handleSelet = (e) => {
    setSeleted(e.target.value);
  };

  const addOrUpdateNationHandler = (e) => {
    e.preventDefault();

    const existingNation = nationInfo.find(
      (nationData) => nationData.nation === nation
    );

    if (existingNation) {
      // 이미 존재하는 국가가 있을 경우 경고창 띄우기
      const confirmUpdate = window.confirm(
        '이 국가는 이미 존재합니다. 업데이트하시겠습니까?'
      );
      if (confirmUpdate) {
        // 확인을 누르면 업데이트 수행
        setNationInfo(
          nationInfo.map((nationData) =>
            nationData.nation === nation
              ? {
                  ...nationData,
                  gold: gold,
                  silver: silver,
                  bronze: bronze,
                }
              : nationData
          )
        );
      }
    } else {
      // 새로운 국가 추가
      const newNation = {
        id: new Date().getTime(),
        nation: nation,
        gold: gold,
        silver: silver,
        bronze: bronze,
      };
      setNationInfo([...nationInfo, newNation]);
    }

    resetForm();
  };

  const deleteNationHandler = (id) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      const deletedNation = nationInfo.filter((nation) => nation.id !== id);
      setNationInfo(deletedNation);
    }
  };

  const resetForm = () => {
    setNation('');
    setGold(0);
    setSilver(0);
    setBronze(0);
  };

  // 메달 갯수별 sort
  const sortednationInfo = nationInfo.sort((a, b) => {
    if (seleted === 'gold') {
      return b.gold - a.gold;
    } else if (seleted === 'silver') {
      return b.silver - a.silver;
    } else if (seleted === 'bronze') {
      return b.bronze - a.bronze;
    } else if (seleted === 'all-medal') {
      const totalA = a.gold + a.silver + a.bronze;
      const totalB = b.gold + b.silver + b.bronze;
      return totalB - totalA;
    } else {
      return 0;
    }
  });

  return (
    <div className="App app-container">
      <h1>2024 파리 올림픽</h1>
      <form className="medal-form">
        <div className="form-group">
          <label htmlFor="nation">국가명</label>
          <input
            id="nation"
            type="text"
            placeholder="국가 입력"
            value={nation}
            onChange={(e) => setNation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gold">금메달</label>
          <input
            id="gold"
            type="number"
            value={gold}
            onChange={(e) => setGold(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="silver">은메달</label>
          <input
            id="silver"
            type="number"
            value={silver}
            onChange={(e) => setSilver(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bronze">동메달</label>
          <input
            id="bronze"
            type="number"
            value={bronze}
            onChange={(e) => setBronze(Number(e.target.value))}
          />
        </div>
        <Button onClick={addOrUpdateNationHandler}>
          {nationInfo.some((data) => data.nation === nation)
            ? '업데이트'
            : '국가 추가'}
        </Button>
      </form>

      <select onChange={handleSelet} value={seleted}>
        <option value="all-medal">총 메달 순</option>
        <option value="gold">금메달 순</option>
        <option value="silver">은메달 순</option>
        <option value="bronze">동메달 순</option>
      </select>

      <Medal
        nationInfo={sortednationInfo}
        deleteNationHandler={deleteNationHandler}
      />
    </div>
  );
}

export default App;
