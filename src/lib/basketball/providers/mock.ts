// D:\PROYECTOS\drafteados\src\lib\basketball\providers\mock.ts
import { BasketballDataProvider, Player, PlayerQuery, PlayerSeasonStats, Standing, Team } from './interface';

const TEAMS: Team[] = [
  { id: 'mock-team-bos', name: 'Boston Celtics', abbreviation: 'BOS', conference: 'East', division: 'Atlantic', primaryColor: '#007A33', secondaryColor: '#BA9653' },
  { id: 'mock-team-bkn', name: 'Brooklyn Nets', abbreviation: 'BKN', conference: 'East', division: 'Atlantic', primaryColor: '#000000', secondaryColor: '#FFFFFF' },
  { id: 'mock-team-nyk', name: 'New York Knicks', abbreviation: 'NYK', conference: 'East', division: 'Atlantic', primaryColor: '#006BB6', secondaryColor: '#F58426' },
  { id: 'mock-team-phi', name: 'Philadelphia 76ers', abbreviation: 'PHI', conference: 'East', division: 'Atlantic', primaryColor: '#006BB6', secondaryColor: '#ED174C' },
  { id: 'mock-team-tor', name: 'Toronto Raptors', abbreviation: 'TOR', conference: 'East', division: 'Atlantic', primaryColor: '#CE1141', secondaryColor: '#000000' },
  { id: 'mock-team-chi', name: 'Chicago Bulls', abbreviation: 'CHI', conference: 'East', division: 'Central', primaryColor: '#CE1141', secondaryColor: '#000000' },
  { id: 'mock-team-cle', name: 'Cleveland Cavaliers', abbreviation: 'CLE', conference: 'East', division: 'Central', primaryColor: '#860038', secondaryColor: '#041E42' },
  { id: 'mock-team-det', name: 'Detroit Pistons', abbreviation: 'DET', conference: 'East', division: 'Central', primaryColor: '#C8102E', secondaryColor: '#1D42BA' },
  { id: 'mock-team-ind', name: 'Indiana Pacers', abbreviation: 'IND', conference: 'East', division: 'Central', primaryColor: '#002D62', secondaryColor: '#FDBB30' },
  { id: 'mock-team-mil', name: 'Milwaukee Bucks', abbreviation: 'MIL', conference: 'East', division: 'Central', primaryColor: '#00471B', secondaryColor: '#EEE1C6' },
  { id: 'mock-team-atl', name: 'Atlanta Hawks', abbreviation: 'ATL', conference: 'East', division: 'Southeast', primaryColor: '#E03A3E', secondaryColor: '#C1D32F' },
  { id: 'mock-team-cha', name: 'Charlotte Hornets', abbreviation: 'CHA', conference: 'East', division: 'Southeast', primaryColor: '#1D1160', secondaryColor: '#00788C' },
  { id: 'mock-team-mia', name: 'Miami Heat', abbreviation: 'MIA', conference: 'East', division: 'Southeast', primaryColor: '#98002E', secondaryColor: '#F9A01B' },
  { id: 'mock-team-orl', name: 'Orlando Magic', abbreviation: 'ORL', conference: 'East', division: 'Southeast', primaryColor: '#0077C0', secondaryColor: '#C4CED4' },
  { id: 'mock-team-was', name: 'Washington Wizards', abbreviation: 'WAS', conference: 'East', division: 'Southeast', primaryColor: '#002B5C', secondaryColor: '#E31837' },
  { id: 'mock-team-den', name: 'Denver Nuggets', abbreviation: 'DEN', conference: 'West', division: 'Northwest', primaryColor: '#0E2240', secondaryColor: '#FEC524' },
  { id: 'mock-team-min', name: 'Minnesota Timberwolves', abbreviation: 'MIN', conference: 'West', division: 'Northwest', primaryColor: '#0C2340', secondaryColor: '#236192' },
  { id: 'mock-team-okc', name: 'Oklahoma City Thunder', abbreviation: 'OKC', conference: 'West', division: 'Northwest', primaryColor: '#007AC1', secondaryColor: '#EF3B24' },
  { id: 'mock-team-por', name: 'Portland Trail Blazers', abbreviation: 'POR', conference: 'West', division: 'Northwest', primaryColor: '#E03A3E', secondaryColor: '#000000' },
  { id: 'mock-team-uta', name: 'Utah Jazz', abbreviation: 'UTA', conference: 'West', division: 'Northwest', primaryColor: '#002B5C', secondaryColor: '#00471B' },
  { id: 'mock-team-gsw', name: 'Golden State Warriors', abbreviation: 'GSW', conference: 'West', division: 'Pacific', primaryColor: '#1D428A', secondaryColor: '#FFC72C' },
  { id: 'mock-team-lac', name: 'LA Clippers', abbreviation: 'LAC', conference: 'West', division: 'Pacific', primaryColor: '#C8102E', secondaryColor: '#1D428A' },
  { id: 'mock-team-lal', name: 'Los Angeles Lakers', abbreviation: 'LAL', conference: 'West', division: 'Pacific', primaryColor: '#552583', secondaryColor: '#FDB927' },
  { id: 'mock-team-pho', name: 'Phoenix Suns', abbreviation: 'PHO', conference: 'West', division: 'Pacific', primaryColor: '#1D1160', secondaryColor: '#E56020' },
  { id: 'mock-team-sac', name: 'Sacramento Kings', abbreviation: 'SAC', conference: 'West', division: 'Pacific', primaryColor: '#5A2D81', secondaryColor: '#63727A' },
  { id: 'mock-team-dal', name: 'Dallas Mavericks', abbreviation: 'DAL', conference: 'West', division: 'Southwest', primaryColor: '#00538C', secondaryColor: '#002B5E' },
  { id: 'mock-team-hou', name: 'Houston Rockets', abbreviation: 'HOU', conference: 'West', division: 'Southwest', primaryColor: '#CE1141', secondaryColor: '#000000' },
  { id: 'mock-team-mem', name: 'Memphis Grizzlies', abbreviation: 'MEM', conference: 'West', division: 'Southwest', primaryColor: '#5D76A9', secondaryColor: '#12173F' },
  { id: 'mock-team-nop', name: 'New Orleans Pelicans', abbreviation: 'NOP', conference: 'West', division: 'Southwest', primaryColor: '#0C2340', secondaryColor: '#C8102E' },
  { id: 'mock-team-sas', name: 'San Antonio Spurs', abbreviation: 'SAS', conference: 'West', division: 'Southwest', primaryColor: '#C4CED4', secondaryColor: '#000000' },
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
  ['Alex', 'Caruso', 'mock-team-okc', 'Guard', '9'],
  ['Luguentz', 'Dort', 'mock-team-okc', 'Wing', '5'],
  // POR
  ['Anfernee', 'Simons', 'mock-team-por', 'Guard', '1'],
  ['Jerami', 'Grant', 'mock-team-por', 'Wing', '9'],
  ['Deandre', 'Ayton', 'mock-team-por', 'Big', '2'],
  ['Scoot', 'Henderson', 'mock-team-por', 'Guard', '0'],
  ['Shaedon', 'Sharpe', 'mock-team-por', 'Guard', '17'],
  // UTA
  ['Lauri', 'Markkanen', 'mock-team-uta', 'Big', '23'],
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
  ['Kawhi', 'Leonard', 'mock-team-lac', 'Wing', '2'],
  ['James', 'Harden', 'mock-team-lac', 'Guard', '1'],
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
  ['Grayson', 'Allen', 'mock-team-pho', 'Guard', '8'],
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
  ['P.J.', 'Washington', 'mock-team-dal', 'Wing', '25'],
  ['Dereck', 'Lively II', 'mock-team-dal', 'Big', '2'],
  // HOU
  ['Alperen', 'Sengun', 'mock-team-hou', 'Big', '28'],
  ['Jalen', 'Green', 'mock-team-hou', 'Guard', '4'],
  ['Fred', 'VanVleet', 'mock-team-hou', 'Guard', '5'],
  ['Jabari', 'Smith Jr.', 'mock-team-hou', 'Big', '10'],
  ['Dillon', 'Brooks', 'mock-team-hou', 'Wing', '9'],
  // MEM
  ['Ja', 'Morant', 'mock-team-mem', 'Guard', '12'],
  ['Desmond', 'Bane', 'mock-team-mem', 'Guard', '22'],
  ['Jaren', 'Jackson Jr.', 'mock-team-mem', 'Big', '13'],
  ['Marcus', 'Smart', 'mock-team-mem', 'Guard', '36'],
  ['Zach', 'Edey', 'mock-team-mem', 'Big', '14'],
  // NOP
  ['Zion', 'Williamson', 'mock-team-nop', 'Big', '1'],
  ['Brandon', 'Ingram', 'mock-team-nop', 'Wing', '14'],
  ['CJ', 'McCollum', 'mock-team-nop', 'Guard', '3'],
  ['Dejounte', 'Murray', 'mock-team-nop', 'Guard', '5'],
  ['Herbert', 'Jones', 'mock-team-nop', 'Wing', '5'],
  // SAS
  ['Victor', 'Wembanyama', 'mock-team-sas', 'Big', '1'],
  ['Devin', 'Vassell', 'mock-team-sas', 'Guard', '24'],
  ['Chris', 'Paul', 'mock-team-sas', 'Guard', '3'],
  ['Jeremy', 'Sochan', 'mock-team-sas', 'Wing', '10'],
  ['Keldon', 'Johnson', 'mock-team-sas', 'Wing', '3'],
];

const PLAYERS: Player[] = RAW_PLAYERS.map((p, index) => ({
  id: `mock-player-${index + 1}`,
  firstName: p[0],
  lastName: p[1],
  displayName: `${p[0]} ${p[1]}`,
  teamId: p[2],
  position: p[3],
  jerseyNumber: p[4],
}));

export class MockProvider implements BasketballDataProvider {
  async getTeams(): Promise<Team[]> {
    return TEAMS;
  }

  async getPlayers(params?: PlayerQuery): Promise<Player[]> {
    let filtered = [...PLAYERS];

    if (params) {
      if (params.teamId) {
        filtered = filtered.filter(p => p.teamId === params.teamId);
      }
      if (params.position) {
        filtered = filtered.filter(p => p.position === params.position);
      }
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(p => p.displayName.toLowerCase().includes(searchLower));
      }
    }

    return filtered;
  }

  async getStandings(season: string): Promise<Standing[]> {
    // Generate mock standings based on team ID order to have some consistency
    const standings: Standing[] = TEAMS.map((team, index) => {
      // Create some pseudo-random but consistent wins based on index
      const wins = 60 - (index % 15) * 3 - (index > 14 ? 2 : 0); 
      const losses = 82 - wins;
      return {
        teamId: team.id,
        wins,
        losses,
        conferenceRank: 0, // Will be set after sorting
        divisionRank: 0,
      };
    });

    // Split by conference and sort
    const eastStandings = standings.filter(s => TEAMS.find(t => t.id === s.teamId)?.conference === 'East');
    const westStandings = standings.filter(s => TEAMS.find(t => t.id === s.teamId)?.conference === 'West');

    eastStandings.sort((a, b) => b.wins - a.wins);
    westStandings.sort((a, b) => b.wins - a.wins);

    const result = [...eastStandings, ...westStandings];

    // Assign conference ranks
    let eastRank = 1;
    let westRank = 1;
    for (const s of result) {
      const team = TEAMS.find(t => t.id === s.teamId);
      if (team?.conference === 'East') {
        s.conferenceRank = eastRank++;
      } else {
        s.conferenceRank = westRank++;
      }
      // Simplified division rank (just putting 1 for mock)
      s.divisionRank = 1;
    }

    return result;
  }

  async getPlayerSeasonStats(season: string): Promise<PlayerSeasonStats[]> {
    return PLAYERS.map((p, index) => {
      // Top player in each team (index % 5 === 0) gets star stats
      const isStar = index % 5 === 0;
      const isStarter = index % 5 < 3;

      const ppg = isStar ? 25 + (index % 8) : (isStarter ? 15 + (index % 5) : 8 + (index % 5));
      const apg = isStar && p.position === 'Guard' ? 8 + (index % 4) : 2 + (index % 3);
      const rpg = p.position === 'Big' ? 10 + (index % 4) : 4 + (index % 3);
      
      return {
        playerId: p.id,
        gamesPlayed: 70 + (index % 12),
        pointsPerGame: ppg,
        assistsPerGame: apg,
        reboundsPerGame: rpg,
        stealsPerGame: 0.5 + (index % 15) / 10,
        blocksPerGame: p.position === 'Big' ? 1 + (index % 15) / 10 : 0.2 + (index % 5) / 10,
        threePointersMade: p.position === 'Guard' || p.position === 'Wing' ? 100 + (index % 100) : 10 + (index % 30),
        fieldGoalPercentage: 0.400 + (index % 150) / 1000,
      };
    });
  }
}
