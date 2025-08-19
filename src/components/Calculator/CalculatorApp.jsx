"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Minus,
  Zap,
  Square,
  Users,
  UserCheck,
  Factory,
  Wrench,
  Droplets,
} from "lucide-react";
import "./calculator.css";

// Icon mapping
const iconMap = {
  factory: Factory,
  shredder: Factory,
  droplets: Droplets,
  zap: Zap,
  square: Square,
  wrench: Wrench,
};

// --- DATA FOR ALL CALCULATORS ---
const briquetteData = [
  {
    id: 1,
    name: "Primary Shredder",
    powerKwh: 60,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "shredder",
  },
  {
    id: 2,
    name: "Secondary Shredder",
    powerKwh: 27,
    areaM2: 3,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "shredder",
  },
  {
    id: 3,
    name: "Dewatering Unit",
    powerKwh: 30,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "droplets",
  },
  {
    id: 4,
    name: "Thermal Dryer",
    powerKwh: 60,
    areaM2: 50,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 2,
    icon: "zap",
  },
  {
    id: 5,
    name: "Compactor Briquette (90 mm ⌀)",
    powerKwh: 90,
    areaM2: 12,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 2,
    icon: "square",
  },
];

const briquettePelletComboData = [
  {
    id: 1,
    name: "Primary Shredder",
    powerKwh: 60,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "shredder",
  },
  {
    id: 2,
    name: "Secondary Shredder",
    powerKwh: 27,
    areaM2: 3,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "shredder",
  },
  {
    id: 3,
    name: "Dewatering Unit",
    powerKwh: 30,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "droplets",
  },
  {
    id: 4,
    name: "Thermal Dryer",
    powerKwh: 85,
    areaM2: 50,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 2,
    icon: "zap",
  },
  {
    id: 5,
    name: "Briquette + Pellet Combo",
    powerKwh: 90,
    areaM2: 12,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 2,
    icon: "square",
  },
];

const miniPalmOilMillData = [
  {
    id: 1,
    name: "Fruit-Bunch Segregator",
    powerKwh: 10,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "factory",
  },
  {
    id: 2,
    name: "Cooker",
    powerKwh: 10,
    areaM2: 2,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "zap",
  },
  {
    id: 3,
    name: "Press",
    powerKwh: 30,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 0,
    icon: "wrench",
  },
  {
    id: 4,
    name: "Vibrating Screen",
    powerKwh: 3,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 0,
    icon: "factory",
  },
  {
    id: 5,
    name: "Oil Separator",
    powerKwh: 5,
    areaM2: 4,
    units: 1,
    baseSkilled: 1,
    baseUnskilled: 1,
    icon: "droplets",
  },
];

const calculatorTabs = [
  {
    label: "Briquette Production",
    data: briquetteData,
    color: "linear-gradient(45deg, #f59e0b, #ea580c)",
  },
  {
    label: "Briquette + Pellet Combo",
    data: briquettePelletComboData,
    color: "linear-gradient(45deg, #10b981, #059669)",
  },
  {
    label: "Mini Palm Oil Mill",
    data: miniPalmOilMillData,
    color: "linear-gradient(45deg, #3b82f6, #4f46e5)",
  },
];

function MachineCard({ machine, onUnitsChange }) {
  const IconComponent = iconMap[machine.icon] || Factory;
  const multiplier = machine.units > 0 ? Math.ceil(machine.units / 3) : 0;
  const calculatedSkilled = machine.baseSkilled * multiplier;
  const calculatedUnskilled = machine.baseUnskilled * multiplier;

  const handleIncrement = () => {
    onUnitsChange(machine.id, machine.units + 1);
  };

  const handleDecrement = () => {
    if (machine.units > 0) {
      onUnitsChange(machine.id, machine.units - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0) {
      onUnitsChange(machine.id, value);
    }
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "16px",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
    cursor: "default",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };

  const iconContainerStyle = {
    padding: "6px",
    backgroundColor: "#dbeafe",
    borderRadius: "6px",
    marginRight: "8px",
  };

  const titleStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    lineHeight: "1.2",
    margin: 0,
  };

  const unitsRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  };

  const unitsLabelStyle = {
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
  };

  const unitsControlStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const buttonStyle = {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const decrementButtonStyle = {
    ...buttonStyle,
    backgroundColor: machine.units === 0 ? "#f3f4f6" : "#fecaca",
    cursor: machine.units === 0 ? "not-allowed" : "pointer",
  };

  const incrementButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#bbf7d0",
  };

  const inputStyle = {
    width: "48px",
    height: "28px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    outline: "none",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    fontSize: "12px",
  };

  const metricBoxStyle = {
    textAlign: "center",
    padding: "8px",
    borderRadius: "4px",
  };

  const powerBoxStyle = {
    ...metricBoxStyle,
    backgroundColor: "#fef3c7",
  };

  const areaBoxStyle = {
    ...metricBoxStyle,
    backgroundColor: "#f3e8ff",
  };

  const skilledBoxStyle = {
    ...metricBoxStyle,
    backgroundColor: "#dbeafe",
  };

  const unskilledBoxStyle = {
    ...metricBoxStyle,
    backgroundColor: "#d1fae5",
  };

  const metricHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
  };

  const metricValueStyle = {
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div style={cardStyle}>
      {/* Header with icon and name */}
      <div style={headerStyle}>
        <div style={iconContainerStyle}>
          <IconComponent size={16} color='#2563eb' />
        </div>
        <h3 style={titleStyle}>{machine.name}</h3>
      </div>

      {/* Units Control */}
      <div style={unitsRowStyle}>
        <span style={unitsLabelStyle}>Units:</span>
        <div style={unitsControlStyle}>
          <button
            onClick={handleDecrement}
            style={decrementButtonStyle}
            disabled={machine.units === 0}
          >
            <Minus
              size={12}
              color={machine.units === 0 ? "#9ca3af" : "#dc2626"}
            />
          </button>
          <input
            type='number'
            value={machine.units}
            onChange={handleInputChange}
            style={inputStyle}
            min='0'
          />
          <button onClick={handleIncrement} style={incrementButtonStyle}>
            <Plus size={12} color='#059669' />
          </button>
        </div>
      </div>

      {/* Calculations */}
      <div style={gridStyle}>
        <div style={powerBoxStyle}>
          <div style={metricHeaderStyle}>
            <Zap size={12} color='#d97706' style={{ marginRight: "4px" }} />
            <span style={{ fontWeight: "500", color: "#92400e" }}>Power</span>
          </div>
          <div style={{ ...metricValueStyle, color: "#78350f" }}>
            {(machine.powerKwh * machine.units).toFixed(0)} kWh
          </div>
        </div>

        <div style={areaBoxStyle}>
          <div style={metricHeaderStyle}>
            <Square size={12} color='#7c3aed' style={{ marginRight: "4px" }} />
            <span style={{ fontWeight: "500", color: "#6b21a8" }}>Area</span>
          </div>
          <div style={{ ...metricValueStyle, color: "#581c87" }}>
            {(machine.areaM2 * machine.units).toFixed(0)} m²
          </div>
        </div>

        <div style={skilledBoxStyle}>
          <div style={metricHeaderStyle}>
            <UserCheck
              size={12}
              color='#2563eb'
              style={{ marginRight: "4px" }}
            />
            <span style={{ fontWeight: "500", color: "#1d4ed8" }}>Skilled</span>
          </div>
          <div style={{ ...metricValueStyle, color: "#1e40af" }}>
            {calculatedSkilled}
          </div>
        </div>

        <div style={unskilledBoxStyle}>
          <div style={metricHeaderStyle}>
            <Users size={12} color='#059669' style={{ marginRight: "4px" }} />
            <span style={{ fontWeight: "500", color: "#047857" }}>
              Unskilled
            </span>
          </div>
          <div style={{ ...metricValueStyle, color: "#065f46" }}>
            {calculatedUnskilled}
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalsCard({ totals, color }) {
  const totalsStyle = {
    background: color,
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    padding: "16px",
    color: "white",
    // Removed marginBottom to be handled by the sticky wrapper
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    textAlign: "center",
    margin: "0 0 12px 0",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    textAlign: "center",
  };

  const itemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
  };

  const valueStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "2px 0",
  };

  const labelStyle = {
    fontSize: "12px",
    opacity: 0.9,
    margin: 0,
  };

  return (
    <div style={totalsStyle}>
      <h2 style={titleStyle}>📊 Total Requirements</h2>
      <div style={gridStyle}>
        <div style={itemStyle}>
          <div style={iconContainerStyle}>
            <Zap size={20} />
          </div>
          <div style={valueStyle}>{totals.power.toFixed(0)}</div>
          <div style={labelStyle}>kWh</div>
        </div>

        <div style={itemStyle}>
          <div style={iconContainerStyle}>
            <Square size={20} />
          </div>
          <div style={valueStyle}>{totals.area.toFixed(0)}</div>
          <div style={labelStyle}>m²</div>
        </div>

        <div style={itemStyle}>
          <div style={iconContainerStyle}>
            <UserCheck size={20} />
          </div>
          <div style={valueStyle}>{totals.skilled}</div>
          <div style={labelStyle}>skilled</div>
        </div>

        <div style={itemStyle}>
          <div style={iconContainerStyle}>
            <Users size={20} />
          </div>
          <div style={valueStyle}>{totals.unskilled}</div>
          <div style={labelStyle}>unskilled</div>
        </div>
      </div>
    </div>
  );
}

function Calculator({ initialMachineData, title, color }) {
  const [machines, setMachines] = useState(
    JSON.parse(JSON.stringify(initialMachineData))
  );

  const handleUnitChange = (id, value) => {
    const updatedMachines = machines.map((machine) =>
      machine.id === id ? { ...machine, units: value } : machine
    );
    setMachines(updatedMachines);
  };

  const totals = useMemo(() => {
    return machines.reduce(
      (acc, machine) => {
        const multiplier = machine.units > 0 ? Math.ceil(machine.units / 3) : 0;
        acc.power += machine.powerKwh * machine.units;
        acc.area += machine.areaM2 * machine.units;
        acc.skilled += machine.baseSkilled * multiplier;
        acc.unskilled += machine.baseUnskilled * multiplier;
        return acc;
      },
      { power: 0, area: 0, skilled: 0, unskilled: 0 }
    );
  }, [machines]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const stickyTotalsContainerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "#f9fafb", // Match the main background to hide content underneath
    paddingTop: "16px",
    paddingBottom: "8px", // Provide spacing below the sticky card
  };

  const tipBoxStyle = {
    backgroundColor: "#eff6ff",
    borderRadius: "8px",
    padding: "12px",
    // Removed marginBottom since sticky container provides spacing
  };

  const tipTextStyle = {
    color: "#1d4ed8",
    fontSize: "14px",
    margin: 0,
  };

  const gridStyle = {
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  };

  const responsiveGridStyle = {
    ...gridStyle,
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
    "@media (min-width: 641px) and (max-width: 1024px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 1025px) and (max-width: 1280px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "@media (min-width: 1281px) and (max-width: 1536px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    "@media (min-width: 1537px)": {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
  };

  return (
    <div style={containerStyle}>
      {/* Sticky Wrapper for Totals Card */}
      <div style={stickyTotalsContainerStyle}>
        <TotalsCard totals={totals} color={color} />
      </div>

      <div style={tipBoxStyle}>
        <p style={tipTextStyle}>
          💡 <strong>Tip:</strong> Use +/- buttons to adjust units. Worker
          calculation: every 3 machines = base workers needed.
        </p>
      </div>

      <div style={responsiveGridStyle}>
        {machines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onUnitsChange={handleUnitChange}
          />
        ))}
      </div>
    </div>
  );
}

export default function CalculatorApp() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCalculator = calculatorTabs[activeTab];

  const appStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "Arial, sans-serif",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#374151",
    marginBottom: "4px",
    margin: "0 0 4px 0",
  };

  const subtitleStyle = {
    color: "#6b7280",
    fontSize: "16px",
    margin: 0,
  };

  const tabContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "24px",
    gap: "8px",
  };

  const getTabButtonStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    backgroundColor: isActive ? "#2563eb" : "white",
    color: isActive ? "white" : "#6b7280",
    boxShadow: isActive
      ? "0 4px 8px rgba(37, 99, 235, 0.3)"
      : "0 2px 4px rgba(0,0,0,0.1)",
    transform: isActive ? "scale(1.05)" : "scale(1)",
  });

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Industrial Process Calculator</h1>
          <p style={subtitleStyle}>
            Calculate power, space, and workforce requirements for your
            industrial setup
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={tabContainerStyle}>
          {calculatorTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              style={getTabButtonStyle(activeTab === index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Calculator
          key={activeTab}
          initialMachineData={activeCalculator.data}
          title={activeCalculator.label}
          color={activeCalculator.color}
        />
      </div>
    </div>
  );
}
