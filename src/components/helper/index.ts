interface DataPoint {
    x: number;
    y: number;
  }
  
  interface ProcessDataParams {
    data: number[];
    color: string;
  }

export function processData(params: ProcessDataParams) {
    const { data, color } = params;
  
    // Calculando média e desvio padrão
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const stdDev = Math.sqrt(data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / data.length);
  
    // Gerando dados para o gráfico da distribuição gaussiana
    const gaussianX: number[] = [];
    const gaussianY: number[] = [];
  
    for (let x = mean - 3 * stdDev; x <= mean + 3 * stdDev; x += 0.1) {
      gaussianX.push(x);
      gaussianY.push((1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))));
    }
  
    // Gerando dados para o gráfico de probabilidade acumulativa
    const sortedValues = [...data].sort((a, b) => a - b);
    const cumulativeValues: DataPoint[] = sortedValues.map((v, i, arr) => ({
      x: v,
      y: (i + 1) / arr.length
    }));

      // Gerando dados para o histograma
  const histogram = {
    x: data,
    type: 'histogram',
    histnorm: 'probability',
    opacity: 0.6,
    marker: {
      color: color
    },
    name: 'Histograma'
  };
  
    // Retornando as traces para o Plotly
    return {
      bellCurve: {
        x: gaussianX,
        y: gaussianY,
        type: 'scatter',
        mode: 'lines',
        line: {
          color: color,
          width: 2
        },
        name: 'Curva Gaussiana'
      },
      cdfTrace: {
        x: cumulativeValues.map(d => d.x),
        y: cumulativeValues.map(d => d.y),
        type: 'scatter',
        mode: 'lines',
        name: 'Probabilidade Cumulativa',
        line: {
          color: color,
          width: 2
        },
        showlegend: true
    },
    histogram: histogram
  };
}