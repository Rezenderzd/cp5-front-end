import Button from "./Button";
import "./ImcTable.css";

const ImcTable = ({ data, imc, info, infoClass, resetCalc, peso, imcMinimo }) => {
  return (
    <div id="result-container">
        <p id="imc-number">Seu Imc: <span className={infoClass}>{imc}</span></p>
        <p id="imc-info">Situação atual:<span className={infoClass}>{info}</span></p>
        {peso && imcMinimo && (
          <p id="peso-recomendado">
            Para chegar na classificação normal com imc = {imcMinimo}, precisa chegar a {peso}kg
          </p>
        )}
        <h3>Confira as classificações:</h3>
        <div id="imc-table">
          <div className="table-header">
            <h4>IMC</h4>
            <h4>Classificação</h4>
            <h4>Obesidade</h4>
          </div>
            {data.map((item) => (
              <div className={`table-data ${item.classe}`} key={item.info}>
                <p>{item.classification}</p>
                <p>{item.info}</p>
                <p>{item.obesity}</p>
              </div>
            ))}
        </div>
        <Button id="back-btn" text="voltar" action={resetCalc}/>
    </div>
  );
};

export default ImcTable;
