// filepath: scripts/seed-expanded-players.mjs
import { createClient } from '@supabase/supabase-js';

const url = 'https://lagpcbofealjwgulzywv.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

const EXPANDED_PLAYERS = [
  // BOS
  ['Jayson', 'Tatum', 'mock-team-bos', 'Wing', '0'],
  ['Jaylen', 'Brown', 'mock-team-bos', 'Wing', '7'],
  ['Jrue', 'Holiday', 'mock-team-bos', 'Guard', '4'],
  ['Derrick', 'White', 'mock-team-bos', 'Guard', '9'],
  ['Kristaps', 'Porzingis', 'mock-team-bos', 'Big', '8'],
  ['Al', 'Horford', 'mock-team-bos', 'Big', '42'],
  ['Payton', 'Pritchard', 'mock-team-bos', 'Guard', '11'],
  ['Sam', 'Hauser', 'mock-team-bos', 'Wing', '30'],

  // BKN
  ['Cam', 'Thomas', 'mock-team-bkn', 'Guard', '24'],
  ['Nic', 'Claxton', 'mock-team-bkn', 'Big', '33'],
  ['Dennis', 'Schroder', 'mock-team-bkn', 'Guard', '17'],
  ['Cameron', 'Johnson', 'mock-team-bkn', 'Wing', '2'],
  ['Dorian', 'Finney-Smith', 'mock-team-bkn', 'Wing', '28'],
  ['Ben', 'Simmons', 'mock-team-bkn', 'Guard', '10'],
  ['Noah', 'Clowney', 'mock-team-bkn', 'Big', '21'],

  // NYK
  ['Jalen', 'Brunson', 'mock-team-nyk', 'Guard', '11'],
  ['Karl-Anthony', 'Towns', 'mock-team-nyk', 'Big', '32'],
  ['OG', 'Anunoby', 'mock-team-nyk', 'Wing', '8'],
  ['Mikal', 'Bridges', 'mock-team-nyk', 'Wing', '1'],
  ['Josh', 'Hart', 'mock-team-nyk', 'Wing', '3'],
  ['Mitchell', 'Robinson', 'mock-team-nyk', 'Big', '23'],
  ['Miles', 'McBride', 'mock-team-nyk', 'Guard', '2'],

  // PHI
  ['Joel', 'Embiid', 'mock-team-phi', 'Big', '21'],
  ['Tyrese', 'Maxey', 'mock-team-phi', 'Guard', '0'],
  ['Paul', 'George', 'mock-team-phi', 'Wing', '8'],
  ['Kelly', 'Oubre Jr.', 'mock-team-phi', 'Wing', '9'],
  ['Caleb', 'Martin', 'mock-team-phi', 'Wing', '16'],
  ['Andre', 'Drummond', 'mock-team-phi', 'Big', '5'],
  ['Jared', 'McCain', 'mock-team-phi', 'Guard', '20'], // Rookie
  ['Guerschon', 'Yabusele', 'mock-team-phi', 'Wing', '28'],

  // TOR
  ['Scottie', 'Barnes', 'mock-team-tor', 'Wing', '4'],
  ['RJ', 'Barrett', 'mock-team-tor', 'Wing', '9'],
  ['Immanuel', 'Quickley', 'mock-team-tor', 'Guard', '5'],
  ['Jakob', 'Poeltl', 'mock-team-tor', 'Big', '19'],
  ['Gradey', 'Dick', 'mock-team-tor', 'Guard', '1'],
  ['Davion', 'Mitchell', 'mock-team-tor', 'Guard', '0'],
  ['Ja\'Kobe', 'Walter', 'mock-team-tor', 'Guard', '14'], // Rookie

  // CHI
  ['Zach', 'LaVine', 'mock-team-chi', 'Guard', '8'],
  ['Nikola', 'Vucevic', 'mock-team-chi', 'Big', '9'],
  ['Coby', 'White', 'mock-team-chi', 'Guard', '0'],
  ['Josh', 'Giddey', 'mock-team-chi', 'Guard', '3'],
  ['Patrick', 'Williams', 'mock-team-chi', 'Wing', '44'],
  ['Ayo', 'Dosunmu', 'mock-team-chi', 'Guard', '12'],
  ['Matas', 'Buzelis', 'mock-team-chi', 'Wing', '14'], // Rookie
  ['Lonzo', 'Ball', 'mock-team-chi', 'Guard', '2'],

  // CLE
  ['Donovan', 'Mitchell', 'mock-team-cle', 'Guard', '45'],
  ['Darius', 'Garland', 'mock-team-cle', 'Guard', '10'],
  ['Evan', 'Mobley', 'mock-team-cle', 'Big', '4'],
  ['Jarrett', 'Allen', 'mock-team-cle', 'Big', '31'],
  ['Max', 'Strus', 'mock-team-cle', 'Wing', '1'],
  ['Caris', 'LeVert', 'mock-team-cle', 'Guard', '3'],
  ['Isaac', 'Okoro', 'mock-team-cle', 'Wing', '35'],

  // DET
  ['Cade', 'Cunningham', 'mock-team-det', 'Guard', '2'],
  ['Jaden', 'Ivey', 'mock-team-det', 'Guard', '23'],
  ['Jalen', 'Duren', 'mock-team-det', 'Big', '0'],
  ['Ausar', 'Thompson', 'mock-team-det', 'Wing', '9'],
  ['Tobias', 'Harris', 'mock-team-det', 'Wing', '12'],
  ['Ron', 'Holland', 'mock-team-det', 'Wing', '5'], // Rookie
  ['Malik', 'Beasley', 'mock-team-det', 'Guard', '5'],
  ['Tim', 'Hardaway Jr.', 'mock-team-det', 'Guard', '10'],

  // IND
  ['Tyrese', 'Haliburton', 'mock-team-ind', 'Guard', '0'],
  ['Pascal', 'Siakam', 'mock-team-ind', 'Wing', '43'],
  ['Myles', 'Turner', 'mock-team-ind', 'Big', '33'],
  ['Aaron', 'Nesmith', 'mock-team-ind', 'Wing', '23'],
  ['Andrew', 'Nembhard', 'mock-team-ind', 'Guard', '2'],
  ['Bennedict', 'Mathurin', 'mock-team-ind', 'Guard', '00'],
  ['Obi', 'Toppin', 'mock-team-ind', 'Wing', '1'],
  ['T.J.', 'McConnell', 'mock-team-ind', 'Guard', '9'],

  // MIL
  ['Giannis', 'Antetokounmpo', 'mock-team-mil', 'Big', '34'],
  ['Damian', 'Lillard', 'mock-team-mil', 'Guard', '0'],
  ['Khris', 'Middleton', 'mock-team-mil', 'Wing', '22'],
  ['Brook', 'Lopez', 'mock-team-mil', 'Big', '11'],
  ['Bobby', 'Portis', 'mock-team-mil', 'Big', '9'],
  ['Gary', 'Trent Jr.', 'mock-team-mil', 'Guard', '5'],
  ['Taurean', 'Prince', 'mock-team-mil', 'Wing', '12'],

  // ATL
  ['Trae', 'Young', 'mock-team-atl', 'Guard', '11'],
  ['Jalen', 'Johnson', 'mock-team-atl', 'Wing', '1'],
  ['Bogdan', 'Bogdanovic', 'mock-team-atl', 'Guard', '13'],
  ['Clint', 'Capela', 'mock-team-atl', 'Big', '15'],
  ['De\'Andre', 'Hunter', 'mock-team-atl', 'Wing', '12'],
  ['Zaccharie', 'Risacher', 'mock-team-atl', 'Wing', '10'], // #1 Pick Rookie!
  ['Dyson', 'Daniels', 'mock-team-atl', 'Guard', '5'],
  ['Onyeka', 'Okongwu', 'mock-team-atl', 'Big', '17'],

  // CHA
  ['LaMelo', 'Ball', 'mock-team-cha', 'Guard', '1'],
  ['Brandon', 'Miller', 'mock-team-cha', 'Wing', '24'],
  ['Miles', 'Bridges', 'mock-team-cha', 'Wing', '0'],
  ['Mark', 'Williams', 'mock-team-cha', 'Big', '5'],
  ['Tre', 'Mann', 'mock-team-cha', 'Guard', '23'],
  ['Tidjane', 'Salaun', 'mock-team-cha', 'Wing', '31'], // Rookie
  ['Grant', 'Williams', 'mock-team-cha', 'Wing', '2'],

  // MIA
  ['Jimmy', 'Butler', 'mock-team-mia', 'Wing', '22'],
  ['Bam', 'Adebayo', 'mock-team-mia', 'Big', '13'],
  ['Tyler', 'Herro', 'mock-team-mia', 'Guard', '14'],
  ['Terry', 'Rozier', 'mock-team-mia', 'Guard', '2'],
  ['Jaime', 'Jaquez Jr.', 'mock-team-mia', 'Wing', '11'],
  ['Kel\'el', 'Ware', 'mock-team-mia', 'Big', '7'], // Rookie
  ['Duncan', 'Robinson', 'mock-team-mia', 'Wing', '55'],
  ['Nikola', 'Jovic', 'mock-team-mia', 'Wing', '5'],

  // ORL
  ['Paolo', 'Banchero', 'mock-team-orl', 'Wing', '5'],
  ['Franz', 'Wagner', 'mock-team-orl', 'Wing', '22'],
  ['Jalen', 'Suggs', 'mock-team-orl', 'Guard', '4'],
  ['Wendell', 'Carter Jr.', 'mock-team-orl', 'Big', '34'],
  ['Kentavious', 'Caldwell-Pope', 'mock-team-orl', 'Guard', '3'],
  ['Cole', 'Anthony', 'mock-team-orl', 'Guard', '50'],
  ['Moritz', 'Wagner', 'mock-team-orl', 'Big', '21'],
  ['Tristan', 'da Silva', 'mock-team-orl', 'Wing', '23'], // Rookie

  // WAS
  ['Jordan', 'Poole', 'mock-team-was', 'Guard', '13'],
  ['Kyle', 'Kuzma', 'mock-team-was', 'Wing', '33'],
  ['Alex', 'Sarr', 'mock-team-was', 'Big', '20'], // #2 Pick Rookie!
  ['Bilal', 'Coulibaly', 'mock-team-was', 'Wing', '0'],
  ['Malcolm', 'Brogdon', 'mock-team-was', 'Guard', '15'],
  ['Bub', 'Carrington', 'mock-team-was', 'Guard', '8'], // Rookie
  ['Jonas', 'Valanciunas', 'mock-team-was', 'Big', '17'],

  // DEN
  ['Nikola', 'Jokic', 'mock-team-den', 'Big', '15'],
  ['Jamal', 'Murray', 'mock-team-den', 'Guard', '27'],
  ['Michael', 'Porter Jr.', 'mock-team-den', 'Wing', '1'],
  ['Aaron', 'Gordon', 'mock-team-den', 'Wing', '50'],
  ['Christian', 'Braun', 'mock-team-den', 'Wing', '0'],
  ['Russell', 'Westbrook', 'mock-team-den', 'Guard', '4'],
  ['Peyton', 'Watson', 'mock-team-den', 'Wing', '8'],
  ['Julian', 'Strawther', 'mock-team-den', 'Guard', '3'],

  // MIN
  ['Anthony', 'Edwards', 'mock-team-min', 'Guard', '5'],
  ['Rudy', 'Gobert', 'mock-team-min', 'Big', '27'],
  ['Julius', 'Randle', 'mock-team-min', 'Wing', '30'],
  ['Jaden', 'McDaniels', 'mock-team-min', 'Wing', '3'],
  ['Naz', 'Reid', 'mock-team-min', 'Big', '11'],
  ['Mike', 'Conley', 'mock-team-min', 'Guard', '10'],
  ['Rob', 'Dillingham', 'mock-team-min', 'Guard', '0'], // Rookie
  ['Donte', 'DiVincenzo', 'mock-team-min', 'Guard', '0'],

  // OKC
  ['Shai', 'Gilgeous-Alexander', 'mock-team-okc', 'Guard', '2'],
  ['Jalen', 'Williams', 'mock-team-okc', 'Wing', '8'],
  ['Chet', 'Holmgren', 'mock-team-okc', 'Big', '7'],
  ['Luguentz', 'Dort', 'mock-team-okc', 'Wing', '5'],
  ['Alex', 'Caruso', 'mock-team-okc', 'Guard', '9'],
  ['Isaiah', 'Hartenstein', 'mock-team-okc', 'Big', '55'],
  ['Cason', 'Wallace', 'mock-team-okc', 'Guard', '22'],
  ['Aaron', 'Wiggins', 'mock-team-okc', 'Wing', '21'],

  // POR
  ['Anfernee', 'Simons', 'mock-team-por', 'Guard', '1'],
  ['Jerami', 'Grant', 'mock-team-por', 'Wing', '9'],
  ['Deandre', 'Ayton', 'mock-team-por', 'Big', '2'],
  ['Scoot', 'Henderson', 'mock-team-por', 'Guard', '00'],
  ['Shaedon', 'Sharpe', 'mock-team-por', 'Guard', '17'],
  ['Donovan', 'Clingan', 'mock-team-por', 'Big', '23'], // Rookie
  ['Deni', 'Avdija', 'mock-team-por', 'Wing', '8'],

  // UTA
  ['Lauri', 'Markkanen', 'mock-team-uta', 'Wing', '23'],
  ['Collin', 'Sexton', 'mock-team-uta', 'Guard', '2'],
  ['Keyonte', 'George', 'mock-team-uta', 'Guard', '3'],
  ['Walker', 'Kessler', 'mock-team-uta', 'Big', '24'],
  ['John', 'Collins', 'mock-team-uta', 'Big', '20'],
  ['Jordan', 'Clarkson', 'mock-team-uta', 'Guard', '00'],
  ['Cody', 'Williams', 'mock-team-uta', 'Wing', '5'], // Rookie

  // GSW
  ['Stephen', 'Curry', 'mock-team-gsw', 'Guard', '30'],
  ['Draymond', 'Green', 'mock-team-gsw', 'Big', '23'],
  ['Jonathan', 'Kuminga', 'mock-team-gsw', 'Wing', '00'],
  ['Andrew', 'Wiggins', 'mock-team-gsw', 'Wing', '22'],
  ['Brandin', 'Podziemski', 'mock-team-gsw', 'Guard', '2'],
  ['Buddy', 'Hield', 'mock-team-gsw', 'Guard', '7'],
  ['De\'Anthony', 'Melton', 'mock-team-gsw', 'Guard', '0'],
  ['Moses', 'Moody', 'mock-team-gsw', 'Guard', '4'],
  ['Trayce', 'Jackson-Davis', 'mock-team-gsw', 'Big', '32'],

  // LAC
  ['James', 'Harden', 'mock-team-lac', 'Guard', '1'],
  ['Kawhi', 'Leonard', 'mock-team-lac', 'Wing', '2'],
  ['Norman', 'Powell', 'mock-team-lac', 'Guard', '24'],
  ['Ivica', 'Zubac', 'mock-team-lac', 'Big', '40'],
  ['Terance', 'Mann', 'mock-team-lac', 'Wing', '14'],
  ['Derrick', 'Jones Jr.', 'mock-team-lac', 'Wing', '55'],
  ['Kris', 'Dunn', 'mock-team-lac', 'Guard', '8'],
  ['Kevin', 'Porter Jr.', 'mock-team-lac', 'Guard', '77'],

  // LAL
  ['LeBron', 'James', 'mock-team-lal', 'Wing', '23'],
  ['Anthony', 'Davis', 'mock-team-lal', 'Big', '3'],
  ['Austin', 'Reaves', 'mock-team-lal', 'Guard', '15'],
  ['D\'Angelo', 'Russell', 'mock-team-lal', 'Guard', '1'],
  ['Rui', 'Hachimura', 'mock-team-lal', 'Wing', '28'],
  ['Dalton', 'Knecht', 'mock-team-lal', 'Wing', '4'], // Rookie
  ['Bronny', 'James', 'mock-team-lal', 'Guard', '9'], // Rookie
  ['Jarred', 'Vanderbilt', 'mock-team-lal', 'Wing', '2'],
  ['Gabe', 'Vincent', 'mock-team-lal', 'Guard', '7'],

  // PHO
  ['Kevin', 'Durant', 'mock-team-pho', 'Wing', '35'],
  ['Devin', 'Booker', 'mock-team-pho', 'Guard', '1'],
  ['Bradley', 'Beal', 'mock-team-pho', 'Guard', '3'],
  ['Jusuf', 'Nurkic', 'mock-team-pho', 'Big', '20'],
  ['Tyus', 'Jones', 'mock-team-pho', 'Guard', '21'],
  ['Grayson', 'Allen', 'mock-team-pho', 'Guard', '8'],
  ['Royce', 'O\'Neale', 'mock-team-pho', 'Wing', '00'],
  ['Ryan', 'Dunn', 'mock-team-pho', 'Wing', '0'], // Rookie

  // SAC
  ['De\'Aaron', 'Fox', 'mock-team-sac', 'Guard', '5'],
  ['Domantas', 'Sabonis', 'mock-team-sac', 'Big', '10'],
  ['DeMar', 'DeRozan', 'mock-team-sac', 'Wing', '10'],
  ['Keegan', 'Murray', 'mock-team-sac', 'Wing', '13'],
  ['Malik', 'Monk', 'mock-team-sac', 'Guard', '0'],
  ['Kevin', 'Huerter', 'mock-team-sac', 'Guard', '9'],
  ['Keon', 'Ellis', 'mock-team-sac', 'Guard', '23'],
  ['Devin', 'Carter', 'mock-team-sac', 'Guard', '22'], // Rookie

  // DAL
  ['Luka', 'Doncic', 'mock-team-dal', 'Guard', '77'],
  ['Kyrie', 'Irving', 'mock-team-dal', 'Guard', '11'],
  ['Klay', 'Thompson', 'mock-team-dal', 'Wing', '31'],
  ['PJ', 'Washington', 'mock-team-dal', 'Wing', '25'],
  ['Dereck', 'Lively II', 'mock-team-dal', 'Big', '2'],
  ['Daniel', 'Gafford', 'mock-team-dal', 'Big', '21'],
  ['Naji', 'Marshall', 'mock-team-dal', 'Wing', '13'],
  ['Quentin', 'Grimes', 'mock-team-dal', 'Guard', '5'],

  // HOU
  ['Alperen', 'Sengun', 'mock-team-hou', 'Big', '28'],
  ['Jalen', 'Green', 'mock-team-hou', 'Guard', '4'],
  ['Fred', 'VanVleet', 'mock-team-hou', 'Guard', '5'],
  ['Jabari', 'Smith Jr.', 'mock-team-hou', 'Big', '10'],
  ['Amen', 'Thompson', 'mock-team-hou', 'Guard', '1'],
  ['Reed', 'Sheppard', 'mock-team-hou', 'Guard', '15'], // #3 Pick Rookie!
  ['Tari', 'Eason', 'mock-team-hou', 'Wing', '17'],
  ['Dillon', 'Brooks', 'mock-team-hou', 'Wing', '9'],
  ['Steven', 'Adams', 'mock-team-hou', 'Big', '12'],

  // MEM
  ['Ja', 'Morant', 'mock-team-mem', 'Guard', '12'],
  ['Desmond', 'Bane', 'mock-team-mem', 'Guard', '22'],
  ['Jaren', 'Jackson Jr.', 'mock-team-mem', 'Big', '13'],
  ['Marcus', 'Smart', 'mock-team-mem', 'Guard', '36'],
  ['Zach', 'Edey', 'mock-team-mem', 'Big', '14'], // Rookie
  ['GG', 'Jackson II', 'mock-team-mem', 'Wing', '45'],
  ['Vince', 'Williams Jr.', 'mock-team-mem', 'Wing', '5'],
  ['Santi', 'Aldama', 'mock-team-mem', 'Wing', '7'],

  // NOP
  ['Zion', 'Williamson', 'mock-team-nop', 'Wing', '1'],
  ['Brandon', 'Ingram', 'mock-team-nop', 'Wing', '14'],
  ['Dejounte', 'Murray', 'mock-team-nop', 'Guard', '5'],
  ['CJ', 'McCollum', 'mock-team-nop', 'Guard', '3'],
  ['Herbert', 'Jones', 'mock-team-nop', 'Wing', '2'],
  ['Trey', 'Murphy III', 'mock-team-nop', 'Wing', '25'],
  ['Yves', 'Missi', 'mock-team-nop', 'Big', '21'], // Rookie
  ['Jordan', 'Hawkins', 'mock-team-nop', 'Guard', '24'],

  // SAS
  ['Victor', 'Wembanyama', 'mock-team-sas', 'Big', '1'],
  ['Chris', 'Paul', 'mock-team-sas', 'Guard', '3'],
  ['Devin', 'Vassell', 'mock-team-sas', 'Wing', '24'],
  ['Jeremy', 'Sochan', 'mock-team-sas', 'Wing', '10'],
  ['Stephon', 'Castle', 'mock-team-sas', 'Guard', '5'], // #4 Pick Rookie!
  ['Harrison', 'Barnes', 'mock-team-sas', 'Wing', '40'],
  ['Keldon', 'Johnson', 'mock-team-sas', 'Wing', '0'],
  ['Tre', 'Jones', 'mock-team-sas', 'Guard', '33'],
];

async function seed() {
  console.log('Fetching teams map...');
  const { data: teams, error: teamErr } = await supabase.from('teams').select('id, provider_team_id');
  if (teamErr || !teams) {
    console.error('Error getting teams:', teamErr);
    process.exit(1);
  }

  const teamMap = new Map(teams.map(t => [t.provider_team_id, t.id]));

  console.log(`Seeding ${EXPANDED_PLAYERS.length} players...`);
  const playerRows = EXPANDED_PLAYERS.map(([first, last, teamProviderId, pos, jersey], idx) => {
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

  const { data: inserted, error: playerErr } = await supabase
    .from('players')
    .upsert(playerRows, { onConflict: 'provider,provider_player_id' })
    .select('id');

  if (playerErr) {
    console.error('Player seed error:', playerErr);
    process.exit(1);
  }

  console.log(`Successfully seeded ${inserted.length} players to Supabase!`);
}

seed();
