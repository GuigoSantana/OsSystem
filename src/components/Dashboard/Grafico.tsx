import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts';
import GraficoSvg from '../../assets/DashboardSvgs/GraficoSvg';
  
  const data = [
    { name: 'Ordens em Aberto', valor: 0 },
    { name: 'Ordens Concluídas', valor: 0 },
    { name: 'Entradas', valor: 0 },
    { name: 'Saídas', valor: 0 },
  ];
  
function GraficoValoresFinanceiros() {
    return (
      <div className="w-full h-80">
        <div className='flex items-center gap-2 mb-4'>
        <GraficoSvg />
        <p className="text-2xl font-semibold">Valores Financeiros</p>
        </div>
        <ResponsiveContainer className='px-3' width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Tooltip formatter={(value) => `R$ ${value}`} />
            <Legend />
            <Bar dataKey="valor" fill="#000000" name="Valor Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}
export default GraficoValoresFinanceiros