import PlotlyGraph from "./PlotlyGraph";
import { maxAirTemperatureValues, minAirTemperatureValues } from "../static/data";
import { processData } from "./helper";

export function NewMethod() {
  const maxAirData = processData({ data: maxAirTemperatureValues, color: 'blue' });
  const minAirData = processData({ data: minAirTemperatureValues, color: 'red' });

  const layout = {
    title: 'Distribuição Gaussiana',
    xaxis: {
      title: 'Valor',
      showline: false,
      zeroline: false,
    },
    yaxis: {
      title: 'Densidade'
    },
    autosize: true,
    legend: {
      x: 1,
      y: 1.03,
      xanchor: 'right',
      yanchor: 'bottom',
      bgcolor: 'rgba(255,255,255,0.8)',
      orientation: 'h'
    }
  };

  // const layout2 = {
  //   title: 'Probabilidade Acumulativa',
  //   xaxis: { title: 'Valor' },
  //   yaxis: { title: 'Probabilidade Acumulativa' },
  //   autosize: true,
  //   legend: {
  //     x: 1,
  //     y: 1.03,
  //     xanchor: 'right',
  //     yanchor: 'bottom',
  //     bgcolor: 'rgba(255,255,255,0.8)',
  //     orientation: 'h'
  //   }
  // };

  const layout2 = {
    title: 'Função de Distribuição Cumulativa',
    xaxis: {
      title: 'Valor'
    },
    yaxis: {
      title: 'Probabilidade Cumulativa',
      tickformat: '.0%',  // Formata os valores do eixo Y como porcentagens
      range: [0, 1]
    }, 
      autosize: true, 
      legend: {
      x: 1,             // Posição horizontal no centro
      y: 1.03,             // Posição vertical ligeiramente acima do topo do gráfico
      xanchor: 'right',  // Ancorar o centro da legenda na posição x
      yanchor: 'bottom',  // Ancorar a parte inferior da legenda na posição y
      bgcolor: 'rgba(255,255,255,0.8)',  // Cor de fundo semi-transparente
      // bordercolor: 'black',
      // borderwidth: 1
      orientation: 'h' 
    }
  };

  return (
    <div className="App">
      <h1>My React and TypeScript App</h1>
      <div className="graph-container">
        <div style={{ display: "flex" }}>
          <PlotlyGraph data={[maxAirData.cdfTrace, minAirData.cdfTrace]} layout={layout2} />
          <PlotlyGraph data={[maxAirData.bellCurve, minAirData.bellCurve]} layout={layout} />
        </div>
        <div>
          <PlotlyGraph data={[maxAirData.histogram, minAirData.histogram]} layout={layout} />
        </div>
      </div>
    </div>
  );
}