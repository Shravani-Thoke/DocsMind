import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6"];

const ProfileCharts = ({ stats }) => {
  const data = [
    {
      name: "Documents",
      value: stats.totalDocuments,
    },
    {
      name: "Flashcards",
      value: stats.totalFlashcards,
    },
    {
      name: "Quizzes",
      value: stats.totalQuizzes,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Learning Assets
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={55}
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Resource Comparison
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data}>

            {/* <CartesianGrid strokeDasharray="3 3" /> */}

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[5, 5, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ProfileCharts;