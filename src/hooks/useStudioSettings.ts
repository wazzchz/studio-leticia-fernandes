import { useEffect, useState } from 'react';
import { STUDIO } from '../lib/config';
import { fetchSettings, type StudioSettings } from '../services/api';

/**
 * Número oficial do studio vindo da API (GET /api/settings),
 * com fallback imediato para o valor local se a API estiver fora.
 */
export function useStudioSettings(): StudioSettings {
  const [settings, setSettings] = useState<StudioSettings>({
    whatsappNumber: STUDIO.whatsappNumber,
    whatsappDisplay: STUDIO.whatsappDisplay,
  });

  useEffect(() => {
    let live = true;
    fetchSettings().then((s) => {
      if (live && s) setSettings(s);
    });
    return () => {
      live = false;
    };
  }, []);

  return settings;
}
