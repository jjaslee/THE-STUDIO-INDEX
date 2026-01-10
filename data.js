/* ==========================================================================
   1. DATA ARCHIVE (Single Source of Truth)
   ========================================================================== */

const STATUS_LABELS = {
  active:  "In active production.",
  limited: "Limited contemporary run.",
  archival:"No longer in production.",
  unknown: "Availability varies; verify at source."
};


const furnitureData = [
    // --- LIVING ROOM ---
    { 
        id: 'ref-14101', 
        title: 'CHROME SLING CHAIR', 
        aesthetic: 'TECHNICAL', 
        a_code: '1', r_code: '1', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        imgs: [
    'images/ref-14101-1.jpg',
    'images/ref-14101-2.jpg',
    'images/ref-14101-3.jpg'
  ],
        desc: "A masterclass in tension and release. The tubular chrome frame acts as a stark skeleton for the suspended leather seating, embodying the machine-age precision of late modernism.",
        material: "Chrome-plated steel frame, leather sling seat",
origin: "Late-modern / machine-age lineage",
consideration: "Pairs best with matte textures; let negative space do the work.",
status: "active",

        link: "https://example.com/shop/chrome-sling" 
    },
    { 
        id: 'ref-34101', 
        title: 'GLOSSY POLYMER LOUNGER', 
        aesthetic: 'UTOPIAN POP', 
        a_code: '3', r_code: '1', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Playful fluid forms cast in high-shine resin. This piece captures the optimism of the space-age, offering a seamless, ergonomic silhouette that feels both retro and futuristic.",
        link: "https://example.com/shop/polymer-lounger" 
    }
    // ,
    // { 
    //     id: 'ref-24101', 
    //     title: 'CONCRETE CLUB CHAIR', 
    //     aesthetic: 'MONOLITH', 
    //     a_code: '2', r_code: '1', o_code: '1', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Brutalist geometry meets surprisingly ergonomic carving. Cast from fiber-reinforced concrete, its heavy presence anchors a room with the permanence of an architectural monument.",
    //     link: "https://example.com/shop/concrete-chair" 
    // },
    // { 
    //     id: 'ref-54102', 
    //     title: 'MYCELIUM STOOL', 
    //     aesthetic: 'BIOMORPHIC', 
    //     a_code: '5', r_code: '1', o_code: '1', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Grown rather than manufactured, this stool utilizes fungal networks to create a velvety, organic structure that challenges our traditional notions of material sourcing.",
    //     link: "https://example.com/shop/mycelium-stool" 
    // },
    // { 
    //     id: 'ref-26201', 
    //     title: 'RAW STONE CONSOLE', 
    //     aesthetic: 'MONOLITH', 
    //     a_code: '2', r_code: '1', o_code: '2', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "An unyielding slab of slate resting on twin pillars. The rough-hewn edges celebrate the natural geological fracturing of the stone, emphasizing weight and primitive luxury.",
    //     link: "https://example.com/shop/stone-console" 
    // },

    // // --- DINING ROOM ---
    // { 
    //     id: 'ref-21201', 
    //     title: 'TRAVERTINE DINING TABLE', 
    //     aesthetic: 'MONOLITH', 
    //     a_code: '2', r_code: '2', o_code: '2', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "A massive expanse of Italian travertine featuring a soft-honed finish. Its porous texture and neutral palette provide a sophisticated, tactile foundation for communal dining.",
    //     link: "https://example.com/shop/travertine-table" 
    // },
    // { 
    //     id: 'ref-31101', 
    //     title: 'TULIP DINING CHAIR', 
    //     aesthetic: 'UTOPIAN POP', 
    //     a_code: '3', r_code: '2', o_code: '1', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Characterized by its iconic pedestal base, this chair eliminates the visual clutter of four legs, creating a sweeping, flower-like profile in glossy fiberglass.",
    //     link: "https://example.com/shop/tulip-chair" 
    // },
    // { 
    //     id: 'ref-41101', 
    //     title: 'TAPESTRY DINING CHAIR', 
    //     aesthetic: 'SOFT HERITAGE', 
    //     a_code: '4', r_code: '2', o_code: '1', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "A bridge between eras, featuring a hand-woven textile back that references traditional craftsmanship while maintaining a refined, slimline wooden frame.",
    //     link: "https://example.com/shop/tapestry-chair" 
    // },

    // // --- WORKSPACE ---
    // { 
    //     id: 'ref-47201', 
    //     title: 'BURL WOOD DESK', 
    //     aesthetic: 'SOFT HERITAGE', 
    //     a_code: '4', r_code: '3', o_code: '2', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Richly figured walnut burl brings a dizzying, natural complexity to the workspace. Its rounded corners and warm tones evoke a sense of quiet, scholarly luxury.",
    //     link: "https://example.com/shop/burl-desk" 
    // },
    // { 
    //     id: 'ref-17301', 
    //     title: 'ALUMINUM TASK LIGHT', 
    //     aesthetic: 'TECHNICAL', 
    //     a_code: '1', r_code: '3', o_code: '3', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Precision-engineered from aerospace-grade aluminum. Its multi-axis pivot system allows for surgical light placement, ideal for focused creative or technical labor.",
    //     link: "https://example.com/shop/aluminum-light" 
    // },
    // { 
    //     id: 'ref-14401', 
    //     title: 'STEEL MODULAR SHELF', 
    //     aesthetic: 'TECHNICAL', 
    //     a_code: '1', r_code: '3', o_code: '4', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "An industrial-strength storage solution that uses a grid-based interlocking system. Cold-rolled steel finished in a matte powder coat for a clean, lab-like aesthetic.",
    //     link: "https://example.com/shop/steel-shelf" 
    // },

    // // --- BEDROOM ---
    // { 
    //     id: 'ref-45101', 
    //     title: 'VELVET BED FRAME', 
    //     aesthetic: 'SOFT HERITAGE', 
    //     a_code: '4', r_code: '4', o_code: '1', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Upholstered in deep, light-absorbing velvet. The plush, oversized headboard offers a tactile retreat, softening the acoustics and visual lines of the bedroom.",
    //     link: "https://example.com/shop/velvet-bed" 
    // },
    // { 
    //     id: 'ref-35301', 
    //     title: 'ORBITER NIGHT LIGHT', 
    //     aesthetic: 'UTOPIAN POP', 
    //     a_code: '3', r_code: '4', o_code: '3', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "A glowing sphere suspended within a chrome ring. This lamp casts a soft, atmospheric light that mimics a lunar eclipse, bringing a touch of cosmic wonder to the bedside.",
    //     link: "https://example.com/shop/orbiter-light" 
    // },
    // { 
    //     id: 'ref-54301', 
    //     title: 'MELTED GLASS LAMP', 
    //     aesthetic: 'BIOMORPHIC', 
    //     a_code: '5', r_code: '4', o_code: '3', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Hand-blown glass that appears to be frozen in a state of liquefaction. Each piece is unique, refracting light through its irregular, undulating crystalline surface.",
    //     link: "https://example.com/shop/glass-lamp" 
    // },
    // { 
    //     id: 'ref-44601', 
    //     title: 'SILK AREA RUG', 
    //     aesthetic: 'SOFT HERITAGE', 
    //     a_code: '4', r_code: '4', o_code: '5', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Hand-knotted with high-sheen silk fibers, this rug features a gradient wash that shifts with the light, providing a luxurious and gentle underfoot experience.",
    //     link: "https://example.com/shop/silk-rug" 
    // },

    // // --- CORRIDOR ---
    // { 
    //     id: 'ref-27401', 
    //     title: 'HEAVY OAK CABINET', 
    //     aesthetic: 'MONOLITH', 
    //     a_code: '2', r_code: '5', o_code: '4', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Constructed from solid, smoked oak. The handle-less facade emphasizes the grain of the wood, creating a silent, imposing volume for concealed storage.",
    //     link: "https://example.com/shop/oak-cabinet" 
    // },
    // { 
    //     id: 'ref-13701', 
    //     title: 'MACHINED DOOR HANDLE', 
    //     aesthetic: 'TECHNICAL', 
    //     a_code: '1', r_code: '5', o_code: '5', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Every interaction is a reminder of precision. Knurled steel textures provide a tactile grip, reflecting a commitment to high-performance functional hardware.",
    //     link: "https://example.com/shop/door-handle" 
    // },

    // // --- CLOSET ---
    // { 
    //     id: 'ref-66101', 
    //     title: 'WALNUT VALET STAND', 
    //     aesthetic: 'SOFT HERITAGE', 
    //     a_code: '4', r_code: '7', o_code: '4', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "The ultimate gentleman's companion. Sculpted walnut curves provide a dedicated place for a day's attire, blending mid-century elegance with daily utility.",
    //     link: "https://example.com/shop/valet-stand" 
    // },
    // { 
    //     id: 'ref-66201', 
    //     title: 'ACRYLIC HANGER SET', 
    //     aesthetic: 'TECHNICAL', 
    //     a_code: '1', r_code: '7', o_code: '5', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "High-transparency acrylic hangers that make clothing appear as if it is floating. A minimalist approach to organization that emphasizes the garment over the tool.",
    //     link: "https://example.com/shop/hangers" 
    // },

    // // --- EXTERIOR ---
    // { 
    //     id: 'ref-77101', 
    //     title: 'IRON GARDEN BENCH', 
    //     aesthetic: 'SOFT HERITAGE', 
    //     a_code: '4', r_code: '6', o_code: '1', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Weathered wrought iron shaped into a graceful, scrolling silhouette. This bench develops a unique patina over time, integrating perfectly with aged garden landscapes.",
    //     link: "https://example.com/shop/garden-bench" 
    // },

    // // --- GENERAL DECOR ---
    // { 
    //     id: 'ref-53501', 
    //     title: '3D PRINTED SCULPTURE', 
    //     aesthetic: 'BIOMORPHIC', 
    //     a_code: '5', r_code: '1', o_code: '5', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "An algorithmic exploration of bone density and coral growth. This generative sculpture captures the complex beauty of nature through the lens of additive manufacturing.",
    //     link: "https://example.com/shop/3d-sculpture" 
    // },
    // { 
    //     id: 'ref-34501', 
    //     title: 'NEON ACRYLIC VASE', 
    //     aesthetic: 'UTOPIAN POP', 
    //     a_code: '3', r_code: '1', o_code: '5', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "Vibrant neon edges catch the light to create a self-illuminating effect. A bold, chromatic accent that serves as a centerpiece even without floral accompaniment.",
    //     link: "https://example.com/shop/neon-vase" 
    // },
    // { 
    //     id: 'ref-51201', 
    //     title: 'ORGANIC FORM TABLE', 
    //     aesthetic: 'BIOMORPHIC', 
    //     a_code: '5', r_code: '1', o_code: '2', 
    //     img: 'images/ref-14101-1.jpg',
    //     desc: "A low-profile coffee table with an asymmetrical, pebble-like top. Its soft edges and matte finish mimic river-worn stone, bringing a serene fluidity to the living space.",
    //     link: "https://example.com/shop/organic-table" 
    // }
];

