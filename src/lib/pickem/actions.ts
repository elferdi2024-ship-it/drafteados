import { createClient } from '@/lib/supabase/client';

export interface SavePickParams {
  seasonId: string;
  predictionTypeId: string;
  playerId?: string | null;
  teamId?: string | null;
}

export async function savePickAction(params: SavePickParams) {
  const supabase = createClient();

  // 1. Authenticate user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: 'Iniciá sesión para guardar tus picks, Buque.' };
  }

  // 2. Validate season status & deadline
  const { data: season, error: seasonError } = await supabase
    .from('seasons')
    .select('id, status, lock_at')
    .eq('id', params.seasonId)
    .single();

  if (seasonError || !season) {
    return { success: false, error: 'Temporada no encontrada.' };
  }

  if (season.status !== 'OPEN') {
    return { success: false, error: 'Esta temporada no está abierta para predicciones.' };
  }

  if (season.lock_at && new Date() >= new Date(season.lock_at)) {
    return { success: false, error: 'El tiempo expiró. Las predicciones están bloqueadas.' };
  }

  // 3. Check if this specific prediction is already locked
  const { data: existing } = await supabase
    .from('predictions')
    .select('status')
    .eq('user_id', user.id)
    .eq('season_id', params.seasonId)
    .eq('prediction_type_id', params.predictionTypeId)
    .maybeSingle();

  if (existing && existing.status !== 'OPEN') {
    return { success: false, error: 'Tus picks ya están bloqueados. No podés cambiar nada.' };
  }

  // 4. Upsert prediction (safely handling UUIDs vs custom rookie/fallback IDs)
  const isUUID = (str?: string | null): boolean =>
    Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));

  const isPlayerUuid = isUUID(params.playerId);
  const isTeamUuid = isUUID(params.teamId);

  const { error: upsertError } = await supabase
    .from('predictions')
    .upsert(
      {
        user_id: user.id,
        season_id: params.seasonId,
        prediction_type_id: params.predictionTypeId,
        player_id: isPlayerUuid ? params.playerId : null,
        team_id: isTeamUuid ? params.teamId : null,
        selected_value: (!isPlayerUuid && params.playerId) || (!isTeamUuid && params.teamId) || null,
        status: 'OPEN',
      },
      {
        onConflict: 'user_id,season_id,prediction_type_id',
      }
    );

  if (upsertError) {
    return { success: false, error: upsertError.message };
  }

  return { success: true };
}

export async function lockPicksAction(seasonId: string) {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: 'No autorizado.' };
  }

  // Check season
  const { data: season } = await supabase
    .from('seasons')
    .select('id, status, lock_at')
    .eq('id', seasonId)
    .single();

  if (!season || season.status !== 'OPEN') {
    return { success: false, error: 'La temporada no admite bloqueos en este momento.' };
  }

  if (season.lock_at && new Date() >= new Date(season.lock_at)) {
    return { success: false, error: 'Se venció el plazo oficial de cierre.' };
  }

  // Check how many picks the user has
  const { data: picks, error: picksError } = await supabase
    .from('predictions')
    .select('id, status')
    .eq('user_id', user.id)
    .eq('season_id', seasonId);

  if (picksError || !picks || picks.length < 13) {
    return { 
      success: false, 
      error: `Tenés que completar las 13 predicciones antes de bloquear. Tenés ${picks?.length || 0}/13.` 
    };
  }

  // Lock all user's predictions for this season
  const now = new Date().toISOString();
  const { error: lockError } = await supabase
    .from('predictions')
    .update({
      status: 'LOCKED',
      locked_at: now,
    })
    .eq('user_id', user.id)
    .eq('season_id', seasonId)
    .eq('status', 'OPEN');

  if (lockError) {
    return { success: false, error: lockError.message };
  }

  return { success: true };
}
