import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Play, Pause, Volume2 } from 'lucide-react';

export function AudioPlayer() {
  const { t } = useTranslations();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Placeholder audio URL (in production, this would be a real audio file)
  const audioUrl = 'https://placeholder.com/audio.mp3';

  const transcript = t('audioTranscript');

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">{t('explainLikeIm10')}</h3>
        </div>
        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
          {t('audioLength')}
        </span>
      </div>

      {/* Audio Player */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center transition"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-blue-400" />
            ) : (
              <Play className="w-5 h-5 text-blue-400 ml-1" />
            )}
          </button>

          <div className="flex-1">
            <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-blue-500/50 rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1:23</span>
              <span>3:45</span>
            </div>
          </div>
        </div>

        {/* Audio element (hidden) */}
        <audio src={audioUrl} style={{ display: 'none' }} />
      </div>

      {/* Transcript Toggle */}
      <button
        onClick={() => setShowTranscript(!showTranscript)}
        className="text-sm text-blue-400 hover:underline"
      >
        {showTranscript ? t('hideTranscript') : t('showTranscript')}
      </button>

      {/* Transcript */}
      {showTranscript && (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 text-sm text-muted-foreground max-h-48 overflow-y-auto">
          <div className="whitespace-pre-wrap">{transcript}</div>
        </div>
      )}
    </div>
  );
}
