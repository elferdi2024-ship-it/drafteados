// filepath: scripts/seed-teams-players.mjs
import { createClient } from '@supabase/supabase-js';

const url = 'https://lagpcbofealjwgulzywv.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

const TEAMS = [
  { provider_team_id: 'mock-team-bos', name: 'Boston Celtics', abbreviation: 'BOS', conference: 'East', division: 'Atlantic', primary_color: '#007A33', secondary_color: '#BA9653' },
  { provider_team_id: 'mock-team-bkn', name: 'Brooklyn Nets', abbreviation: 'BKN', conference: 'East', division: 'Atlantic', primary_color: '#000000', secondary_color: '#FFFFFF' },
  { provider_team_id: 'mock-team-nyk', name: 'New York Knicks', abbreviation: 'NYK', conference: 'East', division: 'Atlantic', primary_color: '#006BB6', secondary_color: '#F58426' },
  { provider_team_id: 'mock-team-phi', name: 'Philadelphia 76ers', abbreviation: 'PHI', conference: 'East', division: 'Atlantic', primary_color: '#006BB6', secondary_color: '#ED174C' },
  { provider_team_id: 'mock-team-tor', name: 'Toronto Raptors', abbreviation: 'TOR', conference: 'East', division: 'Atlantic', primary_color: '#CE1141', secondary_color: '#000000' },
  { provider_team_id: 'mock-team-chi', name: 'Chicago Bulls', abbreviation: 'CHI', conference: 'East', division: 'Central', primary_color: '#CE1141', secondary_color: '#000000' },
  { provider_team_id: 'mock-team-cle', name: 'Cleveland Cavaliers', abbreviation: 'CLE', conference: 'East', division: 'Central', primary_color: '#860038', secondary_color: '#041E42' },
  { provider_team_id: 'mock-team-det', name: 'Detroit Pistons', abbreviation: 'DET', conference: 'East', division: 'Central', primary_color: '#C8102E', secondary_color: '#1D42BA' },
  { provider_team_id: 'mock-team-ind', name: 'Indiana Pacers', abbreviation: 'IND', conference: 'East', division: 'Central', primary_color: '#002D62', secondary_color: '#FDBB30' },
  { provider_team_id: 'mock-team-mil', name: 'Milwaukee Bucks', abbreviation: 'MIL', conference: 'East', division: 'Central', primary_color: '#00471B', secondary_color: '#EEE1C6' },
  { provider_team_id: 'mock-team-atl', name: 'Atlanta Hawks', abbreviation: 'ATL', conference: 'East', division: 'Southeast', primary_color: '#E03A3E', secondary_color: '#C1D32F' },
  { provider_team_id: 'mock-team-cha', name: 'Charlotte Hornets', abbreviation: 'CHA', conference: 'East', division: 'Southeast', primary_color: '#1D1160', secondary_color: '#00788C' },
  { provider_team_id: 'mock-team-mia', name: 'Miami Heat', abbreviation: 'MIA', conference: 'East', division: 'Southeast', primary_color: '#98002E', secondary_color: '#F9A01B' },
  { provider_team_id: 'mock-team-orl', name: 'Orlando Magic', abbreviation: 'ORL', conference: 'East', division: 'Southeast', primary_color: '#0077C0', secondary_color: '#C4CED4' },
  { provider_team_id: 'mock-team-was', name: 'Washington Wizards', abbreviation: 'WAS', conference: 'East', division: 'Southeast', primary_color: '#002B5C', secondary_color: '#E31837' },
  { provider_team_id: 'mock-team-den', name: 'Denver Nuggets', abbreviation: 'DEN', conference: 'West', division: 'Northwest', primary_color: '#0E2240', secondary_color: '#FEC524' },
  { provider_team_id: 'mock-team-min', name: 'Minnesota Timberwolves', abbreviation: 'MIN', conference: 'West', division: 'Northwest', primary_color: '#0C2340', secondary_color: '#236192' },
  { provider_team_id: 'mock-team-okc', name: 'Oklahoma City Thunder', abbreviation: 'OKC', conference: 'West', division: 'Northwest', primary_color: '#007AC1', secondary_color: '#EF3B24' },
  { provider_team_id: 'mock-team-por', name: 'Portland Trail Blazers', abbreviation: 'POR', conference: 'West', division: 'Northwest', primary_color: '#E03A3E', secondary_color: '#000000' },
  { provider_team_id: 'mock-team-uta', name: 'Utah Jazz', abbreviation: 'UTA', conference: 'West', division: 'Northwest', primary_color: '#002B5C', secondary_color: '#00471B' },
  { provider_team_id: 'mock-team-gsw', name: 'Golden State Warriors', abbreviation: 'GSW', conference: 'West', division: 'Pacific', primary_color: '#1D428A', secondary_color: '#FFC72C' },
  { provider_team_id: 'mock-team-lac', name: 'LA Clippers', abbreviation: 'LAC', conference: 'West', division: 'Pacific', primary_color: '#C8102E', secondary_color: '#1D428A' },
  { provider_team_id: 'mock-team-lal', name: 'Los Angeles Lakers', abbreviation: 'LAL', conference: 'West', division: 'Pacific', primary_color: '#552583', secondary_color: '#FDB927' },
  { provider_team_id: 'mock-team-pho', name: 'Phoenix Suns', abbreviation: 'PHO', conference: 'West', division: 'Pacific', primary_color: '#1D1160', secondary_color: '#E56020' },
  { provider_team_id: 'mock-team-sac', name: 'Sacramento Kings', abbreviation: 'SAC', conference: 'West', division: 'Pacific', primary_color: '#5A2D81', secondary_color: '#63727A' },
  { provider_team_id: 'mock-team-dal', name: 'Dallas Mavericks', abbreviation: 'DAL', conference: 'West', division: 'Southwest', primary_color: '#00538C', secondary_color: '#002B5E' },
  { provider_team_id: 'mock-team-hou', name: 'Houston Rockets', abbreviation: 'HOU', conference: 'West', division: 'Southwest', primary_color: '#CE1141', secondary_color: '#000000' },
  { provider_team_id: 'mock-team-mem', name: 'Memphis Grizzlies', abbreviation: 'MEM', conference: 'West', division: 'Southwest', primary_color: '#5D76A9', secondary_color: '#12173F' },
  { provider_team_id: 'mock-team-nop', name: 'New Orleans Pelicans', abbreviation: 'NOP', conference: 'West', division: 'Southwest', primary_color: '#0C2340', secondary_color: '#C8102E' },
  { provider_team_id: 'mock-team-sas', name: 'San Antonio Spurs', abbreviation: 'SAS', conference: 'West', division: 'Southwest', primary_color: '#C4CED4', secondary_color: '#000000' },
];

const RAW_PLAYERS = [
  // BOS
  ['Jayson', 'Tatum', 'mock-team-bos', 'Wing', '0'],
  ['Jaylen', 'Brown', 'mock-team-bos', 'Wing', '7'],
  ['Jrue', 'Holiday', 'mock-team-bos', 'Guard', '4'],
  ['Derrick', 'White', 'mock-team-bos', 'Guard', '9'],
  ['Kristaps', 'Porzingis', 'mock-team-bos', 'Big', '8'],
  // BKN
  ['Cam', 'Thomas', 'mock-team-bkn', 'Guard', '24'],
  ['Nic', 'Claxton', 'mock-team-bkn', 'Big', '33'],
  ['Dennis', 'Schroder', 'mock-team-bkn', 'Guard', '17'],
  ['Cameron', 'Johnson', 'mock-team-bkn', 'Wing', '2'],
  ['Dorian', 'Finney-Smith', 'mock-team-bkn', 'Wing', '28'],
  // NYK
  ['Jalen', 'Brunson', 'mock-team-nyk', 'Guard', '11'],
  ['Karl-Anthony', 'Towns', 'mock-team-nyk', 'Big', '32'],
  ['OG', 'Anunoby', 'mock-team-nyk', 'Wing', '8'],
  ['Mikal', 'Bridges', 'mock-team-nyk', 'Wing', '1'],
  ['Josh', 'Hart', 'mock-team-nyk', 'Wing', '3'],
  // PHI
  ['Joel', 'Embiid', 'mock-team-phi', 'Big', '21'],
  ['Tyrese', 'Maxey', 'mock-team-phi', 'Guard', '0'],
  ['Paul', 'George', 'mock-team-phi', 'Wing', '8'],
  ['Kelly', 'Oubre Jr.', 'mock-team-phi', 'Wing', '9'],
  ['Caleb', 'Martin', 'mock-team-phi', 'Wing', '16'],
  // TOR
  ['Scottie', 'Barnes', 'mock-team-tor', 'Wing', '4'],
  ['RJ', 'Barrett', 'mock-team-tor', 'Wing', '9'],
  ['Immanuel', 'Quickley', 'mock-team-tor', 'Guard', '5'],
  ['Jakob', 'Poeltl', 'mock-team-tor', 'Big', '19'],
  ['Gradey', 'Dick', 'mock-team-tor', 'Guard', '1'],
  // CHI
  ['Zach', 'LaVine', 'mock-team-chi', 'Guard', '8'],
  ['Nikola', 'Vucevic', 'mock-team-chi', 'Big', '9'],
  ['Coby', 'White', 'mock-team-chi', 'Guard', '0'],
  ['Josh', 'Giddey', 'mock-team-chi', 'Guard', '3'],
  ['Patrick', 'Williams', 'mock-team-chi', 'Wing', '44'],
  // CLE
  ['Donovan', 'Mitchell', 'mock-team-cle', 'Guard', '45'],
  ['Darius', 'Garland', 'mock-team-cle', 'Guard', '10'],
  ['Evan', 'Mobley', 'mock-team-cle', 'Big', '4'],
  ['Jarrett', 'Allen', 'mock-team-cle', 'Big', '31'],
  ['Max', 'Strus', 'mock-team-cle', 'Wing', '1'],
  // DET
  ['Cade', 'Cunningham', 'mock-team-det', 'Guard', '2'],
  ['Jaden', 'Ivey', 'mock-team-det', 'Guard', '23'],
  ['Jalen', 'Duren', 'mock-team-det', 'Big', '0'],
  ['Ausar', 'Thompson', 'mock-team-det', 'Wing', '9'],
  ['Tobias', 'Harris', 'mock-team-det', 'Wing', '12'],
  // IND
  ['Tyrese', 'Haliburton', 'mock-team-ind', 'Guard', '0'],
  ['Pascal', 'Siakam', 'mock-team-ind', 'Wing', '43'],
  ['Myles', 'Turner', 'mock-team-ind', 'Big', '33'],
  ['Aaron', 'Nesmith', 'mock-team-ind', 'Wing', '23'],
  ['Andrew', 'Nembhard', 'mock-team-ind', 'Guard', '2'],
  // MIL
  ['Giannis', 'Antetokounmpo', 'mock-team-mil', 'Big', '34'],
  ['Damian', 'Lillard', 'mock-team-mil', 'Guard', '0'],
  ['Khris', 'Middleton', 'mock-team-mil', 'Wing', '22'],
  ['Brook', 'Lopez', 'mock-team-mil', 'Big', '11'],
  ['Bobby', 'Portis', 'mock-team-mil', 'Big', '9'],
  // ATL
  ['Trae', 'Young', 'mock-team-atl', 'Guard', '11'],
  ['Jalen', 'Johnson', 'mock-team-atl', 'Wing', '1'],
  ['Bogdan', 'Bogdanovic', 'mock-team-atl', 'Guard', '13'],
  ['Clint', 'Capela', 'mock-team-atl', 'Big', '15'],
  ['De\'Andre', 'Hunter', 'mock-team-atl', 'Wing', '12'],
  // CHA
  ['LaMelo', 'Ball', 'mock-team-cha', 'Guard', '1'],
  ['Brandon', 'Miller', 'mock-team-cha', 'Wing', '24'],
  ['Miles', 'Bridges', 'mock-team-cha', 'Wing', '0'],
  ['Mark', 'Williams', 'mock-team-cha', 'Big', '5'],
  ['Tre', 'Mann', 'mock-team-cha', 'Guard', '23'],
  // MIA
  ['Jimmy', 'Butler', 'mock-team-mia', 'Wing', '22'],
  ['Bam', 'Adebayo', 'mock-team-mia', 'Big', '13'],
  ['Tyler', 'Herro', 'mock-team-mia', 'Guard', '14'],
  ['Terry', 'Rozier', 'mock-team-mia', 'Guard', '2'],
  ['Jaime', 'Jaquez Jr.', 'mock-team-mia', 'Wing', '11'],
  // ORL
  ['Paolo', 'Banchero', 'mock-team-orl', 'Wing', '5'],
  ['Franz', 'Wagner', 'mock-team-orl', 'Wing', '22'],
  ['Jalen', 'Suggs', 'mock-team-orl', 'Guard', '4'],
  ['Wendell', 'Carter Jr.', 'mock-team-orl', 'Big', '34'],
  ['Cole', 'Anthony', 'mock-team-orl', 'Guard', '50'],
  // WAS
  ['Jordan', 'Poole', 'mock-team-was', 'Guard', '13'],
  ['Kyle', 'Kuzma', 'mock-team-was', 'Wing', '33'],
  ['Alex', 'Sarr', 'mock-team-was', 'Big', '20'],
  ['Bilal', 'Coulibaly', 'mock-team-was', 'Wing', '0'],
  ['Malcolm', 'Brogdon', 'mock-team-was', 'Guard', '15'],
  // DEN
  ['Nikola', 'Jokic', 'mock-team-den', 'Big', '15'],
  ['Jamal', 'Murray', 'mock-team-den', 'Guard', '27'],
  ['Michael', 'Porter Jr.', 'mock-team-den', 'Wing', '1'],
  ['Aaron', 'Gordon', 'mock-team-den', 'Wing', '50'],
  ['Christian', 'Braun', 'mock-team-den', 'Wing', '0'],
  // MIN
  ['Anthony', 'Edwards', 'mock-team-min', 'Guard', '5'],
  ['Rudy', 'Gobert', 'mock-team-min', 'Big', '27'],
  ['Julius', 'Randle', 'mock-team-min', 'Wing', '30'],
  ['Jaden', 'McDaniels', 'mock-team-min', 'Wing', '3'],
  ['Naz', 'Reid', 'mock-team-min', 'Big', '11'],
  // OKC
  ['Shai', 'Gilgeous-Alexander', 'mock-team-okc', 'Guard', '2'],
  ['Jalen', 'Williams', 'mock-team-okc', 'Wing', '8'],
  ['Chet', 'Holmgren', 'mock-team-okc', 'Big', '7'],
  ['Luguentz', 'Dort', 'mock-team-okc', 'Wing', '5'],
  ['Alex', 'Caruso', 'mock-team-okc', 'Guard', '9'],
  // POR
  ['Anfernee', 'Simons', 'mock-team-por', 'Guard', '1'],
  ['Jerami', 'Grant', 'mock-team-por', 'Wing', '9'],
  ['Deandre', 'Ayton', 'mock-team-por', 'Big', '2'],
  ['Scoot', 'Henderson', 'mock-team-por', 'Guard', '00'],
  ['Shaedon', 'Sharpe', 'mock-team-por', 'Guard', '17'],
  // UTA
  ['Lauri', 'Markkanen', 'mock-team-uta', 'Wing', '23'],
  ['Collin', 'Sexton', 'mock-team-uta', 'Guard', '2'],
  ['Keyonte', 'George', 'mock-team-uta', 'Guard', '3'],
  ['Walker', 'Kessler', 'mock-team-uta', 'Big', '24'],
  ['John', 'Collins', 'mock-team-uta', 'Big', '20'],
  // GSW
  ['Stephen', 'Curry', 'mock-team-gsw', 'Guard', '30'],
  ['Draymond', 'Green', 'mock-team-gsw', 'Big', '23'],
  ['Jonathan', 'Kuminga', 'mock-team-gsw', 'Wing', '00'],
  ['Andrew', 'Wiggins', 'mock-team-gsw', 'Wing', '22'],
  ['Brandin', 'Podziemski', 'mock-team-gsw', 'Guard', '2'],
  // LAC
  ['James', 'Harden', 'mock-team-lac', 'Guard', '1'],
  ['Kawhi', 'Leonard', 'mock-team-lac', 'Wing', '2'],
  ['Norman', 'Powell', 'mock-team-lac', 'Guard', '24'],
  ['Ivica', 'Zubac', 'mock-team-lac', 'Big', '40'],
  ['Terance', 'Mann', 'mock-team-lac', 'Wing', '14'],
  // LAL
  ['LeBron', 'James', 'mock-team-lal', 'Wing', '23'],
  ['Anthony', 'Davis', 'mock-team-lal', 'Big', '3'],
  ['Austin', 'Reaves', 'mock-team-lal', 'Guard', '15'],
  ['D\'Angelo', 'Russell', 'mock-team-lal', 'Guard', '1'],
  ['Rui', 'Hachimura', 'mock-team-lal', 'Wing', '28'],
  // PHO
  ['Kevin', 'Durant', 'mock-team-pho', 'Wing', '35'],
  ['Devin', 'Booker', 'mock-team-pho', 'Guard', '1'],
  ['Bradley', 'Beal', 'mock-team-pho', 'Guard', '3'],
  ['Jusuf', 'Nurkic', 'mock-team-pho', 'Big', '20'],
  ['Tyus', 'Jones', 'mock-team-pho', 'Guard', '21'],
  // SAC
  ['De\'Aaron', 'Fox', 'mock-team-sac', 'Guard', '5'],
  ['Domantas', 'Sabonis', 'mock-team-sac', 'Big', '10'],
  ['DeMar', 'DeRozan', 'mock-team-sac', 'Wing', '10'],
  ['Keegan', 'Murray', 'mock-team-sac', 'Wing', '13'],
  ['Malik', 'Monk', 'mock-team-sac', 'Guard', '0'],
  // DAL
  ['Luka', 'Doncic', 'mock-team-dal', 'Guard', '77'],
  ['Kyrie', 'Irving', 'mock-team-dal', 'Guard', '11'],
  ['Klay', 'Thompson', 'mock-team-dal', 'Wing', '31'],
  ['PJ', 'Washington', 'mock-team-dal', 'Wing', '25'],
  ['Dereck', 'Lively II', 'mock-team-dal', 'Big', '2'],
  // HOU
  ['Alperen', 'Sengun', 'mock-team-hou', 'Big', '28'],
  ['Jalen', 'Green', 'mock-team-hou', 'Guard', '4'],
  ['Fred', 'VanVleet', 'mock-team-hou', 'Guard', '5'],
  ['Jabari', 'Smith Jr.', 'mock-team-hou', 'Big', '10'],
  ['Amen', 'Thompson', 'mock-team-hou', 'Guard', '1'],
  // MEM
  ['Ja', 'Morant', 'mock-team-mem', 'Guard', '12'],
  ['Desmond', 'Bane', 'mock-team-mem', 'Guard', '22'],
  ['Jaren', 'Jackson Jr.', 'mock-team-mem', 'Big', '13'],
  ['Marcus', 'Smart', 'mock-team-mem', 'Guard', '36'],
  ['Zach', 'Edey', 'mock-team-mem', 'Big', '14'],
  // NOP
  ['Zion', 'Williamson', 'mock-team-nop', 'Wing', '1'],
  ['Brandon', 'Ingram', 'mock-team-nop', 'Wing', '14'],
  ['Dejounte', 'Murray', 'mock-team-nop', 'Guard', '5'],
  ['CJ', 'McCollum', 'mock-team-nop', 'Guard', '3'],
  ['Herbert', 'Jones', 'mock-team-nop', 'Wing', '2'],
  // SAS
  ['Victor', 'Wembanyama', 'mock-team-sas', 'Big', '1'],
  ['Chris', 'Paul', 'mock-team-sas', 'Guard', '3'],
  ['Devin', 'Vassell', 'mock-team-sas', 'Wing', '24'],
  ['Jeremy', 'Sochan', 'mock-team-sas', 'Wing', '10'],
  ['Stephon', 'Castle', 'mock-team-sas', 'Guard', '5'],
];

async function seed() {
  console.log('Seeding teams...');
  const { data: insertedTeams, error: teamErr } = await supabase
    .from('teams')
    .upsert(
      TEAMS.map(t => ({
        provider: 'mock',
        provider_team_id: t.provider_team_id,
        name: t.name,
        abbreviation: t.abbreviation,
        conference: t.conference,
        division: t.division,
        primary_color: t.primary_color,
        secondary_color: t.secondary_color,
        active: true,
      })),
      { onConflict: 'provider,provider_team_id' }
    )
    .select('id, provider_team_id');

  if (teamErr) {
    console.error('Team insert error:', teamErr);
    process.exit(1);
  }

  console.log(`Seeded ${insertedTeams.length} teams.`);

  // Map provider_team_id to db uuid
  const teamMap = new Map();
  for (const t of insertedTeams) {
    teamMap.set(t.provider_team_id, t.id);
  }

  console.log('Seeding players...');
  const playerRows = RAW_PLAYERS.map(([first, last, teamProviderId, pos, jersey], idx) => {
    const dbTeamId = teamMap.get(teamProviderId) || null;
    return {
      provider: 'mock',
      provider_player_id: `mock-player-${idx + 1}`,
      first_name: first,
      last_name: last,
      display_name: `${first} ${last}`,
      team_id: dbTeamId,
      position: pos,
      jersey_number: jersey,
      active: true,
    };
  });

  const { data: insertedPlayers, error: playerErr } = await supabase
    .from('players')
    .upsert(playerRows, { onConflict: 'provider,provider_player_id' })
    .select('id');

  if (playerErr) {
    console.error('Player insert error:', playerErr);
    process.exit(1);
  }

  console.log(`Seeded ${insertedPlayers.length} players.`);
  console.log('DB seed complete!');
}

seed();
