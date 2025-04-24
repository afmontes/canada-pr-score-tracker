import React from 'react';
import ImmigrationScoreChart from './components/ImmigrationScoreChart';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-blue-600 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">
                🇨🇦
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Canada PR Score Tracker</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Track and predict immigration program score trends</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <ImmigrationScoreChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;