// filepath: scripts/sync-nba-cdn.mjs
import { createClient } from '@supabase/supabase-js';
import { NBA_PLAYER_IDS, NBA_TEAM_IDS, getPlayerNbaId, getTeamNbaId } from '../src/lib/basketball/nbaIds.ts';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lagpcbofealjwgulzywv.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function sync() {
  console.log('--- 1. Sincronizando Logos Oficiales de Franquicias (CDN NBA) ---');
  const { data: teams, error: tErr } = await supabase.from('teams').select('id, name, abbreviation');
  if (tErr) throw tErr;

  for (const t of teams) {
    const nbaTeamId = getTeamNbaId(t.abbreviation) || getTeamNbaId(t.name);
    const logoUrl = `https://cdn.nba.com/logos/nba/${nbaTeamId}/global/L/logo.svg`;
    await supabase.from('teams').update({
      logo_url: logoUrl,
      provider_team_id: String(nbaTeamId),
    }).eq('id', t.id);
  }
  console.log(`✓ ${teams.length} franquicias actualizadas con logos del CDN oficial de la NBA.`);

  console.log('--- 2. Sincronizando Headshots Oficiales de Jugadores (CDN NBA) ---');
  const { data: players, error: pErr } = await supabase.from('players').select('id, display_name');
  if (pErr) throw pErr;

  let matched = 0;
  for (const p of players) {
    const nbaId = getPlayerNbaId(p.display_name);
    if (nbaId) {
      const headshotUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png`;
      await supabase.from('players').update({
        headshot_url: headshotUrl,
        provider_player_id: String(nbaId),
      }).eq('id', p.id);
      matched++;
    }
  }
  console.log(`✓ ${matched} de ${players.length} jugadores enlazados con headshots oficiales 1040x760 de la NBA.`);
}

sync().catch(console.error);
