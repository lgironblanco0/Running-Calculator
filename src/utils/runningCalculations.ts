// Convierte un string de tiempo "HH:MM:SS" o "MM:SS" a segundos totales
export function timeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

// Convierte segundos totales a un formato legible "MM:SS" o "HH:MM:SS"
export function secondsToTime(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

// Interfaz para los parciales (splits)
export interface Split {
  kilometer: number;
  splitTime: string;
  accumulatedTime: string;
}

// Genera la tabla de parciales por kilómetro
export function generateSplits(distanceKm: number, paceSecondsPerKm: number): Split[] {
  const splits: Split[] = [];
  for (let i = 1; i <= Math.floor(distanceKm); i++) {
    const accumulated = i * paceSecondsPerKm;
    splits.push({
      kilometer: i,
      splitTime: secondsToTime(paceSecondsPerKm),
      accumulatedTime: secondsToTime(accumulated)
    });
  }
  return splits;
}