// ==================== GAME STATE ====================
let gameState = {
    team: {
        name: 'Ice Dynasty',
        color: '#00d4ff',
        budget: 50000000,
        capSpace: 85000000,
        salaryCap: 85000000
    },
    season: 1,
    week: 1,
    day: 1,
    record: { wins: 0, losses: 0, ot: 0 },
    standings: { rank: 0, points: 0 },
    players: [],
    prospects: [],
    tactics: {
        system: 'balanced',
        forecheck: 'medium',
        passing: 'medium',
        physicality: 'medium',
        shotFreq: 'medium'
    },
    lines: {
        f1: [null, null, null],
        f2: [null, null, null],
        f3: [null, null, null],
        f4: [null, null, null],
        d1: [null, null],
        d2: [null, null],
        d3: [null, null],
        pp1: [null, null, null, null, null],
        pk1: [null, null, null, null, null]
    },
    facilities: {
        arena: 1,
        training: 1,
        medical: 1,
        youth: 1,
        analytics: 1
    },
    league: [],
    news: [],
    transferMarket: [],
    freeAgents: [],
    currentMatch: null,
    difficulty: 'pro'
};

// ==================== PLAYER GENERATOR ====================
const firstNames = ['Alex', 'Jordan', 'Tyler', 'Ryan', 'Brandon', 'Cole', 'Casey', 'Dylan', 'Ethan', 'Garrett', 'Hunter', 'Isaac', 'Jake', 'Kevin', 'Logan', 'Marcus', 'Nathan', 'Oliver', 'Parker', 'Quinn', 'Ryan', 'Sam', 'Taylor', 'Victor', 'William', 'Zach', 'Andrew', 'Ben', 'Chris', 'Dan'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];
const positions = ['C', 'LW', 'RW', 'D', 'G'];
const teams = ['Bruins', 'Maple Leafs', 'Canadiens', 'Rangers', 'Flyers', 'Penguins', 'Capitals', 'Blackhawks', 'Red Wings', 'Stars', 'Flames', 'Oilers', 'Canucks', 'Golden Knights', 'Avalanche', 'Lightning', 'Panthers', 'Hurricanes', 'Blue Jackets', 'Devils', 'Islanders', 'Senators', 'Sabres', 'Coyotes', 'Jets', 'Blues', 'Wild', 'Sharks', 'Kings', 'Ducks'];

function generatePlayer(age = null, minOvr = 50, maxOvr = 99) {
    const pos = positions[Math.floor(Math.random() * (positions.length - 1))]; // No goalies for now
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    if (!age) {
        age = Math.floor(Math.random() * 15) + 18; // 18-32
    }
    
    const baseOvr = Math.floor(Math.random() * (maxOvr - minOvr)) + minOvr;
    
    return {
        id: Date.now() + Math.random(),
        name: name,
        position: pos,
        age: age,
        ovr: baseOvr,
        salary: Math.floor(baseOvr * 100000 * (1 + Math.random() * 0.5)),
        contract: Math.floor(Math.random() * 4) + 1,
        morale: 70 + Math.floor(Math.random() * 30),
        condition: 80 + Math.floor(Math.random() * 20),
        skills: {
            speed: Math.min(99, baseOvr + Math.floor(Math.random() * 20) - 10),
            shooting: Math.min(99, baseOvr + Math.floor(Math.random() * 20) - 10),
            passing: Math.min(99, baseOvr + Math.floor(Math.random() * 20) - 10),
            defense: Math.min(99, baseOvr + Math.floor(Math.random() * 20) - 10),
            physical: Math.min(99, baseOvr + Math.floor(Math.random() * 20) - 10),
            iq: Math.min(99, baseOvr + Math.floor(Math.random() * 20) - 10)
        },
        isGoalie: pos === 'G',
        gamesPlayed: 0,
        goals: 0,
        assists: 0,
        points: 0,
        plusMinus: 0,
        shots: 0,
        pim: 0
    };
}

function generateGoalie(age = null) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    if (!age) {
        age = Math.floor(Math.random() * 12) + 20;
    }
    
    const baseOvr = Math.floor(Math.random() * 30) + 60;
    
    return {
        id: Date.now() + Math.random(),
        name: name,
        position: 'G',
        age: age,
        ovr: baseOvr,
        salary: Math.floor(baseOvr * 120000),
        contract: Math.floor(Math.random() * 4) + 1,
        morale: 70 + Math.floor(Math.random() * 30),
        condition: 80 + Math.floor(Math.random() * 20),
        skills: {
            speed: baseOvr - 10,
            shooting: baseOvr - 20,
            passing: baseOvr - 15,
            defense: baseOvr + 10,
            physical: baseOvr - 5,
            iq: baseOvr + 5
        },
        isGoalie: true,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ot: 0,
        gaa: 0,
        savePct: 0
    };
}

// ==================== INITIALIZATION ====================
function initGame(teamName, teamColor, difficulty) {
    gameState.team.name = teamName;
    gameState.team.color = teamColor;
    gameState.difficulty = difficulty;
    
    // Generate initial roster
    gameState.players = [];
    
    // Generate 6 defensemen
    for (let i = 0; i < 6; i++) {
        gameState.players.push(generatePlayer(22 + Math.floor(Math.random() * 8), 65, 85));
    }
    
    // Generate 2 goalies
    for (let i = 0; i < 2; i++) {
        gameState.players.push(generateGoalie(22 + Math.floor(Math.random() * 8)));
    }
    
    // Generate 18 forwards
    for (let i = 0; i < 18; i++) {
        gameState.players.push(generatePlayer(20 + Math.floor(Math.random() * 10), 60, 82));
    }
    
    // Generate prospects
    gameState.prospects = [];
    for (let i = 0; i < 5; i++) {
        const prospect = generatePlayer(16 + Math.floor(Math.random() * 2), 50, 75);
        prospect.potential = 60 + Math.floor(Math.random() * 35);
        gameState.prospects.push(prospect);
    }
    
    // Generate league teams
    generateLeague();
    
    // Generate transfer market
    generateTransferMarket();
    
    // Generate free agents
    generateFreeAgents();
    
    // Auto-fill lines
    autoFillLines();
    
    // Update UI
    updateAllUI();
    
    // Hide welcome screen
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Save game
    saveGame();
}

function generateLeague() {
    gameState.league = [];
    for (let i = 0; i < 30; i++) {
        const teamName = i === 0 ? gameState.team.name : teams[i % teams.length] + (i > 15 ? ' ' + (Math.floor(i / teams.length) + 1) : '');
        gameState.league.push({
            id: i,
            name: teamName,
            isPlayer: i === 0,
            gp: 0,
            wins: 0,
            losses: 0,
            ot: 0,
            points: 0,
            gf: 0,
            ga: 0
        });
    }
}

function generateTransferMarket() {
    gameState.transferMarket = [];
    for (let i = 0; i < 20; i++) {
        const player = generatePlayer(22 + Math.floor(Math.random() * 8), 65, 90);
        player.value = Math.floor(player.ovr * 500000 * (player.contract / 2));
        gameState.transferMarket.push(player);
    }
}

function generateFreeAgents() {
    gameState.freeAgents = [];
    for (let i = 0; i < 15; i++) {
        const player = generatePlayer(25 + Math.floor(Math.random() * 8), 55, 80);
        player.value = Math.floor(player.ovr * 300000);
        gameState.freeAgents.push(player);
    }
}

// ==================== UI UPDATES ====================
function updateAllUI() {
    // Header
    document.getElementById('headerSeason').textContent = gameState.season;
    document.getElementById('headerWeek').textContent = gameState.week;
    document.getElementById('headerBudget').textContent = '$' + (gameState.team.budget / 1000000).toFixed(0) + 'M';
    document.getElementById('headerCap').textContent = '$' + (gameState.team.capSpace / 1000000).toFixed(0) + 'M';
    document.getElementById('headerLogo').textContent = gameState.team.name.substring(0, 2).toUpperCase();
    document.getElementById('headerLogo').style.background = gameState.team.color;
    
    // Sidebar
    document.getElementById('rosterCount').textContent = gameState.players.length + ' players';
    document.getElementById('teamOvr').textContent = calculateTeamOVR();
    document.getElementById('teamRecord').textContent = gameState.record.wins + '-' + gameState.record.losses + '-' + gameState.record.ot;
    document.getElementById('teamStanding').textContent = getStanding();
    
    // Dashboard
    document.getElementById('currentDate').textContent = 'Day ' + gameState.day + ', Week ' + gameState.week;
    document.getElementById('dashWins').textContent = gameState.record.wins;
    document.getElementById('dashLosses').textContent = gameState.record.losses;
    document.getElementById('dashOTs').textContent = gameState.record.ot;
    document.getElementById('dashPoints').textContent = gameState.record.wins * 2 + gameState.record.ot;
    document.getElementById('nextOpponent').textContent = 'vs ' + getNextOpponent();
    document.getElementById('nextMatchTime').textContent = 'Season Week ' + gameState.week;
    document.getElementById('injuredCount').textContent = getInjuredCount();
    document.getElementById('tiredCount').textContent = getTiredCount();
    document.getElementById('moraleBar').style.width = getAverageMorale() + '%';
    
    // Status bar
    document.getElementById('statusGameDay').textContent = 'Day ' + gameState.day;
    document.getElementById('statusNextMatch').textContent = 'vs ' + getNextOpponent();
    document.getElementById('statusRecord').textContent = gameState.record.wins + '-' + gameState.record.losses + '-' + gameState.record.ot;
    
    // Render pages
    renderRoster();
    renderLines();
    renderTransferMarket();
    renderTraining();
    renderAcademy();
    renderFacilities();
    renderLeague();
    renderNews();
}

function calculateTeamOVR() {
    if (gameState.players.length === 0) return 0;
    const total = gameState.players.reduce((sum, p) => sum + p.ovr, 0);
    return Math.floor(total / gameState.players.length);
}

function getStanding() {
    return '#' + (gameState.standings.rank || '-');
}

function getNextOpponent() {
    const opponentIndex = (gameState.week - 1) % 29 + 1;
    return gameState.league[opponentIndex]?.name || 'Unknown';
}

function getInjuredCount() {
    return gameState.players.filter(p => p.condition < 50).length;
}

function getTiredCount() {
    return gameState.players.filter(p => p.condition < 70 && p.condition >= 50).length;
}

function getAverageMorale() {
    if (gameState.players.length === 0) return 75;
    const total = gameState.players.reduce((sum, p) => sum + p.morale, 0);
    return Math.floor(total / gameState.players.length);
}

// ==================== ROSTER ====================
function renderRoster() {
    const rosterList = document.getElementById('rosterList');
    const filter = document.getElementById('rosterFilter')?.value || 'all';
    
    let players = [...gameState.players];
    if (filter !== 'all') {
        if (filter === 'F') {
            players = players.filter(p => ['C', 'LW', 'RW'].includes(p.position));
        } else if (filter === 'D') {
            players = players.filter(p => p.position === 'D');
        } else if (filter === 'G') {
            players = players.filter(p => p.position === 'G');
        }
    }
    
    rosterList.innerHTML = players.map(player => `
        <div class="player-card" onclick="showPlayerModal(${player.id})">
            <div class="player-avatar">${player.name.split(' ').map(n => n[0]).join('')}</div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position} | ${player.age} years</div>
            </div>
            <div class="player-stats">
                <div class="player-stat">
                    <div class="player-stat-value ${getRatingClass(player.ovr)}">${player.ovr}</div>
                    <div class="player-stat-label">OVR</div>
                </div>
                <div class="player-stat">
                    <div class="player-stat-value">$${Math.floor(player.salary / 100000)}K</div>
                    <div class="player-stat-label">Salary</div>
                </div>
                <div class="player-stat">
                    <div class="player-stat-value">${player.contract}y</div>
                    <div class="player-stat-label">Contract</div>
                </div>
            </div>
        </div>
    `).join('');
}

function getRatingClass(ovr) {
    if (ovr >= 80) return 'rating-high';
    if (ovr >= 70) return 'rating-mid';
    return 'rating-low';
}

function filterRoster() {
    renderRoster();
}

function sortRoster(by) {
    let players = [...gameState.players];
    if (by === 'ovr') {
        players.sort((a, b) => b.ovr - a.ovr);
    } else if (by === 'salary') {
        players.sort((a, b) => b.salary - a.salary);
    }
    gameState.players = players;
    renderRoster();
}

function showPlayerModal(playerId) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;
    
    document.getElementById('modalPlayerName').textContent = player.name;
    document.getElementById('modalPlayerContent').innerHTML = `
        <div class="grid-2 mb-16">
            <div>
                <div class="text-silver">Position</div>
                <div class="text-ice">${player.position}</div>
            </div>
            <div>
                <div class="text-silver">Age</div>
                <div class="text-ice">${player.age}</div>
            </div>
            <div>
                <div class="text-silver">Overall</div>
                <div class="stat-value ${getRatingClass(player.ovr)}">${player.ovr}</div>
            </div>
            <div>
                <div class="text-silver">Salary</div>
                <div class="text-gold">$${(player.salary / 1000000).toFixed(1)}M</div>
            </div>
        </div>
        <div class="skill-bars">
            <div class="skill-bar">
                <span class="skill-label">SPE</span>
                <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.speed}%"></div></div>
            </div>
            <div class="skill-bar">
                <span class="skill-label">SHO</span>
                <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.shooting}%"></div></div>
            </div>
            <div class="skill-bar">
                <span class="skill-label">PAS</span>
                <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.passing}%"></div></div>
            </div>
            <div class="skill-bar">
                <span class="skill-label">DEF</span>
                <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.defense}%"></div></div>
            </div>
            <div class="skill-bar">
                <span class="skill-label">PHY</span>
                <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.physical}%"></div></div>
            </div>
            <div class="skill-bar">
                <span class="skill-label">IQ</span>
                <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.iq}%"></div></div>
            </div>
        </div>
        <div class="grid-2 mt-16">
            <div>
                <div class="text-silver">Contract</div>
                <div class="text-ice">${player.contract} years</div>
            </div>
            <div>
                <div class="text-silver">Morale</div>
                <div class="progress-bar mt-8"><div class="progress-fill" style="width: ${player.morale}%"></div></div>
            </div>
        </div>
        <div class="mt-16 flex gap-8">
            <button class="btn btn-danger btn-small" onclick="releasePlayer(${player.id})">Release</button>
        </div>
    `;
    document.getElementById('playerModal').classList.add('active');
}

function closeModal() {
    document.getElementById('playerModal').classList.remove('active');
}

function releasePlayer(playerId) {
    const index = gameState.players.findIndex(p => p.id === playerId);
    if (index > -1) {
        gameState.players.splice(index, 1);
        closeModal();
        updateAllUI();
        showNotification('Player released', 'success');
    }
}

// ==================== LINES ====================
function renderLines() {
    // Forward lines
    const forwardLinesHtml = [1, 2, 3, 4].map(lineNum => {
        const line = gameState.lines['f' + lineNum] || [];
        return `
            <div class="line-editor">
                <div class="line-title">Line ${lineNum}</div>
                <div class="line-players">
                    ${[0, 1, 2].map(pos => {
                        const player = line[pos] ? gameState.players.find(p => p.id === line[pos]) : null;
                        return `
                            <div class="line-player-slot ${player ? 'filled' : ''}" onclick="editLineSlot('f${lineNum}', ${pos})">
                                ${player ? `
                                    <div class="player-name">${player.name.split(' ')[0]}</div>
                                    <div class="player-pos">${player.position}</div>
                                ` : '<div class="text-silver">+</div>'}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('forwardLines').innerHTML = forwardLinesHtml;
    
    // Defense lines
    const defenseLinesHtml = [1, 2, 3].map(pairNum => {
        const pair = gameState.lines['d' + pairNum] || [];
        return `
            <div class="line-editor">
                <div class="line-title">Pair ${pairNum}</div>
                <div class="line-players">
                    ${[0, 1].map(pos => {
                        const player = pair[pos] ? gameState.players.find(p => p.id === pair[pos]) : null;
                        return `
                            <div class="line-player-slot ${player ? 'filled' : ''}" onclick="editLineSlot('d${pairNum}', ${pos})">
                                ${player ? `
                                    <div class="player-name">${player.name.split(' ')[0]}</div>
                                    <div class="player-pos">${player.position}</div>
                                ` : '<div class="text-silver">+</div>'}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('defenseLines').innerHTML = defenseLinesHtml;
    
    // Special teams
    const pp1 = gameState.lines.pp1 || [];
    const pk1 = gameState.lines.pk1 || [];
    
    document.getElementById('pp1').innerHTML = [0, 1, 2, 3, 4].map(pos => {
        const player = pp1[pos] ? gameState.players.find(p => p.id === pp1[pos]) : null;
        return `
            <div class="line-player-slot ${player ? 'filled' : ''}" onclick="editLineSlot('pp1', ${pos})">
                ${player ? `
                    <div class="player-name">${player.name.split(' ')[0]}</div>
                    <div class="player-pos">${player.position}</div>
                ` : '<div class="text-silver">+</div>'}
            </div>
        `;
    }).join('');
    
    document.getElementById('pk1').innerHTML = [0, 1, 2, 3, 4].map(pos => {
        const player = pk1[pos] ? gameState.players.find(p => p.id === pk1[pos]) : null;
        return `
            <div class="line-player-slot ${player ? 'filled' : ''}" onclick="editLineSlot('pk1', ${pos})">
                ${player ? `
                    <div class="player-name">${player.name.split(' ')[0]}</div>
                    <div class="player-pos">${player.position}</div>
                ` : '<div class="text-silver">+</div>'}
            </div>
        `;
    }).join('');
}

function editLineSlot(lineKey, pos) {
    // Simple player selection - in a full game, this would open a modal
    const forwards = gameState.players.filter(p => ['C', 'LW', 'RW'].includes(p.position));
    const defense = gameState.players.filter(p => p.position === 'D');
    const goalies = gameState.players.filter(p => p.position === 'G');
    
    let availablePlayers = [];
    if (lineKey.startsWith('f')) {
        availablePlayers = [...forwards, ...defense];
    } else if (lineKey.startsWith('d')) {
        availablePlayers = defense;
    } else if (lineKey === 'pp1') {
        availablePlayers = [...forwards, ...defense];
    } else if (lineKey === 'pk1') {
        availablePlayers = [...forwards.slice(0, 8), ...defense];
    }
    
    // For now, just cycle through available players
    const currentLine = gameState.lines[lineKey];
    const currentId = currentLine ? currentLine[pos] : null;
    const currentIndex = currentId ? availablePlayers.findIndex(p => p.id === currentId) : -1;
    const nextIndex = (currentIndex + 1) % availablePlayers.length;
    
    if (!gameState.lines[lineKey]) {
        gameState.lines[lineKey] = [];
    }
    gameState.lines[lineKey][pos] = availablePlayers[nextIndex]?.id || null;
    
    renderLines();
}

function autoFillLines() {
    const forwards = gameState.players.filter(p => ['C', 'LW', 'RW'].includes(p.position)).sort((a, b) => b.ovr - a.ovr);
    const defense = gameState.players.filter(p => p.position === 'D').sort((a, b) => b.ovr - a.ovr);
    
    // Fill forward lines
    for (let i = 0; i < 4; i++) {
        gameState.lines['f' + (i + 1)] = [
            forwards[i * 3]?.id || null,
            forwards[i * 3 + 1]?.id || null,
            forwards[i * 3 + 2]?.id || null
        ];
    }
    
    // Fill defense pairs
    for (let i = 0; i < 3; i++) {
        gameState.lines['d' + (i + 1)] = [
            defense[i * 2]?.id || null,
            defense[i * 2 + 1]?.id || null
        ];
    }
    
    // Fill power play
    gameState.lines.pp1 = [
        forwards[0]?.id, forwards[1]?.id, forwards[2]?.id,
        defense[0]?.id, defense[1]?.id
    ].filter(Boolean);
    
    // Fill penalty kill
    gameState.lines.pk1 = [
        forwards[3]?.id, forwards[4]?.id,
        defense[2]?.id, defense[3]?.id
    ].filter(Boolean);
    
    renderLines();
    showNotification('Lines auto-filled', 'success');
}

// ==================== TACTICS ====================
function selectTactic(element) {
    const tacticType = element.dataset.tactic;
    const value = element.value;
    
    // Update game state
    gameState.tactics[tacticType] = value;
    
    // Update UI
    document.querySelectorAll(`[data-tactic="${tacticType}"]`).forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
}

// ==================== MATCH ====================
function playMatch() {
    const homeTeam = gameState.team;
    const awayTeam = gameState.league[(gameState.week - 1) % 29 + 1];
    
    // Get team ratings with player-based calculation
    const homeRating = calculateTeamRating();
    const awayRating = 65 + Math.floor(Math.random() * 20);
    
    // Apply difficulty modifiers
    const difficultyMod = gameState.difficulty === 'easy' ? 1.2 : gameState.difficulty === 'hard' ? 0.8 : 1.0;
    
    // Match state with advanced tracking
    let matchState = {
        homeScore: 0,
        awayScore: 0,
        homeShotsOnGoal: 0,
        awayShotsOnGoal: 0,
        homeShootingPct: 0,
        awayShootingPct: 0,
        homePIM: 0,
        awayPIM: 0,
        homePPGoals: 0,
        awayPPGoals: 0,
        homePKGoals: 0,
        awayPKGoals: 0,
        momentum: 50,
        homeLineup: getActiveLineup(true),
        awayLineup: getActiveLineup(false),
        commentary: [],
        playerStats: {}
    };
    
    // Initialize player stats tracking
    matchState.playerStats = gameState.players.reduce((acc, p) => {
        acc[p.id] = { goals: 0, assists: 0, shots: 0, pim: 0, points: 0 };
        return acc;
    }, {});
    
    const periods = ['1st', '2nd', '3rd'];
    
    // ===== SIMULATE 3 PERIODS =====
    for (let p = 0; p < 3; p++) {
        matchState.commentary.push(`\n⚡ ${periods[p]} Period starts...`);
        
        // Period-specific factors
        const baseChances = 4 + Math.floor(Math.random() * 3);
        const periodMomentum = 40 + Math.floor(Math.random() * 20);
        
        for (let c = 0; c < baseChances; c++) {
            // Momentum affects possession
            const isHome = Math.random() + (matchState.momentum - 50) / 200 > 0.5;
            
            const attacker = isHome ? homeRating : awayRating;
            const defender = isHome ? awayRating : homeRating;
            const tactics = isHome ? gameState.tactics : null;
            
            // Calculate shot factors
            const tacticsBonus = tactics ? getTacticsBonus(tactics, 'shot') : 0;
            const playerQuality = tactics ? getLineupQuality(matchState.homeLineup, 'shooting') / 100 : 0.5;
            
            // Generate shot
            const baseChance = 0.35;
            const shotChance = (baseChance + (attacker - defender) / 500 + tacticsBonus) * difficultyMod * playerQuality;
            
            if (Math.random() < shotChance) {
                // SHOT ATTEMPT
                if (isHome) matchState.homeShotsOnGoal++;
                else matchState.awayShotsOnGoal++;
                
                // Goal calculation (more sophisticated)
                const shootingSkill = playerQuality; // 0-1
                const goalieDefense = (defender - attacker) / 500 * 0.5 + 0.5; // 0-1
                const goalChance = shootingSkill * (1 - goalieDefense) * (0.12 + tacticsBonus * 2);
                
                if (Math.random() < goalChance) {
                    // GOAL!
                    if (isHome) matchState.homeScore++;
                    else matchState.awayScore++;
                    
                    const player = getRandomActivePlayer(matchState.homeLineup);
                    const scorer = isHome && player ? player.name : (isHome ? 'Scorer' : `${awayTeam.name} Forward`);
                    
                    matchState.commentary.push(`🎯 GOAL! ${isHome ? homeTeam.name : awayTeam.name} scores! ${scorer}!`);
                    
                    // Update player stats
                    if (isHome && player) {
                        matchState.playerStats[player.id].goals++;
                        matchState.playerStats[player.id].points++;
                    }
                } else {
                    // Shot blocked/saved
                    const blockChance = defender > attacker ? 0.4 : 0.2;
                    if (Math.random() < blockChance) {
                        matchState.commentary.push(`🛡️ Shot blocked!`);
                    }
                }
            }
            
            // Momentum shifts
            if (isHome && matchState.homeScore > matchState.awayScore) {
                matchState.momentum = Math.min(100, matchState.momentum + 2);
            } else if (!isHome && matchState.awayScore > matchState.homeScore) {
                matchState.momentum = Math.max(0, matchState.momentum - 2);
            }
        }
        
        // Period penalties/physicality
        const physicalityFactor = gameState.tactics.physicality === 'high' ? 1.5 : gameState.tactics.physicality === 'low' ? 0.5 : 1.0;
        const penalties = Math.floor(Math.random() * 3 * physicalityFactor);
        
        for (let pen = 0; pen < penalties; pen++) {
            const isPenaltyHome = Math.random() > 0.5;
            const penaltyTypes = ['Tripping', 'High Sticking', 'Roughing', 'Hooking', 'Interference'];
            const penType = penaltyTypes[Math.floor(Math.random() * penaltyTypes.length)];
            
            if (isPenaltyHome) matchState.homePIM += 2;
            else matchState.awayPIM += 2;
            
            matchState.commentary.push(`📋 ${isPenaltyHome ? homeTeam.name : awayTeam.name} - ${penType}`);
        }
        
        matchState.commentary.push(`\n${periods[p]} Period ends: ${matchState.homeScore} - ${matchState.awayScore}`);
    }
    
    // ===== CALCULATE FINAL STATS =====
    matchState.homeShootingPct = matchState.homeShotsOnGoal > 0 ? 
        Math.round((matchState.homeScore / matchState.homeShotsOnGoal) * 100) : 0;
    matchState.awayShootingPct = matchState.awayShotsOnGoal > 0 ? 
        Math.round((matchState.awayScore / matchState.awayShotsOnGoal) * 100) : 0;
    
    // Update match display with all stats
    document.getElementById('matchScore').textContent = `${matchState.homeScore} - ${matchState.awayScore}`;
    document.getElementById('matchPeriod').textContent = 'Final';
    document.getElementById('matchTime').textContent = '20:00';
    document.getElementById('homeShots').textContent = matchState.homeShotsOnGoal;
    document.getElementById('awayShots').textContent = matchState.awayShotsOnGoal;
    document.getElementById('gameMinute').textContent = '60:00';
    
    // Additional stats display if elements exist
    if (document.getElementById('homePIM')) document.getElementById('homePIM').textContent = matchState.homePIM;
    if (document.getElementById('awayPIM')) document.getElementById('awayPIM').textContent = matchState.awayPIM;
    if (document.getElementById('homeShootPct')) document.getElementById('homeShootPct').textContent = matchState.homeShootingPct + '%';
    if (document.getElementById('awayShootPct')) document.getElementById('awayShootPct').textContent = matchState.awayShootingPct + '%';
    
    // Commentary display
    document.getElementById('matchCommentary').innerHTML = matchState.commentary.map(c => 
        `<div class="commentary-item">${c}</div>`
    ).join('');
    
    // ===== UPDATE RECORD & NEWS =====
    if (matchState.homeScore > matchState.awayScore) {
        gameState.record.wins++;
        addNews('🏆 Victory!', `${homeTeam.name} defeats ${awayTeam.name} ${matchState.homeScore}-${matchState.awayScore}! Shots: ${matchState.homeShotsOnGoal}-${matchState.awayShotsOnGoal}`);
    } else if (matchState.homeScore < matchState.awayScore) {
        gameState.record.losses++;
        addNews('❌ Defeat', `${awayTeam.name} beats ${homeTeam.name} ${matchState.awayScore}-${matchState.homeScore}. Shots: ${matchState.awayShotsOnGoal}-${matchState.homeShotsOnGoal}`);
    } else {
        gameState.record.ot++;
        addNews('⚠️ Overtime Loss', `${homeTeam.name} falls in overtime ${matchState.awayScore}-${matchState.homeScore}.`);
    }
    
    // ===== UPDATE PLAYER STATS =====
    gameState.players.forEach(p => {
        const stats = matchState.playerStats[p.id];
        p.gamesPlayed++;
        p.goals += stats.goals;
        p.assists += (stats.points - stats.goals);
        p.points += stats.points;
        p.shots += stats.shots;
        p.pim += stats.pim;
        
        // Condition effects
        const conditionLoss = 3 + Math.floor(Math.random() * 5);
        p.condition = Math.max(40, p.condition - conditionLoss);
        
        // Morale effects
        if (matchState.homeScore > matchState.awayScore) {
            p.morale = Math.min(100, p.morale + 3);
        } else if (matchState.homeScore < matchState.awayScore) {
            p.morale = Math.max(30, p.morale - 5);
        }
    });
    
    updateAllUI();
    showNotification('Match complete!', 'success');
}

// Helper functions for advanced match simulation
function calculateTeamRating() {
    if (gameState.players.length === 0) return 75;
    
    // Weight by player condition and morale
    let totalRating = 0;
    gameState.players.forEach(p => {
        const conditionBonus = (p.condition - 50) / 100; // -0.5 to 0.5
        const moraleBonus = (p.morale - 75) / 100; // -0.75 to 0.25
        totalRating += p.ovr * (1 + conditionBonus * 0.3 + moraleBonus * 0.2);
    });
    
    return Math.floor(totalRating / gameState.players.length);
}

function getTacticsBonus(tactics, stat) {
    let bonus = 0;
    if (stat === 'shot') {
        if (tactics.shotFreq === 'high') bonus += 0.1;
        if (tactics.passing === 'high') bonus += 0.05;
    }
    return bonus;
}

function getActiveLineup(isHome) {
    const lineKeys = isHome ? ['f1', 'f2', 'f3', 'd1', 'd2'] : null;
    if (!lineKeys) return [];
    
    let players = [];
    lineKeys.forEach(key => {
        if (gameState.lines[key]) {
            gameState.lines[key].forEach(pid => {
                const p = gameState.players.find(x => x.id === pid);
                if (p) players.push(p);
            });
        }
    });
    return players;
}

function getRandomActivePlayer(lineup) {
    const forwards = lineup.filter(p => ['C', 'LW', 'RW'].includes(p.position));
    return forwards.length > 0 ? forwards[Math.floor(Math.random() * forwards.length)] : null;
}

function getLineupQuality(lineup, stat = 'ovr') {
    if (lineup.length === 0) return 70;
    let total = 0;
    lineup.forEach(p => {
        if (stat === 'ovr') total += p.ovr;
        else if (stat === 'shooting') total += p.skills.shooting;
        else if (stat === 'defense') total += p.skills.defense;
    });
    return total / lineup.length;
}

function simMatch() {
    playMatch();
}

function showHighlights() {
    showNotification('Highlights coming in v2.0', 'warning');
}

// ==================== TRANSFER MARKET ====================
function renderTransferMarket() {
    document.getElementById('transferBudget').textContent = '$' + (gameState.team.budget / 1000000).toFixed(0) + 'M';
    
    const transferList = document.getElementById('transferList');
    transferList.innerHTML = gameState.transferMarket.map(player => `
        <div class="transfer-item">
            <div class="transfer-player">
                <div class="player-avatar" style="width: 40px; height: 40px; font-size: 0.9rem;">${player.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                    <div class="player-name">${player.name}</div>
                    <div class="text-silver">${player.position} | ${player.age}yo | OVR ${player.ovr}</div>
                </div>
            </div>
            <div class="flex gap-8 flex-center">
                <div class="transfer-value">$${(player.value / 1000000).toFixed(1)}M</div>
                <button class="btn btn-primary btn-small" onclick="bidPlayer(${player.id})">Bid</button>
            </div>
        </div>
    `).join('');
}

function showTransferTab(tab) {
    const transferList = document.getElementById('transferList');
    
    if (tab === 'available') {
        transferList.innerHTML = gameState.transferMarket.map(player => `
            <div class="transfer-item">
                <div class="transfer-player">
                    <div class="player-avatar" style="width: 40px; height: 40px; font-size: 0.9rem;">${player.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                        <div class="player-name">${player.name}</div>
                        <div class="text-silver">${player.position} | ${player.age}yo | OVR ${player.ovr}</div>
                    </div>
                </div>
                <div class="flex gap-8 flex-center">
                    <div class="transfer-value">$${(player.value / 1000000).toFixed(1)}M</div>
                    <button class="btn btn-primary btn-small" onclick="bidPlayer(${player.id})">Bid</button>
                </div>
            </div>
        `).join('');
    } else if (tab === 'freeagents') {
        transferList.innerHTML = gameState.freeAgents.map(player => `
            <div class="transfer-item">
                <div class="transfer-player">
                    <div class="player-avatar" style="width: 40px; height: 40px; font-size: 0.9rem;">${player.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                        <div class="player-name">${player.name}</div>
                        <div class="text-silver">${player.position} | ${player.age}yo | OVR ${player.ovr}</div>
                    </div>
                </div>
                <div class="flex gap-8 flex-center">
                    <div class="transfer-value">$${(player.value / 1000000).toFixed(1)}M</div>
                    <button class="btn btn-primary btn-small" onclick="signFreeAgent(${player.id})">Sign</button>
                </div>
            </div>
        `).join('');
    } else if (tab === 'mybids') {
        transferList.innerHTML = '<div class="text-center text-silver">No active bids</div>';
    }
}

// Transfer negotiation variables
let currentTransferPlayer = null;
let selectedContractYears = 1;
let selectedSalary = 2000000;

function bidPlayer(playerId) {
    const player = gameState.transferMarket.find(p => p.id === playerId);
    if (!player) return;
    
    // Open negotiation modal
    openTransferNegotiation(player, 'transfer');
}

function signFreeAgent(playerId) {
    const player = gameState.freeAgents.find(p => p.id === playerId);
    if (!player) return;
    
    // Open negotiation modal
    openTransferNegotiation(player, 'freeagent');
}

function openTransferNegotiation(player, type) {
    currentTransferPlayer = { ...player, type: type };
    selectedContractYears = 1;
    selectedSalary = player.salary || 2000000;
    
    document.getElementById('transferPlayerName').textContent = player.name;
    document.getElementById('transferPos').textContent = player.position;
    document.getElementById('transferAge').textContent = player.age;
    document.getElementById('transferOvr').textContent = player.ovr;
    document.getElementById('transferTeam').textContent = type === 'transfer' ? 'Transfer Market' : 'Free Agent';
    
    document.getElementById('selectedYears').textContent = selectedContractYears;
    document.getElementById('salarySlider').value = selectedSalary;
    
    updateSalaryDisplay();
    document.getElementById('transferModal').classList.add('active');
}

function setContractYears(years) {
    selectedContractYears = years;
    document.getElementById('selectedYears').textContent = years;
    updateSalaryDisplay();
}

function updateSalaryDisplay() {
    const slider = document.getElementById('salarySlider');
    selectedSalary = parseInt(slider.value);
    
    const annualSalary = (selectedSalary / 1000000).toFixed(1);
    const totalCost = (selectedSalary * selectedContractYears / 1000000).toFixed(1);
    
    document.getElementById('salaryDisplay').textContent = '$' + annualSalary + 'M';
    document.getElementById('totalCost').textContent = '$' + totalCost + 'M';
    
    const remainingBudget = (gameState.team.budget - (selectedSalary * selectedContractYears)) / 1000000;
    document.getElementById('remainingBudget').textContent = '$' + Math.max(0, remainingBudget).toFixed(1) + 'M';
    document.getElementById('currentCapSpace').textContent = '$' + (gameState.team.capSpace / 1000000).toFixed(1) + 'M';
}

function confirmTransfer() {
    if (!currentTransferPlayer) return;
    
    const totalCost = selectedSalary * selectedContractYears;
    
    if (totalCost > gameState.team.budget) {
        showNotification('Insufficient budget!', 'error');
        return;
    }
    
    const player = currentTransferPlayer;
    player.salary = selectedSalary;
    player.contract = selectedContractYears;
    
    // Deduct from budget
    gameState.team.budget -= totalCost;
    
    // Add player to roster
    gameState.players.push(player);
    
    // Remove from transfer market or free agents
    if (player.type === 'transfer') {
        const index = gameState.transferMarket.findIndex(p => p.id === player.id);
        if (index > -1) gameState.transferMarket.splice(index, 1);
        addNews('Transfer', `Signed ${player.name} for $${(totalCost / 1000000).toFixed(1)}M (${selectedContractYears}Y)!`);
    } else {
        const index = gameState.freeAgents.findIndex(p => p.id === player.id);
        if (index > -1) gameState.freeAgents.splice(index, 1);
        addNews('Free Agent', `${player.name} signed for $${(selectedSalary / 1000000).toFixed(1)}M/year (${selectedContractYears}Y)!`);
    }
    
    closeTransferModal();
    updateAllUI();
    showNotification(`${player.name} signed! Contract: ${selectedContractYears}Y, $${(selectedSalary / 1000000).toFixed(1)}M/year`, 'success');
}

function closeTransferModal() {
    document.getElementById('transferModal').classList.remove('active');
    currentTransferPlayer = null;
}

// ==================== TRAINING ====================
function renderTraining() {
    const trainingList = document.getElementById('trainingList');
    
    // Show players that can develop
    const developablePlayers = gameState.players
        .filter(p => p.age < 30)
        .slice(0, 10);
    
    trainingList.innerHTML = developablePlayers.map(player => `
        <div class="training-slot">
            <div class="training-header">
                <div>
                    <div class="player-name">${player.name}</div>
                    <div class="text-silver">${player.position} | Age ${player.age}</div>
                </div>
                <div class="text-ice">OVR ${player.ovr}</div>
            </div>
            <div class="skill-bars">
                <div class="skill-bar">
                    <span class="skill-label">SPE</span>
                    <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.speed}%"></div></div>
                </div>
                <div class="skill-bar">
                    <span class="skill-label">SHO</span>
                    <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.shooting}%"></div></div>
                </div>
                <div class="skill-bar">
                    <span class="skill-label">PAS</span>
                    <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.passing}%"></div></div>
                </div>
                <div class="skill-bar">
                    <span class="skill-label">DEF</span>
                    <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.defense}%"></div></div>
                </div>
                <div class="skill-bar">
                    <span class="skill-label">PHY</span>
                    <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.physical}%"></div></div>
                </div>
                <div class="skill-bar">
                    <span class="skill-label">IQ</span>
                    <div class="skill-track"><div class="skill-fill" style="width: ${player.skills.iq}%"></div></div>
                </div>
            </div>
        </div>
    `).join('');
}

function runTraining() {
    const developmentRate = gameState.facilities.training;
    
    gameState.players.forEach(player => {
        if (player.age < 28 && Math.random() > 0.3) {
            // Random attribute development
            const attrs = ['speed', 'shooting', 'passing', 'defense', 'physical', 'iq'];
            const attr = attrs[Math.floor(Math.random() * attrs.length)];
            const gain = Math.floor(Math.random() * developmentRate);
            
            if (player.skills[attr] < 99) {
                player.skills[attr] = Math.min(99, player.skills[attr] + gain);
                
                // Update overall
                const total = Object.values(player.skills).reduce((a, b) => a + b, 0);
                player.ovr = Math.floor(total / 6);
            }
        }
        
        // Recover condition
        player.condition = Math.min(100, player.condition + 5);
    });
    
    addNews('Training', 'Team completed training session. Players improved!');
    updateAllUI();
    showNotification('Training complete!', 'success');
}

// ==================== ACADEMY ====================
function renderAcademy() {
    document.getElementById('academyLevel').textContent = gameState.facilities.youth;
    document.getElementById('academyQuality').style.width = (gameState.facilities.youth * 10) + '%';
    document.getElementById('prospectCount').textContent = gameState.prospects.length;
    
    const academyList = document.getElementById('academyList');
    academyList.innerHTML = gameState.prospects.map(prospect => `
        <div class="prospect-card">
            <div class="player-avatar" style="width: 50px; height: 50px; font-size: 1.2rem;">${prospect.name.split(' ').map(n => n[0]).join('')}</div>
            <div class="player-info">
                <div class="player-name">${prospect.name}</div>
                <div class="text-silver">${prospect.position} | Age ${prospect.age}</div>
            </div>
            <div class="text-center">
                <div class="prospect-potential">${prospect.potential}</div>
                <div class="text-silver">Potential</div>
            </div>
            <div class="text-center">
                <div class="stat-value ${getRatingClass(prospect.ovr)}">${prospect.ovr}</div>
                <div class="text-silver">OVR</div>
            </div>
            <button class="btn btn-primary btn-small" onclick="promoteProspect(${prospect.id})">Promote</button>
        </div>
    `).join('');
}

function generateProspects() {
    const count = 2 + Math.floor(Math.random() * 3);
    const newProspects = [];
    
    for (let i = 0; i < count; i++) {
        if (gameState.prospects.length >= 15) break;
        
        const prospect = generatePlayer(16 + Math.floor(Math.random() * 2), 45, 70);
        prospect.potential = 55 + Math.floor(Math.random() * 40);
        prospect.age = 16 + Math.floor(Math.random() * 2);
        gameState.prospects.push(prospect);
    }
    
    renderAcademy();
    showNotification(`Generated ${count} new prospects!`, 'success');
}

function promoteProspect(prospectId) {
    const prospectIndex = gameState.prospects.findIndex(p => p.id === prospectId);
    if (prospectIndex === -1) return;
    
    const prospect = gameState.prospects[prospectIndex];
    
    if (gameState.players.length >= 30) {
        showNotification('Roster full! Release a player first.', 'error');
        return;
    }
    
    gameState.players.push(prospect);
    gameState.prospects.splice(prospectIndex, 1);
    
    addNews('Promotion', `${prospect.name} promoted to senior team!`);
    updateAllUI();
    showNotification(`${prospect.name} promoted!`, 'success');
}

// ==================== FACILITIES ====================
function renderFacilities() {
    const f = gameState.facilities;
    
    document.getElementById('arenaLevel').textContent = f.arena;
    document.getElementById('arenaCapacity').textContent = (15000 + f.arena * 5000).toLocaleString();
    document.getElementById('ticketPrice').textContent = '$' + (50 + f.arena * 10);
    document.getElementById('revenuePerGame').textContent = '$' + Math.floor((500 + f.arena * 100) / 1000) + 'K';
    
    document.getElementById('trainingLevel').textContent = 'Level ' + f.training;
    document.getElementById('medicalLevel').textContent = 'Level ' + f.medical;
    document.getElementById('youthLevel').textContent = 'Level ' + f.youth;
    document.getElementById('analyticsLevel').textContent = 'Level ' + f.analytics;
}

function upgradeFacility(type) {
    const cost = 5000000 * gameState.facilities[type];
    
    if (gameState.team.budget < cost) {
        showNotification('Insufficient funds!', 'error');
        return;
    }
    
    if (gameState.facilities[type] >= 10) {
        showNotification('Maximum level reached!', 'warning');
        return;
    }
    
    gameState.team.budget -= cost;
    gameState.facilities[type]++;
    
    addNews('Upgrade', `${type.charAt(0).toUpperCase() + type.slice(1)} facility upgraded to level ${gameState.facilities[type]}!`);
    updateAllUI();
    showNotification(`${type} upgraded!`, 'success');
}

// ==================== LEAGUE ====================
function renderLeague() {
    const leagueTable = document.getElementById('leagueTable');
    
    // Sort by points
    const sorted = [...gameState.league].sort((a, b) => b.points - a.points);
    
    leagueTable.innerHTML = sorted.map((team, index) => `
        <tr class="${team.isPlayer ? 'text-ice' : ''}">
            <td><span class="league-pos ${index < 16 ? 'playoffs' : ''}">${index + 1}</span></td>
            <td class="team-row">${team.name}</td>
            <td>${team.gp}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.ot}</td>
            <td><strong>${team.points}</strong></td>
        </tr>
    `).join('');
}

function showLeagueTab(tab) {
    // For now, just regular season
    renderLeague();
}

// ==================== NEWS ====================
function addNews(title, content) {
    gameState.news.unshift({
        id: Date.now(),
        title: title,
        content: content,
        date: `Day ${gameState.day}`
    });
    
    // Keep only last 50 news
    if (gameState.news.length > 50) {
        gameState.news.pop();
    }
}

function renderNews() {
    const newsFeed = document.getElementById('newsFeed');
    const dashboardNews = document.getElementById('dashboardNews');
    
    const newsHtml = gameState.news.slice(0, 10).map(news => `
        <div class="news-item">
            <div class="news-date">${news.date}</div>
            <div class="news-title">${news.title}</div>
            <div class="news-content">${news.content}</div>
        </div>
    `).join('');
    
    newsFeed.innerHTML = newsHtml || '<div class="text-center text-silver">No news yet</div>';
    dashboardNews.innerHTML = newsHtml || '<div class="text-center text-silver">No news yet</div>';
}

// ==================== GAME FLOW ====================
function simWeek() {
    // Advance time
    gameState.day += 7;
    gameState.week = Math.floor((gameState.day - 1) / 7) + 1;
    
    // Season wrap
    if (gameState.week > 82) {
        gameState.season++;
        gameState.week = 1;
        gameState.day = 1;
        gameState.record = { wins: 0, losses: 0, ot: 0 };
        addNews('New Season', `Season ${gameState.season} begins!`);
    }
    
    // Player condition recovery
    gameState.players.forEach(p => {
        p.condition = Math.min(100, p.condition + 3);
    });
    
    // Generate new transfer market players periodically
    if (gameState.week % 4 === 0) {
        generateTransferMarket();
    }
    
    updateAllUI();
    showNotification('Week ' + gameState.week + ' simmed!', 'success');
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
    
    // Show selected page
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelector(`[data-page="${pageId}"]`)?.classList.add('active');
    
    // Update sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    if (pageId === 'dashboard') sidebarItems[0].classList.add('active');
    if (pageId === 'roster') sidebarItems[1].classList.add('active');
    if (pageId === 'lines') sidebarItems[2].classList.add('active');
    if (pageId === 'tactics') sidebarItems[3].classList.add('active');
}

// ==================== SAVE/LOAD ====================
function saveGame() {
    const saveData = JSON.stringify(gameState);
    localStorage.setItem('iceDynastySave', saveData);
    showNotification('Game saved!', 'success');
}

function loadGame() {
    const saveData = localStorage.getItem('iceDynastySave');
    if (saveData) {
        try {
            gameState = JSON.parse(saveData);
            document.getElementById('welcomeScreen').style.display = 'none';
            updateAllUI();
            showNotification('Game loaded!', 'success');
            return true;
        } catch (e) {
            console.error('Load error:', e);
        }
    }
    return false;
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== START GAME ====================
function startGame() {
    const teamName = document.getElementById('teamNameInput').value || 'Ice Dynasty';
    const teamColor = document.querySelector('.color-option.selected')?.dataset.color || '#00d4ff';
    const difficulty = document.getElementById('difficultySelect').value;
    
    initGame(teamName, teamColor, difficulty);
}

// ==================== EVENT LISTENERS ====================
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        showPage(tab.dataset.page);
    });
});

// Color picker
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Close modal on outside click
document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target.id === 'playerModal') {
        closeModal();
    }
});

// Auto-save
setInterval(saveGame, 60000);

// Try to load saved game on startup
window.onload = () => {
    if (!loadGame()) {
        // Show welcome screen (already hidden by default in HTML)
    }
};

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    
    // Prevent body scroll when menu is open
    if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking on a sidebar item
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // Add touch support for better mobile experience
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const sidebar = document.querySelector('.sidebar');
        
        // Swipe from left to open menu
        if (touchEndX - touchStartX > 50 && touchStartX < 50 && window.innerWidth <= 768) {
            sidebar.classList.add('open');
            document.querySelector('.sidebar-overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        
        // Swipe from right to close menu
        if (touchStartX - touchEndX > 50 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            document.querySelector('.sidebar-overlay').classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});