import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Produto {
  nome: string;
  vendas: number;
}

interface Props {
  data: Produto[];
}

export default function TopBarChart({ data }: Props) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={data}>
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vendas" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
