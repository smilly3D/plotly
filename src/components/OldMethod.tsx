import { maxAirTemperatureValues, minAirTemperatureValues } from "../static/data";
import PlotlyGraph from "./PlotlyGraph";

export function OldeMethod() {
  // Calcula a média dos dados
const mean = maxAirTemperatureValues.reduce((acc, val) => acc + val, 0) / maxAirTemperatureValues.length;
const mean2 = minAirTemperatureValues.reduce((acc, val) => acc + val, 0) / minAirTemperatureValues.length;
  
  // Calcula o desvio padrão dos dados
const std = Math.sqrt(maxAirTemperatureValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / maxAirTemperatureValues.length);
const std2 = Math.sqrt(minAirTemperatureValues.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0) / minAirTemperatureValues.length);
  
// Função da densidade de probabilidade da distribuição normal
function normalDensity(x:number, mean:number, std:number) {
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
}

// Ordem dos dados
const sortedData = maxAirTemperatureValues.slice().sort((a, b) => a - b);
const sortedData2 = minAirTemperatureValues.slice().sort((a, b) => a - b);

// Cálculo da probabilidade cumulativa
const cumulativeProb = sortedData.map((_, index) => (index + 1) / sortedData.length);
const cumulativeProb2 = sortedData2.map((_, index) => (index + 1) / sortedData2.length);

const x = [];
const y = [];
for (let i = 0; i <= Math.max(...maxAirTemperatureValues); i += 0.1) {
  x.push(i);
  y.push(normalDensity(i, mean, std));
}
  
const histogram = {
  x: maxAirTemperatureValues,
  type: 'histogram',
  histnorm: '',
  opacity: 0.6,
  name: 'maxAirTemperatureValues 1',  // Nome para a legenda
  marker: {
    color: 'blue'
  }
};

const histogram2 = {
  x: minAirTemperatureValues,
  type: 'histogram',
  histnorm: '',
  opacity: 0.6,
  name: 'maxAirTemperatureValues 2',  // Nome para a legenda
  marker: {
    color: 'red'
  }
};

const bellCurve = {
  x: x,
  y: y,
  type: 'scatter',
  mode: 'lines',
  line: {
    color: 'blue',
    width: 2
  },
  name: 'curva 1'
};
const bellCurve2 = {
  x: x, // Você pode reutilizar a mesma matriz x
  y: x.map(val => normalDensity(val, mean2, std2)),  // Calcule a curva usando mean2 e std2
  type: 'scatter',
  mode: 'lines',
  line: {
    color: 'red',  // Para diferenciar a segunda curva, usei uma cor diferente
    width: 2
  },
  name: 'curva 2'

};

const cdfTrace = {
  x: sortedData,
  y: cumulativeProb,
  type: 'scatter',
  mode: 'lines',
  name: 'Probabilidade Cumulativa',
  line: {
    color: 'blue',
    width: 2
  },
  showlegend: true
};
const cdfTrace2 = {
  x: sortedData2,
  y: cumulativeProb2,
  type: 'scatter',
  mode: 'lines',
  name: 'Probabilidade Cumulativa2',
  line: {
    color: 'red',
    width: 2
  },
  showlegend: true
};

const layout = {
  title: 'Curva Normal',
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
    x: 1,             // Posição horizontal no centro
    y: 1.03,             // Posição vertical ligeiramente acima do topo do gráfico
    xanchor: 'right',  // Ancorar o centro da legenda na posição x
    yanchor: 'bottom',  // Ancorar a parte inferior da legenda na posição y
    bgcolor: 'rgba(255,255,255,0.8)',  // Cor de fundo semi-transparente
    orientation: 'h' 
  }
};

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
              <div   style={{display: "flex",}} >
                <PlotlyGraph data={[cdfTrace, cdfTrace2]} layout={layout2}    />
                <PlotlyGraph data={[bellCurve,bellCurve2]} layout={layout} />
              </div>
              <PlotlyGraph data={[histogram,histogram2]} layout={layout} />

            </div>
            
        </div>
      
     
  )
}


