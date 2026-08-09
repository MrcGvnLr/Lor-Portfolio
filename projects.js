// Projects Filter & Interactive Developer Terminal Simulation
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. PROJECTS FILTER FUNCTIONALITY (STAGGERED)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ignore if already active to prevent redundant animations
            if (this.classList.contains('active')) return;
            
            const filterValue = this.getAttribute('data-filter');
            
            // Update active state in buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Disable interactions during transition to prevent overlap bugs
            filterButtons.forEach(btn => btn.style.pointerEvents = 'none');
            
            // Gather currently visible cards
            const currentlyVisible = Array.from(projectCards).filter(card => !card.classList.contains('hidden'));
            
            // Phase 1: Smoothly fade out currently visible cards
            if (currentlyVisible.length > 0) {
                currentlyVisible.forEach(card => {
                    card.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.95)';
                });
            }
            
            // Phase 2: Reflow layout and cascade new set into view
            setTimeout(() => {
                let visibleIndex = 0;
                
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        
                        // Set starting state for stagger animation
                        card.style.transition = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        
                        // Staggered slide up and fade in
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s ease, box-shadow 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 30 + (visibleIndex * 60));
                        
                        visibleIndex++;
                    } else {
                        card.classList.add('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                    }
                });
                
                // Re-enable interactions after transition gains momentum
                setTimeout(() => {
                    filterButtons.forEach(btn => btn.style.pointerEvents = 'auto');
                }, visibleIndex * 60 + 200);
                
            }, currentlyVisible.length > 0 ? 250 : 0);
        });
    });

    // ==========================================
    // 2. DEVELOPER CONSOLE TERMINAL DATA
    // ==========================================
    const projectData = {
        lorskie: {
            title: "Lorskie Store RMS",
            speed: "0.008s",
            memory: "14.8 MB",
            dialect: "PHP / MySQL",
            codeLink: "https://github.com/MrcGvnLr/Lorskie-Store",
            demoLink: "",
            tree: [
                { name: "📂 root", indent: 0 },
                { name: "📂 config", indent: 1 },
                { name: "📄 db_connect.php", indent: 2 },
                { name: "📂 controllers", indent: 1 },
                { name: "📄 InventoryController.php", indent: 2 },
                { name: "📄 SalesController.php", indent: 2 },
                { name: "📂 views", indent: 1 },
                { name: "📄 dashboard.php", indent: 2 },
                { name: "📄 login.php", indent: 2 },
                { name: "📂 public", indent: 1 },
                { name: "📄 index.php", indent: 2 },
                { name: "📄 script.js", indent: 2 },
                { name: "📄 style.css", indent: 2 }
            ],
            logs: [
                "Initializing Retail Management System environment...",
                "Loading local environment configurations...",
                "ESTABLISHING DATABASE CONNECTION...",
                "  Connecting: mysql://localhost:3306/lorskie_store",
                "  Status: CONNECTED SUCCESSFUL (Latency: 0.02ms)",
                "LOADING SCHEMAS & DICTIONARIES...",
                "  Loading table 'inventory' ... OK (248 records)",
                "  Loading table 'transactions' ... OK (1,290 records)",
                "  Loading table 'users' ... OK (5 accounts)",
                "RUNNING INTEGRITY COMPLIANCE CHECKS...",
                "  Foreign key dependencies ... CHECKED",
                "  Stock level alerts system ... READY",
                "Retail Management Server listening on PORT 8080...",
                "STATUS: ONLINE & COMPLIED SUCCESSFUL."
            ]
        },
        undead: {
            title: "Undead Ascension",
            speed: "0.016s",
            memory: "32.4 MB",
            dialect: "Scratch Engine",
            codeLink: "https://scratch.mit.edu/projects/969228217/",
            demoLink: "https://scratch.mit.edu/projects/969228217/",
            tree: [
                { name: "📂 undead-ascension", indent: 0 },
                { name: "📂 assets", indent: 1 },
                { name: "📂 sprites", indent: 2 },
                { name: "📄 player_sheet.png", indent: 3 },
                { name: "📄 zombie_variants.png", indent: 3 },
                { name: "📄 game_ui.png", indent: 3 },
                { name: "📂 audio", indent: 2 },
                { name: "📄 survival_bg.mp3", indent: 3 },
                { name: "📄 shotgun_shot.wav", indent: 3 },
                { name: "📄 zombie_growl.wav", indent: 3 },
                { name: "📄 project.json", indent: 1 },
                { name: "📄 index.html", indent: 1 }
            ],
            logs: [
                "Initializing game environment on Scratch runtime...",
                "Importing assets pack (V2.4)...",
                "ALLOCATING SPRITE RENDERING BUFFER...",
                "  Player controller maps ... LOADED",
                "  Spawning manager: Zombie horde (3 classes) ... LOADED",
                "  Terrain mapping: survival_arena_v1 ... LOADED",
                "LOADING AUDIO INTERACTIVE SYSTEM...",
                "  Pre-loading 'survival_bg.mp3' ... OK (3.2 MB)",
                "  Pre-loading FX sounds ... OK (8 clips)",
                "CONFIGURING GAME LOOP SERVICE...",
                "  Target Frame Rate: 60 FPS (V-Sync Enabled)",
                "  Collision physics processor ... RUNNING",
                "Undead Ascension game instance ACTIVE.",
                "STATUS: ONLINE & READY TO SURVIVE."
            ]
        },
        layoffs: {
            title: "World Layoffs Data Cleaning",
            speed: "0.045s",
            memory: "8.2 MB",
            dialect: "SQL / Excel",
            codeLink: "https://github.com/MrcGvnLr/World-Layoffs-Data-cleaning",
            demoLink: "",
            tree: [
                { name: "📂 World-Layoffs-Analysis", indent: 0 },
                { name: "📂 sql", indent: 1 },
                { name: "📄 1_data_cleaning.sql", indent: 2 },
                { name: "📄 2_exploratory_analysis.sql", indent: 2 },
                { name: "📂 data", indent: 1 },
                { name: "📄 world_layoffs_raw.csv", indent: 2 },
                { name: "📄 world_layoffs_cleaned.csv", indent: 2 },
                { name: "📄 README.md", indent: 1 }
            ],
            logs: [
                "Initializing Data Analyst Workspace environment...",
                "Importing raw dataset 'world_layoffs_raw' ...",
                "  Raw count: 48,200 transactional records",
                "RUNNING DEDUPLICATION ROUTINES...",
                "  Identifying duplicate keys via ROW_NUMBER() OVER()...",
                "  Rogue duplicates found: 1,284 records.",
                "  Action: PURGING DUPLICATES ... DELETED SUCCESSFUL.",
                "STANDARDIZING & NORMALIZING DATAFIELDS...",
                "  Parsing date strings 'MM/DD/YYYY' into 'YYYY-MM-DD' format... OK",
                "  Trimming whitespaces & trailing characters ... OK",
                "  Handling NULL & empty string occurrences ... RESOLVED",
                "EXPORTING STAGED CLEAN DATASET...",
                "  Writing cleaned output to 'world_layoffs_cleaned.csv'...",
                "STATUS: COMPILATION SUCCESSFUL. DATASET IMMUTABLE."
            ]
        },
        basket: {
            title: "Market Basket Analysis",
            speed: "0.082s",
            memory: "18.5 MB",
            dialect: "MySQL / Excel",
            codeLink: "#",
            demoLink: "",
            tree: [
                { name: "📂 market-basket-analysis", indent: 0 },
                { name: "📂 sql", indent: 1 },
                { name: "📄 transaction_grouping.sql", indent: 2 },
                { name: "📄 apriori_associations.sql", indent: 2 },
                { name: "📂 reports", indent: 1 },
                { name: "📄 association_insights.xlsx", indent: 2 },
                { name: "📄 README.md", indent: 1 }
            ],
            logs: [
                "Initializing Association Rules Analytics Suite...",
                "Loading transactional log (120,500 rows)...",
                "RUNNING TRANSACTION BATCHING...",
                "  Grouping transactions by CartID and Date...",
                "  Average basket size: 4.85 items.",
                "CALCULATING ASSOCIATION SCORES (APRIORI SPECIFICATIONS)...",
                "  Running support query (threshold >= 0.02)... OK (128 itemsets)",
                "  Running confidence query (threshold >= 0.50)... OK (42 rules)",
                "  Running lift index metrics calculations...",
                "  Filtering strong rule matches (Lift > 1)... SUCCESSFUL (18 patterns)",
                "COMPILING STRATEGIC INVENTORY RECOMMENDATIONS...",
                "  Exporting reports/association_insights.xlsx ... WRITTEN",
                "STATUS: ANALYSIS COMPLETE. INSIGHTS GENERATED."
            ]
        },
        uastrack: {
            title: "UASTrack EDMS",
            speed: "0.024s",
            memory: "22.1 MB",
            dialect: "Laravel / PHP / MySQL",
            codeLink: "https://github.com/MrcGvnLr/Lorskie-Store",
            demoLink: "emsdemo.html",
            tree: [
                { name: "📂 uastrack-edms", indent: 0 },
                { name: "📂 app", indent: 1 },
                { name: "📂 Http", indent: 2 },
                { name: "📂 Controllers", indent: 3 },
                { name: "📄 DeploymentController.php", indent: 4 },
                { name: "📂 Models", indent: 2 },
                { name: "📄 Employee.php", indent: 3 },
                { name: "📄 Deployment.php", indent: 3 },
                { name: "📂 bootstrap", indent: 1 },
                { name: "📂 config", indent: 1 },
                { name: "📂 database", indent: 1 },
                { name: "📂 migrations", indent: 2 },
                { name: "📄 create_deployments_table.php", indent: 3 },
                { name: "📂 resources", indent: 1 },
                { name: "📂 views", indent: 2 },
                { name: "📄 index.blade.php", indent: 3 },
                { name: "📂 routes", indent: 1 },
                { name: "📄 web.php", indent: 2 },
                { name: "📄 .env", indent: 1 }
            ],
            logs: [
                "Initializing Employee Deployment & Return System...",
                "Loading Laravel Framework Environment variables...",
                "ESTABLISHING DATABASE CONNECTION...",
                "  Connecting: mysql://127.0.0.1:3306/uastrack_edms",
                "  Status: CONNECTED SUCCESSFUL (Latency: 0.04ms)",
                "RUNNING ARCHITECTURAL BOOTSTRAP OPERATIONS...",
                "  Loading routing configurations ... OK (48 endpoints)",
                "  Registering DeploymentController dependencies ... OK",
                "CHECKING SYSTEM DATA INTEGRITY...",
                "  Verifying 'employees' schema integrity ... SECURED",
                "  Verifying 'deployments' table relational constraints ... SECURED",
                "  Pending database migrations ... NONE (All tables synced)",
                "Laravel local development server online at PORT 8000...",
                "STATUS: ONLINE & COMPILING SUCCESSFUL."
            ]
        },
        uaseobts: {
            title: "UAS EOBTS Checklist System",
            speed: "0.019s",
            memory: "19.6 MB",
            dialect: "Laravel / PHP / SQLite",
            codeLink: "https://github.com/MrcGvnLr/Lorskie-Store",
            demoLink: "trackerdemo.html",
            tree: [
                { name: "📂 uas-eobts-onboarding", indent: 0 },
                { name: "📂 app", indent: 1 },
                { name: "📂 Http", indent: 2 },
                { name: "📂 Controllers", indent: 3 },
                { name: "📄 OnboardingController.php", indent: 4 },
                { name: "📂 Models", indent: 2 },
                { name: "📄 Checklist.php", indent: 3 },
                { name: "📄 Document.php", indent: 3 },
                { name: "📂 database", indent: 1 },
                { name: "📄 database.sqlite", indent: 2 },
                { name: "📂 resources", indent: 1 },
                { name: "📂 views", indent: 2 },
                { name: "📄 checklist.blade.php", indent: 3 },
                { name: "📂 routes", indent: 1 },
                { name: "📄 web.php", indent: 2 },
                { name: "📄 tailwind.config.js", indent: 1 }
            ],
            logs: [
                "Initializing Employee Onboarding Checklist Core...",
                "Connecting SQLite Database Driver (Embedded mode)...",
                "ESTABLISHING DATABASE CONNECTION...",
                "  Driver path: database/database.sqlite",
                "  Status: SQLite DRIVER LOADED SUCCESSFUL",
                "PARSING ONBOARDING CHECKLIST CONFIGURATIONS...",
                "  Pre-loading Checklist definitions ... OK (14 core files)",
                "  Employee checklist progress caches ... REBUILDING",
                "RUNNING TAILWIND STYLES COMPILER...",
                "  Compiling CSS bundles for responsive dashboard ... OK",
                "  Purging unused utility styles (Production bundle) ... OK",
                "UAS Onboarding Checklist Engine listening on PORT 3000...",
                "STATUS: ONLINE & CHECKS SUCCESSFUL."
            ]
        }
    };

    // ==========================================
    // 3. TERMINAL CONSOLE INSPECTOR SIMULATOR
    // ==========================================
    const terminalModal = document.getElementById('terminalModal');
    const terminalCloseBtn = document.querySelector('.terminal-close');
    const terminalLogs = document.getElementById('terminalLogs');
    const termStatus = document.getElementById('termStatus');
    const termSpeed = document.getElementById('termSpeed');
    const termMemory = document.getElementById('termMemory');
    const termDb = document.getElementById('termDb');
    const termTree = document.getElementById('termTree');
    const termLiveLink = document.getElementById('termLiveLink');
    const inspectButtons = document.querySelectorAll('.inspect-btn');

    let logTimeouts = [];

    // Attach click listeners to all project action buttons
    inspectButtons.forEach(btn => {
        const projectKey = btn.getAttribute('data-project');
        const data = projectData[projectKey];

        if (!data) return;

        const action = btn.getAttribute('data-action') || 'code';
        const link = action === 'demo' ? (data.demoLink || data.link || '#') : (data.codeLink || data.link || '#');
        const isDemoAction = action === 'demo';
        const iconClass = isDemoAction ? 'fas fa-external-link-alt' : 'fab fa-github';
        const labelText = isDemoAction ? 'BROWSE DEMO' : 'BROWSE CODE';

        btn.innerHTML = `<i class="${iconClass}"></i> ${labelText}`;
        btn.setAttribute('type', 'button');

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (link && link !== '#') {
                window.open(link, '_blank', 'noopener');
            }
        });
    });

    // Close terminal modal click handlers
    if (terminalCloseBtn) {
        terminalCloseBtn.addEventListener('click', closeTerminal);
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === terminalModal) {
            closeTerminal();
        }
    });

    // Keyboard ESC key handler to close modal
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && terminalModal && terminalModal.classList.contains('active')) {
            closeTerminal();
        }
    });

    function openTerminal(data) {
        // Clear previous simulation states & timeouts
        clearTimeouts();
        terminalLogs.innerHTML = '';
        
        // Populate static tech specs & tree on the right side
        termStatus.textContent = "COMPILING...";
        termStatus.className = "metric-value status-compiling";
        termSpeed.textContent = data.speed;
        termMemory.textContent = data.memory;
        termDb.textContent = data.dialect;
        
        // Build directory file tree
        buildFileTree(data.tree);
        
        // Configure Action Links
        if (data.link && data.link !== '#') {
            termLiveLink.href = data.link;
            termLiveLink.style.display = 'inline-flex';
            termLiveLink.target = '_blank';
            termLiveLink.rel = 'noopener';
            if (data.link.includes('scratch.mit.edu')) {
                termLiveLink.innerHTML = '<i class="fas fa-play"></i> PLAY GAME';
            } else if (data.link.endsWith('.html')) {
                termLiveLink.innerHTML = '<i class="fas fa-external-link-alt"></i> VIEW DEMO';
            } else {
                termLiveLink.innerHTML = '<i class="fab fa-github"></i> BROWSE CODE';
            }
        } else {
            termLiveLink.style.display = 'none';
        }

        // Show Modal with active class (enables flex & CSS animations)
        terminalModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Block body background scrolling
        
        // Start printing logs in simulation sequence
        runTerminalLogsSimulation(data.logs);
    }

    function closeTerminal() {
        clearTimeouts();
        if (terminalModal) {
            terminalModal.classList.remove('active');
        }
        document.body.style.overflow = ''; // Restore scroll
    }

    function clearTimeouts() {
        logTimeouts.forEach(t => clearTimeout(t));
        logTimeouts = [];
    }

    function buildFileTree(treeData) {
        termTree.innerHTML = '';
        treeData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'tree-item';
            row.style.paddingLeft = `${item.indent * 16}px`;
            
            // Format styling based on folder vs file
            if (item.name.startsWith('📂')) {
                row.innerHTML = `<span class="tree-folder">${item.name}</span>`;
            } else {
                row.innerHTML = `<span class="tree-file">${item.name}</span>`;
            }
            termTree.appendChild(row);
        });
    }

    function runTerminalLogsSimulation(logs) {
        let currentLine = 0;
        let cumulativeDelay = 100;
        
        // Print prompt commands at startup
        printLogLine(`<span class="prompt-user">dev@mglor-system:~$</span> <span class="prompt-cmd">initialize --project "${logs[0].substring(12, 35)}"...</span>`, 0);
        
        logs.forEach((logLine, index) => {
            // Apply staggered delay for organic speed feedback
            const delay = 150 + (Math.random() * 200);
            cumulativeDelay += delay;
            
            const timeout = setTimeout(() => {
                let formattedLine = logLine;
                
                // Color formatting checks for typical terminal styles
                if (logLine.includes('CONNECTED SUCCESSFUL') || logLine.includes('OK') || logLine.includes('ACTIVE') || logLine.includes('READY')) {
                    formattedLine = logLine.replace('CONNECTED SUCCESSFUL', '<span class="status-success">CONNECTED SUCCESSFUL</span>')
                                           .replace('OK', '<span class="status-success">OK</span>')
                                           .replace('ACTIVE', '<span class="status-success">ACTIVE</span>')
                                           .replace('READY', '<span class="status-success">READY</span>');
                }
                
                if (logLine.includes('ESTABLISHING') || logLine.includes('LOADING') || logLine.includes('RUNNING') || logLine.includes('CONFIGURING')) {
                    formattedLine = `<span class="status-header">${logLine}</span>`;
                }

                if (logLine.startsWith('STATUS:')) {
                    formattedLine = `<span class="status-success-final">${logLine}</span>`;
                    // Mark system as ONLINE inside metrics right panel
                    termStatus.textContent = "ONLINE";
                    termStatus.className = "metric-value status-online status-glow";
                }
                
                printLogLine(formattedLine, index + 1);
            }, cumulativeDelay);
            
            logTimeouts.push(timeout);
        });
    }

    function printLogLine(text, index) {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.style.opacity = '0';
        line.style.transform = 'translateX(-5px)';
        line.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        line.innerHTML = `[${new Date().toLocaleTimeString()}] ${text}`;
        
        terminalLogs.appendChild(line);
        
        // Trigger reflow & fade in
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
            // Scroll to the bottom of logs automatically
            terminalLogs.scrollTop = terminalLogs.scrollHeight;
        }, 10);
    }
});
