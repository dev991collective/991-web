// src/data/artists.ts
import { speakers } from "@/app/api/data"; // <= ajuste se o arquivo estiver noutro lugar

export type SocialPlatform =
    | "Instagram"
    | "Twitter/X"
    | "TikTok"
    | "Spotify"
    | "SoundCloud"
    | "YouTube"
    | "Apple Music"
    | "Bandcamp"
    | "Website";

export type ArtistExtra = {
    location?: string;
    genres?: string[];
    avatar?: string;
    bio?: string[]; // parágrafos
    socials?: { platform: SocialPlatform; url: string }[];
    links?: {
        spotify?: string;
        soundcloud?: string;
        apple?: string;
        bandcamp?: string;
        website?: string;
    };
    gallery?: string[];
    hero?: string;     // se quiser um hero diferente do speakers.src
    tagline?: string;
    heroPosition?: string;   // ex.: "right center", "70% center", "center 40%"
    heroWidthVW?: number;    // ex.: 52 (vw usados no strip da direita)
    heroScale?: number;      // ex.: 1.1 (leve zoom pra compor melhor)
    heroBlur?: number;       // ex.: 2 (px) pra dar um defocus
    heroDarkness?: number;
    role?: string;
    designation?: string;
    cardImage?: string; // se quiser outra frase curta
};

export type Artist = {
    id: number;
    slug: string;
    name: string;
    hero: string;
    tagline?: string;
} & ArtistExtra;

// slugify seguro (remove acentos, pontuação, espaços, etc.)
const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

// aqui você pode enriquecer os artistas sem mexer no speakers.
// a chave é o slug (veja o nome que ficou na lista /artists)
const extras: Record<string, ArtistExtra> = {
    "dj-la-beat": {
        location: "São Paulo, BR",
        genres: ["Techno", "Hard Techno"],
        bio: [
            "DJ LA BEAT DJ LA BEATDJ LA BEATDJ LA BEATDJ LA BEATDJ LA BEATDJ LA BEAT.",
            "DJ LA BEATDJ LA BEATDJ LA BEATDJ LA BEATDJ LA BEATDJ LA BEAT"
        ],
        socials: [
            { platform: "Instagram", url: "https://instagram.com/djlabeat" },
            { platform: "Spotify", url: "https://open.spotify.com/artist/YYY" }
        ],
        links: { spotify: "https://open.spotify.com/artist/YYY" }
    },
    "dj-rosa-boladao": {
        genres: ["Hard Techno"],
        bio: ["Bio em breve."],
    },
    "991didi": {
        bio: ["Bio em breve."],
    },
    "dj-vitinho-beat": {
        bio: ["Bio em breve."],
    },
    "kxssio-art": {
        genres: ["Designer"],
        bio: ["Artista e designer visual da 991Collective."],
        links: { website: "https://..." }
    }
};

export const artists: Artist[] = speakers.map((s) => {
    const slug = slugify(s.name);
    const extra = extras[slug] ?? {};
    return {
        id: s.id,
        slug,
        name: s.name,
        hero: extra.hero ?? s.src,           // usa o src do speakers como hero por padrão
        tagline: extra.tagline ?? s.designation,
        ...extra,
    };
});

export const getArtistBySlug = (slug: string) =>
    artists.find((a) => a.slug === slug);
