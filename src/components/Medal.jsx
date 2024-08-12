import style from './Medal.module.css';

const Medal = ({ nationInfo, deleteNationHandler }) => {
  return (
    <div className={style.medalContainer}>
      <table className={style.medalTable}>
        <thead>
          <tr>
            <th>국가</th>
            <th>금메달</th>
            <th>은메달</th>
            <th>동메달</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {nationInfo.map((nationData) => (
            <tr key={nationData.id}>
              <td>{nationData.nation}</td>
              <td>{nationData.gold}</td>
              <td>{nationData.silver}</td>
              <td>{nationData.bronze}</td>
              <td>
                <button onClick={() => deleteNationHandler(nationData.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medal;
