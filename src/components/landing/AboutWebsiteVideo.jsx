import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX
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
    <section className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-4 sm:px-6" id="about-website-video">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
          How MECH CONNECT AI Works
        </h2>
      </div>

      {/* Main Video Player Container (Pure video player without fake title bar) */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-2xl transition-all group ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen flex flex-col justify-between' : ''
        }`}
      >
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
              className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 backdrop-blur-sm transition-transform transform hover:scale-110 z-10"
              aria-label="Play Video"
            >
              <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-current" />
            </button>
          )}

          {/* Unmute Overlay Hint (shown when muted & playing) */}
          {isMuted && isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 px-3.5 py-2 rounded-full bg-black/80 hover:bg-black/95 border border-white/30 text-white text-xs font-mono font-bold flex items-center gap-2 backdrop-blur-md transition-all shadow-lg"
            >
              <VolumeX className="w-4 h-4 text-amber-400" />
              <span>Tap to Unmute</span>
            </button>
          )}

          {/* Bottom Player Overlay Controls (Visible on hover / move) */}
          <div 
            className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 sm:p-5 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Progress Bar */}
            <div 
              className="w-full h-2.5 bg-slate-700/80 hover:h-3 rounded-full overflow-hidden cursor-pointer relative transition-all mb-3 group/bar"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-indigo-400 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md transform scale-0 group-hover/bar:scale-100 transition-transform"></div>
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              {/* Left Actions: Play, Restart, Volume, Time */}
              <div className="flex items-center gap-3.5">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-all shadow-md shadow-amber-500/30"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Replay Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2 group/vol">
                  <button
                    onClick={toggleMute}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
                    className="w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400 hidden sm:inline-block"
                  />
                </div>

                {/* Time Display */}
                <div className="font-mono text-xs text-slate-300 pl-1 font-bold">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-500 mx-1.5">/</span>
                  <span className="text-slate-400">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right Actions: Speed, Fullscreen */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleSpeedChange}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
