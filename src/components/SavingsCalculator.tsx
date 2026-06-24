import React, { useState } from 'react';
import { Sun, Zap, TrendingUp } from 'lucide-react';

export const SavingsCalculator: React.FC<{
  bill: number;
  setBill: (bill: number) => void;
}> = ({ bill, setBill }) => {
  const [kw, setKw] = useState<number>(5);
  
  // Real-world pricing assumptions for Rajasthan (average)
  const costPerKw = 60000; // Base cost per kW (includes panel, inverter, mounting, structure)
  const totalCost = kw * costPerKw;
  
  // PM Surya Ghar Yojana Subsidy Rules:
  // - 1 kW: ₹30,000
  // - 2 kW: ₹60,000
  // - 3 kW or more: ₹78,000 (capped)
  let subsidy = 0;
  if (kw >= 3) {
    subsidy = 78000;
  } else if (kw >= 2) {
    subsidy = 60000 + (kw - 2) * 18000;
  } else if (kw >= 1) {
    subsidy = 30000 + (kw - 1) * 30000;
  } else {
    subsidy = kw * 30000;
  }

  const netInvestment = Math.max(0, totalCost - subsidy);
  
  // Generation: 1 kW solar in sunny Rajasthan generates ~125 units per month
  const monthlyGeneration = kw * 125;
  const avgUnitRate = 7.5; // Average tariff rate in Rajasthan (Jaipur Discom)
  const monthlySavingsValue = Math.min(bill, monthlyGeneration * avgUnitRate);
  const annualSavings = Math.round(monthlySavingsValue * 12);
  const paybackPeriod = annualSavings > 0 ? parseFloat((netInvestment / annualSavings).toFixed(1)) : 0;
  
  // Lifetime savings (25 years panel warranty)
  const lifetimeSavings = annualSavings * 25 - netInvestment;

  return (
    <div className="calc-container">
      <div className="calc-header">
        <span className="section-subtitle">ROI Calculator</span>
        <h3 className="heading calc-title">Estimate Your Solar Savings</h3>
        <p className="calc-subtitle">Adjust the parameters below to see custom installation costs, subsidies, and payback periods.</p>
      </div>

      <div className="calc-main-grid">
        {/* Sliders Control Panel */}
        <div className="calc-control-panel">
          <div className="calc-input-group">
            <div className="calc-label-row">
              <span className="calc-label">Current Monthly Electricity Bill</span>
              <span className="calc-value">₹{bill.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="500"
              value={bill} 
              onChange={(e) => setBill(Number(e.target.value))}
              className="calc-slider"
              style={{ '--val': `${((bill - 1000) / 49000) * 100}%` } as React.CSSProperties}
            />
            <div className="calc-range-labels">
              <span>₹1K</span>
              <span>₹25K</span>
              <span>₹50K</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <span className="calc-label">Recommended System Size (kW)</span>
              <span className="calc-value">{kw} kW</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="0.5"
              value={kw} 
              onChange={(e) => setKw(Number(e.target.value))}
              className="calc-slider"
              style={{ '--val': `${((kw - 1) / 19) * 100}%` } as React.CSSProperties}
            />
            <div className="calc-range-labels">
              <span>1 kW</span>
              <span>10 kW</span>
              <span>20 kW</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="calc-metrics-grid">
            <div className="calc-metric-card">
              <Sun size={20} color="var(--accent)" />
              <div className="calc-metric-text">
                <span className="calc-metric-label">Monthly Gen.</span>
                <span className="calc-metric-value">~{Math.round(monthlyGeneration)} Units</span>
              </div>
            </div>
            <div className="calc-metric-card">
              <Zap size={20} color="var(--accent)" />
              <div className="calc-metric-text">
                <span className="calc-metric-label">Roof Area Req.</span>
                <span className="calc-metric-value">{kw * 100} Sq. Ft.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Output Financial Dashboard */}
        <div className="calc-dashboard">
          <h4 className="calc-dashboard-title">Financial Overview</h4>
          
          <div className="calc-financial-rows">
            <div className="calc-financial-row">
              <span className="calc-row-label">Total System Cost</span>
              <span className="calc-row-value">₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-financial-row">
              <span className="calc-row-label">Govt. Subsidy (PM Surya Ghar)</span>
              <span className="calc-row-value" style={{ color: '#10b981' }}>
                - ₹{subsidy.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="calc-row-highlight">
              <span className="calc-highlight-label">Net Investment</span>
              <span className="calc-highlight-value">₹{netInvestment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="calc-chart-section">
            <div className="calc-chart-text">
              <span className="calc-chart-label">Annual Electricity Savings</span>
              <span className="calc-chart-val">₹{annualSavings.toLocaleString('en-IN')}</span>
              <span className="calc-chart-help">Save up to 87% of bill amount</span>
            </div>

            {/* Gauge visualization */}
            <div className="calc-gauge-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="var(--border)" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="var(--accent)" 
                  strokeWidth="8" 
                  strokeDasharray="251"
                  strokeDashoffset={251 - (251 * Math.min(100, (100 / Math.max(1, paybackPeriod)))) / 100}
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />
                <text x="50" y="47" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">
                  {paybackPeriod}
                </text>
                <text x="50" y="65" textAnchor="middle" fill="var(--text-secondary)" fontSize="8">
                  Yrs Payback
                </text>
              </svg>
            </div>
          </div>

          <div className="calc-lifetime-box">
            <TrendingUp size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div className="calc-lifetime-info">
              <span className="calc-lifetime-label">Estimated 25-Year Net Profit</span>
              <span className="calc-lifetime-val">₹{lifetimeSavings.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
