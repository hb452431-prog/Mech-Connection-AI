import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  Wrench, 
  Car, 
  CheckCircle2,
  Tv
} from 'lucide-react';

export const AboutWebsiteVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    // Auto-play attempt on mount
    video.play().catch(() => {
      // Browsers require mute for autoplay
      video.muted = true;
      setIsMuted(true);
      video.play().catch((err) => console.log('Autoplay deferred:', err));
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.volume = val;
    setVolume(val);
    if (val === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = () => {
    const video = videoRef.current;
    if (!video) return;

    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    video.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="w-full max-w-4xl mx-auto my-8 px-2 sm:px-4" id="about-website-video">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono tracking-wider shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          OFFICIAL PLATFORM DEMO
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
          How MECH CONNECT AI Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-medium">
          Watch how our AI connects stranded vehicle owners with certified mechanics and provides instant emergency rescue.
        </p>
      </div>

      {/* Main Video Player Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl transition-all group ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen flex flex-col justify-between' : ''
        }`}
      >
        {/* Device Top Bar */}
        <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <Tv className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                MECH CONNECT AI • <span className="text-cyan-400">PRODUCT OVERVIEW</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              HD 60FPS
            </span>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/platform_video.mp4"
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
            playsInline
            loop
            muted={isMuted}
            preload="auto"
          />

          {/* Big Center Play Button Overlay when Paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 backdrop-blur-sm transition-transform transform hover:scale-110 z-10"
              aria-label="Play Video"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
            </button>
          )}

          {/* Unmute Overlay Hint (shown when muted & playing) */}
          {isMuted && isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 text-white text-xs font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg"
            >
              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              <span>Tap to Unmute</span>
            </button>
          )}

          {/* Bottom Player Overlay Controls (Visible on hover / move) */}
          <div 
            className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Progress Bar */}
            <div 
              className="w-full h-2 bg-slate-700/80 hover:h-2.5 rounded-full overflow-hidden cursor-pointer relative transition-all mb-3 group/bar"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-indigo-400 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 group-hover/bar:scale-100 transition-transform"></div>
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              {/* Left Actions: Play, Restart, Volume, Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shadow-md shadow-indigo-600/30"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Replay Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-1.5 group/vol">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hidden sm:inline-block"
                  />
                </div>

                {/* Time Display */}
                <div className="font-mono text-[11px] text-slate-300 pl-1">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-500 mx-1">/</span>
                  <span className="text-slate-400">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right Actions: Speed, Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeedChange}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-mono font-bold text-slate-300 hover:text-white transition-colors"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWebsiteVideo;
