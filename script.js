/* ==========================================================================
   0. INITIAL PAGE LOAD
   ========================================================================== */
// Soft page reveal (runs on every page that includes script.js)
(function softReveal() {
  const content = document.querySelector(".page-content");
  if (!content) return;

  // Enable the CSS that hides/reveals .page-content
  document.documentElement.classList.add("soft-reveal");

  const show = () => content.classList.add("is-ready");

  if (document.readyState === "complete") {
    requestAnimationFrame(show);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(show), { once: true });
  }
})();



document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;

  const href = a.getAttribute("href");

  // external / new tab: ignore
  const isExternal = a.target === "_blank" || /^https?:\/\//.test(href);
  if (isExternal) return;

  // ✅ NEW: if it's the same document (e.g. index.html#archive-start while already on index.html),
  // let the browser handle it (no fade-out)
  try {
    const url = new URL(a.href, window.location.href);
    const sameDoc =
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search;

    if (sameDoc) return;
  } catch {
    // if URL parsing fails, do nothing special
  }

  // If it's ONLY a hash like "#top", also ignore
  if (href.startsWith("#")) return;

  // fade out + navigate (for real page changes)
  e.preventDefault();
document.querySelector(".page-content")?.classList.remove("is-ready");
  setTimeout(() => (window.location.href = href), 220);
});

window.addEventListener("hashchange", () => {
  document.querySelector(".page-content")?.classList.add("is-ready");
});


/* ==========================================================================
   1. DATA ARCHIVE (Single Source of Truth)
   ========================================================================== */
const furnitureData = [
    // --- LIVING ROOM ---
    { id: 'ref-14101', title: 'CHROME SLING CHAIR', aesthetic: 'TECHNICAL', a_code: '1', r_code: '1', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Living / Seating
    { id: 'ref-34101', title: 'GLOSSY POLYMER LOUNGER', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '1', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Living / Seating
    { id: 'ref-24101', title: 'CONCRETE CLUB CHAIR', aesthetic: 'MONOLITH', a_code: '2', r_code: '1', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Living / Seating
    { id: 'ref-54102', title: 'MYCELIUM STOOL', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '1', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Living / Seating
    { id: 'ref-26201', title: 'RAW STONE CONSOLE', aesthetic: 'MONOLITH', a_code: '2', r_code: '1', o_code: '2', img: 'images/ref-14101-1.jpg' }, // Living / Tables

    // --- DINING ROOM ---
    { id: 'ref-21201', title: 'TRAVERTINE DINING TABLE', aesthetic: 'MONOLITH', a_code: '2', r_code: '2', o_code: '2', img: 'images/ref-14101-1.jpg' }, // Dining / Tables
    { id: 'ref-31101', title: 'TULIP DINING CHAIR', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '2', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Dining / Seating
    { id: 'ref-41101', title: 'TAPESTRY DINING CHAIR', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '2', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Dining / Seating

    // --- WORKSPACE ---
    { id: 'ref-47201', title: 'BURL WOOD DESK', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '3', o_code: '2', img: 'images/ref-14101-1.jpg' }, // Workspace / Tables
    { id: 'ref-17301', title: 'ALUMINUM TASK LIGHT', aesthetic: 'TECHNICAL', a_code: '1', r_code: '3', o_code: '3', img: 'images/ref-14101-1.jpg' }, // Workspace / Lighting
    { id: 'ref-14401', title: 'STEEL MODULAR SHELF', aesthetic: 'TECHNICAL', a_code: '1', r_code: '3', o_code: '4', img: 'images/ref-14101-1.jpg' }, // Workspace / Storage

    // --- BEDROOM ---
    { id: 'ref-45101', title: 'VELVET BED FRAME', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '4', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Bedroom / Seating (Bed)
    { id: 'ref-35301', title: 'ORBITER NIGHT LIGHT', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '4', o_code: '3', img: 'images/ref-14101-1.jpg' }, // Bedroom / Lighting
    { id: 'ref-54301', title: 'MELTED GLASS LAMP', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '4', o_code: '3', img: 'images/ref-14101-1.jpg' }, // Bedroom / Lighting
    { id: 'ref-44601', title: 'SILK AREA RUG', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '4', o_code: '5', img: 'images/ref-14101-1.jpg' }, // Bedroom / Decor

    // --- CORRIDOR (Was Transit) ---
    { id: 'ref-27401', title: 'HEAVY OAK CABINET', aesthetic: 'MONOLITH', a_code: '2', r_code: '5', o_code: '4', img: 'images/ref-14101-1.jpg' }, // Corridor / Storage
    { id: 'ref-13701', title: 'MACHINED DOOR HANDLE', aesthetic: 'TECHNICAL', a_code: '1', r_code: '5', o_code: '5', img: 'images/ref-14101-1.jpg' }, // Corridor / Decor (Hardware)

    // --- CLOSET (New!) ---
    // Added a few items here so the filter isn't empty:
    { id: 'ref-66101', title: 'WALNUT VALET STAND', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '7', o_code: '4', img: 'images/ref-14101-1.jpg' }, // Closet / Storage
    { id: 'ref-66201', title: 'ACRYLIC HANGER SET', aesthetic: 'TECHNICAL', a_code: '1', r_code: '7', o_code: '5', img: 'images/ref-14101-1.jpg' }, // Closet / Decor

    // --- EXTERIOR ---
    { id: 'ref-77101', title: 'IRON GARDEN BENCH', aesthetic: 'SOFT HERITAGE', a_code: '4', r_code: '6', o_code: '1', img: 'images/ref-14101-1.jpg' }, // Exterior / Seating

    // --- GENERAL DECOR ---
    { id: 'ref-53501', title: '3D PRINTED SCULPTURE', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '1', o_code: '5', img: 'images/ref-14101-1.jpg' }, // Living / Decor
    { id: 'ref-34501', title: 'NEON ACRYLIC VASE', aesthetic: 'UTOPIAN POP', a_code: '3', r_code: '1', o_code: '5', img: 'images/ref-14101-1.jpg' }, // Living / Decor
    { id: 'ref-51201', title: 'ORGANIC FORM TABLE', aesthetic: 'BIOMORPHIC', a_code: '5', r_code: '1', o_code: '2', img: 'images/ref-14101-1.jpg' }, // Living / Table
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
    const grid = document.getElementById('archive-grid') || document.getElementById('journal-container');
    if (!grid) return;

    const savedJournal = JSON.parse(localStorage.getItem('studioJournal')) || [];
    const isJournalPage = !!document.getElementById('journal-container');

    // 1. Context Check: Calculate what SHOULD be visible
    let displayData = isJournalPage
        ? data.filter(item => savedJournal.includes(item.id))
        : data;

    // 2. Handle Empty States (Keep your exact logic here)
    if (displayData.length === 0) {
        // Since there is nothing to animate, we can use innerHTML here safely

        if (isJournalPage && savedJournal.length === 0) {
            // CASE A: The Journal is literally empty
            grid.innerHTML = `
                <div id="empty-message" style="grid-column: 1/-1; text-align: center; padding-top: 20px; padding-bottom: 0px; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: auto;">
                    <p class="ref-id" style="opacity: 0.5; margin-bottom: 5px;">YOUR JOURNAL IS CURRENTLY EMPTY.</p>
                    <a href="index.html#archive-start" class="aesthetic-tag" style="text-decoration: underline; margin-bottom: 0;">RETURN TO THE ARCHIVE TO START CURATING</a>
                </div>`;
        } else {
            // CASE B: Items exist, but current filters hidden them
            grid.innerHTML = `
                <div class="empty-filter-msg" style="grid-column: 1/-1; text-align: center; padding: 100px 0;">
                    <p class="ref-id" style="opacity: 0.5;">NO MATCHES FOUND WITHIN YOUR CURATION.</p>
                    <p class="clear-filters-btn" onclick="resetFilters()">CLEAR FILTERS</p>
                </div>`;
        }
        return; // Stop here, nothing to animate
    }

    // 3. INITIAL RENDER (If grid is empty or has an error message)
    // We render the HTML once so the elements exist in the DOM
    const hasErrorMsg = grid.querySelector('#empty-message') || grid.querySelector('.empty-filter-msg');

    if (grid.children.length === 0 || hasErrorMsg) {
        // If we are on Archive, render ALL data initially so we can filter later.
        // If we are on Journal, render only the journal items.
        const initialBatch = isJournalPage ? displayData : furnitureData;
        grid.innerHTML = generateGridHTML(initialBatch, savedJournal);
    }

    // Build a persistent cache of cards by id (so we can remove + re-add with animation)
    if (!grid.__cardCache) grid.__cardCache = new Map();
    grid.querySelectorAll(".product-card").forEach(card => {
        grid.__cardCache.set(card.getAttribute("data-id"), card);
    });


    // 4. THE ANIMATION LOOP (The Glide Effect)
    // Instead of rebuilding HTML, we move/hide existing elements.

    const visibleIds = displayData.map(item => item.id);
    const visibleSet = new Set(visibleIds);

    // A) Fade-out removals: remove nodes that shouldn't be visible
    for (const card of Array.from(grid.querySelectorAll(".product-card"))) {
        const id = card.getAttribute("data-id");
        if (!visibleSet.has(id)) {
            card.remove(); // triggers "remove" animation
        }
    }

    // B) Stable reorder: only move if needed (prevents phantom top-left slides)
    for (let i = 0; i < visibleIds.length; i++) {
        const id = visibleIds[i];
        const card = grid.__cardCache.get(id);
        if (!card) continue;

        const nodeCurrentlyAtIndex = grid.children[i];
        if (nodeCurrentlyAtIndex !== card) {
            grid.insertBefore(card, nodeCurrentlyAtIndex || null);
        }
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
    // Prevent the browser from snapping back to the clicked dropdown item
    if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
    }
    menu.style.pointerEvents = "none";
    setTimeout(() => { menu.style.pointerEvents = ""; }, 350);


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

    // --- 5. BEFORE re-render: prevent browser "keep focused item in view" behavior ---
    if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
    }

    // Decide where we want to land
    const isJournalPage = !!document.getElementById("journal-container");

    if (isJournalPage) {
        scrollToJournalFilters();
    } else {
        scrollToArchiveStart();
    }

    applyCurrentFilters();



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

        // 1. PREPARE CUSTOM STYLES (Zoom & Crop)
        // We build a style string to handle specific zoom levels or positions per item
        let imgStyles = '';
        if (item.position) imgStyles += `object-position: ${item.position};`;
        if (item.zoom) imgStyles += `--img-scale: ${item.zoom};`;

        // 2. MEDIA LOGIC
        // Added 'loading="lazy"' for speed and 'style' for the zoom effects
        const mediaHTML = item.img
            ? `<img src="${item.img}" alt="${item.title}" style="${imgStyles}" loading="lazy">`
            : `<div class="image-placeholder"><span>${item.id.toUpperCase()}</span></div>`;

        return `
        <div class="product-card" data-id="${item.id}">
            <div class="product-image-container">
                ${mediaHTML}
                <button class="heart-btn ${activeClass}" onclick="toggleJournal(event, this, '${item.id}')">
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
function toggleJournal(event, btn, id) {
    // 1. Stop the click from bubbling up
    event.stopPropagation();
    event.preventDefault();

    // 2. Get the current saved list (Using the CORRECT key 'studioJournal')
    let saved = JSON.parse(localStorage.getItem('studioJournal')) || [];
    const index = saved.indexOf(id);

    // Track if we are removing an item
    let isRemoving = false;

    // 3. Logic: Add or Remove
    if (index > -1) {
        // ITEM EXISTS: Remove it
        saved.splice(index, 1);
        btn.classList.remove('liked');
        isRemoving = true; // Mark as removed
    } else {
        // ITEM NEW: Add it
        saved.push(id);
        btn.classList.add('liked');
    }

    // 4. Save back to memory
    localStorage.setItem('studioJournal', JSON.stringify(saved));

    // 5. Update the count immediately
    if (typeof updateJournalCount === 'function') {
        updateJournalCount();
    }

    // --- NEW LOGIC: VISUAL REMOVAL FOR JOURNAL PAGE ---
    // We check if the special 'journal-container' exists (meaning we are on the Journal Page)
    const journalContainer = document.getElementById('journal-container');

    if (journalContainer && isRemoving) {
        // A. Find the card that belongs to this button
        const card = btn.closest('.product-card');

        // B. Remove it from the screen immediately (Poof!)
        if (card) {
            card.remove();
        }

        // C. Special Check: If you deleted the last item, show the "Empty" message
        // We count how many cards are left. If 0, we force a refresh to show the text.
        if (journalContainer.querySelectorAll('.product-card').length === 0) {
            renderArchiveGrid();
        }
    }
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
        document.documentElement.classList.add('dark');
        if (textSpan) {
            textSpan.innerText = "MODE: DARK";
            textSpan.dataset.trueWord = "MODE: DARK";
        }
    } else {
        document.documentElement.classList.remove('dark');
        if (textSpan) {
            textSpan.innerText = "MODE: LIGHT";
            textSpan.dataset.trueWord = "MODE: LIGHT";
        }
    }
}

function toggleThemeTrigger(element) {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('studioTheme', isDark ? 'dark' : 'light');

    const textSpan = element.querySelector('.current-text');
    const newLabel = isDark ? "MODE: DARK" : "MODE: LIGHT";

    textSpan.dataset.trueWord = newLabel;
    textSpan.innerText = newLabel;

    scrambleTrigger(element);
}

/* ==========================================================================
   5. INITIALIZATION & ANIMATION SETUP
   ========================================================================== */
let animateGrid;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { default: autoAnimate } = await import('https://cdn.jsdelivr.net/npm/@formkit/auto-animate/index.min.js');
        animateGrid = autoAnimate;

        const archiveGrid = document.getElementById('archive-grid');
        const journalGrid = document.getElementById('journal-container');

        // PURE FADE LOGIC: No coordinate math, just opacity
        // ELEGANT LOGIC: add = fade in, remove = fade out, remain = glide
        // add = ease in
        // remove = ease out
        // remain = glide
        const elegantAnimation = (el, action, oldCoords, newCoords) => {
            // add = ease in

            const T_OUT = 260;   // fade out (soft)
            const T_MOVE = 870;  // glide (luxury)
            const T_IN = 320;    // fade in (soft)
            const GAP = 120;     // breath (prevents overlap)



            if (action === "add") {
                const keyframes = [
                    { opacity: 0, transform: "translateY(5px) scale(0.995)" },
                    { opacity: 1, transform: "translateY(0px) scale(1)" },
                ];
                const options = {
                    duration: T_IN,
                    delay: GAP,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)", // buttery ease-out
                    fill: "both",
                };

                return new KeyframeEffect(el, keyframes, options);
            }

            // remove = ease out
            if (action === "remove") {
                const keyframes = [
                    { opacity: 1, transform: "translateY(0px) scale(1)" },
                    { opacity: 0, transform: "translateY(5px) scale(0.995)" },
                ];

                const options = {
                    duration: T_OUT,
                    easing: "cubic-bezier(0.7, 0, 0.84, 0)", // gentle ease-in
                    fill: "both",
                };

                return new KeyframeEffect(el, keyframes, options);
            }

            // remain = glide
            if (action === "remain" && oldCoords && newCoords) {
                let dx = oldCoords.left - newCoords.left;
                let dy = oldCoords.top - newCoords.top;

                if (Math.abs(dx) > Math.abs(dy)) {
                    dy = 0;
                } else {
                    dx = 0;
                }

                const keyframes = [
                    { transform: `translate(${dx}px, ${dy}px)` },
                    { transform: "translate(0,0)" },
                ];
                const options = {
                    duration: T_MOVE,
                    delay: GAP,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)", // match add
                    fill: "both",
                };

                return new KeyframeEffect(el, keyframes, options);
            }

            // fallback: no animation
            return new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 0 });


        };


        if (archiveGrid) animateGrid(archiveGrid, elegantAnimation);
        if (journalGrid) animateGrid(journalGrid, elegantAnimation);



        // Start engine
        renderArchiveGrid();
        updateJournalCount();
        initTheme();

    } catch (error) {
        console.warn("Animation library failed to load.", error);
        renderArchiveGrid();
        updateJournalCount();
        initTheme();
    }

    // --- STEP 4: SMOOTH SCROLL ---
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


function scrollToArchiveStart() {
    const target =
        document.getElementById("archive-start") || // if you have an element with this id
        document.querySelector('[id="archive-start"]') ||
        document.getElementById("archive-grid") ||  // fallback
        document.querySelector(".archive-grid");

    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToJournalFilters() {
    const anchor = document.getElementById("journal-filter-anchor");
    if (!anchor) return;

    anchor.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}





/* ==========================================================================
   6. EXPOSE FUNCTIONS TO HTML
   ========================================================================== */
// This makes the functions available to your onclick="..." attributes
window.toggleJournal = toggleJournal;
window.resetFilters = resetFilters;
window.updateFilter = updateFilter;
window.selectOption = selectOption;
window.toggleThemeTrigger = toggleThemeTrigger;

/* ==========================================================================
   7. CAROUSEL
   ========================================================================== */
function initSeamlessCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  // Save the "true original" markup once
  if (!track.dataset.originalHtml) {
    track.dataset.originalHtml = track.innerHTML;
  }

  const rebuild = async () => {
    // Stop animation cleanly (prevents mid-cycle jump)
    track.style.animation = "none";
    track.offsetHeight; // force reflow

    // Reset to the true original set (always 3 items)
    track.innerHTML = track.dataset.originalHtml;

    // Wait for images so widths don't change after measuring
    const imgs = Array.from(track.querySelectorAll("img"));
    await Promise.allSettled(imgs.map(img => (img.decode ? img.decode() : Promise.resolve())));

    const originals = Array.from(track.children);
    if (!originals.length) return;

    // Measure width of ONE set
    const first = originals[0];
    const last = originals[originals.length - 1];
    const setWidth = last.getBoundingClientRect().right - first.getBoundingClientRect().left;
    if (setWidth <= 0) return;

    const viewport = track.parentElement?.getBoundingClientRect().width || window.innerWidth;

    // Clone sets until there is never a gap
    while (track.scrollWidth < viewport + setWidth * 2) {
      originals.forEach(node => track.appendChild(node.cloneNode(true)));
    }

    // Apply loop distance + premium speed
    track.style.setProperty("--loop-distance", `${setWidth}px`);
    const speed = 28; // px/sec (slow = luxe)
    track.style.animationDuration = `${setWidth / speed}s`;

    // Restart animation
    track.style.animation = "";
  };

  // Build once
  rebuild();

  // Rebuild on resize (debounced)
  let t = 0;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(rebuild, 120);
  });
}

document.addEventListener("DOMContentLoaded", initSeamlessCarousel);
