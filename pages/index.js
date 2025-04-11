
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function Home() {
  const [capacity, setCapacity] = useState(100);
  const [irradiance, setIrradiance] = useState(1200);
  const [smp, setSmp] = useState(110);
  const [rec, setRec] = useState(100);
  const [recWeight, setRecWeight] = useState(0.9);
  const [opex, setOpex] = useState(3000000);
  const [capex, setCapex] = useState(130000000);

  const generation = capacity * irradiance;
  const smpRevenue = generation * smp;
  const recRevenue = generation * rec * recWeight;
  const totalRevenue = smpRevenue + recRevenue;
  const netProfit = totalRevenue - opex;
  const payback = parseFloat((capex / netProfit).toFixed(1));

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`태양광 수익성 분석 결과`, 20, 20);
    doc.text(`설치용량: ${capacity} kW`, 20, 30);
    doc.text(`일사량: ${irradiance} kWh/kW/년`, 20, 40);
    doc.text(`SMP 수익: ${smpRevenue.toLocaleString()} 원`, 20, 50);
    doc.text(`REC 수익: ${recRevenue.toLocaleString()} 원`, 20, 60);
    doc.text(`총 수익: ${totalRevenue.toLocaleString()} 원`, 20, 70);
    doc.text(`운영비: ${opex.toLocaleString()} 원`, 20, 80);
    doc.text(`순수익: ${netProfit.toLocaleString()} 원`, 20, 90);
    doc.text(`회수기간: ${payback} 년`, 20, 100);
    doc.save('solar_profit_report.pdf');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>태양광 수익성 계산기</h1>
      <input type="number" value={capacity} onChange={(e) => setCapacity(+e.target.value)} placeholder="설치용량 (kW)" />
      <input type="number" value={irradiance} onChange={(e) => setIrradiance(+e.target.value)} placeholder="일사량" />
      <input type="number" value={smp} onChange={(e) => setSmp(+e.target.value)} placeholder="SMP 단가" />
      <input type="number" value={rec} onChange={(e) => setRec(+e.target.value)} placeholder="REC 단가" />
      <input type="number" value={recWeight} onChange={(e) => setRecWeight(+e.target.value)} placeholder="REC 가중치" />
      <input type="number" value={opex} onChange={(e) => setOpex(+e.target.value)} placeholder="운영비" />
      <input type="number" value={capex} onChange={(e) => setCapex(+e.target.value)} placeholder="총 투자비" />
      <div style={{ marginTop: '1rem' }}>
        <p>예상 발전량: {generation.toLocaleString()} kWh</p>
        <p>SMP 수익: {smpRevenue.toLocaleString()} 원</p>
        <p>REC 수익: {recRevenue.toLocaleString()} 원</p>
        <p>총 수익: {totalRevenue.toLocaleString()} 원</p>
        <p>순수익: {netProfit.toLocaleString()} 원</p>
        <p>회수기간: {payback} 년</p>
        <button onClick={exportPDF}>PDF 다운로드</button>
      </div>
    </div>
  );
}
