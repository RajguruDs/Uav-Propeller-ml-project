import { useState } from 'react';
import { RefreshCw, BarChart3, Info } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Select from '../components/Select';

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    brand: '',
    dateRange: '',
    metric: ''
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1f2937] mb-2">Performance Dashboard</h1>
          <p className="text-gray-600">Visualize and analyze propeller performance trends</p>
        </div>

        <Card className="mb-6">
          <h2 className="text-xl font-bold text-[#1f2937] mb-4">Dashboard Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Brand"
              placeholder="All Brands"
              options={['APC', 'GemFan', 'DJI', 'T-Motor', 'All']}
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            />
            <Select
              label="Date Range"
              placeholder="Select Range"
              options={['Last 7 days', 'Last 30 days', 'Last 90 days', 'All Time']}
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            />
            <Select
              label="Primary Metric"
              placeholder="Select Metric"
              options={['Thrust', 'Efficiency', 'Power', 'Ct', 'Cp']}
              value={filters.metric}
              onChange={(e) => setFilters({ ...filters, metric: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <Button>
              <RefreshCw className="w-4 h-4 mr-2 inline" />
              Update Dashboard
            </Button>
          </div>
        </Card>

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1f2937]">Tableau Dashboard</h2>
            <BarChart3 className="w-6 h-6 text-[#2563eb]" />
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-12 text-center">
            <div className="bg-white rounded-lg shadow-inner p-8 max-w-2xl mx-auto">
              <BarChart3 className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tableau Dashboard Placeholder</h3>
              <p className="text-gray-600 mb-4">
                Interactive Tableau dashboard will be embedded here
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <iframe
                  title="Tableau Dashboard"
                  className="w-full h-96 bg-white rounded"
                  style={{ minHeight: '600px' }}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-2">Total Configurations</h3>
            <p className="text-4xl font-bold text-[#2563eb]">5,247</p>
            <p className="text-sm text-gray-600 mt-2">Propeller configurations analyzed</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-2">Avg Efficiency</h3>
            <p className="text-4xl font-bold text-[#38bdf8]">68.5%</p>
            <p className="text-sm text-gray-600 mt-2">Across all propeller types</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-2">Top Brand</h3>
            <p className="text-4xl font-bold text-[#0f172a]">T-Motor</p>
            <p className="text-sm text-gray-600 mt-2">Highest average performance</p>
          </Card>
        </div>

        <Card>
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-[#2563eb] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-[#1f2937] mb-3">About This Dashboard</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  This interactive dashboard provides comprehensive visualizations of UAV propeller performance data.
                  Key features include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Performance trends across different propeller configurations</li>
                  <li>Comparative analysis of brands and geometries</li>
                  <li>Efficiency optimization insights</li>
                  <li>Thrust and power coefficient distributions</li>
                  <li>Real-time filtering and data exploration</li>
                </ul>
                <p>
                  The dashboard is built using Tableau and integrates seamlessly with our prediction models
                  to provide actionable insights for UAV design optimization.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
