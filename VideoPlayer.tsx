import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  Lightbulb, 
  LightbulbOff, 
  SkipBack, 
  SkipForward, 
  Server, 
  AlertCircle, 
  Sparkles,
  Download,
  MonitorPlay,
  Tv
} from 'lucide-react';
import { Anime, Episode, VideoServer } from '../types/anime';

interface VideoPlayerProps {
  anime: Anime;
  episode: Episode;
  onPrevEpisode?: () => void;
  onNextEpisode?: () => void;
  onOpenReport?: () => void;
  onOpenDownload?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  anime,
  episode,
  onPrevEpisode,
  onNextEpisode,
  onOpenReport,
  onOpenDownload,
}) => {
  const initialServer = episode.servers[0] || {
    id: `yonaplay-${episode.episodeNumber}`,
    name: 'سيرفر Yonaplay VIP',
    quality: 'FHD' as const,
    embedUrl: `https://www.youtube-nocookie.com/embed/${anime.trailerYoutubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0&modestbranding=1`,
    directUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    type: 'embed' as const,
  };

  const [currentServer, setCurrentServer] = useState<VideoServer>(initialServer);
  const [playerMode, setPlayerMode] = useState<'embed' | 'direct'>(
    initialServer.type === 'embed' ? 'embed' : 'direct'
  );
  const [hasVideoError, setHasVideoError] = useState(false);

  // Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLightsOff, setIsLightsOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState<'1080p' | '720p' | '480p'>('1080p');
  const [autoplayNext, setAutoplayNext] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset server on episode change
  useEffect(() => {
    if (episode.servers && episode.servers.length > 0) {
      const s = episode.servers[0];
      setCurrentServer(s);
      setPlayerMode(s.type === 'embed' ? 'embed' : 'direct');
    }
    setHasVideoError(false);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [episode.id]);

  // Handle Video Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setHasVideoError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (autoplayNext && onNextEpisode) {
      onNextEpisode();
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Skip 10s
  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  // Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Playback speed
  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Controls auto hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Fallback if video tag throws error
  const handleVideoError = () => {
    // If direct fails, gracefully switch to embed mode
    setHasVideoError(true);
    setPlayerMode('embed');
  };

  // Select server
  const handleSelectServer = (server: VideoServer) => {
    setCurrentServer(server);
    setHasVideoError(false);
    setPlayerMode(server.type === 'embed' ? 'embed' : 'direct');
    setIsPlaying(false);
  };

  return (
    <>
      {/* Lights Off Backdrop Overlay */}
      {isLightsOff && (
        <div 
          onClick={() => setIsLightsOff(false)}
          className="fixed inset-0 bg-black/95 z-40 transition-opacity backdrop-blur-md cursor-pointer"
          title="اضغط في أي مكان لتشغيل الأنوار"
        />
      )}

      <div className={`relative ${isLightsOff ? 'z-50' : 'z-10'} w-full space-y-4`}>
        {/* Main Player Box */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#2a2e3d] shadow-2xl group select-none"
        >
          {/* Conditional: Embed Iframe vs Direct Video */}
          {playerMode === 'embed' ? (
            <div className="w-full h-full relative">
              <iframe
                src={currentServer.embedUrl}
                title={`${anime.titleArabic} - الحلقة ${episode.episodeNumber}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <video
                ref={videoRef}
                poster={episode.thumbnail || anime.backdrop || anime.poster}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onError={handleVideoError}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
                playsInline
                crossOrigin="anonymous"
              >
                <source src={currentServer.directUrl || 'https://media.w3.org/2010/05/sintel/trailer.mp4'} type="video/mp4" />
                <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
              </video>

              {/* Large Center Play Button when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-[#e50914] hover:bg-[#ff2b38] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current mr-1" />
                  </div>
                </div>
              )}

              {/* Bottom Player Controls (Direct mode only) */}
              <div 
                className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Progress Bar */}
                <div className="relative mb-3 flex items-center group/progress">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-gray-600/60 rounded-lg appearance-none cursor-pointer accent-[#e50914] hover:h-2.5 transition-all"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                  {/* Right Side: Play/Pause, Skip, Volume, Time */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-white/10 hover:bg-[#e50914] transition-colors"
                      title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={() => skipTime(-10)}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="رجوع 10 ثوانٍ"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => skipTime(10)}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="تقديم 10 ثوانٍ"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1.5 group/volume">
                      <button onClick={toggleMute} className="p-1.5 text-gray-300 hover:text-white">
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-14 sm:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#e50914]"
                      />
                    </div>

                    {/* Time Display */}
                    <div className="font-mono text-xs text-gray-300 select-none">
                      <span>{formatTime(currentTime)}</span>
                      <span className="mx-1 text-gray-500">/</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Left Side: Speed, Quality, Fullscreen */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Speed selector */}
                    <div className="flex items-center gap-1">
                      {[1, 1.25, 1.5].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => changeSpeed(speed)}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            playbackSpeed === speed
                              ? 'bg-[#e50914] text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>

                    {/* Quality selector */}
                    <select
                      value={selectedQuality}
                      onChange={(e) => setSelectedQuality(e.target.value as any)}
                      className="bg-black/60 border border-white/20 rounded px-1.5 py-0.5 text-xs text-white cursor-pointer focus:outline-none"
                    >
                      <option value="1080p">1080p FHD</option>
                      <option value="720p">720p HD</option>
                      <option value="480p">480p SD</option>
                    </select>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="ملء الشاشة"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Info Bar */}
          <div 
            className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 pointer-events-none ${
              showControls || playerMode === 'embed' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-right pointer-events-auto">
              <h3 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                <span>{anime.titleArabic}</span>
                <span className="text-[#e50914]">•</span>
                <span className="text-sm text-gray-300">الحلقة {episode.episodeNumber}</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {currentServer.name} • {playerMode === 'embed' ? 'مشغل الخادم المضمن' : 'مشغل مباشر'} ({selectedQuality})
              </p>
            </div>

            {/* Quick Mode & Lights off indicator */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setPlayerMode(playerMode === 'embed' ? 'direct' : 'embed')}
                className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-[#e50914] text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-colors"
                title="تبديل وضع المشغل"
              >
                {playerMode === 'embed' ? <MonitorPlay className="w-3.5 h-3.5" /> : <Tv className="w-3.5 h-3.5" />}
                <span>{playerMode === 'embed' ? 'المشغل المباشر' : 'مشغل الخادم'}</span>
              </button>

              <button
                onClick={() => setIsLightsOff(!isLightsOff)}
                className="p-2 rounded-lg bg-black/60 hover:bg-[#e50914] text-white transition-colors"
                title={isLightsOff ? 'تشغيل الأنوار' : 'إطفاء الأنوار'}
              >
                {isLightsOff ? <Lightbulb className="w-4 h-4 text-amber-300" /> : <LightbulbOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Server Selection & Navigation Buttons Bar (Animerco Signature!) */}
        <div className="rounded-xl bg-[#171922] border border-[#272b38] p-3 sm:p-4 space-y-3">
          {/* Servers list row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Server className="w-4 h-4 text-[#e50914]" />
              <span>سيرفرات المشاهدة:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {episode.servers.map((server) => {
                const isActive = currentServer.id === server.id;
                return (
                  <button
                    key={server.id}
                    onClick={() => handleSelectServer(server)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/30 scale-105'
                        : 'bg-[#202431] hover:bg-[#282d3e] text-gray-300 hover:text-white border border-[#2c3243]'
                    }`}
                  >
                    <span>{server.name}</span>
                    <span className="text-[10px] px-1 py-0.2 bg-black/40 rounded">
                      {server.quality}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Episode Navigation and Toolbar */}
          <div className="pt-3 border-t border-[#252835] flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onPrevEpisode}
                disabled={!onPrevEpisode}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  onPrevEpisode
                    ? 'bg-[#202431] hover:bg-[#292e3e] text-white border border-[#2f3547]'
                    : 'bg-[#181a24] text-gray-600 cursor-not-allowed border border-[#222533]'
                }`}
              >
                <SkipForward className="w-4 h-4" />
                <span>الحلقة السابقة</span>
              </button>

              <button
                onClick={onNextEpisode}
                disabled={!onNextEpisode}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  onNextEpisode
                    ? 'bg-[#e50914] hover:bg-[#c2050f] text-white shadow-md shadow-[#e50914]/20'
                    : 'bg-[#181a24] text-gray-600 cursor-not-allowed border border-[#222533]'
                }`}
              >
                <span>الحلقة التالية</span>
                <SkipBack className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoplayNext(!autoplayNext)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 border transition-colors ${
                  autoplayNext
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-[#1d202b] border-[#292e3d] text-gray-400'
                }`}
                title="تشغيل الحلقة التالية تلقائياً عند انتهاء الحلقة الحالية"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>التشغيل التلقائي: {autoplayNext ? 'مفعل' : 'معطل'}</span>
              </button>

              <button
                onClick={() => setIsLightsOff(!isLightsOff)}
                className="px-3 py-1.5 rounded-lg bg-[#202431] hover:bg-[#282d3e] text-gray-300 hover:text-white border border-[#2e3344] font-medium flex items-center gap-1.5 transition-colors"
              >
                {isLightsOff ? <Lightbulb className="w-3.5 h-3.5 text-amber-300" /> : <LightbulbOff className="w-3.5 h-3.5" />}
                <span>إطفاء الأنوار</span>
              </button>

              {onOpenDownload && (
                <button
                  onClick={onOpenDownload}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الحلقة</span>
                </button>
              )}

              {onOpenReport && (
                <button
                  onClick={onOpenReport}
                  className="px-3 py-1.5 rounded-lg bg-[#202431] hover:bg-rose-950/60 text-gray-400 hover:text-rose-400 border border-[#2e3344] font-medium flex items-center gap-1.5 transition-colors"
                  title="الإبلاغ عن عطل في الحلقة"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>إبلاغ عن عطل</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
