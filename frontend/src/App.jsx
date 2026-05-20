import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [revenueData, setRevenueData] = useState(null);
  const [experiments, setExperiments] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    fetchRevenue();
    fetchExperiments();
    fetchInsights();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analytics/revenue"
      );

      setRevenueData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExperiments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analytics/experiments"
      );

      setExperiments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analytics/summary"
      );

      setAiInsights(response.data.insights);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">
          QC Intelligence
        </h1>

        <div className="flex flex-col gap-5 text-slate-300">
          <p className="hover:text-white cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-white cursor-pointer">
            Revenue
          </p>

          <p className="hover:text-white cursor-pointer">
            Funnel
          </p>

          <p className="hover:text-white cursor-pointer">
            Cohorts
          </p>

          <p className="hover:text-white cursor-pointer">
            Experiments
          </p>

          <p className="hover:text-white cursor-pointer">
            AI Insights
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Quick Commerce Intelligence System
          </h1>

          <p className="text-slate-400">
            AI-powered analytics and experimentation
            dashboard
          </p>
        </div>

        {/* KPI CARDS */}
        {revenueData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 mb-2">
                Total Orders
              </p>

              <h2 className="text-4xl font-bold">
                {revenueData.total_orders}
              </h2>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 mb-2">
                Total GMV
              </p>

              <h2 className="text-4xl font-bold">
                ₹{revenueData.total_gmv}
              </h2>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 mb-2">
                Avg Order Value
              </p>

              <h2 className="text-4xl font-bold">
                ₹
                {parseFloat(
                  revenueData.avg_order_value
                ).toFixed(2)}
              </h2>
            </div>
          </div>
        )}

        {/* AI INSIGHTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-5">
            AI Insights
          </h2>

          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-4 text-slate-200"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIMENTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-5">
            A/B Experimentation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="text-left pb-4">
                    Experiment
                  </th>

                  <th className="text-left pb-4">
                    Variant
                  </th>

                  <th className="text-left pb-4">
                    Users
                  </th>

                  <th className="text-left pb-4">
                    Conversions
                  </th>

                  <th className="text-left pb-4">
                    Conversion Rate
                  </th>
                </tr>
              </thead>

              <tbody>
                {experiments.map((experiment, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800"
                  >
                    <td className="py-4">
                      {experiment.experiment_name}
                    </td>

                    <td className="py-4">
                      {experiment.variant}
                    </td>

                    <td className="py-4">
                      {experiment.users}
                    </td>

                    <td className="py-4">
                      {experiment.conversions}
                    </td>

                    <td className="py-4 text-emerald-400 font-semibold">
                      {experiment.conversion_rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;