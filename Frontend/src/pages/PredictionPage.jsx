import { useState } from "react";
import {
  Sparkles,
  Tractor,
  Package,
  Video,
  Map,
  Zap,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    blades: "",
    diameter: "",
    pitch: "",
    advanceRatio: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- Drone Recommendation Logic ---------------- */

  const getDroneRecommendation = (ct, cp, efficiency) => {
    if (efficiency >= 0.7 && cp <= 0.05) {
      return {
        title: "Surveillance Drone",
        icon: Video,
        color: "from-emerald-500 to-green-600",
        description:
          "High efficiency and low power consumption make this propeller suitable for long-endurance surveillance missions.",
      };
    }

    if (ct >= 0.09 && efficiency >= 0.6 && cp <= 0.06) {
      return {
        title: "Agriculture Drone",
        icon: Tractor,
        color: "from-lime-500 to-green-700",
        description:
          "High thrust capability with stable efficiency, ideal for lifting spray payloads in agricultural applications.",
      };
    }

    if (ct >= 0.09 && cp > 0.06) {
      return {
        title: "Delivery Drone",
        icon: Package,
        color: "from-blue-500 to-indigo-600",
        description:
          "Strong thrust output with higher power usage, suitable for payload transport and delivery drones.",
      };
    }

    if (efficiency >= 0.6 && cp <= 0.06) {
      return {
        title: "Mapping Drone",
        icon: Map,
        color: "from-sky-500 to-cyan-600",
        description:
          "Balanced thrust and efficiency enable stable hovering for aerial mapping and surveying.",
      };
    }

    return {
      title: "Racing / Performance Drone",
      icon: Zap,
      color: "from-red-500 to-orange-600",
      description:
        "Performance-oriented characteristics prioritizing speed over endurance.",
    };
  };

  /* ---------------- API Call ---------------- */

  const handlePredict = async () => {
    if (
      !formData.blades ||
      !formData.diameter ||
      !formData.pitch ||
      !formData.advanceRatio
    ) {
      alert("Please fill all input fields");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blades: Number(formData.blades),
          diameter: Number(formData.diameter),
          pitch: Number(formData.pitch),
          advance_ratio: Number(formData.advanceRatio),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Prediction failed");

      const recommendation = getDroneRecommendation(
        data.thrust_coefficient,
        data.power_coefficient,
        data.efficiency
      );

      setPrediction({
        thrust: data.thrust_coefficient,
        power: data.power_coefficient,
        efficiency: data.efficiency,
        recommendation,
      });
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            UAV Propeller Performance Prediction
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Predict aerodynamic performance and receive intelligent drone-type
            recommendations using machine learning.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Input Card */}
          <Card className="backdrop-blur bg-white/80 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">
              Input Parameters
            </h2>

            <div className="space-y-4">
              <Select
                label="Number of Blades"
                placeholder="Select blade count"
                options={["2", "3", "4"]}
                value={formData.blades}
                onChange={(e) =>
                  setFormData({ ...formData, blades: e.target.value })
                }
                helperText="Blade count determines which prediction model is used"
              />

              <Input
                label="Propeller Diameter (inches)"
                type="number"
                placeholder="e.g. 10"
                value={formData.diameter}
                onChange={(e) =>
                  setFormData({ ...formData, diameter: e.target.value })
                }
                helperText={
                  formData.blades === "2"
                    ? "Dataset range: 9 – 19 inches"
                    : formData.blades
                    ? "Dataset range: 5 – 9 inches"
                    : "Select blades to view valid range"
                }
              />

              <Input
                label="Propeller Pitch (inches)"
                type="number"
                placeholder="e.g. 5"
                value={formData.pitch}
                onChange={(e) =>
                  setFormData({ ...formData, pitch: e.target.value })
                }
                helperText={
                  formData.blades === "2"
                    ? "Typical range: 4 – 13 inches"
                    : formData.blades
                    ? "Typical range: 3 – 7.7 inches"
                    : "Select blades to view valid range"
                }
              />

              <Input
                label="Advance Ratio"
                type="number"
                step="0.01"
                placeholder="e.g. 0.45"
                value={formData.advanceRatio}
                onChange={(e) =>
                  setFormData({ ...formData, advanceRatio: e.target.value })
                }
                helperText="Recommended operating range: 0.2 – 0.7"
              />

              <Button
                onClick={handlePredict}
                disabled={loading}
                className="w-full"
              >
                <Sparkles className="w-5 h-5 mr-2 inline" />
                {loading ? "Predicting..." : "Predict Performance"}
              </Button>
            </div>
          </Card>

          {/* Results Card */}
          <Card className="backdrop-blur bg-white/80 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">
              Prediction Results
            </h2>

            {!prediction ? (
              <div className="text-center py-16 text-slate-400">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter parameters to view results</p>
              </div>
            ) : (
              <div className="space-y-6">

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Metric
                    title="Thrust Coefficient (Ct)"
                    value={prediction.thrust.toFixed(3)}
                    gradient="from-indigo-500 to-blue-600"
                  />
                  <Metric
                    title="Power Coefficient (Cp)"
                    value={prediction.power.toFixed(3)}
                    gradient="from-purple-500 to-fuchsia-600"
                  />
                  <Metric
                    title="Efficiency"
                    value={`${(prediction.efficiency * 100).toFixed(1)}%`}
                    gradient="from-emerald-500 to-green-600"
                  />
                </div>

                {/* Info */}
                <p className="text-sm text-gray-500 text-center">
                  Values are rounded for readability. Predictions are generated
                  using machine learning models trained on experimental UAV
                  propeller data.
                </p>

                {/* Recommendation */}
                <DroneRecommendation {...prediction.recommendation} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sub Components ---------------- */

function Metric({ title, value, gradient }) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}
    >
      <p className="text-xs uppercase tracking-wide opacity-80">
        {title}
      </p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function DroneRecommendation({ title, description, icon: Icon, color }) {
  return (
    <div
      className={`rounded-2xl p-6 text-white bg-gradient-to-r ${color} shadow-xl`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-7 h-7" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}
