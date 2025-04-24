import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const ImmigrationScoreChart = () => {
  const [programType, setProgramType] = useState('federal');
  
  // Federal Express Entry Data - Updated with latest draw information from April 2025
  const federalData = [
    { month: 'Nov 2024', PNP: 727, CEC: 539, French: 478 },
    { month: 'Dec 2024', PNP: 705, CEC: 547, French: 466 },
    { month: 'Jan 2025', PNP: 793, CEC: 542, French: null },
    { month: 'Feb 2025', PNP: 776, CEC: 527, French: 428 },
    { month: 'Mar 2025', PNP: 701, CEC: null, French: 410 },
    { month: 'Apr 2025', PNP: 764, CEC: null, French: null }, // Updated with actual April draw data
    { month: 'May 2025 (pred)', PNP: 760, CEC: 530, French: 405, isPrediction: true },
    { month: 'Jun 2025 (pred)', PNP: 755, CEC: 525, French: 400, isPrediction: true },
    { month: 'Jul 2025 (pred)', PNP: 750, CEC: 520, French: 395, isPrediction: true },
  ];

  // Ontario Express Entry Data - Updated with latest information
  const ontarioExpressData = [
    { month: 'Sep 2024', HCP: 470, FSSW: 368, Trades: 420 },
    { month: 'Oct 2024', HCP: null, FSSW: null, Trades: 420 },
    { month: 'Nov 2024', HCP: null, FSSW: null, Trades: null },
    { month: 'Dec 2024', HCP: null, FSSW: null, Trades: null },
    { month: 'Jan 2025', HCP: 465, FSSW: null, Trades: null }, // Based on reported draws
    { month: 'Feb 2025', HCP: null, FSSW: null, Trades: null },
    { month: 'Mar 2025', HCP: null, FSSW: null, Trades: null },
    { month: 'Apr 2025', HCP: 470, FSSW: 355, Trades: 415 }, // Latest available data
    { month: 'May 2025 (pred)', HCP: 475, FSSW: 350, Trades: 410, isPrediction: true },
    { month: 'Jun 2025 (pred)', HCP: 470, FSSW: 345, Trades: 410, isPrediction: true },
    { month: 'Jul 2025 (pred)', HCP: 465, FSSW: 340, Trades: 405, isPrediction: true },
  ];

  // Ontario EOI Data - Updated with latest information from Jan 2025 draws
  const ontarioEOIData = [
    { month: 'Aug 2024', FW: 52, IS: 74, MG: 53, PhD: 45 },
    { month: 'Sep 2024', FW: null, IS: 67, MG: 53, PhD: 45 },
    { month: 'Oct 2024', FW: 50, IS: null, MG: null, PhD: null },
    { month: 'Nov 2024', FW: null, IS: null, MG: null, PhD: null },
    { month: 'Dec 2024', FW: null, IS: null, MG: null, PhD: null },
    { month: 'Jan 2025', FW: 55, IS: null, MG: null, PhD: null }, // Jan 15 draw for Foreign Worker
    { month: 'Feb 2025', FW: null, IS: null, MG: null, PhD: null },
    { month: 'Mar 2025', FW: null, IS: null, MG: null, PhD: null },
    { month: 'Apr 2025 (pred)', FW: 53, IS: 70, MG: 54, PhD: 46, isPrediction: true },
    { month: 'May 2025 (pred)', FW: 52, IS: 72, MG: 55, PhD: 47, isPrediction: true },
    { month: 'Jun 2025 (pred)', FW: 50, IS: 73, MG: 55, PhD: 48, isPrediction: true },
  ];

  const getCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isPrediction = payload[0].payload.isPrediction;
      
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            entry.value && (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value}
                {isPrediction ? ' (predicted)' : ''}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  const getCurrentData = () => {
    switch(programType) {
      case 'federal':
        return federalData;
      case 'ontario-express':
        return ontarioExpressData;
      case 'ontario-eoi':
        return ontarioEOIData;
      default:
        return federalData;
    }
  };

  const getProgramLines = () => {
    switch(programType) {
      case 'federal':
        return (
          <>
            <Line type="monotone" dataKey="PNP" stroke="#8884d8" name="Provincial Nominee Program" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="CEC" stroke="#82ca9d" name="Canadian Experience Class" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="French" stroke="#ffc658" name="French Language Proficiency" strokeWidth={2} connectNulls />
          </>
        );
      case 'ontario-express':
        return (
          <>
            <Line type="monotone" dataKey="HCP" stroke="#8884d8" name="Human Capital Priorities" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="FSSW" stroke="#82ca9d" name="French-Speaking Skilled Worker" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="Trades" stroke="#ffc658" name="Skilled Trades" strokeWidth={2} connectNulls />
          </>
        );
      case 'ontario-eoi':
        return (
          <>
            <Line type="monotone" dataKey="FW" stroke="#8884d8" name="Foreign Worker" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="IS" stroke="#82ca9d" name="International Student" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="MG" stroke="#ffc658" name="Masters Graduate" strokeWidth={2} connectNulls />
            <Line type="monotone" dataKey="PhD" stroke="#ff8042" name="PhD Graduate" strokeWidth={2} connectNulls />
          </>
        );
      default:
        return null;
    }
  };

  const getYDomain = () => {
    switch(programType) {
      case 'federal':
        return [350, 850];
      case 'ontario-express':
        return [300, 550];
      case 'ontario-eoi':
        return [40, 80];
      default:
        return [0, 850];
    }
  };

  const chartTitle = () => {
    switch(programType) {
      case 'federal':
        return "Federal Express Entry CRS Scores";
      case 'ontario-express':
        return "Ontario Express Entry Streams CRS Scores";
      case 'ontario-eoi':
        return "Ontario Expression of Interest Streams Scores";
      default:
        return "Immigration Scores";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center mb-4">{chartTitle()}</h2>
        <p className="text-sm text-center text-gray-600 mb-3">Updated with data from Brave Search: April 24, 2025</p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4 text-sm">
          <strong>Key Update:</strong> IRCC has significantly reduced Provincial Nominee Program allocations by 50% for 2025 (from 110,000 to 55,000 nominations), which may affect draw frequencies and CRS thresholds going forward.
        </div>
        
        <div className="flex justify-center mb-4 space-x-4">
          <button 
            className={`px-4 py-2 rounded ${programType === 'federal' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setProgramType('federal')}
          >
            Federal Express Entry
          </button>
          <button 
            className={`px-4 py-2 rounded ${programType === 'ontario-express' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setProgramType('ontario-express')}
          >
            Ontario Express Entry
          </button>
          <button 
            className={`px-4 py-2 rounded ${programType === 'ontario-eoi' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setProgramType('ontario-eoi')}
          >
            Ontario EOI Streams
          </button>
        </div>
      </div>
      
      <div className="h-96 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getCurrentData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={getYDomain()} />
            <Tooltip content={getCustomTooltip} />
            <Legend />
            <ReferenceLine x="Apr 2025" stroke="#ff0000" strokeDasharray="3 3" />
            {getProgramLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded">
        <h3 className="font-bold mb-2">Notes:</h3>
        <ul className="list-disc pl-5">
          <li>Red vertical line indicates current date</li>
          <li>Predictions are based on historical trends and recent immigration policy updates</li>
          <li>IRCC has reduced PNP allocations by 50% (from 110,000 in 2024 to 55,000 in 2025)</li>
          <li>Latest Federal Express Entry draw (#342) was on April 14, 2025 with CRS cutoff of 764 for PNP</li>
          <li>CEC draws have been less frequent in early 2025, with the highest recent score of 542</li>
          <li>Scores for targeted draws (specific occupations) may vary significantly from general draws</li>
          <li>Provincial Nominee Program scores include 600 points bonus</li>
          <li>For EOI streams, scores represent the minimum points required for invitation</li>
        </ul>
      </div>
    </div>
  );
};

export default ImmigrationScoreChart;