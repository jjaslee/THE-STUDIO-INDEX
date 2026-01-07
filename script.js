/* ==========================================================================
   1. DATA ARCHIVE (Single Source of Truth)
   ========================================================================== */
const furnitureData = [
    // --- LIVING ROOM ---
    { id: 'ref-14101', title: 'CHROME SLING CHAIR', aesthetic: 'TECHNICAL', a_code: '1', r_code: '1', o_code: '1', img: 'images/ref-14101-1.png' }, // Living / Seating
    { id: 'ref-34101', title: 'GLOSSY POLYMER LOUNGER', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '1', o_code: '1' }, // Living / Seating
    { id: 'ref-24101', title: 'CONCRETE CLUB CHAIR', aesthetic: 'MONOLITH', a_code: '2', r_code: '1', o_code: '1' }, // Living / Seating
    { id: 'ref-54102', title: 'MYCELIUM STOOL', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '1', o_code: '1' }, // Living / Seating
    { id: 'ref-26201', title: 'RAW STONE CONSOLE', aesthetic: 'MONOLITH', a_code: '2', r_code: '1', o_code: '2' }, // Living / Tables

    // --- DINING ROOM ---
    { id: 'ref-21201', title: 'TRAVERTINE DINING TABLE', aesthetic: 'MONOLITH', a_code: '2', r_code: '2', o_code: '2' }, // Dining / Tables
    { id: 'ref-31101', title: 'TULIP DINING CHAIR', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '2', o_code: '1' }, // Dining / Seating
    { id: 'ref-41101', title: 'TAPESTRY DINING CHAIR', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '2', o_code: '1' }, // Dining / Seating

    // --- WORKSPACE ---
    { id: 'ref-47201', title: 'BURL WOOD DESK', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '3', o_code: '2' }, // Workspace / Tables
    { id: 'ref-17301', title: 'ALUMINUM TASK LIGHT', aesthetic: 'TECHNICAL', a_code: '1', r_code: '3', o_code: '3' }, // Workspace / Lighting
    { id: 'ref-14401', title: 'STEEL MODULAR SHELF', aesthetic: 'TECHNICAL', a_code: '1', r_code: '3', o_code: '4' }, // Workspace / Storage

    // --- BEDROOM ---
    { id: 'ref-45101', title: 'VELVET BED FRAME', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '4', o_code: '1' }, // Bedroom / Seating (Bed)
    { id: 'ref-35301', title: 'ORBITER NIGHT LIGHT', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '4', o_code: '3' }, // Bedroom / Lighting
    { id: 'ref-54301', title: 'MELTED GLASS LAMP', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '4', o_code: '3' }, // Bedroom / Lighting
    { id: 'ref-44601', title: 'SILK AREA RUG', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '4', o_code: '5' }, // Bedroom / Decor

    // --- CORRIDOR (Was Transit) ---
    { id: 'ref-27401', title: 'HEAVY OAK CABINET', aesthetic: 'MONOLITH', a_code: '2', r_code: '5', o_code: '4' }, // Corridor / Storage
    { id: 'ref-13701', title: 'MACHINED DOOR HANDLE', aesthetic: 'TECHNICAL', a_code: '1', r_code: '5', o_code: '5' }, // Corridor / Decor (Hardware)

    // --- CLOSET (New!) ---
    // Added a few items here so the filter isn't empty:
    { id: 'ref-66101', title: 'WALNUT VALET STAND', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '7', o_code: '4' }, // Closet / Storage
    { id: 'ref-66201', title: 'ACRYLIC HANGER SET', aesthetic: 'TECHNICAL', a_code: '1', r_code: '7', o_code: '5' }, // Closet / Decor

    // --- EXTERIOR ---
    { id: 'ref-77101', title: 'IRON GARDEN BENCH', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '6', o_code: '1' }, // Exterior / Seating
    
    // --- GENERAL DECOR ---
    { id: 'ref-53501', title: '3D PRINTED SCULPTURE', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '1', o_code: '5' }, // Living / Decor
    { id: 'ref-34501', title: 'NEON ACRYLIC VASE', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '1', o_code: '5' }, // Living / Decor
    { id: 'ref-51201', title: 'ORGANIC FORM TABLE', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '1', o_code: '2' }, // Living / Table
];
// State Management
let activeFilters = { aesthetic: 'all', room: 'all', object: 'all' };

/* ==========================================================================
   2. VISUAL ENGINE: Scramble (Existing Letters Only)
   ========================================================================== */

/**
 * Shuffles the characters of a string using Fisher-Yates algorithm.
 * Input: "LIGHT" -> Output: "GTHLI"
 */
function shuffleString(str) {
    if (str.length < 2) return str; // Don't shuffle single letters
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

/**
 * Trigger function for hover and click events.
 * Targets the .current-text span, respecting the brackets outside it.
 */
function scrambleTrigger(element) {
    const target = element.querySelector('.current-text') || element;
    
    // STOP any existing scramble so the new one takes over instantly
    if (target.dataset.intervalId) {
        clearInterval(Number(target.dataset.intervalId));
    }

    const trueWord = target.dataset.trueWord || target.innerText;
    let count = 0;
    
    const interval = setInterval(() => {
        target.innerText = shuffleString(trueWord);
        count++;
        if (count >= 10) {
            clearInterval(interval);
            target.innerText = trueWord;
            delete target.dataset.intervalId;
        }
    }, 40);

    target.dataset.intervalId = interval;
}

/* ==========================================================================
   3. CORE LOGIC: Rendering, Filtering, Journal
   ========================================================================== */

/**
 * Renders the grid. 
 * CRITICAL: Checks localStorage to pre-fill hearts.
 */
/**
 * Renders the full archive grid (Index Page)
 */
function renderArchiveGrid(data = furnitureData) {
    const grid = document.querySelector('.archive-grid') || document.getElementById('journal-container');
    if (!grid) return;

    const savedJournal = JSON.parse(localStorage.getItem('studioJournal')) || [];
    const isJournalPage = !!document.getElementById('journal-container');
    const emptyMsg = document.getElementById('empty-message');

    // 1. Context Check: Are we looking at the full archive or just hearted items?
    let displayData = isJournalPage 
        ? data.filter(item => savedJournal.includes(item.id)) 
        : data;

    // 2. Handle Empty States
    if (displayData.length === 0) {
        grid.innerHTML = '';
        
        if (isJournalPage && savedJournal.length === 0) {
            // CASE A: The Journal is literally empty
            grid.innerHTML = `
                <div id="empty-message" style="grid-column: 1/-1; text-align: center; padding-top: 20px; padding-bottom: 0px; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: auto;">
                    <p class="ref-id" style="opacity: 0.5; margin-bottom: 5px;">YOUR JOURNAL IS CURRENTLY EMPTY.</p>
                    <a href="index.html#archive-start" class="aesthetic-tag" style="text-decoration: underline; margin-bottom: 0;">RETURN TO THE ARCHIVE TO START CURATING</a>
                </div>`;

                // YOUR JOURNAL IS CURRENTLY EMPTY
                // RETURN TO THE ARCHIVE TO START CURATING
                
                
        } else {
            // CASE B: Items exist, but current filters (Aesthetic/Room) hidden them
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 100px 0;">
                    <p class="ref-id" style="opacity: 0.5;">NO MATCHES FOUND WITHIN YOUR CURATION.</p>
                    <p class="clear-filters-btn" onclick="resetFilters()">CLEAR FILTERS</p>
                </div>`;
        }
    } else {
        grid.innerHTML = generateGridHTML(displayData, savedJournal);
    }
}

function resetFilters() {
    // 1. Reset the Global Filter State (The Memory)
    activeFilters = { aesthetic: 'all', room: 'all', object: 'all' };

    // 2. Reset the Visual Dropdowns (The UI)
    ['aesthetic', 'room', 'object'].forEach(type => {
        const trigger = document.getElementById(`${type}-trigger`);
        if (trigger) {
            const textSpan = trigger.querySelector('.current-text');
            
            // Set the target word to ALL
            textSpan.dataset.trueWord = 'ALL';
            
            // Update the text immediately so the scrambler knows where to end
            textSpan.innerText = 'ALL';
            
            // Clear any temporary hover states
            delete textSpan.dataset.savedWord;

            // TRIGGER THE SCRAMBLE EFFECT
            scrambleTrigger(trigger);
        }
    });

    // 3. Refresh the Grid
    applyCurrentFilters();
}


function updateFilter(element, type) {
    // 1. Toggle the UI classes
    const group = type === 'aesthetic' ? '.aesthetic-filter' : '.room-filter';
    document.querySelectorAll(group).forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    // 2. Ask the Brain to handle the data
    applyCurrentFilters();
}

/* === NEW PREVIEW LOGIC === */

// HOVER ENTER: Temporarily show the option on the bridge
function previewOption(type, element) {
    const rawText = element.innerText; 
    const cleanText = rawText.replace('[ ', '').replace(' ]', '');
    
    const trigger = document.getElementById(`${type}-trigger`);
    const textSpan = trigger.querySelector('.current-text');
    
    // Save the "Real" selection if not already saved
    if (!textSpan.dataset.savedWord) {
        textSpan.dataset.savedWord = textSpan.dataset.trueWord;
    }
    
    // Set text to preview and scramble
    textSpan.dataset.trueWord = cleanText;
    scrambleTrigger(trigger);
}

// HOVER LEAVE: Revert to the "Real" selection INSTANTLY (No Scramble)
function revertOption(type) {
    const trigger = document.getElementById(`${type}-trigger`);
    const textSpan = trigger.querySelector('.current-text');
    
    // Only revert if we have a saved state
    if (textSpan.dataset.savedWord) {
        // 1. STOP any running scramble from the preview immediately
        if (textSpan.dataset.intervalId) {
            clearInterval(Number(textSpan.dataset.intervalId));
            delete textSpan.dataset.intervalId;
        }

        // 2. SNAP the text back to the original word instantly
        textSpan.innerText = textSpan.dataset.savedWord;
        
        // 3. Reset the logic for the next time
        textSpan.dataset.trueWord = textSpan.dataset.savedWord;
        
        // 4. Clear the temporary memory
        delete textSpan.dataset.savedWord; 
    }
}
/**
 * handle filtering from the custom dropdowns
 */
function selectOption(type, value, fullLabelText) {
    const cleanText = fullLabelText.replace('[ ', '').replace(' ]', '');
    const trigger = document.getElementById(`${type}-trigger`);
    const textSpan = trigger.querySelector('.current-text');
    
    // 1. Update the permanent selection
    textSpan.innerText = cleanText;
    textSpan.dataset.trueWord = cleanText;
    activeFilters[type] = value;
    
    // 2. Clear the "saved" word so the revert logic knows we committed
    delete textSpan.dataset.savedWord;
    
    // 3. Trigger Scramble
    scrambleTrigger(trigger);
    
    // 4. FORCE CLOSE THE MENU (The new logic)
    const dropdownGroup = trigger.closest('.custom-dropdown');
    const menu = dropdownGroup.querySelector('.dropdown-menu');
    
    // Temporarily hide the menu using inline styles to override the CSS hover
    menu.style.display = 'none';

    // When the mouse leaves the area, clear the override so it works next time
    dropdownGroup.addEventListener('mouseleave', () => {
        menu.style.display = ''; 
    }, { once: true }); // 'once: true' automatically removes this listener after it runs
    
    // 5. Filter Grid
    const filtered = furnitureData.filter(item => {
        const matchA = activeFilters.aesthetic === 'all' || item.a_code === activeFilters.aesthetic;
        const matchR = activeFilters.room === 'all' || item.r_code === activeFilters.room;
        const matchO = activeFilters.object === 'all' || item.o_code === activeFilters.object;
        return matchA && matchR && matchO;
    });

    renderArchiveGrid(filtered);
}

/**
 * Toggles item in localStorage and updates UI immediately
 */
/**
 * Shared HTML generator for product cards
 */
function generateGridHTML(data, savedJournal) {
    return data.map(item => {
        const isLiked = savedJournal.includes(item.id);
        const activeClass = isLiked ? 'liked' : '';
        
        // NEW LOGIC: Check if the item has an image
        // If yes: Render the <img> tag
        // If no: Render the gray placeholder box
        const mediaHTML = item.img 
            ? `<img src="${item.img}" alt="${item.title}">` 
            : `<div class="image-placeholder"><span>${item.id.toUpperCase()}</span></div>`;

        return `
        <div class="product-card">
            <div class="product-image-container">
                ${mediaHTML}
                <button class="heart-btn ${activeClass}" onclick="toggleJournal(this, '${item.id}')">
                    <svg class="heart-icon" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <span class="ref-id">REF. ${item.id.split('-')[1]} // ${item.title}</span>
                <span class="aesthetic-tag">${item.aesthetic}</span>
            </div>
        </div>`;
    }).join('');
}

/**
 * Enhanced Toggle: Updates memory, counts, and refreshes the journal view
 */
function toggleJournal(btnElement, id) {
    let journal = JSON.parse(localStorage.getItem('studioJournal')) || [];
    
    // 1. Update Memory
    if (journal.includes(id)) {
        journal = journal.filter(item => item !== id);
        btnElement.classList.remove('liked');
    } else {
        journal.push(id);
        btnElement.classList.add('liked');
    }
    localStorage.setItem('studioJournal', JSON.stringify(journal));
    updateJournalCount();

    // 2. REFRESH THE VIEW
    // The "Brain" now handles both pages correctly
    applyCurrentFilters();
}

function updateJournalCount() {
    const journal = JSON.parse(localStorage.getItem('studioJournal')) || [];
    const countElements = document.querySelectorAll('.journal-count'); // Target class instead of generic selector
    
    countElements.forEach(el => {
        el.innerText = journal.length;
        el.dataset.trueWord = journal.length.toString(); // For scrambler
    });
}


/**
 * THE BRAIN: Scans the active buttons and forces a refresh of the grid.
 * We call this after clicking a filter OR after unhearting an item.
 */
/**
 * THE BRAIN: Scans active buttons and refreshes the grid.
 * We call this after clicking a filter OR after unhearting an item.
 */
/**
 * THE BRAIN: Smartly decides which logic to use based on the page.
 */
/**
 * THE BRAIN: Determines which filter logic to use based on the page elements.
 */
function applyCurrentFilters() {
    // CHECK: Do we see Journal-style buttons on the screen?
    const journalButtons = document.querySelectorAll('.aesthetic-filter');
    const isJournalMode = journalButtons.length > 0;

    let filteredData = [];

    if (isJournalMode) {
        /* --- JOURNAL MODE (Physical Buttons) --- */
        const activeAestheticBtn = document.querySelector('.aesthetic-filter.active');
        const activeRoomBtn = document.querySelector('.room-filter.active');

        // Get values from the DOM elements (Default to 'all')
        const activeAesthetic = activeAestheticBtn ? activeAestheticBtn.dataset.value : 'all';
        const activeRoom = activeRoomBtn ? activeRoomBtn.dataset.value : 'all';

        // Filter the data matching the NAMES (Technical) and CODES (1) depending on your button setup
        filteredData = furnitureData.filter(item => {
            // Note: Ensure your buttons use the exact string found in furnitureData.aesthetic
            const matchAesthetic = activeAesthetic === 'all' || item.aesthetic === activeAesthetic;
            // Note: Ensure your room buttons use the exact code found in furnitureData.r_code
            const matchRoom = activeRoom === 'all' || item.r_code === activeRoom;
            
            return matchAesthetic && matchRoom;
        });

    } else {
        /* --- INDEX MODE (Dropdown Variables) --- */
        filteredData = furnitureData.filter(item => {
            const matchA = activeFilters.aesthetic === 'all' || item.a_code === activeFilters.aesthetic;
            const matchR = activeFilters.room === 'all' || item.r_code === activeFilters.room;
            const matchO = activeFilters.object === 'all' || item.o_code === activeFilters.object;
            return matchA && matchR && matchO;
        });
    }

    // Pass the calculated list to the renderer
    renderArchiveGrid(filteredData);
}

/* ==========================================================================
   4. THEME ENGINE (Consistent & Persistent)
   ========================================================================== */

function initTheme() {
    const savedTheme = localStorage.getItem('studioTheme');
    const toggleBtn = document.getElementById('theme-toggle');
    const textSpan = toggleBtn ? toggleBtn.querySelector('.current-text') : null;

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (textSpan) {
            textSpan.innerText = "MODE: DARK";
            textSpan.dataset.trueWord = "MODE: DARK";
        }
    } else {
        document.body.classList.remove('dark');
        if (textSpan) {
            textSpan.innerText = "MODE: LIGHT";
            textSpan.dataset.trueWord = "MODE: LIGHT";
        }
    }
}

function toggleThemeTrigger(element) {
    // 1. Toggle Body Class
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    // 2. Save to Memory
    localStorage.setItem('studioTheme', isDark ? 'dark' : 'light');

    // 3. Update Text & Scramble Reference
    const textSpan = element.querySelector('.current-text');
    const newLabel = isDark ? "MODE: DARK" : "MODE: LIGHT";
    
    textSpan.dataset.trueWord = newLabel;
    textSpan.innerText = newLabel;
    
    // 4. Trigger Effect
    scrambleTrigger(element);
}

/* ==========================================================================
   5. INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load the correct grid for the current page
    renderArchiveGrid();
    
    // 2. Load User Preferences
    updateJournalCount();
    initTheme();
    
    // 3. Initialize Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});