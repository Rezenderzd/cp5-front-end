import { useState } from 'react'
import { data } from './data/data'
import ImcCalc from './component/ImcCalc'
import ImcTable from './component/ImcTable'
import './App.css'

function App() {
  const [imc, setImc] = useState("")
  const [info, setInfo] = useState("")
  const [infoClass, setInfoClass] = useState("")
  const [pesoIdeal, setPesoIdeal] = useState("")
  const [imcMinimo, setImcMinimo] = useState()

  const calcImc = (e, height, weight) => {
    e.preventDefault();

    if (!weight || !height) return;

    const weightFloat = +weight.replace(",", ".");
    const heightFloat = +height.replace(",", ".");

    if (!weightFloat || !heightFloat) return;
    let currentItem = null;

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1);
    const imcNumber = Number(imcResult);

    setImc(imcResult);

    data.forEach((item) => {
      if (imcNumber >= item.min && imcNumber <= item.max) {
        setInfo(item.info);
        setInfoClass(item.infoclass);
        currentItem = item
      }
    });

    if (currentItem && currentItem.info !== "Normal") {
      const pesoMinIdeal = 18.5 * (heightFloat * heightFloat);
      const pesoMaxIdeal = 24.9 * (heightFloat * heightFloat);

      if (currentItem.info === "Magreza") {
        const pesoRecomendado = pesoMinIdeal.toFixed(1);
        setPesoIdeal(pesoRecomendado)
        setImcMinimo(18.5)
      } else {
        const pesoRecomendado = pesoMaxIdeal.toFixed(1);
        setPesoIdeal(pesoRecomendado)
        setImcMinimo(24.9)
      }
    }
  };

  const resetCalc = (e) => {
    e.preventDefault();

    setImc("");
    setInfo("");
    setInfoClass("");
    setPesoIdeal(""); 
    setImcMinimo("");
  };

  return (
    <div className="container">
      {!imc ? (
        <ImcCalc calcImc={calcImc} />
      ) : (
        <ImcTable
          data={data}
          imc={imc}
          info={info}
          infoClass={infoClass}
          resetCalc={resetCalc}
          imcMinimo = {imcMinimo}
          peso = {pesoIdeal}
        />
      )}
    </div>
  )
}

export default App
