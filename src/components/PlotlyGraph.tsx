/* eslint-disable @typescript-eslint/no-explicit-any */
// PlotlyGraph.tsx

import Plot from 'react-plotly.js';

interface PlotlyGraphProps {
    data: any[];
    layout: any;
    config?: any;
    
}

const PlotlyGraph= ({ data, layout, config }: PlotlyGraphProps) => {
    return <Plot data={data} layout={layout} config={config} useResizeHandler={true} style={{ width: "100%", height: "100%" }} />;
}

export default PlotlyGraph;
