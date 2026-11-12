import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Sparkle } from '@phosphor-icons/react';

export const CHARACTERS = {
  mago: { name: 'Mago del bosque', poster: '/media/taller-mago.webp', position: '22% 40%', cauldron: ['63%', '53%', '79%'] },
  herbolaria: { name: 'Herbolaria', poster: '/media/taller-herbolaria.webp', position: '78% 40%', cauldron: ['28%', '58%', '83%'] },
};

export function loadArtPreference(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}

// Clips per moment. Each brew picks the next one, so repeated mixtures do not replay the same animation.
const CLIPS = {
  mago: { mezcla: ['mago-mezcla', 'mago-mezcla-2', 'mago-mezcla-3'], logro: ['mago-logro', 'mago-logro-2', 'mago-logro-3'], ajuste: ['mago-ajuste'] },
  herbolaria: { mezcla: ['herbolaria-mezcla', 'herbolaria-mezcla-2', 'herbolaria-mezcla-3'], logro: ['herbolaria-logro', 'herbolaria-logro-2'], ajuste: ['herbolaria-ajuste'] },
};
const MOMENTS = {
  mezcla: ['La alquimia toma forma', 'Animación de preparación en el caldero'],
  logro: ['El bosque celebra contigo', 'Celebración del encargo con magia dorada'],
  ajuste: ['La mezcla se resiste', 'El caldero se oscurece: la mezcla necesita un ajuste'],
};

// Sparks rising from the cauldron; more appear as portions are added.
const SPARKS = Array.from({ length: 18 }, (_, n) => ({
  '--x': `${((n * 37) % 23) - 11}cqw`, '--sway': `${((n * 53) % 15) - 7}cqw`, '--size': `${2 + (n % 3)}px`,
  '--time': `${2.6 + ((n * 7) % 5) * 0.5}s`, '--delay': `${-((n * 11) % 9) * 0.45}s`,
}));

export default function WorkshopScene({ character, event, enabled, onToggle, onResult, charge = 0 }) {
  const video = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [status, setStatus] = useState('idle');
  const art = CHARACTERS[character];
  const showVideo = Boolean(event && enabled && !reducedMotion);
  const shuffle = useRef(Math.floor(Math.random() * 6));
  const moment = event?.success ? 'logro' : event?.miss ? 'ajuste' : 'mezcla';
  const clips = CLIPS[character][moment];
  const source = `/media/${clips[((event?.id ?? 0) + shuffle.current) % clips.length]}.mp4`;
  const alive = enabled && !reducedMotion;
  const [cx, cy, fy] = art.cauldron;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setStatus('idle');
    if (!showVideo || !video.current) return;
    let active = true;
    const player = video.current;
    player.play().catch(() => { if (active) setStatus(player.error ? 'error' : 'blocked'); });
    return () => { active = false; player.pause(); };
  }, [event?.id, character, showVideo]);

  function playback() {
    const player = video.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    if (player.ended) player.currentTime = 0;
    player.play().catch(() => setStatus(player.error ? 'error' : 'blocked'));
  }

  return <div className="gh-artwork">
    <div className="gh-film" aria-label={`Taller de ${art.name}`} style={{ '--cx': cx, '--cy': cy, '--fy': fy, '--charge': charge }}>
      <img src={art.poster} alt={`${art.name} junto a un caldero de luz verde en un invernadero encantado`} width="1344" height="1008" fetchPriority="high" />
      {alive && <div className="gh-fx" aria-hidden="true"><span className="gh-fx-fire" /><span className="gh-fx-glow" /><b /><b />{SPARKS.slice(0, 6 + charge * 3).map((style, n) => <i key={n} style={style} />)}</div>}
      {alive && event && <span key={event.id} className={event.success ? 'gh-film-flash success' : 'gh-film-flash'} aria-hidden="true" />}
      {showVideo && <video
        key={`${character}-${event.id}`}
        ref={video}
        className={status === 'error' ? 'gh-film-hidden' : ''}
        src={source}
        poster={art.poster}
        muted playsInline preload="none"
        aria-label={MOMENTS[moment][1]}
        onPlaying={() => setStatus('playing')}
        onPause={() => setStatus(s => s === 'error' ? s : 'paused')}
        onEnded={() => setStatus('ended')}
        onError={() => setStatus('error')}
      />}
      <span className="gh-film-label"><span />{event ? MOMENTS[moment][0] : 'El invernadero está en calma'}</span>
      {event && <button className="gh-film-result" onClick={onResult}><Sparkle size={14} /> Ver resultado</button>}
    </div>
    <div className="gh-film-controls">
      <button aria-pressed={enabled} onClick={onToggle}>{enabled ? 'Animaciones activadas' : 'Animaciones desactivadas'}</button>
      {showVideo && status !== 'error' && <button onClick={playback}>{status === 'playing' ? <Pause size={14} /> : <Play size={14} />}{status === 'playing' ? 'Pausar' : status === 'ended' ? 'Repetir' : 'Reproducir'}</button>}
    </div>
    {reducedMotion && <p className="gh-film-notice">Escena estática según tu preferencia de movimiento reducido.</p>}
    {status === 'error' && <p className="gh-film-notice" role="status">El video no se pudo cargar. Puedes seguir jugando con la ilustración.</p>}
  </div>;
}
