export type AnimeType = 'tv' | 'movie' | 'ova' | 'special';
export type AnimeStatus = 'ongoing' | 'completed' | 'upcoming';

export interface VideoServer {
  id: string;
  name: string; // e.g., 'Google Drive', 'Yonaplay', 'Vidmoly', 'Mp4Upload', 'StreamWish'
  quality: 'FHD' | 'HD' | 'SD' | 'Multi';
  embedUrl: string;
  directUrl?: string;
  type: 'embed' | 'direct' | 'hls';
}

export interface DownloadLink {
  server: string;
  quality: '1080p FHD' | '720p HD' | '480p SD';
  size: string;
  url: string;
}

export interface Episode {
  id: string;
  animeId: string;
  episodeNumber: number;
  title: string;
  thumbnail: string;
  duration: string;
  airedDate: string;
  servers: VideoServer[];
  downloads: DownloadLink[];
  synopsis?: string;
}

export interface Season {
  id: string;
  number: number;
  title: string;
  year: number;
  episodesCount: number;
  episodes: Episode[];
}

export interface Anime {
  id: string;
  slug: string;
  titleArabic: string;
  titleEnglish: string;
  titleJapanese: string;
  poster: string;
  backdrop: string;
  type: AnimeType;
  status: AnimeStatus;
  releaseYear: number;
  seasonName: string; // e.g. "ربيع 2024", "صيف 2024", "خريف 2024", "شتاء 2025"
  rating: number; // e.g. 8.7
  votesCount: number;
  genres: string[];
  studio: string;
  episodesCount: number;
  durationPerEp: string;
  story: string;
  trailerYoutubeId?: string;
  isFeatured?: boolean;
  isPinned?: boolean;
  seasons: Season[];
  airDay?: 'السبت' | 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس' | 'الجمعة';
  airTime?: string;
}

export interface UserComment {
  id: string;
  targetId: string; // animeId or episodeId
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  isSpoiler: boolean;
}

export interface FilterState {
  searchQuery: string;
  type: AnimeType | 'all';
  genre: string | 'all';
  status: AnimeStatus | 'all';
  year: number | 'all';
  season: string | 'all';
  sortBy: 'latest' | 'rating' | 'popular' | 'episodes';
}
