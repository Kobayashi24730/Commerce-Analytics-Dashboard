import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface Produto {
  category: string;
  vendas: number;
}

interface Props {
  data: Produto[];
}

export default function CategoryChart({ data }: Props) {
  const COLORS = ["#3b82f6", "#ef4444", "#10b981"]

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="vendas"
            nameKey="category"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
