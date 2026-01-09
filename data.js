/* ==========================================================================
   1. DATA ARCHIVE (Single Source of Truth)
   ========================================================================== */
const furnitureData = [
    // --- LIVING ROOM ---
    { 
        id: 'ref-14101', 
        title: 'CHROME SLING CHAIR', 
        aesthetic: 'TECHNICAL', 
        a_code: '1', r_code: '1', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "A masterclass in tension and release. The tubular chrome frame acts as a stark skeleton for the suspended leather seating, embodying the machine-age precision of late modernism.",
        link: "https://example.com/shop/chrome-sling" 
    }, 
    { 
        id: 'ref-34101', 
        title: 'GLOSSY POLYMER LOUNGER', 
        aesthetic: 'UTOPIAN POP', 
        a_code: '3', r_code: '1', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Reflecting the optimism of the space age, this continuous injection-molded form creates a fluid dialogue between user and object. High-gloss finish meets ergonomic experimentation.",
        link: "https://example.com/shop/glossy-lounger" 
    },
    { 
        id: 'ref-24101', 
        title: 'CONCRETE CLUB CHAIR', 
        aesthetic: 'MONOLITH', 
        a_code: '2', r_code: '1', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Raw architectural weight. Cast from glass-fiber reinforced concrete, this piece rejects the notion of temporary furniture, offering a permanent, sculptural presence in the living space.",
        link: "https://example.com/shop/concrete-club" 
    },
    { 
        id: 'ref-54102', 
        title: 'MYCELIUM STOOL', 
        aesthetic: 'BIOMORPHIC', 
        a_code: '5', r_code: '1', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Grown rather than built. This stool utilizes root networks to bind agricultural waste into a solid form, representing the future of regenerative design and soft, organic texture.",
        link: "https://example.com/shop/mycelium-stool" 
    },
    { 
        id: 'ref-26201', 
        title: 'RAW STONE CONSOLE', 
        aesthetic: 'MONOLITH', 
        a_code: '2', r_code: '1', o_code: '2', 
        img: 'images/ref-14101-1.jpg',
        desc: "Unpolished and unapologetic. The rough-hewn edges of this console contrast with the smooth functionality of its surface, highlighting the inherent geological history of the material.",
        link: "https://example.com/shop/stone-console" 
    },

    // --- DINING ROOM ---
    { 
        id: 'ref-21201', 
        title: 'TRAVERTINE DINING TABLE', 
        aesthetic: 'MONOLITH', 
        a_code: '2', r_code: '2', o_code: '2', 
        img: 'images/ref-14101-1.jpg',
        desc: "A monolithic anchor for the dining space. The porous nature of unfilled travertine offers a tactile landscape, grounding the room in ancient materiality.",
        link: "https://example.com/shop/travertine-table" 
    },
    { 
        id: 'ref-31101', 
        title: 'TULIP DINING CHAIR', 
        aesthetic: 'UTOPIAN POP', 
        a_code: '3', r_code: '2', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "The quest to eliminate the 'slum of legs.' A single pedestal base supports a flowering seat shell, creating a seamless, organic silhouette that defined mid-century futurism.",
        link: "https://example.com/shop/tulip-chair" 
    },
    { 
        id: 'ref-41101', 
        title: 'TAPESTRY DINING CHAIR', 
        aesthetic: 'SOFT HERITAGE', 
        a_code: '4', r_code: '2', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Woven narratives. The intricate jacquard upholstery brings a layer of visual warmth and historical depth, counterbalancing the clean lines of modern dining tables.",
        link: "https://example.com/shop/tapestry-chair" 
    },

    // --- WORKSPACE ---
    { 
        id: 'ref-47201', 
        title: 'BURL WOOD DESK', 
        aesthetic: 'SOFT HERITAGE', 
        a_code: '4', r_code: '3', o_code: '2', 
        img: 'images/ref-14101-1.jpg',
        desc: "Nature's chaotic grain contained in rigid geometry. The highly figured burl veneer transforms a functional workspace into a study of natural patterns and warm tones.",
        link: "https://example.com/shop/burl-desk" 
    },
    { 
        id: 'ref-17301', 
        title: 'ALUMINUM TASK LIGHT', 
        aesthetic: 'TECHNICAL', 
        a_code: '1', r_code: '3', o_code: '3', 
        img: 'images/ref-14101-1.jpg',
        desc: "Precision engineered articulation. Inspired by drafting tools, the spring-balanced arm and machined aluminum shade offer directed light with clinical accuracy.",
        link: "https://example.com/shop/task-light" 
    },
    { 
        id: 'ref-14401', 
        title: 'STEEL MODULAR SHELF', 
        aesthetic: 'TECHNICAL', 
        a_code: '1', r_code: '3', o_code: '4', 
        img: 'images/ref-14101-1.jpg',
        desc: "The beauty of utility. Folded steel sheets, powder-coated for durability, form a grid that celebrates the objects it holds rather than the structure itself.",
        link: "https://example.com/shop/steel-shelf" 
    },

    // --- BEDROOM ---
    { 
        id: 'ref-45101', 
        title: 'VELVET BED FRAME', 
        aesthetic: 'SOFT HERITAGE', 
        a_code: '4', r_code: '4', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Plush minimalism. The heavy velvet upholstery absorbs light and sound, creating a sanctuary of softness that acts as a visual and tactile retreat.",
        link: "https://example.com/shop/velvet-bed" 
    },
    { 
        id: 'ref-35301', 
        title: 'ORBITER NIGHT LIGHT', 
        aesthetic: 'UTOPIAN POP', 
        a_code: '3', r_code: '4', o_code: '3', 
        img: 'images/ref-14101-1.jpg',
        desc: "A satellite for the bedside. The spherical chrome shade rotates freely within its magnetic socket, allowing for playful interaction and directional lighting control.",
        link: "https://example.com/shop/orbiter-light" 
    },
    { 
        id: 'ref-54301', 
        title: 'MELTED GLASS LAMP', 
        aesthetic: 'BIOMORPHIC', 
        a_code: '5', r_code: '4', o_code: '3', 
        img: 'images/ref-14101-1.jpg',
        desc: "Frozen fluidity. Hand-blown glass that appears to slump under gravity's pull, capturing the state between liquid and solid in a warm, ambient glow.",
        link: "https://example.com/shop/melted-lamp" 
    },
    { 
        id: 'ref-44601', 
        title: 'SILK AREA RUG', 
        aesthetic: 'SOFT HERITAGE', 
        a_code: '4', r_code: '4', o_code: '5', 
        img: 'images/ref-14101-1.jpg',
        desc: "Understated luxury. Hand-knotted silk offers a shifting sheen that changes with the light, providing a soft, noise-dampening foundation for the bedroom.",
        link: "https://example.com/shop/silk-rug" 
    },

    // --- CORRIDOR ---
    { 
        id: 'ref-27401', 
        title: 'HEAVY OAK CABINET', 
        aesthetic: 'MONOLITH', 
        a_code: '2', r_code: '5', o_code: '4', 
        img: 'images/ref-14101-1.jpg',
        desc: "Solid wood storage with a brutalist edge. The seamless joinery and significant weight of the doors emphasize privacy and protection for stored objects.",
        link: "https://example.com/shop/oak-cabinet" 
    },
    { 
        id: 'ref-13701', 
        title: 'MACHINED DOOR HANDLE', 
        aesthetic: 'TECHNICAL', 
        a_code: '1', r_code: '5', o_code: '5', 
        img: 'images/ref-14101-1.jpg',
        desc: "Tactile interaction. A knurled brass texture ensures a secure grip, turning the mundane act of opening a door into a moment of industrial appreciation.",
        link: "https://example.com/shop/door-handle" 
    },

    // --- CLOSET ---
    { 
        id: 'ref-66101', 
        title: 'WALNUT VALET STAND', 
        aesthetic: 'SOFT HERITAGE', 
        a_code: '4', r_code: '7', o_code: '4', 
        img: 'images/ref-14101-1.jpg',
        desc: "The gentleman's butler, reimagined. Smooth walnut contours provide a dedicated space for daily rituals, preserving the shape of garments with quiet elegance.",
        link: "https://example.com/shop/valet-stand" 
    },
    { 
        id: 'ref-66201', 
        title: 'ACRYLIC HANGER SET', 
        aesthetic: 'TECHNICAL', 
        a_code: '1', r_code: '7', o_code: '5', 
        img: 'images/ref-14101-1.jpg',
        desc: "Ghost hardware. Crystal clear acrylic allows the garment to float visually, removing visual clutter from the closet while maintaining structural integrity.",
        link: "https://example.com/shop/acrylic-hangers" 
    },

    // --- EXTERIOR ---
    { 
        id: 'ref-77101', 
        title: 'IRON GARDEN BENCH', 
        aesthetic: 'SOFT HERITAGE', 
        a_code: '4', r_code: '6', o_code: '1', 
        img: 'images/ref-14101-1.jpg',
        desc: "Timeless oxidation. Inspired by Victorian park seating, this iron bench is designed to weather gracefully, developing a patina that tells the story of the seasons.",
        link: "https://example.com/shop/garden-bench" 
    },

    // --- GENERAL DECOR ---
    { 
        id: 'ref-53501', 
        title: '3D PRINTED SCULPTURE', 
        aesthetic: 'BIOMORPHIC', 
        a_code: '5', r_code: '1', o_code: '5', 
        img: 'images/ref-14101-1.jpg',
        desc: "Algorithmic complexity. Layer by layer, this form mimics the growth patterns of coral, achieving geometries impossible through traditional casting methods.",
        link: "https://example.com/shop/3d-sculpture" 
    },
    { 
        id: 'ref-34501', 
        title: 'NEON ACRYLIC VASE', 
        aesthetic: 'UTOPIAN POP', 
        a_code: '3', r_code: '1', o_code: '5', 
        img: 'images/ref-14101-1.jpg',
        desc: "Electric transparency. The fluorescent edges of this acrylic vessel catch UV light, creating a glowing perimeter that frames floral arrangements in synthetic vibrance.",
        link: "https://example.com/shop/neon-vase" 
    },
    { 
        id: 'ref-51201', 
        title: 'ORGANIC FORM TABLE', 
        aesthetic: 'BIOMORPHIC', 
        a_code: '5', r_code: '1', o_code: '2', 
        img: 'images/ref-14101-1.jpg',
        desc: "Amoebic geometry. The freeform top rejects straight lines, creating a dynamic flow that encourages movement around the piece rather than rigid placement.",
        link: "https://example.com/shop/organic-table" 
    },
];


