import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import {
  BedDouble,
  Camera,
  Sparkles,
  Home as HomeIcon,
  MessageSquare,
  Mountain,
  MountainSnow,
  ShieldCheck,
  Recycle,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Lock,
  CheckCircle2,
  Send,
  CalendarDays,
  Handshake,
  UtensilsCrossed,
  Helicopter,
  CarFront,
  FlameKindling,
  SquareParking,
  Leaf,
  Flower2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Users,
  ScrollText,
  CalendarX,
  Baby,
  PawPrint,
  Wrench,
  Ban,
  AlertTriangle,
  ArrowUp,
} from "lucide-react";
import shivLogo from "./assets/images/client/logo-new.jpg";
import aboutLandscape from "./assets/images/client/about-landscape.jpg";
import ownerGovindDhami from "./assets/images/client/owner-govind-singh-dhami.jpg";
import guestsTeaBalcony from "./assets/images/client/guests-tea-balcony.jpg";
import guestsMountainView from "./assets/images/client/guests-mountain-view.jpg";
import roomTwinBeds from "./assets/images/client/room-twin-beds.jpg";
import terraceNightWide from "./assets/images/client/terrace-night-wide.jpg";
import terracePlantsStairs from "./assets/images/client/terrace-plants-stairs.jpg";
import roomTwin1 from "./assets/images/client/room-twin-1.jpg";
import roomTriple from "./assets/images/client/room-triple.jpg";
import roomTwin2 from "./assets/images/client/room-twin-2.jpg";
import bathroomClean from "./assets/images/client/bathroom-clean.jpg";
import welcomePoojaGuests from "./assets/images/client/welcome-pooja-guests.jpg";
import adiKailashPeakHd from "./assets/images/client/adi-kailash-peak-hd.webp";
import adiKailashUserPortrait from "./assets/images/client/adi-kailash-user-portrait.jpg";
import omParvatNabhidhangHd from "./assets/images/client/om-parvat-nabhidhang-hd.webp";

// Brand logo and owner profile images
const logoImg = shivLogo;

// Extra local images for Why Stay cards and experience section
const whyHimalayanImg = aboutLandscape;
const roomCardImg = roomTwinBeds;
const kedarImg = guestsMountainView;
const peacefulImg = terracePlantsStairs;
const foodImg = welcomePoojaGuests;

// ─── EMAILJS CONFIG ───────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_e4gi90r";
const EMAILJS_PUBLIC_KEY = "cqWBlZliX0aLNQQDB";
const EMAILJS_BOOKING_TEMPLATE = "template_r4zfcvr";

// ─── WHATSAPP BOOKING & ENQUIRY ─────────────────────────────────────────────
const WA_NUMBER = "919410135726";
const WA_NUMBER_2 = "919456761865";
const PHONE_1_DISPLAY = "+91 94101 35726";
const PHONE_2_DISPLAY = "+91 94567 61865";

const WA_BOOKING_MESSAGE = [
  "Namaste Govind Singh Dhami ji! 🙏",
  "I would like to enquire about staying at Shiv Darshan Homestay, Haat, Dharchula (Uttarakhand).",
  "",
  "📅 Check-in Date: ",
  "📅 Check-out Date: ",
  "👥 Number of Guests: ",
  "🛏️ Preferred Room Type: ",
  "",
  "Please share availability, rates, and guidance for the Adi Kailash & Om Parvat yatra. Thank you!",
  "",
  "🌹🙏 शिव दर्शन होम स्टे 🙏🌹",
  "हाट, धारचूला देहात, पिथौरागढ़ (उत्तराखंड)",
  "स्वामी: गोविंद सिंह धामी",
  "संपर्क सूत्र: 9410135726 / 9456761865",
  "",
  "हमारे होम स्टे से इनर लाइन परमिट और आदि कैलाश ॐ पर्वत के लिए संपूर्ण सुविधा उपलब्ध है 🙏",
  "🌹🙏 अतिथि देवो भवः · हर हर महादेव 🚩🙏"
].join("\n");

const getWaUrl = (number = WA_NUMBER, customMsg = WA_BOOKING_MESSAGE) =>
  `https://wa.me/${number}?text=${encodeURIComponent(customMsg)}`;

const WA_BOOKING_URL = getWaUrl(WA_NUMBER);
const WA_BOOKING_URL_2 = getWaUrl(WA_NUMBER_2);

// Exact Google Maps listing for Shiv Darshan Homestay
const MAPS_URL = "https://maps.app.goo.gl/rQN7wv5mMmsVjdkQ6?g_st=aw";
const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/rQN7wv5mMmsVjdkQ6?g_st=aw";
const INSTAGRAM_URL = "https://instagram.com/shiv__darshan12345?utm_source=qr&mdxt=bHg3bnRxNWc2djE2";

// Helper: sends email via EmailJS REST API (no npm package needed)
async function sendEmail(templateId, templateParams) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });
  if (!res.ok) throw new Error("EmailJS failed: " + res.status);
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const ROOMS = [
  {
    id: 1,
    name: "Himalayan Suite",
    type: "Deluxe",
    price: 3500,
    available: true,
    maxGuests: 3,
    description:
      "Wake up to breathtaking Himalayan peaks. Spacious suite with panoramic mountain views, premium bedding, and a private sit-out.",
    amenities: [
      "Mountain View",
      "WiFi",
      "Hot Water",
      "Heater",
      "Attached Bath",
      "Room Service",
    ],
    images: [roomCardImg],
    badge: "Most Popular",
  },
  {
    id: 2,
    name: "Valley Standard Room",
    type: "Standard",
    price: 2000,
    available: true,
    maxGuests: 2,
    description:
      "Cozy and peaceful room overlooking the lush Dharchula valley. Perfect for couples and solo adventurers seeking rest and warmth.",
    amenities: ["Valley View", "Twin Bedding", "Hot Water", "Attached Bath", "Terrace Access"],
    images: [roomTwin1, roomTwin2, bathroomClean],
    badge: null,
  },
  {
    id: 3,
    name: "Pilgrim & Family Suite",
    type: "Shared",
    price: 1200,
    available: true,
    maxGuests: 4,
    description:
      "Spacious triple bed room designed for pilgrims and family groups traveling on the sacred Adi Kailash & Om Parvat route.",
    amenities: ["Triple Beds", "Hot Water", "Attached Bath", "Pooja Welcome", "Tea Service"],
    images: [roomTriple, roomTwinBeds, bathroomClean],
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Kailash View Terrace Room",
    type: "Super Deluxe",
    price: 3800,
    available: true,
    maxGuests: 4,
    description:
      "Premium homestay room with direct access to our grand scenic terrace. Enjoy sunrise over the Himalayan peaks and evening stargazing.",
    amenities: [
      "Terrace View",
      "Large Balcony",
      "Hot Water",
      "Attached Bath",
      "Free Parking",
      "Home-cooked Food",
    ],
    images: [terraceNightWide, guestsTeaBalcony, roomTwinBeds],
    badge: "Terrace View",
  },
];

const TESTIMONIALS = [
  {
    name: "Prashant Chauhan",
    location: "Delhi",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Prashant",
    text: "Perfect base for the Adi Kailash yatra. The Himalayan peak view from our room was unreal, and the home-cooked local food after a long trek felt like a blessing. Clean rooms, kind hosts — I can't wait to come back.",
  },
  {
    name: "Mayur Patil",
    location: "Chandigarh",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Mayur",
    text: "Hot water at 5am before the trek, honest advice on timings, and a bonfire with chai and mountain stories at night. Shiv Darshan Homestay takes care of everything so you only have to enjoy the yatra.",
  },
  {
    name: "Priya",
    location: "Dehradun",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Priya",
    text: "I drove up from Dehradun with my parents for a quiet break and got so much more. We spent mornings on village walks and evenings around the bonfire, and the home-cooked food tasted just like a meal at my nani's place. None of us wanted to leave.",
  },
  {
    name: "Sweta",
    location: "Lucknow",
    rating: 4,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Sweta",
    text: "Traveling solo from Lucknow, I was nervous about staying in a homestay — within a day, the family had me feeling like one of their own. They arranged my cab and helped plan every little detail. The network in my room was patchy, but honestly? It gave me the digital detox I didn't know I needed.",
  },
  {
    name: "Ammi",
    location: "USA",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Ammi",
    text: "I came here for yoga and found real peace and nature here. Morning practice with the Himalayas in view, birdsong instead of traffic, and meals straight from the garden. I'm leaving calmer than I've ever been.",
  },
  {
    name: "Juliana",
    location: "Goa",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Juliana",
    text: "I traded Goa's beaches for the Himalayas and I'd do it again tomorrow. What stays with me isn't just the Adi Kailash darshan — it's the hot chai after long walks, dinner with the family, and sunsets over the valley. This place has a piece of my heart.",
  },
  {
    name: "Rahul Sharma",
    location: "Noida",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Rahul",
    text: "यहाँ का अनुभव बहुत ही शानदार रहा। परिवार जैसा माहौल, साफ-सुथरे कमरे और घर का बना स्वादिष्ट खाना। पहाड़ों का नज़ारा मन मोह लेने वाला है। मैं फिर से आना चाहूँगा।",
  },
  {
    name: "Anita Joshi",
    location: "Almora",
    rating: 5,
    photo: "https://api.dicebear.com/9.x/micah/svg?seed=Anita",
    text: "शिव दर्शन होम स्टे में रुकना एक बेहतरीन अनुभव था। यहाँ के मेज़बान गोविंद सिंह धामी जी बहुत ही मिलनसार हैं। रात को खुले टेरेस पर चाय के साथ उनकी कहानियाँ सुनना बहुत अच्छा लगा। आदि कैलाश यात्रा के लिए एकदम सही जगह है।",
  },
];

const GALLERY = [
  { url: guestsMountainView, cat: "Views", label: "Himalayan Valley View" },
  { url: guestsTeaBalcony, cat: "Guests", label: "Morning Balcony Chai" },
  { url: welcomePoojaGuests, cat: "Guests", label: "Atithi Devo Bhava Welcome" },
  { url: terraceNightWide, cat: "Views", label: "Evening Terrace Serenity" },
  { url: terracePlantsStairs, cat: "Surroundings", label: "Decorated Staircase & Plants" },
  { url: roomTwinBeds, cat: "Rooms", label: "Deluxe Twin Bedroom" },
  { url: roomTriple, cat: "Rooms", label: "Spacious Family Room" },
  { url: roomTwin1, cat: "Rooms", label: "Comfortable Beds & Quilts" },
  { url: roomTwin2, cat: "Rooms", label: "Twin Room Layout" },
  { url: bathroomClean, cat: "Rooms", label: "Sparkling Clean Bathroom" },
  { url: aboutLandscape, cat: "Surroundings", label: "Haat Dharchula Mountains" },
  { url: shivLogo, cat: "Views", label: "Shiv Darshan Homestay" },
];

// All room photos shown on the "See More Images" page
const ROOM_PHOTOS = [
  roomTwinBeds,
  roomTriple,
  roomTwin1,
  roomTwin2,
  bathroomClean,
  terraceNightWide,
  terracePlantsStairs,
  guestsTeaBalcony,
  guestsMountainView,
  welcomePoojaGuests,
  aboutLandscape,
];

const SERVICES = [
  {
    Icon: UtensilsCrossed,
    title: "Home-Cooked Meals",
    desc: "Authentic Kumaoni cuisine made with local ingredients. Breakfast, lunch & dinner available.",
  },
  {
    Icon: Helicopter,
    title: "Helipad Near: 4 km",
    desc: "Helipad just 4 km from the property — perfect for heli-yatra to Adi Kailash and quick mountain transfers.",
  },
  {
    Icon: CarFront,
    title: "Pickup & Drop",
    desc: "We can arrange a cab for local visits and nearby sightseeing on request.",
  },
  {
    Icon: FlameKindling,
    title: "Bonfire Evenings",
    desc: "Cozy evening bonfires under the stars with chai, local music and mountain stories.",
  },
  {
    Icon: SquareParking,
    title: "Free Parking",
    desc: "Secure on-site parking for cars and bikes.",
  },
  {
    Icon: Leaf,
    title: "Nature Walks",
    desc: "Guided morning walks through the village and to the local temple, with stories of mountain life.",
  },
  {
    Icon: Mountain,
    title: "Serene Himalayan View",
    desc: "Wake up to a serene, unobstructed view of the Himalayan peaks right from the property.",
  },
  {
    Icon: Flower2,
    title: "Nature & Serenity",
    desc: "Enjoy a peaceful stay surrounded by greenery, mountains, and the sounds of nature.",
  },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const CSS = `
  /* Google Fonts are loaded via <link> in public/index.html (non-blocking) */


  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
  }

  :root {
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-serif: 'Playfair Display', Georgia, serif;
    --ice: #e8f4f8;
    --snow: #f7fbfc;
    --glacier: #c5dde8;
    --peak: #1a3a4a;
    --pine: #2d5a3d;
    --gold: #c8963e;
    --rust: #b5451b;
    --text: #1c2b35;
    --muted: #5a7380;
    --border: #d0e4ec;
    --card: rgba(255,255,255,0.92);
    --shadow: 0 4px 32px rgba(26,58,74,0.12);
    --shadow-lg: 0 16px 64px rgba(26,58,74,0.2);
    --radius: 16px;
    --radius-sm: 8px;
    --transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  /* Anchor jumps land just clear of the fixed navbar; the glide between them is
     driven in JS (see glideTo) so one even pace covers any distance. */
  html { scroll-behavior: smooth; scroll-padding-top: 28px; }
  /* Phones carry a taller navbar over shallower section padding, so they need a
     bigger offset to land headings clear of it rather than under it. */
  @media (max-width: 768px) { html { scroll-padding-top: 56px; } }

  /* ── SCROLLYTELLING COMPONENT REVEAL ──
     Blocks marked .reveal ease up gracefully as they enter the viewport,
     giving an immersive storytelling progression as the user scrolls. */
  .reveal {
    opacity: 0;
    transform: translate3d(0, 32px, 0) scale(0.985);
    transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  /* Storytelling stagger for list items & cards within revealed sections */
  .reveal.is-visible .why-card {
    animation: scrollyItemRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .reveal.is-visible .why-card:nth-child(1) { animation-delay: 0.04s; }
  .reveal.is-visible .why-card:nth-child(2) { animation-delay: 0.10s; }
  .reveal.is-visible .why-card:nth-child(3) { animation-delay: 0.16s; }
  .reveal.is-visible .why-card:nth-child(4) { animation-delay: 0.22s; }
  .reveal.is-visible .why-card:nth-child(5) { animation-delay: 0.28s; }
  .reveal.is-visible .service-card {
    animation: scrollyItemRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .reveal.is-visible .service-card:nth-child(1) { animation-delay: 0.04s; }
  .reveal.is-visible .service-card:nth-child(2) { animation-delay: 0.10s; }
  .reveal.is-visible .service-card:nth-child(3) { animation-delay: 0.16s; }
  .reveal.is-visible .service-card:nth-child(4) { animation-delay: 0.22s; }
  .reveal.is-visible .service-card:nth-child(5) { animation-delay: 0.28s; }
  .reveal.is-visible .service-card:nth-child(6) { animation-delay: 0.34s; }
  .reveal.is-visible .service-card:nth-child(7) { animation-delay: 0.40s; }
  .reveal.is-visible .service-card:nth-child(8) { animation-delay: 0.46s; }

  @keyframes scrollyItemRise {
    from { opacity: 0; transform: translate3d(0, 18px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  /* Reduced motion: no glide and no reveal — everything is simply already there */
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .reveal { opacity: 1; transform: none; transition: none; }
    .reveal.is-visible .service-card { animation: none; opacity: 1; transform: none; }
  }

  body {
    font-family: var(--font-sans);
    background: var(--snow);
    color: var(--text);
    line-height: 1.6;
    letter-spacing: -0.01em;
    overflow-x: clip;
    position: relative;
    width: 100%;
  }

  h1,h2,h3,h4 { font-family: var(--font-serif); line-height: 1.2; letter-spacing: -0.015em; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--ice); }
  ::-webkit-scrollbar-thumb { background: var(--glacier); border-radius: 3px; }

  /* ── NAVBAR ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 70px;
    transition: var(--transition);
    width: 100%;
    max-width: 100%;
  }
  .nav.scrolled {
    background: rgba(26,58,74,0.96);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.2);
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .nav-logo-icon { font-size: 1.6rem; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; background: #ffffff; border-radius: 50%; padding: 0; box-shadow: 0 3px 10px rgba(0,0,0,0.35); flex-shrink: 0; overflow: hidden; }
  .nav-logo-img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 50%; }
  .nav-logo-text { color: white; font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; line-height: 1.1; letter-spacing: -0.01em; }
  .nav-logo-sub { font-size: 0.65rem; letter-spacing: 0.15em; font-family: var(--font-sans); font-weight: 400; opacity: 0.85; color:white; }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-links a { color: rgba(255,255,255,0.88); text-decoration: none; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.02em; transition: color 0.2s; }
  .nav-links a:hover { color: var(--gold); }
  .nav-cta {
    background: var(--gold); color: var(--peak) !important; padding: 0.5rem 1.25rem;
    border-radius: 50px; font-weight: 600 !important; transition: var(--transition) !important;
  }
  .nav-cta:hover { background: #e0a845 !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(200,150,62,0.4); }
  .nav-hamburger { display: none; background: none; border: none; cursor: pointer; color: white; font-size: 1.4rem; padding: 0.5rem; margin: -0.5rem; }

  @media (max-width: 768px) {
    /* Phone: extra breathing room so the logo and menu button don't hug the top edge */
    .nav { height: 80px; padding: 8px 1.25rem; }
    .nav-links { display: none; }
    .nav-hamburger { display: block; }
    .nav-links.open {
      display: flex; flex-direction: column; position: absolute;
      top: 80px; left: 0; right: 0; padding: 1.5rem 2rem 2rem;
      background: rgba(26,58,74,0.98); backdrop-filter: blur(12px);
      gap: 1.25rem; align-items: flex-start;
    }
    /* Mobile menu: each link stretches across the full row, so tapping the
       blank space beside the label works too — not just the text itself.
       Extra vertical padding also gives a comfortable thumb-sized target. */
    .nav-links.open a {
      display: block; width: 100%;
      padding: 0.6rem 0;
      border-radius: 8px;
    }
    .nav-links.open a:active { background: rgba(255,255,255,0.1); }
    /* The Directions pill keeps its shape but also spans the full row */
    .nav-links.open .nav-cta { text-align: center; padding: 0.6rem 1.25rem; }
  }

  /* ── PRELOADER (3-SECOND CIRCULAR LOGO ANIMATION) ── */
  .site-preloader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #06131c;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.65s ease;
  }
  .site-preloader.is-fading {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .preloader-content {
    text-align: center;
    padding: 2rem;
    animation: heroItemRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .preloader-logo-wrap {
    position: relative;
    width: 116px;
    height: 116px;
    margin: 0 auto 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .preloader-spinner-outer {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--gold);
    border-right-color: var(--gold);
    box-shadow: 0 0 20px rgba(200, 150, 62, 0.45);
    animation: preloaderSpin 1.4s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
  }
  .preloader-spinner-inner {
    position: absolute;
    inset: -15px;
    border-radius: 50%;
    border: 1.5px dashed rgba(200, 150, 62, 0.38);
    animation: preloaderSpinRev 3.5s linear infinite;
  }
  @keyframes preloaderSpin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes preloaderSpinRev {
    0%   { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  .preloader-logo-img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 25px rgba(200, 150, 62, 0.35);
    animation: preloaderPulse 2.2s ease-in-out infinite;
  }
  @keyframes preloaderPulse {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50%      { transform: scale(1.04); filter: brightness(1.12); }
  }
  .preloader-title {
    font-family: var(--font-serif);
    font-size: 1.7rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin-bottom: 0.35rem;
    text-shadow: 0 2px 14px rgba(0,0,0,0.6);
  }
  .preloader-sub {
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.85rem;
    font-weight: 600;
  }
  .preloader-mantra {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: 0.05em;
  }

  /* ── SCROLLYTELLING CURTAIN & PINNED HERO ── */
  .hero-scroll-pin {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100svh;
    z-index: 1;
    overflow: hidden;
    background: #071520;
  }
  .hero {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 85px 1.5rem 2rem;
    box-sizing: border-box;
  }
  .hero-stage {
    position: absolute;
    inset: -3%;
    width: 106%;
    height: 106%;
    overflow: hidden;
    z-index: 0;
    background: #06131c;
    will-change: transform;
    pointer-events: none;
  }
  .hero-scene-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.85s cubic-bezier(0.33, 1, 0.68, 1), transform 0.85s cubic-bezier(0.33, 1, 0.68, 1);
    will-change: opacity, transform;
    pointer-events: none;
  }
  .hero-scene-layer.is-active {
    opacity: 1;
    visibility: visible;
  }
  .hero-img {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    filter: contrast(1.04) brightness(0.95);
    will-change: transform;
  }
  /* Ken Burns motion: authentic, slow, restrained breathing */
  .hero-scene-layer.scene-adi.is-active .hero-img {
    animation: kenBurnsAdi 24s ease-in-out infinite alternate;
  }
  .hero-scene-layer.scene-om.is-active .hero-img {
    animation: kenBurnsOm 24s ease-in-out infinite alternate;
  }
  @keyframes kenBurnsAdi {
    0%   { transform: scale(1.0) translate3d(0, 0, 0); }
    100% { transform: scale(1.045) translate3d(0.8%, -0.8%, 0); }
  }
  @keyframes kenBurnsOm {
    0%   { transform: scale(1.045) translate3d(-0.6%, 0.6%, 0); }
    100% { transform: scale(1.0) translate3d(0, 0, 0); }
  }

  /* Desktop vs Mobile art direction for Adi Kailash */
  .hero-img-desktop {
    display: block !important;
    object-position: center 30%;
  }
  .hero-img-mobile {
    display: none !important;
    object-position: center 20%;
  }
  /* Om Parvat framing: centered on the sacred natural ॐ snow ridge */
  .hero-img-om {
    display: block;
    object-position: center 32%;
  }

  @media (max-width: 768px) {
    .hero-img-desktop { display: none !important; }
    .hero-img-mobile { display: block !important; }
    .hero-img-om { object-position: 50% 18% !important; }
  }

  /* Editorial Contrast Layer */
  .hero-overlay {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 36%, rgba(8, 22, 32, 0.08) 0%, rgba(8, 22, 32, 0.44) 62%, rgba(5, 15, 23, 0.85) 100%),
      linear-gradient(180deg, rgba(6, 17, 26, 0.65) 0%, rgba(6, 17, 26, 0.16) 26%, rgba(6, 17, 26, 0.46) 66%, rgba(5, 14, 21, 0.94) 100%);
    z-index: 2;
    pointer-events: none;
  }

  /* Gentle Snow Fall Layer */
  .hero-snow {
    position: absolute; inset: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }
  .hero-snow span {
    position: absolute; top: -5%;
    display: block; border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.55);
    animation: snowFall linear infinite;
    will-change: transform, opacity;
  }
  @keyframes snowFall {
    0%   { transform: translate3d(0, -15px, 0); opacity: 0; }
    12%  { opacity: 0.95; }
    50%  { transform: translate3d(22px, 55vh, 0); }
    88%  { opacity: 0.8; }
    100% { transform: translate3d(-16px, 110vh, 0); opacity: 0; }
  }

  /* ── THE MAJESTIC SCROLLYTELLING CURTAIN WRAPPER ── */
  .curtain-content-wrapper {
    position: relative;
    z-index: 10;
    background: var(--snow);
    border-radius: 36px 36px 0 0;
    box-shadow: 0 -25px 60px rgba(0, 0, 0, 0.5);
    border-top: 1.5px solid rgba(200, 150, 62, 0.4);
    will-change: transform;
  }
  @media (max-width: 768px) {
    .curtain-content-wrapper {
      border-radius: 26px 26px 0 0;
    }
  }

  /* ── GLOBAL SCROLLYTELLING READING BAR ── */
  .scrolly-reading-bar {
    position: fixed; top: 0; left: 0; height: 3.5px;
    background: linear-gradient(90deg, #c8963e, #f5d070, #ffffff);
    box-shadow: 0 0 12px rgba(245, 208, 112, 0.85), 0 0 24px rgba(200, 150, 62, 0.6);
    z-index: 10001;
    pointer-events: none;
    transition: width 0.08s linear;
    will-change: width;
  }

  /* ── SCROLLYTELLING CHAPTER PILL ── */
  .scrolly-chapter {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200, 150, 62, 0.12);
    border: 1px solid rgba(200, 150, 62, 0.38);
    color: var(--gold);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.32rem 1rem; border-radius: 50px;
    margin-bottom: 0.85rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 14px rgba(200, 150, 62, 0.16);
    transition: all 0.3s ease;
  }
  .scrolly-chapter:hover {
    background: rgba(200, 150, 62, 0.2);
    border-color: var(--gold);
    transform: translateY(-1px);
  }
  .scrolly-chapter::before {
    content: "✦";
    color: var(--gold);
    font-size: 0.8rem;
  }

  /* Staggered Cinematic Foreground Content */
  .hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    padding: 0 1.5rem;
    max-width: 980px;
    margin: 0 auto;
    will-change: transform, opacity;
  }

  @keyframes heroItemRise {
    from {
      opacity: 0;
      transform: translate3d(0, 22px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  /* Eyebrow badge */
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(10, 26, 38, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: rgba(255, 255, 255, 0.92);
    padding: 0.42rem 1.3rem;
    border-radius: 50px;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 1.1rem;
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    animation: heroItemRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }
  .hero-eyebrow-accent {
    color: var(--gold);
    font-size: 0.82rem;
  }

  /* Main Headline: "Where the Himalayas Touch the Divine" */
  .hero-headline {
    font-family: var(--font-serif);
    font-size: clamp(2.35rem, 5.6vw, 4.6rem);
    font-weight: 700;
    color: #ffffff;
    line-height: 1.12;
    letter-spacing: -0.015em;
    margin-bottom: 0.65rem;
    text-shadow: 0 3px 28px rgba(0, 0, 0, 0.6);
    animation: heroItemRise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
  }

  /* Highlight: "Adi Kailash & Om Parvat" with dynamic Himalayan gold shimmer */
  .hero-highlight {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    font-family: var(--font-serif);
    font-size: clamp(1.35rem, 3.2vw, 2.3rem);
    font-weight: 600;
    margin-bottom: 1.1rem;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
    animation: heroItemRise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
  }
  .hero-hl-gold {
    color: var(--gold);
    font-style: italic;
    transition: color 0.4s ease;
  }
  .hero-hl-sub {
    color: rgba(255, 255, 255, 0.88);
    transition: color 0.4s ease;
  }
  .hero-hl-sep {
    color: rgba(200, 150, 62, 0.65);
    font-weight: 400;
  }

  /* Supporting editorial copy */
  .hero-supporting-copy {
    font-size: clamp(0.96rem, 2vw, 1.15rem);
    color: rgba(255, 255, 255, 0.92);
    font-family: var(--font-sans);
    font-weight: 400;
    line-height: 1.6;
    max-width: 760px;
    margin: 0 auto 1.6rem;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    transition: opacity 0.45s ease;
    animation: heroItemRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
  }

  /* Interactive Destination Selector */
  .hero-dest-selector {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: rgba(8, 22, 33, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 5px;
    border-radius: 50px;
    margin-bottom: 1.85rem;
    backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    animation: heroItemRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: 100%;
    box-sizing: border-box;
  }
  .hero-dest-tab {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.52rem 1.15rem;
    border-radius: 50px;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(255, 255, 255, 0.85);
    font-family: var(--font-sans);
    font-size: 0.84rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
    -webkit-tap-highlight-color: transparent;
  }
  .hero-dest-tab:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
  .hero-dest-tab:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }
  .hero-dest-tab.is-active {
    background: linear-gradient(135deg, #e5b35a 0%, #c8963e 50%, #ad7d2b 100%);
    color: #071520;
    font-weight: 700;
    box-shadow: 0 4px 18px rgba(200, 150, 62, 0.45);
    border-color: rgba(255, 255, 255, 0.3);
  }
  .hero-dest-emoji {
    font-size: 1.05rem;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    transition: transform 0.25s ease;
  }
  .hero-dest-tab:hover .hero-dest-emoji {
    transform: scale(1.16);
  }
  .hero-dest-badge {
    font-size: 0.68rem;
    opacity: 0.9;
    padding: 1px 7px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.18);
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .hero-dest-tab.is-active .hero-dest-badge {
    background: rgba(7, 21, 32, 0.25);
    color: #071520;
  }

  /* Dual Action Hero CTAs */
  .hero-cta-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.85rem;
    flex-wrap: wrap;
    animation: heroItemRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both;
  }
  .hero-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    background: linear-gradient(135deg, #e5b35a 0%, #c8963e 50%, #ad7d2b 100%);
    color: #071520;
    padding: 0.86rem 2rem;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    box-shadow: 0 8px 26px rgba(200, 150, 62, 0.45);
    transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .hero-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(200, 150, 62, 0.65);
    background: linear-gradient(135deg, #f0c36b 0%, #d4a047 50%, #ba8933 100%);
    color: #040d14;
  }
  .hero-btn-primary:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
  .hero-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.12);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    color: #ffffff;
    padding: 0.86rem 1.85rem;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    backdrop-filter: blur(10px);
    transition: all 0.28s ease;
  }
  .hero-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.24);
    border-color: #ffffff;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.4);
  }
  .hero-btn-secondary:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }

  /* Scene Metadata / Altitude strip */
  .hero-scene-meta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    background: rgba(8, 22, 33, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50px;
    padding: 0.4rem 1.35rem;
    backdrop-filter: blur(12px);
    margin-bottom: 1.8rem;
    flex-wrap: wrap;
    animation: heroItemRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both;
  }
  .hero-meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
  }
  .hero-meta-label {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
    font-size: 0.68rem;
  }
  .hero-meta-val {
    color: var(--gold);
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  .hero-meta-sep {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
  }

  /* Subtle Scroll Indicator */
  .hero-scroll {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    pointer-events: none;
    animation: bounce 2.2s infinite;
  }
  .hero-scroll-line {
    width: 1px;
    height: 38px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent);
    margin: 0 auto 5px;
  }
  .hero-scroll-dot {
    width: 6px;
    height: 6px;
    background: var(--gold);
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 0 0 8px var(--gold);
  }

  /* Idle pause for CPU/GPU efficiency */
  .hero.is-idle .hero-img,
  .hero.is-idle .hero-video-bg,
  .hero.is-idle .hero-stage,
  .hero.is-idle .hero-snow span,
  .hero.is-idle .hero-scroll {
    animation-play-state: paused !important;
  }

  /* Prefers-reduced-motion accessibility */
  @media (prefers-reduced-motion: reduce) {
    .hero-img,
    .hero-scene-layer,
    .hero-content,
    .hero-eyebrow,
    .hero-headline,
    .hero-highlight,
    .hero-supporting-copy,
    .hero-dest-selector,
    .hero-cta-group,
    .hero-scene-meta {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
    .hero-snow { display: none !important; }
    .hero-scroll { animation: none !important; }
    .hero-video-bg, .hero-video-wrapper { display: none !important; }
    .scrolly-reading-bar { display: none !important; }
  }
  @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }

  /* ── 16:9 VIDEO TOUR PLAYER ── */
  .video-tour-nav {
    display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 1.5rem; flex-wrap: wrap;
  }
  .video-tour-btn {
    padding: 0.6rem 1.4rem; border-radius: 50px; border: 1.5px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85);
    font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.25s ease;
    backdrop-filter: blur(6px); display: flex; align-items: center; gap: 0.5rem;
  }
  .video-tour-btn:hover {
    border-color: var(--gold); color: white; background: rgba(200,150,62,0.2);
  }
  .video-tour-btn.active {
    background: var(--gold); border-color: var(--gold); color: var(--peak);
    box-shadow: 0 4px 16px rgba(200,150,62,0.35);
  }
  .video-16-9-wrapper {
    position: relative; width: 100%; aspect-ratio: 16 / 9;
    border-radius: var(--radius); overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.12);
    background: #000;
  }
  .video-16-9-iframe {
    width: 100%; height: 100%; border: none; display: block;
  }
  /* Mobile: compact transparent hero controls & hardware-accelerated 60-120fps scrolling */
  @media (max-width: 768px) {
    .hero {
      height: 100%;
      min-height: 100%;
      padding: 74px 0.85rem 1rem;
      align-items: center;
      justify-content: center;
    }
    .hero-content {
      padding: 0 0.15rem;
      max-width: 100%;
      will-change: auto;
    }
    .hero-stage {
      will-change: auto;
    }
    .hero-snow {
      display: none !important;
    }
    .hero-eyebrow {
      font-size: 0.62rem;
      letter-spacing: 0.08em;
      padding: 0.25rem 0.75rem;
      margin-bottom: 0.45rem;
      background: rgba(4, 15, 23, 0.35) !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }
    .hero-headline {
      font-size: clamp(1.65rem, 5.8vw, 2.15rem);
      line-height: 1.15;
      margin-bottom: 0.3rem;
    }
    .hero-highlight {
      font-size: clamp(1.05rem, 3.8vw, 1.25rem);
      margin-bottom: 0.45rem;
    }
    .hero-supporting-copy {
      font-size: 0.8rem;
      line-height: 1.38;
      margin-bottom: 0.75rem;
      max-width: 92%;
    }
    .hero-dest-selector {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: center !important;
      width: 95% !important;
      max-width: 340px !important;
      border-radius: 50px !important;
      overflow: hidden !important;
      padding: 3px !important;
      gap: 4px !important;
      margin: 0 auto 0.7rem !important;
      background: rgba(4, 15, 23, 0.42) !important;
      border: 1px solid rgba(255, 255, 255, 0.22) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25) !important;
      box-sizing: border-box !important;
    }
    .hero-dest-tab {
      flex: 1 1 50% !important;
      min-width: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0.38rem 0.5rem !important;
      font-size: 0.72rem !important;
      border-radius: 40px !important;
      gap: 4px !important;
      background: transparent !important;
      color: rgba(255, 255, 255, 0.88) !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
      border: 1px solid transparent !important;
      overflow: hidden !important;
    }
    .hero-dest-emoji {
      font-size: 0.82rem !important;
      line-height: 1 !important;
      flex-shrink: 0 !important;
    }
    .hero-dest-badge {
      font-size: 0.56rem !important;
      padding: 1.5px 4.5px !important;
      border-radius: 5px !important;
      background: rgba(0, 0, 0, 0.3) !important;
      color: rgba(255, 255, 255, 0.88) !important;
      flex-shrink: 0 !important;
    }
    .hero-dest-tab.is-active {
      background: rgba(200, 150, 62, 0.38) !important;
      border: 1px solid rgba(245, 208, 112, 0.85) !important;
      color: #ffffff !important;
      box-shadow: 0 0 10px rgba(200, 150, 62, 0.3) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
    }
    .hero-dest-tab.is-active .hero-dest-badge {
      background: rgba(0, 0, 0, 0.35) !important;
      color: #ffe49e !important;
    }
    .hero-cta-group {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      width: 95% !important;
      max-width: 355px !important;
      gap: 0.5rem !important;
      margin: 0 auto 0.75rem !important;
      box-sizing: border-box !important;
    }
    .hero-btn-primary,
    .hero-btn-secondary {
      justify-content: center !important;
      padding: 0.54rem 0.8rem !important;
      font-size: 0.76rem !important;
      white-space: nowrap !important;
      border-radius: 50px !important;
      box-sizing: border-box !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
      overflow: hidden !important;
    }
    .hero-btn-primary {
      flex: 0 0 auto !important;
      background: rgba(200, 150, 62, 0.38) !important;
      border: 1.2px solid rgba(245, 208, 112, 0.85) !important;
      color: #ffffff !important;
    }
    .hero-btn-secondary {
      flex: 1 1 auto !important;
      min-width: 0 !important;
      background: rgba(255, 255, 255, 0.08) !important;
      border: 1.2px solid rgba(255, 255, 255, 0.3) !important;
      color: #ffffff !important;
      text-align: center !important;
    }
    .hero-scene-meta {
      width: 95% !important;
      max-width: 345px !important;
      border-radius: 50px !important;
      padding: 0.28rem 0.65rem !important;
      gap: 0.3rem 0.65rem !important;
      margin: 0 auto 0.65rem !important;
      background: rgba(4, 15, 23, 0.35) !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      overflow: hidden !important;
    }
    .hero-meta-item { font-size: 0.65rem !important; }
    .hero-meta-label { opacity: 0.75; }
    .hero-meta-val { color: #f5d070; font-weight: 600; }
    .hero-scroll { display: none !important; }
    .curtain-content-wrapper {
      border-radius: 28px 28px 0 0 !important;
      box-shadow: 0 -22px 55px rgba(0, 0, 0, 0.65), 0 -6px 20px rgba(0, 0, 0, 0.4) !important;
    }
  }

  /* ── SECTIONS ── */
  .section { padding: 4rem 1.5rem; max-width: 1200px; margin: 0 auto; }
  .section-full { padding: 4rem 1.5rem; }
  .section-label {
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: #a1761f; font-weight: 600; margin-bottom: 0.5rem; display: inline-flex; align-items: center;
  }
  .testimonials-inner .section-label, .video-inner .section-label { color: var(--gold); }
  .section-title { font-size: clamp(2rem, 4vw, 3rem); color: var(--peak); margin-bottom: 0.75rem; }
  .section-sub { color: var(--muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem; }
  .section-header-row { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem; }
  /* Rooms section: tighter flow from heading → chips → slider */
  #rooms .section-sub { margin-bottom: 1rem; }
  #rooms .section-header-row { margin-bottom: 0.9rem; }
  #rooms .filter-bar { margin-bottom: 2rem; }
  /* Tighten the dead space between the Why Stay cards and Our Rooms heading */
  #why { padding-bottom: 2.5rem; }
  #rooms { padding-top: 3rem; }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: linear-gradient(to right, transparent, var(--glacier), transparent); max-width: 1200px; margin: 0 auto; }

  /* ── ROOMS ── */
  .filter-bar { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .filter-chip {
    padding: 0.45rem 1.1rem; border-radius: 50px; border: 1.5px solid var(--border);
    background: white; font-size: 0.82rem; font-weight: 500; cursor: pointer;
    transition: var(--transition); color: var(--muted);
  }
  .filter-chip:hover { border-color: var(--peak); color: var(--peak); }
  .filter-chip.active { background: var(--peak); color: white; border-color: var(--peak); }
  /* ── Premium center-focus room slider ── */
  .rooms-slider {
    --room-w: 760px;
    --room-slide: 0.62s;   /* shared by every room-card state so roles never desync */
    position: relative; max-width: 1280px; margin: 0 auto;
    /* Hugs the card height (~470px) so no dead space sits between the heading and slider */
    height: 490px; outline: none;
  }
  .room-card {
    position: absolute; top: 50%; left: 50%;
    width: min(var(--room-w), 94vw);
    display: flex; flex-direction: column;
    background: white; border-radius: 20px; overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    /* 3D translate keeps each card on its own composited layer, so the browser
       scales the pre-rastered card + photo on the GPU while it glides instead of
       re-rasterising a 760px card and its image every frame.
       No will-change: four large always-promoted cards cost more than they save. */
    transform: translate3d(-50%, -50%, 0) scale(0.72);
    opacity: 0; visibility: hidden; pointer-events: none;
    /* Only transform + opacity tween. Blur and box-shadow used to tween too, and
       those two repaint the whole card (plus a 64px shadow halo) per frame —
       that was what made switching rooms stutter, worst on the first glide.
       The easing is a standard ease-in-out (was cubic-bezier(0.22, 1, 0.36, 1),
       which covered ~75% of the distance in the first 150ms and then crawled for
       the rest — the violent start read as a jerk, the tail as a hang). */
    transition: transform var(--room-slide, 0.62s) cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.45s ease, visibility 0s linear 0.65s;
  }
  .room-card.is-active {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1; visibility: visible; pointer-events: auto; z-index: 3;
    /* Appearing states flip visibility instantly so cards fade in, not pop */
    transition: transform var(--room-slide, 0.62s) cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.45s ease, visibility 0s;
  }
  .room-card.is-left, .room-card.is-right {
    opacity: 0.38; visibility: visible; z-index: 1;
    /* Blur is switched outright (never tweened — see the transition note above).
       The shadow is left alone: the card's own opacity already softens it, so
       there's no shadow swap to pop and no shadow repaint to pay for. */
    filter: blur(2.5px) saturate(0.85);
    pointer-events: auto; cursor: pointer;
    transition: transform var(--room-slide, 0.62s) cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.45s ease, visibility 0s;
  }
  .room-card.is-left  { transform: translate3d(calc(-50% - 160px), -50%, 0) scale(0.8); }
  .room-card.is-right { transform: translate3d(calc(-50% + 160px), -50%, 0) scale(0.8); }
  .room-card.is-left:hover, .room-card.is-right:hover { opacity: 0.45; filter: blur(1.5px) saturate(0.9); }
  .room-img { position: relative; height: 240px; overflow: hidden; flex-shrink: 0; }
  .room-img img { width: 100%; height: 100%; object-fit: cover; }
  .rooms-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 48px; height: 48px; border-radius: 50%;
    background: white; color: var(--peak); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 5; box-shadow: var(--shadow); transition: var(--transition);
  }
  .rooms-arrow:hover { background: var(--peak); color: white; }
  .rooms-arrow.prev { left: calc(50% - var(--room-w) / 2 - 70px); }
  .rooms-arrow.next { right: calc(50% - var(--room-w) / 2 - 70px); }
  .rooms-dots { display: flex; justify-content: center; gap: 8px; margin-top: 1.25rem; }
  .room-dot {
    width: 9px; height: 9px; border-radius: 50%; border: none; padding: 0;
    background: var(--glacier); cursor: pointer; transition: var(--transition);
  }
  .room-dot.active { background: var(--peak); transform: scale(1.3); }
  .room-badge {
    position: absolute; top: 12px; left: 12px;
    background: var(--gold); color: white; font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 50px;
  }
  .room-body { padding: 1.1rem 1.5rem 1.25rem; display: flex; flex-direction: column; flex: 1; }
  .room-topline { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; gap: 0.5rem; }
  .room-type { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
  .room-guests { display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; color: var(--muted); white-space: nowrap; }
  .room-name { font-size: 1.3rem; color: var(--peak); margin-bottom: 0.5rem; }
  .room-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.6; margin-bottom: 0.75rem; }
  .room-amenities { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
  .amenity-tag {
    background: var(--ice); color: var(--peak); font-size: 0.72rem;
    padding: 0.25rem 0.65rem; border-radius: 50px; border: 1px solid var(--glacier);
  }
  .room-footer { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-top: auto; }
  .room-book-btn { min-width: 150px; text-align: center; flex-shrink: 0; }
  @media (max-width: 860px) {
    .rooms-arrow { width: 42px; height: 42px; background: rgba(255,255,255,0.95); }
    .rooms-arrow.prev { left: 8px; }
    .rooms-arrow.next { right: 8px; }
  }
  @media (max-width: 720px) {
    /* Mobile rooms slider: a real horizontal track. All cards sit in one flex
       row and the WHOLE row glides to the selected card via --slide-x (set from
       React), so chip taps / dots / swipes all get the same simple, smooth
       slide — no blur or scaled-neighbour effects that phones render poorly.
       The card transition is also replaced below so nothing here tweens
       filter/box-shadow, the two properties phones cannot repaint per frame. */
    .rooms-slider { display: flex; overflow: hidden; height: auto; }
    .room-card, .room-card.is-active, .room-card.is-left, .room-card.is-right {
      position: relative; top: auto; left: auto;
      flex: 0 0 100%; width: 100%; margin-right: 14px;
      filter: none; opacity: 1; visibility: visible; pointer-events: none;
      /* 3D transform → the whole row is composited and glides on the GPU */
      transform: var(--slide-x, translate3d(0, 0, 0));
      transition: transform var(--room-slide, 0.62s) cubic-bezier(0.4, 0, 0.2, 1);
    }
    .room-card.is-active { pointer-events: auto; }
    /* Arrows overlap the card on small screens — dots, swipe and chips are enough */
    .rooms-arrow { display: none; }
    .room-img { height: 200px; }
    .room-footer { flex-wrap: wrap; }
  }
  /* ── ROOM PHOTOS PAGE (See More Images) ── */
  .rg-page {
    position: fixed; inset: 0; z-index: 1200; overflow-y: auto;
    background:
      radial-gradient(1100px 500px at 85% -10%, rgba(77,120,150,0.22), transparent 60%),
      radial-gradient(900px 500px at 10% 110%, rgba(200,150,62,0.10), transparent 55%),
      linear-gradient(165deg, #0c2231 0%, #0e2a3c 45%, #0a1e2b 100%);
    padding: 0 1.5rem 4rem;
    /* Opacity-only entrance: animating transform on the full-screen fixed layer
       makes the topbar's backdrop-filter re-blur every frame and stutters */
    animation: rgPageIn 0.35s ease both;
  }
  .rg-page.is-closing { animation: rgPageOut 0.32s ease-in both; }
  @keyframes rgPageIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes rgPageOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(18px) scale(0.985); } }
  .rg-topbar {
    position: sticky; top: 0; z-index: 5;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    background: rgba(10,30,43,0.75); backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin: 0 -1.5rem 2.25rem; padding: 1rem 1.5rem;
  }
  .rg-brand {
    font-family: var(--font-serif); font-size: 1.05rem; font-weight: 600;
    letter-spacing: 0.06em; color: rgba(255,255,255,0.75);
  }
  .rg-back {
    display: inline-flex; align-items: center; gap: 0.35rem;
    background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.25);
    border-radius: 50px; padding: 0.55rem 1.25rem 0.55rem 0.95rem;
    font-family: var(--font-sans); font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
  }
  .rg-back:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.45); transform: translateX(-2px); }
  .rg-hero {
    text-align: center; max-width: 700px; margin: 0 auto 2.5rem;
    animation: rgHeroIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
  }
  @keyframes rgHeroIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  .rg-hero .section-label { color: var(--gold); }
  .rg-title {
    font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3rem);
    color: white; margin: 0.4rem 0 0.6rem;
  }
  .rg-sub { color: rgba(255,255,255,0.65); margin-bottom: 0; }
  .rg-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.1rem; max-width: 1200px; margin: 0 auto;
  }
  .rg-item {
    position: relative; border: 1px solid rgba(255,255,255,0.12); padding: 0; background: rgba(255,255,255,0.04);
    border-radius: 16px; overflow: hidden; cursor: zoom-in;
    /* Motion lives on the small tiles, not the big fixed layer → stays buttery */
    animation: rgItemIn 0.55s cubic-bezier(0.22, 1, 0.9, 1) 0.12s both;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, border-color 0.45s ease;
    will-change: transform, opacity;
  }
  @keyframes rgItemIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
  .rg-item img { width: 100%; height: 230px; object-fit: cover; display: block; transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease; }
  .rg-item:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(0,0,0,0.45); border-color: rgba(255,255,255,0.3); }
  .rg-item:hover img { transform: scale(1.06); }
  .rg-view {
    position: absolute; left: 50%; bottom: 0.9rem; transform: translate(-50%, 12px);
    background: rgba(10,30,43,0.78); backdrop-filter: blur(8px); color: white;
    font-family: var(--font-sans); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.4rem 1.05rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.25);
    opacity: 0; transition: opacity 0.35s ease, transform 0.35s ease; pointer-events: none;
  }
  .rg-item:hover .rg-view, .rg-item:focus-visible .rg-view { opacity: 1; transform: translate(-50%, 0); }
  .rg-lightbox {
    position: fixed; inset: 0; z-index: 1300; background: rgba(5,16,24,0.94);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; cursor: zoom-out; padding: 2rem;
    animation: rgFade 0.3s ease both;
  }
  @keyframes rgFade { from { opacity: 0; } to { opacity: 1; } }
  .rg-lightbox img {
    max-width: min(92vw, 1100px); max-height: 86vh; object-fit: contain;
    border-radius: 10px; box-shadow: 0 24px 70px rgba(0,0,0,0.6);
    animation: rgZoom 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes rgZoom { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  .rg-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 50px; height: 50px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.1); color: white; font-size: 1.5rem; line-height: 1;
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition);
  }
  .rg-arrow:hover { background: rgba(255,255,255,0.28); }
  .rg-arrow-prev { left: 1rem; }
  .rg-arrow-next { right: 1rem; }
  .rg-count {
    position: absolute; bottom: 1.25rem; left: 50%; transform: translateX(-50%);
    color: rgba(255,255,255,0.85); font-size: 0.85rem; letter-spacing: 0.08em;
  }
  @media (max-width: 720px) {
    .rg-page { padding: 0 1rem 3rem; }
    .rg-topbar { margin: 0 -1rem 1.75rem; padding: 0.85rem 1rem; }
    .rg-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.6rem; }
    .rg-item img { height: 140px; }
    .rg-arrow { width: 40px; height: 40px; }
    .rg-arrow-prev { left: 0.5rem; }
    .rg-arrow-next { right: 0.5rem; }
  }
  .room-price { font-family: var(--font-serif); }
  .room-price-num { font-size: 1.6rem; font-weight: 700; color: var(--peak); }
  .room-price-per { font-size: 0.75rem; color: var(--muted); }
  .room-price-guests { font-size: 0.72rem; color: var(--muted); margin-top: 2px; }
  .btn-primary {
    background: var(--peak); color: white; border: none; border-radius: 50px;
    padding: 0.6rem 1.4rem; font-family: var(--font-sans); font-size: 0.85rem;
    font-weight: 600; cursor: pointer; transition: var(--transition); text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: var(--pine); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,58,74,0.3); }
  .btn-primary:disabled { background: var(--muted); cursor: not-allowed; transform: none; }
  .btn-outline {
    background: transparent; color: var(--peak); border: 2px solid var(--peak);
    border-radius: 50px; padding: 0.6rem 1.4rem; font-family: var(--font-sans);
    font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: var(--transition); text-decoration: none; display: inline-block;
  }
  .btn-outline:hover { background: var(--peak); color: white; }

  /* ── PRESS & FOCUS FEEDBACK ──
     Every control dips the instant it is pressed — the quickest acknowledgement
     that a tap landed — then eases back on its normal, slower curve. The dip uses
     the standalone scale property where an element already leans on transform for
     centring or its hover lift, so the two compose instead of fighting. */
  .btn-primary:active, .btn-outline:active, .nav-cta:active, .to-top:active,
  .room-book-btn:active, .filter-chip:active, .testi-cta-btn:active,
  .book-float:active { transform: translateY(0) scale(0.97); transition-duration: 0.12s; }
  .slider-arrow:active, .rooms-arrow:active, .video-playbtn:active,
  .slider-dot:active, .room-dot:active { scale: 0.88; }
  .rg-item:active img { transform: scale(1.01); }
  .nav-links a:active, .footer-col a:active { opacity: 0.7; }
  :focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

  /* ── ABOUT ── */
  .about-bg { background: linear-gradient(135deg, var(--peak) 0%, #0d2535 100%); padding: 4rem 1.5rem; }
  .about-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .about-img-stack {
    position: relative;
    width: 100%;
    max-width: 440px;
    height: 520px;
    margin: 0 auto;
  }
  .about-img-main {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    border: 3px solid rgba(255, 255, 255, 0.12);
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .about-img-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
    display: block;
  }
  .about-text { color: rgba(255,255,255,0.75); }
  .about-text .section-label { color: var(--gold); }
  .about-text .section-title { color: white; }
  .about-text p { line-height: 1.8; margin-bottom: 1rem; }
  .about-features { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
  .about-feature { display: flex; align-items: flex-start; gap: 0.75rem; }
  .about-feature-icon { font-size: 1.2rem; margin-top: 2px; }
  .about-feature-text h4 { color: white; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
  .about-feature-text p { font-size: 0.8rem; color: rgba(255,255,255,0.55); }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .about-img-stack { height: 440px; max-width: 360px; }
  }

  /* ── WHY STAY WITH US ── */
  .why-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1.25rem;
  }
  .why-card {
    position: relative; overflow: hidden;
    background: white; border: 1.5px solid var(--border); border-radius: var(--radius);
    padding: 1.75rem 1.25rem 1.4rem; text-align: center;
    cursor: pointer; outline: none;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .why-card:hover, .why-card:focus-visible, .why-card.is-active {
    transform: translateY(-8px);
    box-shadow: 0 20px 45px rgba(26,58,74,0.18);
    border-color: var(--gold);
  }
  .why-media {
    position: absolute; inset: 0; z-index: 2;
    opacity: 0; visibility: hidden; pointer-events: none;
    transform: translateY(-6px) scale(0.98);
    transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.32s;
    will-change: transform, opacity;
  }
  .why-media img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .why-media::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,30,42,0.95) 0%, rgba(10,30,42,0.68) 55%, rgba(10,30,42,0.22) 100%);
  }
  .why-media-caption {
    position: absolute; left: 0; right: 0; bottom: 0; top: 0; z-index: 3;
    padding: 1.2rem 1rem; color: white; text-align: center;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-shadow: 0 2px 10px rgba(0,0,0,0.6);
  }
  .why-media-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 0.45rem;
    border-radius: 50%;
    background: rgba(200, 150, 62, 0.28);
    border: 1.5px solid var(--gold);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  }
  .why-media-title {
    font-family: var(--font-sans); font-weight: 700; font-size: 1.05rem;
    color: white; margin-bottom: 0.25rem;
  }
  .why-media-sub {
    font-size: 0.78rem; font-weight: 600; color: var(--gold);
    letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 0.35rem;
  }
  .why-media-desc {
    font-size: 0.8rem; color: rgba(255,255,255,0.9); line-height: 1.45;
    max-width: 90%; margin: 0 auto;
  }
  /* Entry on hover, focus, or click */
  .why-card:hover .why-media, .why-card:focus-visible .why-media, .why-card.is-active .why-media {
    opacity: 1; visibility: visible; pointer-events: auto;
    transform: translateY(0) scale(1);
  }
  .why-card:hover .why-media img, .why-card:focus-visible .why-media img, .why-card.is-active .why-media img {
    transform: scale(1.08);
  }
  .why-hover-hint {
    display: inline-block; margin-top: 0.75rem;
    font-size: 0.7rem; font-weight: 600; color: var(--gold);
    background: rgba(200, 150, 62, 0.1); padding: 3px 10px;
    border-radius: 50px; border: 1px solid rgba(200, 150, 62, 0.25);
    transition: background 0.2s, color 0.2s;
  }
  .why-card:hover .why-hover-hint { background: var(--gold); color: white; }
  @media (prefers-reduced-motion: reduce) {
    .why-card, .why-media, .why-media img { transition: none !important; }
    .why-card:hover .why-media, .why-card:focus-visible .why-media, .why-card.is-active .why-media {
      opacity: 1 !important; visibility: visible !important; transform: none !important;
    }
  }
  .why-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 0.95rem;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(200, 150, 62, 0.12), rgba(200, 150, 62, 0.24));
    border: 1.5px solid rgba(200, 150, 62, 0.38);
    color: var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(200, 150, 62, 0.15);
    transition: transform 0.3s ease, border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
  }
  .why-card:hover .why-icon,
  .why-card:focus-visible .why-icon {
    transform: scale(1.08);
    background: linear-gradient(135deg, #e5b35a, #c8963e);
    color: #071520;
    border-color: var(--gold);
    box-shadow: 0 6px 20px rgba(200, 150, 62, 0.35);
  }
  .why-title {
    font-family: var(--font-sans); font-size: 0.98rem; font-weight: 700;
    color: var(--peak); margin-bottom: 0.45rem;
  }
  .why-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.55; }

  /* ── SERVICES ── */
  .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; }
  .service-card {
    background: white; padding: 1.75rem; border-radius: var(--radius);
    border: 1px solid var(--border); transition: var(--transition);
    display: flex; gap: 1rem; align-items: flex-start;
  }
  .service-card:hover { border-color: var(--glacier); box-shadow: var(--shadow); transform: translateY(-3px); }
  .service-icon { font-size: 2rem; flex-shrink: 0; color: var(--pine); display: flex; align-items: center; margin-top: 2px; }
  .service-title { font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; color: var(--peak); margin-bottom: 0.35rem; }
  .service-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.6; }

  /* ── GALLERY ── */
  .gallery-bg { background: var(--ice); padding: 4rem 1.5rem; }
  .gallery-inner { max-width: 1200px; margin: 0 auto; }
  .slider {
    position: relative;
    /* Full-bleed breakout: the slider spans the whole viewport width even
       though it sits inside the padded, max-width gallery container */
    width: 100vw; max-width: none;
    margin-left: calc(50% - 50vw);
    border-radius: 0; overflow: hidden;
    box-shadow: var(--shadow-lg); background: var(--peak);
    /* Grab-and-slide by hand: horizontal drags belong to the slider (mouse on
       laptops, finger on phones), while vertical swipes still scroll the page
       and the browser's own h-scroll/back gestures are kept out of the way. */
    touch-action: pan-y;
    user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  /* Hand cursor on devices with a real pointer (laptops/desktops) — phones keep
     the native touch behaviour and never get a stale grab cursor painted on. */
  @media (hover: hover) and (pointer: fine) {
    .slider { cursor: grab; }
    .slider.is-dragging { cursor: grabbing; }
  }
  .slider-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  /* Photos must never hijack the drag (native image-drag ghost, text selection) */
  .slider-img, .slider-img-blur { pointer-events: none; -webkit-user-drag: none; }
  .slider-slide { position: relative; flex: 0 0 100%; height: 520px; }
  /* Each slide slowly zooms in while it's on screen (class flips per slide so
     the animation restarts every time a new photo comes in) */
  .slider-slide.is-current img.slider-img { animation: galleryZoom 3.4s ease-out both; }
  @keyframes galleryZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
  /* Blurred copy of the same photo fills the box; the real photo sits on top fully visible */
  .slider-slide img.slider-img-blur {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; filter: blur(22px) brightness(0.55);
    transform: scale(1.12);
  }
  .slider-slide img.slider-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: contain; display: block;
  }
  .slider-caption {
    position: absolute; left: 0; right: 0; bottom: 0;
    display: flex; align-items: center; gap: 0.75rem;
    padding: 2.5rem 1.5rem 1.25rem;
    background: linear-gradient(to top, rgba(10,30,42,0.75), transparent);
  }
  .slider-cat {
    background: var(--gold); color: white; font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 50px;
  }
  .slider-label { color: white; font-size: 0.95rem; font-weight: 500; text-shadow: 0 1px 8px rgba(0,0,0,0.4); }
  .slider-arrow {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
    width: 48px; height: 48px; border-radius: 50%; border: none; cursor: pointer;
    background: rgba(255,255,255,0.15); color: white; font-size: 1.6rem; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(6px); transition: var(--transition);
  }
  .slider-arrow:hover { background: var(--gold); }
  .slider-prev { left: 1.25rem; }
  .slider-next { right: 1.25rem; }
  .slider-dots {
    position: absolute; bottom: 1.25rem; left: 50%; transform: translateX(-50%); z-index: 2;
    display: flex; gap: 0.5rem;
  }
  .slider-dot {
    width: 9px; height: 9px; border-radius: 50%; border: none; cursor: pointer;
    background: rgba(255,255,255,0.45); transition: var(--transition); padding: 0;
  }
  .slider-dot.active { background: var(--gold); transform: scale(1.25); }
  /* "Swipe to explore" affordance — only surfaced on touch devices, where the
     grab cursor can't hint that the photos are draggable (see the media query
     further down). Purely decorative, so it never eats a drag. */
  /* "Swipe to explore" affordance removed — button stays in the gallery section */ }

  @media (max-width: 768px) {
    .slider-slide { height: 320px; }
    .slider-arrow { width: 38px; height: 38px; font-size: 1.3rem; }
    .slider-prev { left: 0.6rem; }
    .slider-next { right: 0.6rem; }
    .slider-dots { bottom: 0.9rem; }
    .slider-caption { padding-bottom: 3rem; }
  }


  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  /* ── TESTIMONIALS ── */
  .testimonials-bg { background: var(--peak); padding: 4rem 1.5rem; }
  .testimonials-inner { max-width: 1200px; margin: 0 auto; }
  .testimonials-inner .section-label { color: var(--gold); }
  .testimonials-inner .section-title { color: white; }
  /* ── Announcement-style reviews ticker ──
     Cards drift continuously in one direction (like a news/announcement bar).
     Hovering pauses the drift; pressing/touching lets you drag the row
     forward AND backward — it resumes drifting on its own after you let go. */
  .testi-viewport {
    overflow: hidden; border-radius: var(--radius);
    cursor: grab; touch-action: pan-y;
    user-select: none; -webkit-user-select: none;
    /* Soft fade at both edges so cards never pop in/out at the seams */
    -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
    mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
  }
  .testi-viewport:active { cursor: grabbing; }
  .testi-track {
    display: flex; width: max-content;
    will-change: transform;
  }
  .testi-item { flex-shrink: 0; width: 360px; margin-right: 18px; display: flex; box-sizing: border-box; padding: 0.3rem 0; }
  .testi-item .testi-card { flex: 1; }
  @media (min-width: 1100px) {
    /* Wide screens: slightly bigger cards so the strip doesn't look sparse */
    .testi-item { width: 400px; }
  }
  @media (max-width: 720px) {
    /* Small screens: cap the card to the visible width (minus section padding)
     so even a 320px phone shows one full card with breathing room */
    .testi-item { width: min(288px, calc(100vw - 56px)); margin-right: 14px; }
  }
  .testi-card {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius); padding: 1.75rem; transition: var(--transition);
    backdrop-filter: blur(4px);
  }
  .testi-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); }
  .testi-stars { color: var(--gold); margin-bottom: 1rem; font-size: 1rem; letter-spacing: 2px; }
  .testi-text { color: rgba(255,255,255,0.8); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.25rem; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 0.75rem; }
  .testi-avatar {
    width: 40px; height: 40px; border-radius: 50%; background: var(--gold);
    color: white; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .testi-avatar-img { object-fit: cover; border: 2px solid var(--gold); }
  .testi-name { color: white; font-weight: 600; font-size: 0.9rem; }
  .testi-loc { color: rgba(255,255,255,0.5); font-size: 0.78rem; }
  .testi-cta { text-align: center; margin-top: 2rem; }
  .testi-cta-btn {
    background: var(--gold);
    padding: 0.7rem 1.6rem; font-size: 0.9rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .testi-cta-btn:hover { background: #e0a845; box-shadow: 0 6px 20px rgba(200,150,62,0.4); }

  /* ── BOOKING MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 3000;
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: white; border-radius: var(--radius); padding: 2.5rem;
    max-width: 520px; width: 100%; max-height: 90vh; overflow-y: auto;
    box-shadow: 0 32px 80px rgba(0,0,0,0.3);
  }
  .modal h2 { font-size: 1.8rem; color: var(--peak); margin-bottom: 0.25rem; }
  .modal-room-name { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.75rem; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-group.full { grid-column: 1 / -1; }
  .form-group label { font-size: 0.78rem; font-weight: 600; color: var(--peak); letter-spacing: 0.05em; }
  .form-group input, .form-group select, .form-group textarea {
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0.65rem 0.9rem; font-family: var(--font-sans); font-size: 0.9rem;
    color: var(--text); background: var(--snow); outline: none; transition: var(--transition);
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--peak); background: white; box-shadow: 0 0 0 3px rgba(26,58,74,0.08);
  }
  .form-group textarea { resize: vertical; min-height: 80px; }
  .modal-footer { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
  .modal-total { background: var(--ice); border-radius: var(--radius-sm); padding: 1rem 1.25rem; margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; }
  .modal-total-label { font-size: 0.85rem; color: var(--muted); }
  .modal-total-price { font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: var(--peak); }
  .success-box { text-align: center; padding: 2rem 0; }
  .success-icon { font-size: 3.5rem; margin-bottom: 1rem; }
  .success-box h3 { font-size: 1.6rem; color: var(--peak); margin-bottom: 0.5rem; }
  .success-box p { color: var(--muted); font-size: 0.9rem; line-height: 1.7; }

  /* ── CONTACT ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 3rem; align-items: start; }
  .contact-info h3 { font-size: 1.5rem; color: var(--peak); margin-bottom: 1.5rem; }
  .contact-item { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.25rem; }
  .contact-icon { width: 42px; height: 42px; background: var(--ice); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
  .contact-item-title { font-weight: 600; color: var(--peak); font-size: 0.9rem; }
  .contact-item-val { font-size: 0.85rem; color: var(--muted); margin-top: 2px; }
  .whatsapp-btn {
    display: flex; align-items: center; gap: 0.6rem; background: #25D366; color: white;
    padding: 0.75rem 1.5rem; border-radius: 50px; text-decoration: none; font-weight: 600;
    font-size: 0.9rem; margin-top: 1.5rem; width: fit-content; transition: var(--transition);
  }
  .whatsapp-btn:hover { background: #1da851; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.4); }

  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; gap: 2.25rem; }
    /* Stop grid min-content blowout (long email/address) from squeezing the
       form column and shoving the inputs to the right */
    .contact-grid > * { min-width: 0; }
    .contact-item-val { overflow-wrap: anywhere; }
    /* Stack every form field full-width; 16px inputs stop iOS focus-zoom
       from blowing the boxes out of place */
    .form-grid { grid-template-columns: 1fr; }
    .form-grid > * { min-width: 0; }
    .form-group input, .form-group select, .form-group textarea { font-size: 16px; }
  }

  /* ── FOOTER ── */
  .footer { background: #0a1e2b; padding: 3.5rem 1.5rem 1.5rem; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2.5rem; margin-bottom: 3rem; }
  .footer-brand-name { font-family: var(--font-serif); font-size: 1.4rem; color: white; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 10px; }
  .footer-brand-img { width: 58px; height: 58px; object-fit: cover; background: #ffffff; border-radius: 50%; padding: 0; box-shadow: 0 3px 12px rgba(0,0,0,0.45); border: 2px solid rgba(255,255,255,0.9); flex-shrink: 0; }
  .footer-brand-desc { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.7; }
  .footer-col h4 { color: rgba(255,255,255,0.75); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1rem; font-family: var(--font-sans); font-weight: 600; }
  .footer-col a { display: block; color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.85rem; margin-bottom: 0.6rem; transition: color 0.2s; }
  .footer-col a:hover { color: var(--gold); }
  .footer-social { display: flex; gap: 0.75rem; margin-top: 1.25rem; }
  .footer-social a {
    width: 38px; height: 38px; border-radius: 50%; margin-bottom: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7); transition: var(--transition);
  }
  .footer-social a:hover { background: var(--gold); border-color: var(--gold); color: white; transform: translateY(-2px); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
  .footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
  .footer-dev { font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 0.35rem; }
  .footer-love { font-size: 0.8rem; color: rgba(255,255,255,0.45); display: flex; align-items: center; }
  /* Back to top — a plain circle with an up arrow, at the right end of the
     footer's bottom row (same footprint as the footer social circles) */
  .to-top {
    width: 40px; height: 40px; padding: 0; flex-shrink: 0;
    display: inline-flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7); border-radius: 50%;
    cursor: pointer; transition: var(--transition);
  }
  .to-top:hover, .to-top:focus-visible { background: var(--gold); border-color: var(--gold); color: white; transform: translateY(-2px); }

  /* Floating twin, bottom-left so it never fights the Book Now pill in the
     bottom-right corner. It floats over bright photos, so unlike the footer one
     it carries its own dark fill. JS toggles .show (see App): visible past the
     hero, gone while the footer's own circle is on screen. */
  .to-top-float {
    position: fixed; left: 1.5rem; bottom: 1.5rem; z-index: 998;
    background: rgba(26,58,74,0.92); border-color: rgba(255,255,255,0.18); color: white;
    box-shadow: 0 6px 20px rgba(5,16,24,0.35);
    backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(6px);
    transition: opacity 0.3s ease, visibility 0.3s, transform 0.3s ease,
                background 0.35s, border-color 0.35s, color 0.35s;
  }
  .to-top-float.show { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); }
  .to-top-float.show:hover, .to-top-float.show:focus-visible { transform: translateY(-2px); }

  @media (prefers-reduced-motion: reduce) {
    .to-top, .to-top-float { transition: none; }
    .to-top:hover, .to-top:focus-visible,
    .to-top-float.show:hover, .to-top-float.show:focus-visible { transform: none; }
  }
  /* ── FLOATING BOOK NOW ── */
  .book-float {
    /* Extra lift so it never covers the footer's "Made with ♥ in the Himalayas" line */
    position: fixed; bottom: 4.5rem; right: 1.5rem; z-index: 999;
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--gold); color: white; border: none; border-radius: 50px;
    padding: 0.95rem 1.5rem; font-family: var(--font-sans);
    font-size: 0.95rem; font-weight: 600; letter-spacing: 0.02em;
    box-shadow: 0 6px 24px rgba(200,150,62,0.5); cursor: pointer; transition: var(--transition);
    text-decoration: none;
  }
  .book-float:hover { background: #e0a845; transform: translateY(-3px); box-shadow: 0 10px 32px rgba(200,150,62,0.6); }
  .book-tooltip {
    position: absolute; right: calc(100% + 12px); background: var(--peak); color: white;
    font-size: 0.78rem; padding: 0.4rem 0.75rem; border-radius: 6px; white-space: nowrap;
    pointer-events: none; opacity: 0; transition: opacity 0.2s;
  }
  .book-float:hover .book-tooltip { opacity: 1; }

  /* Directions row in the Contact column. There is deliberately no second Book
     Now here: on phones the floating pill itself is what parks beside this row
     once the footer scrolls into view (see the docking effect in App). */
  .footer-book-row { display: flex; align-items: center; margin-bottom: 0.6rem; }
  .footer-book-row > a { margin-bottom: 0; }

  @media (max-width: 768px) {
    /* Phone footer: brand on its own row, then Explore | Support side by side,
       then Contact full-width underneath — no endless single-column queue */
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem 1.5rem; }
    .footer-grid > div:first-child { grid-column: 1 / -1; }
    .footer-col-contact { grid-column: 1 / -1; }
    /* Phones keep the exact same floating Book Now pill as desktop, riding the
       bottom-right corner while scrolling. JS adds .docked when the footer's
       Directions row reaches the viewport, parking the pill right beside that
       link. No transition on the docked pill — it must track the scroll, not
       lag behind it. */
    /* bottom: auto — the inline docked top would otherwise be over-constrained */
    .book-float.docked { bottom: auto; transition: none; }
    /* Tail clearance: the floating pill rests 4.5rem up from the bottom edge,
       so give the copyright / "Made with ♥" lines room to settle above that
       corner rather than behind it. */
    .footer { padding-bottom: 4rem; }
    /* Bottom row wraps on phones — push the button to the right of its own line
       (scoped to the footer so the floating circle keeps its own corner) */
    .footer-bottom .to-top { margin-left: auto; }
  }

  /* ── VIDEO SECTION ── */
  .video-bg { background: linear-gradient(135deg, #0a1e2b 0%, var(--peak) 100%); padding: 4rem 1.5rem; }
  .video-inner { max-width: 900px; margin: 0 auto; text-align: center; }
  .video-inner .section-label { color: var(--gold); }
  .video-inner .section-title { color: white; }
  .video-inner .section-sub { color: rgba(255,255,255,0.6); margin: 0 auto 1.25rem; }
  /* Video carousel: same 16:9 frame the single video used — now sliding
     between all the property clips */
  .video-slider {
    position: relative; border-radius: var(--radius); overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.1); background: #000;
    /* Horizontal flicks belong to the carousel, vertical ones still scroll */
    touch-action: pan-y;
  }
  /* Track moves via left offset, not transform: Chromium renders native video
     controls tiny and left-stuck when the track carries an active non-zero
     transform (slides 2+). Plain left-positioning keeps every slide's
     controls identical. */
  .video-track { display: flex; position: relative; transition: left 0.55s cubic-bezier(0.4, 0, 0.2, 1); }
  .video-slide { position: relative; flex: 0 0 100%; aspect-ratio: 16 / 9; }
  .video-slide video {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: contain; display: block; background: #000;
  }
  .video-tag {
    position: absolute; top: 12px; left: 12px;
    background: var(--gold); color: white; font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 50px;
  }
  .video-count {
    position: absolute; top: 12px; right: 12px;
    background: rgba(10,30,42,0.65); color: white; font-size: 0.72rem; font-weight: 600;
    padding: 0.3rem 0.7rem; border-radius: 50px; backdrop-filter: blur(6px);
  }
  /* Single centered play chip, shown only while paused. Nothing is drawn over
     the native controls bar, so play/pause + scrubber stay YouTube-like and
     never overlap. */
  .video-playbtn {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 74px; height: 74px; border-radius: 50%; cursor: pointer;
    background: rgba(10,30,42,0.55); border: 2px solid rgba(255,255,255,0.9);
    color: white; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px); z-index: 2; -webkit-tap-highlight-color: transparent;
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .video-playbtn:hover { transform: translate(-50%, -50%) scale(1.08); background: var(--gold); }

  /* ── LOCATION HIGHLIGHTS ── */
  .highlights { display: flex; gap: 1rem; margin-top: 1.5rem; }
  @media (max-width: 720px) { .highlights { flex-wrap: wrap; } }
  .highlight { display: flex; align-items: center; gap: 0.5rem; background: var(--ice); padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.82rem; color: var(--peak); border: 1px solid var(--glacier); }

  /* Mobile: trim the tall section padding so sections hug their content */
  @media (max-width: 720px) {
    .section, .section-full { padding: 3rem 1.25rem; }
    .about-bg, .gallery-bg, .testimonials-bg, .video-bg { padding: 3rem 1.25rem; }
  }

  /* ── MISC ── */
  .text-center { text-align: center; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .gap-1 { gap: 0.5rem; }

  /* ── POLICY PAGE (footer links) ── */
  .pol-page {
    position: fixed; inset: 0; z-index: 1200; overflow-y: auto;
    background:
      radial-gradient(1100px 500px at 85% -10%, rgba(77,120,150,0.22), transparent 60%),
      radial-gradient(900px 500px at 10% 110%, rgba(200,150,62,0.10), transparent 55%),
      linear-gradient(165deg, #0c2231 0%, #0e2a3c 45%, #0a1e2b 100%);
    padding: 0 1.5rem 4rem;
    animation: rgPageIn 0.35s ease both;
  }
  .pol-page.is-closing { animation: rgPageOut 0.32s ease-in both; }
  .pol-hero { text-align: center; max-width: 760px; margin: 0 auto 2.5rem; animation: rgHeroIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both; }
  .pol-hero .section-label { color: var(--gold); }
  .pol-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1.1rem; max-width: 1100px; margin: 0 auto;
  }
  .pol-card {
    background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 1.5rem 1.5rem 1.25rem;
    animation: rgItemIn 0.55s cubic-bezier(0.22, 1, 0.9, 1) 0.12s both;
    scroll-margin-top: 96px; transition: border-color 0.3s ease;
  }
  .pol-card:hover { border-color: rgba(255,255,255,0.22); }
  .pol-card-head { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1rem; }
  .pol-icon {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(200,150,62,0.25), rgba(200,150,62,0.08));
    border: 1px solid rgba(200,150,62,0.35); color: var(--gold);
    display: flex; align-items: center; justify-content: center;
  }
  .pol-card h3 { font-family: var(--font-sans); font-size: 1rem; font-weight: 700; color: white; }
  .pol-card ul { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
  .pol-card li { display: flex; gap: 0.65rem; font-size: 0.88rem; color: rgba(255,255,255,0.72); line-height: 1.6; }
  .pol-num { font-family: var(--font-serif); font-weight: 700; color: var(--gold); font-size: 0.85rem; min-width: 1.4em; padding-top: 1px; }
  .pol-contact {
    max-width: 760px; margin: 3rem auto 0; text-align: center;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px; padding: 2.5rem 1.5rem;
    animation: rgItemIn 0.55s cubic-bezier(0.22, 1, 0.9, 1) 0.3s both;
  }
  .pol-contact h3 { font-family: var(--font-serif); font-size: 1.7rem; color: white; margin-bottom: 0.4rem; }
  .pol-contact p { color: rgba(255,255,255,0.65); font-size: 0.95rem; margin-bottom: 1.5rem; }
  .pol-contact-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 720px) {
    .pol-page { padding: 0 1rem 3rem; }
    .pol-card { padding: 1.25rem 1.1rem 1.1rem; }
    .pol-contact { padding: 2rem 1.25rem; }
  }
`;

// ─── HOTEL POLICIES (footer → policy page) ───────────────────────────────
const POLICY_SECTIONS = [
  {
    id: "checkin",
    Icon: Clock,
    title: "Check-in / Check-out",
    items: [
      "Check-in time: 12:00 PM",
      "Check-out time: 10:00 AM",
      "Early check-in and late check-out are subject to availability.",
    ],
  },
  {
    id: "booking",
    Icon: ScrollText,
    title: "Booking & Payment",
    items: [
      "Advance booking is recommended.",
      "A partial or full payment may be required to confirm your reservation.",
      "Accepted payment modes: Cash, UPI, and bank transfer.",
    ],
  },
  {
    id: "cancellation",
    Icon: CalendarX,
    title: "Cancellation Policy",
    items: [
      "Free cancellation up to 5 days before check-in.",
      "Cancellations within 5 days may be subject to charges.",
      "No-show bookings are non-refundable.",
    ],
  },
  {
    id: "guests",
    Icon: Users,
    title: "Guest & Visitor Policy",
    items: [
      "Valid ID proof required at check-in.",
      "Only registered guests are allowed to stay.",
      "Outside visitors require prior permission.",
      "Guests must maintain peaceful surroundings.",
    ],
  },
  {
    id: "children",
    Icon: Baby,
    title: "Child Policy",
    items: [
      "Children below 5 years can stay free (without extra bedding).",
      "Extra charges may apply for additional bedding.",
    ],
  },
  {
    id: "pets",
    Icon: PawPrint,
    title: "Pet Policy",
    items: [
      "Pets are allowed only with prior approval.",
      "Guests are responsible for their pet's behavior and cleanliness.",
    ],
  },
  {
    id: "damage",
    Icon: Wrench,
    title: "Damage Policy",
    items: [
      "Any property damage will be charged to the guest.",
      "Please inform staff immediately in case of any issues.",
    ],
  },
  {
    id: "rules",
    Icon: Ban,
    title: "House Rules",
    items: [
      "Smoking is allowed only in designated areas.",
      "Loud music and parties are not permitted.",
      "Outside visitors are not allowed in rooms without permission.",
    ],
  },
  {
    id: "vacation",
    Icon: HomeIcon,
    title: "Vacation Home Usage",
    items: [
      "The entire property (if booked) is for registered guests only.",
      "Parties, loud music, or events are not allowed without approval.",
      "Guests are expected to maintain the cleanliness and care of the space.",
    ],
  },
  {
    id: "safety",
    Icon: AlertTriangle,
    title: "Safety & Liability",
    items: [
      "Guests are responsible for their personal belongings.",
      "The property is not liable for any loss, theft, or unforeseen events.",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // rAF-throttled, and only ever calls setState when the class actually has to
  // flip — the solid navbar is worth one update per crossing, not per frame.
  useEffect(() => {
    let frame = 0;
    let solid = false;
    const read = () => {
      frame = 0;
      const next = window.scrollY > 60;
      if (next === solid) return;
      solid = next;
      setScrolled(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const links = [
    ["#rooms", "Rooms"],
    ["#gallery", "Gallery"],
    ["#services", "Services"],
    ["#about", "About"],
    ["#contact", "Contact"],
  ];

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#hero" className="nav-logo">
        <span className="nav-logo-icon">
          <img
            src={logoImg}
            alt="Shiv Darshan Homestay logo"
            className="nav-logo-img"
          />
        </span>
        <div>
          <div className="nav-logo-text">Shiv Darshan Homestay</div>
          <div className="nav-logo-sub">Haat, Dharchula, Uttarakhand</div>
        </div>
      </a>
      <div className={`nav-links${open ? " open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          onClick={() => setOpen(false)}
        >
          Directions
        </a>
      </div>
      <button className="nav-hamburger" onClick={() => setOpen((o) => !o)}>
        {open ? "✕" : "☰"}
      </button>
    </nav>
  );
}

const HERO_SNOWFLAKES = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 31 + 7) % 100, // spread pseudo-randomly across 0-99%
  size: 3 + ((i * 7) % 5), // 3-7px
  duration: 8 + ((i * 11) % 10), // 8-18s fall time
  delay: -((i * 4.5) % 18), // negative delay so snow is already falling on load
  drift: ((i * 23) % 50) - 25, // horizontal sway amplitude
}));

const SCENE_DETAILS = {
  adiKailash: {
    sanctuary: "Jolingkong · Parvati Kund",
    altitude: "5,945 m (19,505 ft)",
    subcopy: "Experience the sacred heights of Chhota Kailash, reflective waters of Parvati Kund, and heartfelt hospitality of Shiv Darshan Homestay in Dharchula.",
  },
  omParvat: {
    sanctuary: "Nabhidhang · Sacred ॐ Ridge",
    altitude: "5,590 m (18,340 ft)",
    subcopy: "Witness the miraculous natural ॐ snow formation at Nabhidhang, timeless Himalayan tranquillity, and heartfelt hospitality of Shiv Darshan Homestay in Dharchula.",
  },
};

function Hero() {
  const ref = useRef(null);
  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);

  // Interactive Destination Scene State: 'adiKailash' (default) | 'omParvat'
  const [activeScene, setActiveScene] = useState("adiKailash");

  // Handle scene switching with keyboard / click
  const handleSelectScene = (sceneId) => {
    setActiveScene(sceneId);
  };

  // Keyboard navigation for destination selector (ArrowLeft, ArrowRight)
  const handleTabKeyDown = (e, currentId) => {
    const sceneKeys = ["adiKailash", "omParvat"];
    const idx = sceneKeys.indexOf(currentId);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextId = sceneKeys[(idx + 1) % sceneKeys.length];
      handleSelectScene(nextId);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevId = sceneKeys[(idx - 1 + sceneKeys.length) % sceneKeys.length];
      handleSelectScene(prevId);
    }
  };

  // IntersectionObserver: pauses animations when scrolled completely off-screen
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-idle", !entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 60 FPS Scrollytelling: Hero content recedes down and fades smoothly as curtain rises
  useEffect(() => {
    let ticking = false;
    let heroEl = ref.current;
    let heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;

    const measure = () => {
      heroEl = ref.current;
      heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
    };
    window.addEventListener("resize", measure, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY <= heroHeight * 1.25) {
            const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
            // Before section (Hero content) comes down noticeably, scales, and dims like a card being placed underneath
            if (heroContentRef.current) {
              const downShift = scrollY * 0.45;
              const scale = (1 - (progress * 0.08)).toFixed(3);
              heroContentRef.current.style.transform = `translate3d(0, ${downShift.toFixed(1)}px, 0) scale(${scale})`;
              heroContentRef.current.style.opacity = Math.max(0, 1 - (progress * 1.25)).toFixed(3);
            }
            // Background mountain subtly pans down and scales for majestic depth
            if (heroStageRef.current) {
              const bgShift = scrollY * 0.2;
              heroStageRef.current.style.transform = `scale(1.03) translate3d(0, ${bgShift.toFixed(1)}px, 0)`;
              heroStageRef.current.style.filter = `brightness(${(1 - progress * 0.25).toFixed(2)})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const currentMeta = SCENE_DETAILS[activeScene] || SCENE_DETAILS.adiKailash;

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Layer 1: Background Himalayan Mountain Scenes with Smooth Crossfade & Ken Burns */}
      <div className="hero-stage" ref={heroStageRef}>
        {/* Scene A: Adi Kailash (Chhota Kailash, 5,945m) */}
        <div
          className={`hero-scene-layer scene-adi ${activeScene === "adiKailash" ? "is-active" : ""}`}
          aria-hidden={activeScene !== "adiKailash"}
        >
          {/* Desktop Widescreen (2560px HD Authentic Peak) */}
          <img
            src={adiKailashPeakHd}
            alt="Authentic snow-covered pyramid peak of Adi Kailash (5,945m) near Jolingkong and Parvati Kund"
            className="hero-img hero-img-desktop"
            loading="eager"
            fetchPriority="high"
          />
          {/* Mobile Art Direction (Authentic Portrait with dramatic Himalayan clouds and snowfield) */}
          <img
            src={adiKailashUserPortrait}
            alt="Sacred Adi Kailash peak in portrait framing with swirling clouds"
            className="hero-img hero-img-mobile"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Scene B: Om Parvat (Nabhidhang, 5,590m with natural ॐ snow formation) */}
        <div
          className={`hero-scene-layer scene-om ${activeScene === "omParvat" ? "is-active" : ""}`}
          aria-hidden={activeScene !== "omParvat"}
        >
          <img
            src={omParvatNabhidhangHd}
            alt="Authentic Om Parvat (5,590m) from Nabhidhang showing the naturally formed sacred ॐ symbol in snow on dark rock"
            className="hero-img hero-img-om"
            loading="eager"
          />
        </div>
      </div>

      {/* Layer 2: Editorial Contrast Vignette (Protects Text Readability while Leaving Peak Radiant) */}
      <div className="hero-overlay" />

      {/* Layer 3: Gentle Himalayan Snow Fall Particles */}
      <div className="hero-snow" aria-hidden="true">
        {HERO_SNOWFLAKES.map((f, i) => (
          <span
            key={i}
            style={{
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              marginLeft: f.drift,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Cinematic Foreground Content with Staggered Entrance */}
      <div className="hero-content" ref={heroContentRef}>
        {/* Eyebrow badge */}
        <div className="hero-eyebrow">
          THE SACRED HIMALAYAS · DHARCHULA, UTTARAKHAND
        </div>

        <h1 style={{ display: "none" }}>Best Homestay in Haat, Dharchula - Shiv Darshan Homestay</h1>

        {/* Main Headline */}
        <h2 className="hero-headline">
          Where the Himalayas Touch the Divine
        </h2>

        {/* Dynamic Highlight: Adi Kailash & Om Parvat */}
        <div className="hero-highlight">
          <span className={activeScene === "adiKailash" ? "hero-hl-gold" : "hero-hl-sub"}>
            Adi Kailash
          </span>
          <span className="hero-hl-sep">&amp;</span>
          <span className={activeScene === "omParvat" ? "hero-hl-gold" : "hero-hl-sub"}>
            Om Parvat
          </span>
        </div>

        {/* Supporting Editorial Copy */}
        <p className="hero-supporting-copy">
          {currentMeta.subcopy}
        </p>

        {/* Interactive Destination Selector */}
        <div
          className="hero-dest-selector"
          role="tablist"
          aria-label="Choose Himalayan Mountain Scene"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeScene === "adiKailash"}
            tabIndex={0}
            className={`hero-dest-tab ${activeScene === "adiKailash" ? "is-active" : ""}`}
            onClick={() => handleSelectScene("adiKailash")}
            onKeyDown={(e) => handleTabKeyDown(e, "adiKailash")}
          >
            <span className="hero-dest-emoji" role="img" aria-label="Mountain">🏔️</span>
            <span>Adi Kailash</span>
            <span className="hero-dest-badge">5,945 m</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeScene === "omParvat"}
            tabIndex={0}
            className={`hero-dest-tab ${activeScene === "omParvat" ? "is-active" : ""}`}
            onClick={() => handleSelectScene("omParvat")}
            onKeyDown={(e) => handleTabKeyDown(e, "omParvat")}
          >
            <span className="hero-dest-emoji" role="img" aria-label="Om">🕉️</span>
            <span>Om Parvat</span>
            <span className="hero-dest-badge">5,590 m</span>
          </button>
        </div>

        {/* Primary and Secondary Call-to-Action Buttons */}
        <div className="hero-cta-group">
          <a
            href={WA_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-primary"
          >
            <span>💬 Book Your Stay</span>
          </a>
          <a
            href="#about"
            className="hero-btn-secondary"
          >
            <span>Explore the Sacred Peaks ↓</span>
          </a>
        </div>

        {/* Scene Elevation & Pilgrim Base Metadata */}
        <div className="hero-scene-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Sanctuary:</span>
            <span className="hero-meta-val">{currentMeta.sanctuary}</span>
          </div>
          <div className="hero-meta-sep" />
          <div className="hero-meta-item">
            <span className="hero-meta-label">Elevation:</span>
            <span className="hero-meta-val">{currentMeta.altitude}</span>
          </div>
          <div className="hero-meta-sep" />
          <div className="hero-meta-item">
            <span className="hero-meta-label">Homestay:</span>
            <span className="hero-meta-val">Shiv Darshan, Haat</span>
          </div>
        </div>
      </div>

      {/* Layer 5: Subtle Scroll Indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <div className="hero-scroll-dot" />
      </div>
    </section>
  );
}

function Rooms({ onBook }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const touchX = useRef(null);

  const types = ["All", "Super Deluxe", "Deluxe", "Standard", "Shared"];

  // All rooms always stay in the track — filter chips navigate the slider to the
  // matching room instead of shrinking it, so sliding + blurred neighbours never go away.
  const rooms = ROOMS;

  const count = rooms.length;
  const safeActive = count ? ((active % count) + count) % count : 0;
  const go = (i) => {
    if (count) setActive(((i % count) + count) % count);
  };
  const prevRoom = () => go(safeActive - 1);
  const nextRoom = () => go(safeActive + 1);

  const onChipClick = (t) => {
    setFilter(t);
    if (t === "All") {
      go(0); // reset to first room (Deluxe)
    } else {
      const idx = rooms.findIndex((r) => r.type === t);
      if (idx >= 0) go(idx);
    }
  };

  // Touch swipe navigation
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) (dx < 0 ? nextRoom : prevRoom)();
    touchX.current = null;
  };

  // Keyboard navigation (works once focus is inside the section)
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevRoom();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextRoom();
    }
  };

  return (
    <section
      className="section"
      id="rooms"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="section-header-row reveal">
        <div>
          <span className="scrolly-chapter">Chapter 3 · Rest for Pilgrims</span>
          <br />
          <span className="section-label">
            <BedDouble
              size={14}
              strokeWidth={2.2}
              style={{ verticalAlign: "-2px", marginRight: "5px" }}
            />
            Our Rooms
          </span>
          <h2 className="section-title">Find Your Perfect Stay</h2>
          <p className="section-sub">
            Each room is thoughtfully designed to immerse you in the beauty of
            the Himalayas.
          </p>
        </div>
      </div>
      <div className="filter-bar reveal">
        {types.map((t) => (
          <button
            key={t}
            className={`filter-chip${filter === t ? " active" : ""}`}
            onClick={() => onChipClick(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <>
        {/* --slide-x drives the mobile track position (ignored on desktop):
            shifting the whole row by (card width + gap) per step gives one
            consistent smooth slide no matter what triggered the change. */}
        <div
          className="rooms-slider reveal"
          style={{
            touchAction: "pan-y",
            "--slide-x": `translate3d(calc(${safeActive} * (-100% - 14px)), 0, 0)`,
          }}
        >
          {rooms.map((room, i) => {
            const pos = (((i - safeActive) % count) + count) % count; // 0 = focused, 1 = right peek, count-1 = left peek
            const posClass =
              pos === 0
                ? "is-active"
                : pos === 1
                  ? "is-right"
                  : pos === count - 1
                    ? "is-left"
                    : "";
            return (
              <RoomCard
                key={room.id}
                room={room}
                onBook={onBook}
                posClass={posClass}
                onClick={() => setActive(i)}
              />
            );
          })}
          {count > 1 && (
            <>
              <button
                className="rooms-arrow prev"
                aria-label="Previous room"
                onClick={prevRoom}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="rooms-arrow next"
                aria-label="Next room"
                onClick={nextRoom}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
        <div className="rooms-dots">
          {rooms.map((room, i) => (
            <button
              key={room.id}
              aria-label={`Go to ${room.name}`}
              className={`room-dot${i === safeActive ? " active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <button className="btn-outline" onClick={() => setShowGallery(true)}>
            See More Images
          </button>
        </div>
      </>
      {showGallery && <RoomGalleryPage onClose={() => setShowGallery(false)} />}
    </section>
  );
}

// ── Full-screen room photos page (opened via "See More Images") ──
function RoomGalleryPage({ onClose }) {
  const [lightbox, setLightbox] = useState(-1);
  const [closing, setClosing] = useState(false);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 340); // wait for the exit animation to finish
  };

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        lightbox >= 0 ? setLightbox(-1) : requestClose();
      }
      if (lightbox >= 0 && e.key === "ArrowRight")
        setLightbox((i) => (i + 1) % ROOM_PHOTOS.length);
      if (lightbox >= 0 && e.key === "ArrowLeft")
        setLightbox((i) => (i - 1 + ROOM_PHOTOS.length) % ROOM_PHOTOS.length);
    };
    window.addEventListener("keydown", fn);
    // Lock page scroll but compensate for the scrollbar so the site doesn't shift behind us
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, closing]);

  return (
    <div
      className={`rg-page${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Room photos"
    >
      <div className="rg-topbar">
        <button
          className="rg-back"
          aria-label="Back to site"
          onClick={requestClose}
        >
          <ChevronLeft size={16} strokeWidth={2.4} /> Back
        </button>
        <span className="rg-brand">Shiv Darshan Homestay</span>
      </div>
      <div className="rg-hero">
        <span className="section-label">
          <Camera
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Room Photos
        </span>
        <h2 className="rg-title">Inside Our Rooms</h2>
        <p className="rg-sub">
          A closer look at the comfort waiting for you at Shiv Darshan Homestay.
        </p>
      </div>
      <div className="rg-grid">
        {ROOM_PHOTOS.map((src, i) => (
          <button
            key={i}
            className="rg-item"
            style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => setLightbox(i)}
            aria-label={`View photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`Room ${i + 1}`}
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
              onLoad={(e) => {
                e.currentTarget.style.visibility = "";
              }}
            />
            <span className="rg-view">View</span>
          </button>
        ))}
      </div>

      {lightbox >= 0 && (
        <div className="rg-lightbox" onClick={() => setLightbox(-1)}>
          <button
            className="rg-arrow rg-arrow-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (i) => (i - 1 + ROOM_PHOTOS.length) % ROOM_PHOTOS.length,
              );
            }}
          >
            ‹
          </button>
          <img
            src={ROOM_PHOTOS[lightbox]}
            alt={`Room ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="rg-arrow rg-arrow-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % ROOM_PHOTOS.length);
            }}
          >
            ›
          </button>
          <div className="rg-count">
            {lightbox + 1} / {ROOM_PHOTOS.length}
          </div>
        </div>
      )}
    </div>
  );
}

function RoomCard({ room, onBook, posClass = "", onClick }) {
  const [imgIdx, setImgIdx] = useState(0);
  const isActive = posClass === "is-active";

  // Show first photo when a room comes into focus
  useEffect(() => {
    if (isActive) setImgIdx(0);
  }, [isActive]);

  return (
    <div className={`room-card ${posClass}`} onClick={onClick}>
      <div
        className="room-img"
        onClick={(e) => {
          if (!isActive) return; // inactive cards just activate on click
          e.stopPropagation();
          setImgIdx((i) => (i + 1) % room.images.length);
        }}
      >
        {/* Eager + onError fallback: inside the transformed carousel track a lazy
            image can be deferred indefinitely and show as a blank card. */}
        <img
          src={room.images[imgIdx]}
          alt={room.name}
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
          onLoad={(e) => {
            e.currentTarget.style.visibility = "";
          }}
        />
        {room.badge && <span className="room-badge">{room.badge}</span>}
        {room.images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "5px",
            }}
          >
            {room.images.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: i === imgIdx ? "white" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="room-body">
        <div className="room-topline">
          <span className="room-type">{room.type}</span>
          <span className="room-guests">
            <Users size={13} /> Up to {room.maxGuests} guests
          </span>
        </div>
        <div className="room-name">{room.name}</div>
        <p className="room-desc">{room.description}</p>
        <div className="room-amenities">
          {room.amenities.map((a) => (
            <span key={a} className="amenity-tag">
              {a}
            </span>
          ))}
        </div>
        <div
          className="room-footer"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className="btn-primary room-book-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (room.available) {
                const msg = `Hello! I would like to book the ${room.name} (${room.type}) at Shiv Darshan Homestay, Haat, Dharchula. Please share availability and rates.`;
                window.open(getWaUrl(WA_NUMBER, msg), "_blank", "noopener");
              }
            }}
            disabled={!room.available}
          >
            {room.available ? "Book Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ room, preCheckin, preCheckout, preGuests, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: preCheckin || "",
    checkout: preCheckout || "",
    guests: preGuests || "1",
    special: "",
    selectedRoom: room?.id || "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingId] = useState(
    "SIH-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const nights =
    form.checkin && form.checkout
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.checkout) - new Date(form.checkin)) / 86400000,
          ),
        )
      : 0;

  const selectedRoom =
    room || ROOMS.find((r) => r.id === Number(form.selectedRoom));
  const total = selectedRoom && nights > 0 ? selectedRoom.price * nights : 0;

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.checkin ||
      !form.checkout
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (!selectedRoom) {
      alert("Please select a room.");
      return;
    }
    setLoading(true);
    try {
      await sendEmail(EMAILJS_BOOKING_TEMPLATE, {
        booking_id: bookingId,
        guest_name: form.name,
        guest_email: form.email,
        guest_phone: form.phone,
        room_name: selectedRoom.name,
        room_type: selectedRoom.type,
        checkin: form.checkin,
        checkout: form.checkout,
        nights: nights,
        guests: form.guests,
        total: "Rs." + total.toLocaleString(),
        special_req: form.special || "None",
        reply_to: form.email,
      });
      setSubmitted(true);
    } catch (err) {
      // If EmailJS keys not yet set, still show confirmation (demo mode)
      console.warn("EmailJS not configured:", err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        {submitted ? (
          <div className="success-box">
            <div className="success-icon">
              <CheckCircle2 size={56} strokeWidth={1.6} color="#2d5a3d" />
            </div>
            <h3>Booking Confirmed!</h3>
            <p>
              Booking ID: <strong>{bookingId}</strong>
              <br />
              Thank you, <strong>{form.name}</strong>! Your stay at{" "}
              <strong>{selectedRoom?.name}</strong> is confirmed.
              <br />
              <br />
              We'll send details to <strong>{form.email}</strong>.<br />
              For questions, WhatsApp / Call: <strong>+91 94101 35726 / +91 94567 61865</strong>
            </p>
            <button className="btn-primary mt-3" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2>Book Your Stay</h2>
            <p className="modal-room-name">
              {room
                ? `Room: ${room.name} · ₹${room.price}/night`
                : "Select your preferred room"}
            </p>
            <div className="form-grid">
              <div className="form-group full">
                <label>Full Name *</label>
                <input
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              {!room && (
                <div className="form-group full">
                  <label>Select Room *</label>
                  <select
                    value={form.selectedRoom}
                    onChange={(e) => set("selectedRoom", e.target.value)}
                  >
                    <option value="">Choose a room</option>
                    {ROOMS.filter((r) => r.available).map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — ₹{r.price}/night
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label>Check-in *</label>
                <input
                  type="date"
                  min={today}
                  value={form.checkin}
                  onChange={(e) => set("checkin", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Check-out *</label>
                <input
                  type="date"
                  min={form.checkin || today}
                  value={form.checkout}
                  onChange={(e) => set("checkout", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select
                  value={form.guests}
                  onChange={(e) => set("guests", e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Guest{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nights</label>
                <input
                  readOnly
                  value={
                    nights > 0
                      ? `${nights} night${nights > 1 ? "s" : ""}`
                      : "Select dates"
                  }
                  style={{ background: "#f0f5f7", cursor: "default" }}
                />
              </div>
              <div className="form-group full">
                <label>Special Requests</label>
                <textarea
                  placeholder="Early check-in, dietary needs, trek guidance..."
                  value={form.special}
                  onChange={(e) => set("special", e.target.value)}
                />
              </div>
            </div>
            {total > 0 && (
              <div className="modal-total">
                <div>
                  <div className="modal-total-label">Total Estimate</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    {selectedRoom?.name} × {nights} night{nights > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="modal-total-price">
                  ₹{total.toLocaleString()}
                </div>
              </div>
            )}
            <div className="modal-footer">
              <button className="btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
            <p
              style={{
                fontSize: "0.73rem",
                color: "var(--muted)",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              <Lock
                size={12}
                strokeWidth={2.2}
                style={{ verticalAlign: "-2px", marginRight: "4px" }}
              />
              Secure booking · No payment required now · Free cancellation 48h
              before check-in
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Gallery() {
  const SLIDE_MS = 600; // must match .slider-track transition duration
  const N = GALLERY.length;
  const [idx, setIdx] = useState(0); // real slides 0..N-1, clones at N (first) and -1 (last)
  const [anim, setAnim] = useState(true); // transition on/off for seamless snapping
  const [paused, setPaused] = useState(false);

  // ── Hand-drag / swipe ──
  // Pointer events cover mouse (laptops), touch (phones) and pen alike, so the
  // same code gives a finger-drag on phones and a click-and-drag on desktops
  // (with a grab hand cursor there). The track follows the hand live and then
  // snaps to the neighbouring slide on release.
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const idxRef = useRef(0); // mirror of idx, readable from DOM handlers
  const drag = useRef({ active: false, startX: 0, dx: 0, id: null });
  const [dragging, setDragging] = useState(false);
  const DRAG_THRESHOLD = 0.14; // fraction of slider width needed to change slide
  const SMOOTH = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"; // keep in sync with .slider-track
  // Slide transform is written straight to the DOM (like the reviews ticker) so a
  // drag moves the track on every pointermove without a React re-render per frame.
  const slideX = (i, dx = 0) =>
    `translateX(calc(-${(i + 1) * 100}% + ${dx}px))`;

  const norm = (i) => ((i % N) + N) % N;

  const move = useCallback(
    (dir) => {
      setAnim(true);
      setIdx((i) => {
        const next = i + dir;
        if (next > N || next < -1) return i; // ignore while standing on a clone
        return next;
      });
    },
    [N],
  );

  const goTo = (i) => {
    setAnim(true);
    setIdx(norm(i));
  };

  // Position the track whenever the slide or the animation flag changes — and
  // hand it back to smooth CSS animation after an instant snap.
  useLayoutEffect(() => {
    const t = trackRef.current;
    idxRef.current = idx;
    if (!t) return;
    t.style.transition = anim ? SMOOTH : "none";
    t.style.transform = slideX(idx);
  }, [idx, anim]);

  // After gliding onto a clone (first-slide clone at the end, last-slide clone at
  // the front), silently jump to the matching real slide with the transition off —
  // so the loop reads as endless forward motion, never a long slide backwards.
  useEffect(() => {
    if (idx === N || idx === -1) {
      const t = setTimeout(() => {
        setAnim(false);
        setIdx(idx === N ? 0 : N - 1);
      }, SLIDE_MS + 20);
      return () => clearTimeout(t);
    }
  }, [idx, N]);

  // Re-enable transitions a couple of frames after an instant snap
  useEffect(() => {
    if (!anim) {
      const r = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnim(true)),
      );
      return () => cancelAnimationFrame(r);
    }
  }, [anim]);

  // Autoplay every 3s. Hover no longer pauses (a cursor merely resting on the
  // slider kept it frozen forever); a drag pauses only while the hand/pointer is
  // down so a swipe never fights a slide change — with a 5s safety resume in
  // case the pointerup/cancel event is lost.
  useEffect(() => {
    if (paused) {
      const r = setTimeout(() => setPaused(false), 5000);
      return () => clearTimeout(r);
    }
    const t = setInterval(() => move(1), 3000);
    return () => clearInterval(t);
  }, [paused, move]);

  // ── Drag handlers (mouse on laptops, touch on phones/tablets) ──
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return; // right/middle click
    if (e.target.closest("button")) return; // arrows & dots keep their clicks
    drag.current = { active: true, startX: e.clientX, dx: 0, id: e.pointerId };
    e.currentTarget.setPointerCapture?.(e.pointerId); // keep the drag while the hand moves off the slider
    setDragging(true);
    setPaused(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.dx = e.clientX - d.startX;
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = "none"; // the track must track the hand 1:1
    t.style.transform = slideX(idxRef.current, d.dx);
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (e && d.id != null && e.currentTarget?.hasPointerCapture?.(d.id)) {
      e.currentTarget.releasePointerCapture(d.id);
    }

    const t = trackRef.current;
    const width = sliderRef.current?.clientWidth || 1;
    const dx = d.dx;
    const cur = idxRef.current;
    d.dx = 0;

    // A deliberate swipe past the threshold turns the page; a small wobble
    // (e.g. a click that drifted a pixel or two) springs straight back.
    const past = Math.abs(dx) > width * DRAG_THRESHOLD;
    let target = past ? cur + (dx < 0 ? 1 : -1) : cur;
    if (target > N || target < -1) target = cur; // no slide lives past the clones
    // Never settle on a clone (the loop padding slides) or the slider would stall
    // there — realign to the twin real slide, which is the same photo, unseen.
    let next = target;
    if (next === N) next = 0;
    if (next === -1) next = N - 1;
    const jumped = next !== target;

    if (t) {
      t.style.transition = jumped ? "none" : SMOOTH;
      t.style.transform = slideX(next);
    }
    setDragging(false);
    setPaused(false);
    if (next !== cur) {
      setAnim(!jumped);
      setIdx(next);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [move]);

  return (
    <div className="gallery-bg" id="gallery">
      <div className="gallery-inner reveal">
        <span className="scrolly-chapter">Chapter 5 · Sacred Chronicles</span>
        <br />
        <span className="section-label">
          <Camera
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Gallery
        </span>
        <h2 className="section-title">A Glimpse of Paradise</h2>
        <p className="section-sub">
          Every corner of Shiv Darshan Homestay tells a story of mountains, warmth
          and divine serenity.
        </p>
        <div
          ref={sliderRef}
          className={`slider${dragging ? " is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
        >
          {/* Track = [clone of last] + real slides + [clone of first] → seamless circular loop.
              Its transform/transition are driven imperatively (see slideX / the layout
              effect above) so a hand-drag can update it every frame for free. */}
          <div className="slider-track" ref={trackRef}>
            {[GALLERY[N - 1], ...GALLERY, GALLERY[0]].map((img, i) => (
              <div
                className={`slider-slide${i === idx + 1 ? " is-current" : ""}`}
                key={i}
              >
                {/* No lazy-loading here: inside the translating carousel track the
                    browser can defer these forever, leaving slides permanently blank.
                    All 9 gallery photos load eagerly (they're the section's content). */}
                <img
                  className="slider-img-blur"
                  src={img.url}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  draggable="false"
                />
                <img
                  className="slider-img"
                  src={img.url}
                  alt={img.label}
                  decoding="async"
                  draggable="false"
                />
                <div className="slider-caption">
                  <span className="slider-cat">{img.cat}</span>
                  <span className="slider-label">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="slider-arrow slider-prev"
            onClick={() => move(-1)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="slider-arrow slider-next"
            onClick={() => move(1)}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="slider-dots">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                className={`slider-dot${norm(idx) === i ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 16:9 CLOUDINARY PROPERTY TOURS ──────────────────────────────────────────
const TOUR_VIDEOS = [
  {
    id: "tour-property",
    title: "Property & Valley View Tour",
    label: "Property & Valley Tour",
    url: "https://player.cloudinary.com/embed/?cloud_name=b4c8jnri&public_id=WhatsApp_Video_2026-10-14_at_4.54.04_PM",
    desc: "A breathtaking walkthrough of Shiv Darshan Homestay, open-air terrace, and the surrounding green valleys of Haat, Dharchula."
  },
  {
    id: "tour-rooms",
    title: "Rooms & Balcony Walkthrough",
    label: "Rooms & Balcony Tour",
    url: "https://player.cloudinary.com/embed/?cloud_name=b4c8jnri&public_id=WhatsApp_Video_2026-10-14_at_4.54.01_PM",
    desc: "Step inside our comfortable deluxe bedrooms, clean bathrooms, and scenic balcony where travelers rest on the Adi Kailash route."
  }
];

function VideoSection() {
  const N = TOUR_VIDEOS.length;
  const [activeVideo, setActiveVideo] = useState(0);
  const go = (i) => setActiveVideo(((i % N) + N) % N);

  const swipe = useRef(null);
  const onTouchStart = (e) => {
    swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    go(activeVideo + (dx < 0 ? 1 : -1));
  };

  const currentTour = TOUR_VIDEOS[activeVideo];

  return (
    <div className="video-bg" id="video">
      <div className="video-inner reveal">
        <span className="scrolly-chapter">Chapter 6 · Live Mountain Walkthrough</span>
        <br />
        <span className="section-label">
          <Camera
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Video Tour
        </span>
        <h2 className="section-title">See It Before You Visit</h2>
        <p className="section-sub">
          Take a real 16:9 tour of Shiv Darshan Homestay and the breathtaking
          surroundings of Haat, Dharchula, Uttarakhand.
        </p>

        {/* Video Tour Switcher Tabs */}
        <div className="video-tour-nav">
          {TOUR_VIDEOS.map((v, i) => (
            <button
              key={v.id}
              className={`video-tour-btn${activeVideo === i ? " active" : ""}`}
              onClick={() => setActiveVideo(i)}
            >
              <span>{i === 0 ? "📹" : "🛏️"}</span>
              {v.label}
            </button>
          ))}
        </div>

        {/* 16:9 Video Slider with Touch Swipe & Arrow Navigation */}
        <div
          className="video-slider"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ position: "relative" }}
        >
          <div className="video-16-9-wrapper">
            <iframe
              key={currentTour.url}
              src={currentTour.url}
              title={currentTour.title}
              className="video-16-9-iframe"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>

          <button
            className="slider-arrow slider-prev"
            onClick={() => go(activeVideo - 1)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="slider-arrow slider-next"
            onClick={() => go(activeVideo + 1)}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="video-count">
            {activeVideo + 1} / {N}
          </div>
        </div>

        <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
          {currentTour.desc}
        </p>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="reveal" style={{ marginBottom: "1.25rem" }}>
        <span className="scrolly-chapter">Chapter 4 · Himalayan Care</span>
        <br />
        <span className="section-label">
          <Sparkles
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Services
        </span>
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-sub">
          Beyond comfortable rooms, we offer experiences that make your Himalayan
          journey unforgettable.
        </p>
      </div>
      <div className="services-grid reveal">
        {SERVICES.map(({ Icon, title, desc }) => (
          <div key={title} className="service-card">
            <span className="service-icon">
              <Icon size={28} strokeWidth={1.8} />
            </span>
            <div>
              <div className="service-title">{title}</div>
              <div className="service-desc">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const stackRef = useRef(null);
  const mainImgRef = useRef(null);

  // High-performance Scrollytelling Parallax for About owner photo
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      if (mainImgRef.current) mainImgRef.current.style.transform = "";
      return;
    }

    let ticking = false;
    let isIntersecting = false;
    let observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
      }, { threshold: 0 });
      observer.observe(el);
    } else {
      isIntersecting = true;
    }

    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
      if (!isIntersecting) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (el && mainImgRef.current) {
            const rect = el.getBoundingClientRect();
            const winH = window.innerHeight;
            const progress = (winH - rect.top) / (winH + rect.height);
            const mainShift = (progress - 0.5) * 16;
            mainImgRef.current.style.transform = `translate3d(0, ${mainShift.toFixed(1)}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="about-bg" id="about">
      <div className="about-grid reveal">
        <div className="about-img-stack" ref={stackRef}>
          {/* Floating nameplate placed below the owner photo */}
          <div
            className="floating-caption"
            style={{
              position: "absolute",
              bottom: "-24px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.98)",
              padding: "9px 24px",
              borderRadius: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              textAlign: "center",
              zIndex: 10,
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
              border: "1.5px solid rgba(200, 150, 62, 0.45)",
            }}
          >
            <div style={{ fontWeight: "700", color: "#1a3a4a", fontSize: "0.96rem" }}>
              Govind Singh Dhami
            </div>
            <div style={{ fontSize: "0.78rem", color: "#5a7380" }}>
              Owner &amp; Host · Shiv Darshan Homestay 🚩
            </div>
            {/* Pointer arrow directing attention up to Govind Singh Dhami */}
            <div
              style={{
                position: "absolute",
                top: "-6px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "12px",
                height: "12px",
                background: "rgba(255, 255, 255, 0.98)",
                borderLeft: "1.5px solid rgba(200, 150, 62, 0.45)",
                borderTop: "1.5px solid rgba(200, 150, 62, 0.45)",
                zIndex: 1,
              }}
            ></div>
          </div>

          <div className="about-img-main" ref={mainImgRef}>
            <img
              src={ownerGovindDhami}
              alt="Govind Singh Dhami - Owner of Shiv Darshan Homestay"
              style={{ objectPosition: "center 18%" }}
            />
          </div>
        </div>
        <div className="about-text">
          <span className="scrolly-chapter">Chapter 1 · The Mountain Abode</span>
          <br />
          <span className="section-label">
            <HomeIcon
              size={14}
              strokeWidth={2.2}
              style={{ verticalAlign: "-2px", marginRight: "5px" }}
            />
            Our Story
          </span>
          <h2 className="section-title">Born from a Love of Mountains</h2>
          <p>
            Shiv Darshan Homestay began as a heartfelt dream of Govind Singh Dhami and family
            to share the divine peace, natural beauty, and authentic Kumaoni hospitality
            with pilgrims and mountain lovers.
          </p>
          <p>
            Nestled in the picturesque village of Haat, Dharchula Dehat, Pithoragarh, Uttarakhand,
            we're ideally placed on the holy route to Adi Kailash &amp; Om Parvat — among the most
            sacred Himalayan shrines. Our guests aren't just visitors; they become part of our mountain family.
          </p>
          <div className="highlights">
            {[
              "On Adi Kailash & Om Parvat Route",
              "Haat, Dharchula Dehat",
              "Mountain & River Views",
            ].map((h) => (
              <span key={h} className="highlight">
                <MapPin
                  size={13}
                  strokeWidth={2.2}
                  style={{ verticalAlign: "-2px", marginRight: "4px" }}
                />
                {h}
              </span>
            ))}
          </div>
          <div className="about-features">
            {[
              [
                MountainSnow,
                "Panoramic Views",
                "Unobstructed Himalayan vista from every room",
              ],
              [
                Handshake,
                "Family-Run",
                "Personal care and authentic local hospitality",
              ],
              [
                Recycle,
                "Eco-Friendly",
                "Solar power, rainwater harvesting, organic garden",
              ],
              [
                ShieldCheck,
                "Safe & Clean",
                "Sanitized rooms, filtered water, fire safety certified",
              ],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="about-feature">
                <span className="about-feature-icon">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div className="about-feature-text">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyStay() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const reasons = [
    {
      IconComponent: MountainSnow,
      title: "Himalayan Views",
      desc: "Wake up to snow-capped Himalayan peaks right from your window.",
      img: whyHimalayanImg,
      caption: "Himalayan peaks, from your bed",
    },
    {
      IconComponent: BedDouble,
      title: "Comfortable Rooms",
      desc: "Cozy, heated rooms with premium bedding and 24×7 hot water.",
      img: roomCardImg,
      caption: "Warm, cozy & spotless",
    },
    {
      IconComponent: UtensilsCrossed,
      title: "Kumaoni Cuisine",
      desc: "Authentic home-cooked Kumaoni meals from our organic garden.",
      img: foodImg,
      caption: "Fresh local thali & warm hospitality",
    },
    {
      IconComponent: MapPin,
      title: "Near Adi Kailash",
      desc: "Perfect base on the Adi Kailash & Om Parvat yatra route — Haat, Dharchula.",
      img: kedarImg,
      caption: "On the Adi Kailash Route",
    },
    {
      IconComponent: Heart,
      title: "Peaceful Environment",
      desc: "Village trails, fresh mountain air, bird chirping and warm locals — pure mountain calm.",
      img: peacefulImg,
      caption: "Village trail, fresh air & birdsong",
    },
  ];

  return (
    <section className="section" id="why">
      <div className="reveal" style={{ marginBottom: "1.25rem" }}>
        <span className="scrolly-chapter">Chapter 2 · Sacred Yatra Experience</span>
        <br />
        <span className="section-label">
          <Heart
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Why Stay With Us
        </span>
        <h2 className="section-title">Why Stay With Us?</h2>
        <p className="section-sub">
          Five reasons travelers choose Shiv Darshan Homestay — and keep coming back.
          <span style={{ display: "block", fontSize: "0.82rem", color: "var(--gold)", marginTop: "4px" }}>
            (Hover or tap any card to view the real photo)
          </span>
        </p>
      </div>
      <div className="why-grid reveal">
        {reasons.map(({ IconComponent, title, desc, img, caption }, i) => (
          <div
            key={title}
            className={`why-card${hoveredIndex === i ? " is-active" : ""}`}
            tabIndex={0}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
          >
            <div className="why-icon">
              <IconComponent size={24} strokeWidth={2.2} />
            </div>
            <div className="why-title">{title}</div>
            <div className="why-desc">{desc}</div>
            <span className="why-hover-hint">Hover to view 📸</span>
            <div className="why-media" aria-hidden="true">
              <img src={img} alt={caption} loading="lazy" />
              <div className="why-media-caption">
                <div className="why-media-icon">
                  <IconComponent size={22} strokeWidth={2.2} />
                </div>
                <div className="why-media-title">{title}</div>
                <div className="why-media-sub">{caption}</div>
                <div className="why-media-desc">{desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Inline social brand logos (lucide dropped brand icons) — sized/styled like footer lucide icons
const YouTubeIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
  </svg>
);
const FacebookIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const GoogleReviewsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 48 48"
    style={{ verticalAlign: "-3px", marginRight: "7px" }}
    aria-hidden="true"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.2 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.2 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"
    />
  </svg>
);

function Testimonials() {
  const viewportRef = useRef(null);
  const offset = useRef(0); // current scroll position of the strip (px)
  const wrapWidth = useRef(1); // width of one full set of reviews (px)
  const dragging = useRef(null); // { startX, startOffset, id } while pressing
  const vel = useRef(0); // px/frame from the last drag motion (for momentum)
  const lastX = useRef(0);
  const pausedRef = useRef(false);

  // Keep content on screen: normalise offset into [-wrapWidth, 0).
  const normalize = () => {
    const w = wrapWidth.current;
    if (offset.current <= -w) offset.current += w;
    if (offset.current > 0) offset.current -= w;
  };

  useEffect(() => {
    const track = viewportRef.current?.firstElementChild;
    if (!track) return;
    const measure = () => {
      // The track renders the set of reviews exactly twice; half of it = one loop length
      wrapWidth.current = track.scrollWidth / 2 || 1;
      normalize();
      apply();
    };
    const apply = () => {
      track.style.transform = `translate3d(${offset.current}px, 0, 0)`;
    };

    measure();
    window.addEventListener("resize", measure);

    let raf,
      last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 50); // clamp tab-switch jumps
      last = now;
      if (!pausedRef.current && !dragging.current) {
        // Announcement drift (~48px/s), or glide from the last drag (momentum)
        const speed = Math.abs(vel.current) > 0.2 ? vel.current : -0.8;
        offset.current += speed * (dt / 16.7);
        vel.current *= 0.95; // momentum decays back to base drift
        if (vel.current > -0.2 && vel.current < 0.2) vel.current = 0;
        normalize();
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Drag with mouse or finger — moves the row both directions while held.
  const press = (clientX) => {
    dragging.current = {
      startX: clientX,
      startOffset: offset.current,
      moved: false,
    };
    lastX.current = clientX;
    vel.current = 0;
    pausedRef.current = true;
  };
  const movePointer = (clientX) => {
    if (!dragging.current) return;
    const d = clientX - dragging.current.startX;
    if (Math.abs(d) > 4) dragging.current.moved = true;
    offset.current = dragging.current.startOffset + d;
    vel.current = clientX - lastX.current; // remember direction/speed for momentum
    lastX.current = clientX;
    normalize();
    viewportRef.current.firstElementChild.style.transform = `translate3d(${offset.current}px, 0, 0)`;
  };
  const release = () => {
    dragging.current = null;
    pausedRef.current = false;
  };

  // Safety net: if mouse/touch is released outside the strip (or the tab loses
  // focus mid-drag), stop dragging so the drift always resumes.
  useEffect(() => {
    const up = () => release();
    const mv = (e) => {
      if (dragging.current) movePointer(e.clientX);
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchend", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="testimonials-bg">
      <div className="testimonials-inner reveal">
        <span className="scrolly-chapter">Chapter 7 · Pilgrim Voices</span>
        <br />
        <span className="section-label">
          <MessageSquare
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Reviews
        </span>
        <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
          What Our Guests Say
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            margin: "0 0 1.25rem",
            fontSize: "1rem",
          }}
        >
          Real stories from the travelers who've stayed with us
        </p>
        <div
          className="testi-viewport"
          ref={viewportRef}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            if (!dragging.current) pausedRef.current = false;
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            press(e.clientX);
          }}
          onMouseMove={(e) => {
            if (dragging.current) movePointer(e.clientX);
          }}
          onMouseUp={release}
          onTouchStart={(e) => press(e.touches[0].clientX)}
          onTouchMove={(e) => movePointer(e.touches[0].clientX)}
          onTouchEnd={release}
        >
          {/* The set of reviews rendered twice back-to-back → the strip can
              slide forever in either direction with no visible seam. */}
          <div className="testi-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div className="testi-item" key={i} draggable={false}>
                <div className="testi-card">
                  <div className="testi-stars">{"★".repeat(t.rating)}</div>
                  <p className="testi-text">"{t.text}"</p>
                  <div className="testi-author">
                    {t.photo ? (
                      <img
                        className="testi-avatar testi-avatar-img"
                        src={t.photo}
                        alt={t.name}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div className="testi-avatar">{t.avatar}</div>
                    )}
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-loc">📍 {t.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testi-cta">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary testi-cta-btn"
          >
            <GoogleReviewsIcon />
            Rate us on Google
          </a>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const [phone, setPhone] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields.");
      return;
    }

    const msg = `Hello! I would like to get in touch.
Name: ${form.name}
Email: ${form.email}
Phone: ${phone || "Not provided"}

Message:
${form.message}`;

    const waUrl = getWaUrl(WA_NUMBER, msg);
    window.open(waUrl, "_blank", "noopener");
    setSent(true);
  };

  return (
    <section className="section" id="contact">
      <div className="reveal" style={{ marginBottom: "1.25rem" }}>
        <span className="scrolly-chapter">Chapter 8 · Connect With Us</span>
        <br />
        <span className="section-label">
          <Mail
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Contact
        </span>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-sub">
          Have questions? We're always happy to help you plan the perfect mountain
          getaway.
        </p>
      </div>
      <div className="contact-grid reveal">
        <div className="contact-info">
          <h3>Reach Us Directly</h3>
          {[
            [
              MapPin,
              "Address",
              "Shiv Darshan Homestay, Haat, Dharchula Dehat, Pithoragarh, Uttarakhand – 262545",
            ],
            [Phone, "Call / WhatsApp", `${PHONE_1_DISPLAY} / ${PHONE_2_DISPLAY}`],
            [Mail, "Email", "shivdarshanhomestay@gmail.com"],
            [
              Clock,
              "Check-in / Check-out",
              "Check-in: 12:00 PM · Check-out: 11:00 AM",
            ],
            [Mountain, "Altitude", "On the Adi Kailash Himalayan Route"],
          ].map(([Icon, title, val]) => (
            <div key={title} className="contact-item">
              <div className="contact-icon">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <div className="contact-item-title">{title}</div>
                <div className="contact-item-val">{val}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "1rem" }}>
            <a
              href={WA_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ flex: "1 1 200px", padding: "0.75rem 1rem", fontSize: "0.88rem" }}
            >
              <MessageCircle size={18} strokeWidth={2} /> WhatsApp: 9410135726
            </a>
            <a
              href={WA_BOOKING_URL_2}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ flex: "1 1 200px", padding: "0.75rem 1rem", fontSize: "0.88rem", background: "#25D366" }}
            >
              <MessageCircle size={18} strokeWidth={2} /> WhatsApp: 9456761865
            </a>
          </div>
        </div>
        <div>
          <h3
            style={{
              fontSize: "1.4rem",
              color: "var(--peak)",
              marginBottom: "1.5rem",
            }}
          >
            Send a Message
          </h3>
          {sent ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                background: "var(--ice)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--glacier)",
              }}
            >
              <Handshake size={40} strokeWidth={1.4} color="var(--gold)" />
              <h4 style={{ color: "var(--peak)", marginBottom: "0.5rem" }}>
                Message Received!
              </h4>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                Thank you {form.name}! We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSend}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div className="form-group full">
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group full">
                  <label>Message *</label>
                  <textarea
                    style={{ minHeight: "140px" }}
                    placeholder="Ask about rooms, availability, trek guidance, group bookings..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: "1rem", width: "100%", padding: "0.85rem" }}
              >
                Send Message{" "}
                <Send
                  size={15}
                  strokeWidth={2}
                  style={{ verticalAlign: "-2px", marginLeft: "4px" }}
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── SMOOTH IN-PAGE SCROLL ──────────────────────────────────────────────────
// Native smooth scrolling covers most of a long jump in a few frames and then
// trickles the rest of the way — a jerk, then a hang. This drives the glide
// itself so one even ease-in-out covers whatever the distance, and it hands the
// page straight back the moment the visitor takes over with wheel, finger or
// keyboard. `prefers-reduced-motion` skips the glide entirely.
const reduceMotion = () =>
  !!(
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

// Roughly cubic-bezier(0.4, 0, 0.2, 1) — the same even curve the room slider uses
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// Long hops get more time, but never enough to feel like waiting
const glideDuration = (distance) => Math.min(900, 380 + distance * 0.25);

let stopGlide = null; // cancels whatever glide is in flight

function glideTo(targetY) {
  const maxY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const endY = Math.max(0, Math.min(maxY, targetY));
  const startY = window.scrollY;
  const distance = endY - startY;

  if (stopGlide) stopGlide();

  if (reduceMotion()) {
    window.scrollTo({ top: endY, behavior: "auto" });
    return;
  }
  if (!distance) return;

  // With `scroll-behavior: smooth` on <html>, every one of our own scrollTo calls
  // would start an animation of its own — pin the page to instant for the ride.
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  let frame = 0;
  const release = () => {
    root.style.scrollBehavior = prevBehavior;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
    stopGlide = null;
  };
  const cancel = () => {
    cancelAnimationFrame(frame);
    release();
  };
  stopGlide = cancel;

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  const from = performance.now();
  const ms = glideDuration(Math.abs(distance));
  const step = () => {
    const t = Math.min(1, (performance.now() - from) / ms);
    window.scrollTo(0, Math.round(startY + distance * easeInOut(t)));
    if (t < 1) frame = requestAnimationFrame(step);
    else release();
  };
  frame = requestAnimationFrame(step);
}

// Land an element (or an id) where the CSS offset wants it — just below the
// fixed navbar, which is what `scroll-padding-top` expresses for the native
// jumps (deep links, back/forward).
function glideToElement(target) {
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;
  const offset =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    0;
  glideTo(el.getBoundingClientRect().top + window.scrollY - offset);
}

// Shared by the footer's circle and the floating one that rides the page
function scrollToTop() {
  glideTo(0);
}

function Footer({ bookRowRef, toTopRef, onPolicies }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              <img
                src={logoImg}
                alt="Shiv Darshan Homestay logo"
                className="footer-brand-img"
              />{" "}
              Shiv Darshan Homestay
            </div>
            <p className="footer-brand-desc">
              Shiv Darshan Homestay is the premier homestay in Haat, Dharchula, Uttarakhand.
              More than a stay, it feels like home on the sacred Adi Kailash &amp; Om Parvat route.
            </p>
            {/* Social profiles */}
            <div className="footer-social">
              <a
                href="#root"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <YouTubeIcon size={18} />
              </a>
              <a
                href="#root"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
          <div className="footer-col footer-col-explore">
            <h4>Explore</h4>
            {[
              ["#rooms", "Rooms"],
              ["#gallery", "Gallery"],
              ["#video", "Tour Video"],
              ["#services", "Services"],
              ["#about", "Our Story"],
            ].map(([h, l]) => (
              <a key={h} href={h}>
                {l}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#contact">Contact Us</a>
            <a href="#rooms">Book a Room</a>
            {/* Both open the in-app policies page, so the fragments name that page
                (and its cancellation card) instead of an empty "#". */}
            <a
              href="#policy-cancellation"
              onClick={(e) => {
                e.preventDefault();
                onPolicies("cancellation");
              }}
            >
              Cancellation Policy
            </a>
            <a
              href="#policies"
              onClick={(e) => {
                e.preventDefault();
                onPolicies();
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#policies"
              onClick={(e) => {
                e.preventDefault();
                onPolicies();
              }}
            >
              Terms &amp; Conditions
            </a>
          </div>
          <div className="footer-col footer-col-contact">
            <h4>Contact</h4>
            <a href="tel:+919410135726">
              <Phone
                size={13}
                strokeWidth={2.2}
                style={{ verticalAlign: "-2px", marginRight: "5px" }}
              />
              +91 94101 35726
            </a>
            <a href="tel:+919456761865">
              <Phone
                size={13}
                strokeWidth={2.2}
                style={{ verticalAlign: "-2px", marginRight: "5px" }}
              />
              +91 94567 61865
            </a>
            <a href="mailto:shivdarshanhomestay@gmail.com">
              <Mail
                size={13}
                strokeWidth={2.2}
                style={{ verticalAlign: "-2px", marginRight: "5px" }}
              />
              Email Us
            </a>
            <a href={WA_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle
                size={13}
                strokeWidth={2.2}
                style={{ verticalAlign: "-2px", marginRight: "5px" }}
              />
              WhatsApp (9410135726)
            </a>
            <a href={WA_BOOKING_URL_2} target="_blank" rel="noopener noreferrer">
              <MessageCircle
                size={13}
                strokeWidth={2.2}
                style={{ verticalAlign: "-2px", marginRight: "5px" }}
              />
              WhatsApp (9456761865)
            </a>
            <div className="footer-book-row" ref={bookRowRef}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                <MapPin
                  size={13}
                  strokeWidth={2.2}
                  style={{ verticalAlign: "-2px", marginRight: "5px" }}
                />
                Directions
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <div className="footer-copy">
              &copy; 2026 Shiv Darshan Homestay. All Rights Reserved.
            </div>
          </div>
          <div className="footer-love">
            Made with{" "}
            <Heart
              size={12}
              strokeWidth={2.2}
              color="#e05656"
              style={{ verticalAlign: "-1px", margin: "0 2px" }}
            />{" "}
            by{" "}
            <a
              href="https://linktr.ee/hackerfromhills"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Team Hackerfromhills
            </a>
          </div>
          <button
            ref={toTopRef}
            type="button"
            className="to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={17} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </footer>
  );
}

// ── Hotel Policies page (opened from footer links) ──
function PolicyPage({ section, onClose }) {
  const [closing, setClosing] = useState(false);
  const targetRef = useRef(null);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 320);
  }, [closing, onClose]);

  // Lock page scroll while open
  useEffect(() => {
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  // Esc closes; arrow keys are left to the page scroll
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [requestClose]);

  // Scroll to a deep-linked section (e.g. "cancellation") once mounted
  useEffect(() => {
    if (!section) return;
    const t = setTimeout(() => {
      const el = document.getElementById(`policy-${section}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450); // after the entrance animation settles
    return () => clearTimeout(t);
  }, [section]);

  return (
    <div
      id="policies"
      className={`pol-page${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Hotel policies"
    >
      <div className="rg-topbar">
        <button
          className="rg-back"
          aria-label="Back to site"
          onClick={requestClose}
        >
          <ChevronLeft size={16} strokeWidth={2.4} /> Back
        </button>
        <span className="rg-brand">Shiv Darshan Homestay</span>
      </div>
      <div className="pol-hero">
        <span className="section-label">
          <ScrollText
            size={14}
            strokeWidth={2.2}
            style={{ verticalAlign: "-2px", marginRight: "5px" }}
          />
          Hotel Policies
        </span>
        <h2 className="rg-title">Policies &amp; House Rules</h2>
        <p className="rg-sub">
          At Shiv Darshan Homestay, we aim to provide a comfortable, serene, and hassle-free
          stay. Please review our policies before booking.
        </p>
      </div>
      <div className="pol-grid">
        {POLICY_SECTIONS.map(({ id, Icon, title, items }) => (
          <div
            key={id}
            id={`policy-${id}`}
            className="pol-card"
            ref={section === id ? targetRef : undefined}
          >
            <div className="pol-card-head">
              <span className="pol-icon">
                <Icon size={17} strokeWidth={1.9} />
              </span>
              <h3>{title}</h3>
            </div>
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  <span className="pol-num">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pol-contact">
        <h3>Questions? We're here to help.</h3>
        <p>
          For any queries or special requests, feel free to contact us anytime.
        </p>
        <div className="pol-contact-btns">
          <a className="btn-primary" href="tel:+919410135726">
            📞 +91 94101 35726
          </a>
          <a className="btn-primary" href="tel:+919456761865">
            📞 +91 94567 61865
          </a>
          <a
            className="btn-outline"
            href={getWaUrl(WA_NUMBER, "Hello Govind ji! I have a question regarding Shiv Darshan Homestay policies and booking.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp (9410135726)
          </a>
          <a
            className="btn-outline"
            href={getWaUrl(WA_NUMBER_2, "Hello Govind ji! I have a question regarding Shiv Darshan Homestay policies and booking.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp (9456761865)
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════════
// Eases every .reveal block in the moment it reaches the viewport — one observer
// for the whole page, each block fired once. Where IntersectionObserver is
// missing, or the visitor prefers less motion, the blocks are simply shown.
function useScrollReveal() {
  useEffect(() => {
    const blocks = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!blocks.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion()) {
      blocks.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Preloader() {
  const isTest = typeof process !== "undefined" && process.env && process.env.NODE_ENV === "test";
  const [visible, setVisible] = useState(() => !isTest);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isTest || !visible) return;
    // 3-second circular logo loading sequence (fade begins at 2.4s, completes at 3.0s)
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2400);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [isTest, visible]);

  if (!visible) return null;

  return (
    <div
      className={`site-preloader ${fading ? "is-fading" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Shiv Darshan Homestay"
    >
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <div className="preloader-spinner-outer" />
          <div className="preloader-spinner-inner" />
          <img
            src={logoImg}
            alt="Shiv Darshan Homestay Logo"
            className="preloader-logo-img"
          />
        </div>
        <h2 className="preloader-title">Shiv Darshan Homestay</h2>
        <div className="preloader-sub">Haat, Dharchula · Uttarakhand</div>
        <div className="preloader-mantra">॥ ॐ नमः शिवाय ॥</div>
      </div>
    </div>
  );
}

export default function App() {
  const [booking, setBooking] = useState(null);
  const [policies, setPolicies] = useState(null);

  useScrollReveal();

  // Always return user to the hero section on page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (typeof process === "undefined" || !process.env || process.env.NODE_ENV !== "test") {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // In-page links glide to their section instead of jumping, and the address bar
  // keeps the fragment so the links stay shareable. Anything that opens a page of
  // its own (the policy fragments, which only exist once that page is open), asks
  // for a new tab, or already handled its own click is left to the browser.
  useEffect(() => {
    const onClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      glideToElement(id);
      if (window.history && window.history.pushState)
        window.history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Inject viewport meta to prevent mobile zoom/overflow issues
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
    // Clip horizontal overflow without breaking position: sticky
    document.documentElement.style.overflowX = "clip";
    document.body.style.overflowX = "clip";
    document.body.style.width = "100%";
    document.body.style.position = "relative";
  }, []);

  // Global reading progress bar ref for 60 FPS scrollytelling tracker
  const readingBarRef = useRef(null);

  // 60 FPS Scrollytelling Global Reading Progress Bar
  useEffect(() => {
    let frame = 0;
    const updateReadingProgress = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && readingBarRef.current) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
        readingBarRef.current.style.width = `${pct.toFixed(1)}%`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateReadingProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateReadingProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Phones only: the floating Book Now pill keeps riding the bottom-right
  // corner (identical to desktop) until the footer's Directions row scrolls
  // into view, then it parks itself right beside that link instead of sitting
  // on top of the footer text. On desktop nothing here ever fires.
  const floatBookRef = useRef(null);
  const footerBookRowRef = useRef(null);
  const floatTopRef = useRef(null);
  const footerTopRef = useRef(null);

  // Floating back-to-top circle. Same rAF-throttled scroll listener as the
  // docking pill below: it appears once the hero is behind you and steps aside
  // the moment the footer's own circle is on screen, so there are never two
  // "back to top" buttons visible at once.
  useEffect(() => {
    const btn = floatTopRef.current;
    const anchor = footerTopRef.current;
    if (!btn || !anchor) return;
    let frame = 0;

    const place = () => {
      frame = 0;
      const r = anchor.getBoundingClientRect();
      const vh = window.innerHeight;
      const pastHero = window.scrollY > vh * 0.6;
      const footerCircleOnScreen = r.top < vh && r.bottom > 0;
      btn.classList.toggle("show", pastHero && !footerCircleOnScreen);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const btn = floatBookRef.current;
    const anchor = footerBookRowRef.current;
    if (!btn || !anchor) return;
    const mq = window.matchMedia("(max-width: 768px)");
    let frame = 0;

    const place = () => {
      frame = 0;
      const reset = () => {
        btn.classList.remove("docked");
        btn.style.top = "";
        btn.style.right = "";
      };
      if (!mq.matches) return reset();
      const r = anchor.getBoundingClientRect();
      const h = btn.offsetHeight;
      const vh = window.innerHeight;
      // Dock as soon as the row reaches the viewport and stay docked while it
      // scrolls past. The footer's tail (copyright / "Made with ♥") always sits
      // below this row, so a docked pill can never cover it — the floating pill
      // in the corner is what the tail would land behind.
      if (r.top > vh - 8) return reset();
      const top = r.top + (r.height - h) / 2; // vertically centred on Directions
      const minTop = 88; // keep it clear of the 80px phone navbar
      btn.classList.add("docked"); // .docked also pins bottom: auto
      btn.style.top = `${Math.round(Math.min(Math.max(top, minTop), vh - h - 8))}px`;
      // Align its right edge with the row's, so it reads as part of that row
      btn.style.right = `${Math.round(Math.max(12, window.innerWidth - r.right))}px`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (mq.addEventListener) mq.addEventListener("change", onScroll);
    else mq.addListener(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (mq.removeEventListener) mq.removeEventListener("change", onScroll);
      else mq.removeListener(onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      <style>{CSS}</style>
      <Preloader />
      {/* 60 FPS Scrollytelling Global Reading Progress Bar */}
      <div ref={readingBarRef} className="scrolly-reading-bar" style={{ width: "0%" }} />
      <Navbar />
      <div className="hero-scroll-pin">
        <Hero />
      </div>
      <div className="curtain-content-wrapper">
        <About />
        <WhyStay />
        <Rooms
          onBook={(room) =>
            setBooking({ room, checkin: "", checkout: "", guests: "1" })
          }
        />
        <div className="divider" />
        <Services />
        <div className="divider" />
        <Gallery />
        <VideoSection />
        <Testimonials />
        <Contact />
        <Footer
          bookRowRef={footerBookRowRef}
          toTopRef={footerTopRef}
          onPolicies={(section) => setPolicies({ section })}
        />
      </div>

      {/* Floating back-to-top circle. Bottom-left so it never fights the Book
          Now pill in the bottom-right corner; JS toggles .show. */}
      <button
        ref={floatTopRef}
        type="button"
        className="to-top to-top-float"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp size={17} strokeWidth={2.6} />
      </button>

      {/* Floating Book Now → WhatsApp. Stays desktop-only in the corner until
          the footer's Directions row is on screen (phones), then docks there. */}
      <a
        ref={floatBookRef}
        href={WA_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="book-float"
        title="Book on WhatsApp"
      >
        <CalendarDays size={19} strokeWidth={2} />
        <span>Book Now</span>
        <span className="book-tooltip">WhatsApp: 9410135726 / 9456761865</span>
      </a>

      {/* Booking Modal */}
      {booking && (
        <BookingModal
          room={booking.room}
          preCheckin={booking.checkin}
          preCheckout={booking.checkout}
          preGuests={booking.guests}
          onClose={() => setBooking(null)}
        />
      )}

      {/* Hotel Policies page (footer links) */}
      {policies && (
        <PolicyPage
          section={policies.section}
          onClose={() => setPolicies(null)}
        />
      )}
    </div>
  );
}
