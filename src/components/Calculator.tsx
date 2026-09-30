import React, { useState } from 'react';
import { secondsToTime, generateSplits } from '../utils/runningCalculations';

export default function Calculator() {
  const [distance, setDistance] = useState<number>(10);
  const [paceMinutes, setPaceMinutes] = useState<string>('5');
  const [paceSeconds, setPaceSeconds] = useState<string>('0');

  const totalPaceSeconds = (parseInt(paceMinutes) || 0) * 60 + (parseInt(paceSeconds) || 0);
  const totalTimeSeconds = totalPaceSeconds * distance;
  const formattedTotalTime = secondsToTime(totalTimeSeconds);
  const splits = generateSplits(distance, totalPaceSeconds);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Running Pace & Split Calculator
        </h1>
        <p className="text-slate-600 mt-2">
          Calcula tus tiempos y parciales por kilómetro con precisión profesional.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-700">Parámetros</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Distancia (km)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Math.max(1, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Ritmo objetivo (min / km)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(e.target.value)}
                className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="self-center font-bold text-slate-400">:</span>
              <input
                type="number"
                placeholder="Seg"
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(e.target.value)}
                className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col justify-between shadow-inner">
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Tiempo Total Estimado
            </h2>
            <div className="text-4xl font-black mt-2 text-blue-400">
              {formattedTotalTime}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
            Calculado con base en un ritmo de {paceMinutes}:{parseInt(paceSeconds) < 10 ? '0' + paceSeconds : paceSeconds} min/km para {distance} km.
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Parciales por Kilómetro (Splits)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm">
                <th className="py-3 px-4">Km</th>
                <th className="py-3 px-4">Ritmo del Kilómetro</th>
                <th className="py-3 px-4">Tiempo Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
              {splits.map((split) => (
                <tr key={split.kilometer} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium">{split.kilometer}</td>
                  <td className="py-3 px-4">{split.splitTime}</td>
                  <td className="py-3 px-4 font-semibold text-blue-600">{split.accumulatedTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}