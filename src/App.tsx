import React, { useState } from 'react';

export default function App() {
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [pace, setPace] = useState<string>('0:00');

  const calculatePace = (e: React.FormEvent) => {
    e.preventDefault();

    const distNum = parseFloat(distance);
    if (!distNum || distNum <= 0 || !time) {
      alert('Introduce distancia y tiempo válidos.');
      return;
    }

    let totalMinutes = 0;
    if (time.includes(':')) {
      const [mins, secs] = time.split(':').map(Number);
      totalMinutes = mins + (secs / 60);
    } else {
      totalMinutes = parseFloat(time);
    }

    if (!totalMinutes || totalMinutes <= 0) return;

    const paceDecimal = totalMinutes / distNum;
    const paceMins = Math.floor(paceDecimal);
    const paceSecs = Math.round((paceDecimal - paceMins) * 60);

    const formattedSecs = paceSecs < 10 ? `0${paceSecs}` : paceSecs;
    setPace(`${paceMins}:${formattedSecs}`);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-black selection:text-white">
      
      {/* Cabecera minimalista gigante inspirada en el referente */}
      <header className="max-w-5xl w-full mx-auto mb-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          Running <br />
          Calculator
        </h1>
      </header>

      {/* Contenido principal de la calculadora */}
      <main className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Formulario */}
        <form onSubmit={calculatePace} className="space-y-6 border-t-4 border-black pt-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">
              Distancia (km)
            </label>
            <input 
              type="number" 
              step="any"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full text-2xl font-bold p-4 bg-gray-100 border-2 border-black focus:outline-none focus:bg-white transition-colors"
              placeholder="0.0"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">
              Tiempo (min o MM:SS)
            </label>
            <input 
              type="text" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-2xl font-bold p-4 bg-gray-100 border-2 border-black focus:outline-none focus:bg-white transition-colors"
              placeholder="00:00"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white text-lg font-black uppercase tracking-wider py-5 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Calcular Ritmo
          </button>
        </form>

        {/* Bloque de resultados gigante */}
        <div className="border-t-4 border-black pt-6 flex flex-col justify-between h-full">
          <div>
            <span className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">
              Resultado / Ritmo Medio
            </span>
            <div className="text-6xl md:text-8xl font-black tracking-tighter text-black my-4">
              {pace} <span className="text-xl font-bold text-neutral-500">/km</span>
            </div>
          </div>
          
          <p className="text-sm font-medium text-neutral-500 mt-6">
            Diseño minimalista de alto impacto visual enfocado en la claridad de los datos.
          </p>
        </div>

      </main>

      {/* Pie de página sutil */}
      <footer className="max-w-5xl w-full mx-auto mt-12 pt-6 border-t border-neutral-200 text-xs font-bold uppercase tracking-widest text-neutral-400">
        TypeScript + Tailwind CSS v4
      </footer>

    </div>
  );
}