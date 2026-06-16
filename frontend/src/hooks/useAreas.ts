import { useState, useEffect } from 'react';
import type { Area } from '../types';

const API_BASE = 'https://pnsqr5ug4b.execute-api.ap-northeast-1.amazonaws.com/dev';

export function useAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/user/areas`)
      .then(r => r.json())
      .then(data => { setAreas(data); setLoading(false); })
      .catch(() => { setError('Could not load areas'); setLoading(false); });
  }, []);

  return { areas, loading, error };
}
