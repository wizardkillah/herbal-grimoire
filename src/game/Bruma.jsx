import { useEffect, useState } from 'react';
import './bruma-avatar.css';

// Bruma's poses. Looping moods stay until the mood changes; the others play once and return to calm.
const MOODS = {
  calma: { loop: true, alt: 'Bruma, una gata negra con sombrero morado de estrellas, sentada y atenta' },
  piensa: { loop: true, alt: 'Bruma piensa con una pata en el mentón' },
  habla: { loop: false, alt: 'Bruma rodeada de un aura mágica mientras responde' },
  saluda: { loop: false, alt: 'Bruma saluda levantando una pata' },
  duerme: { loop: true, alt: 'Bruma duerme acurrucada bajo su sombrero' },
};

// Safari plays these WebM clips without their transparency, so it keeps the still portraits.
const ALPHA_VIDEO = typeof navigator !== 'undefined' && !/^((?!chrome|chromium|android|edg).)*safari/i.test(navigator.userAgent);

export function useIdle(delay) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let timer;
    const wake = () => { setIdle(false); clearTimeout(timer); timer = setTimeout(() => setIdle(true), delay); };
    wake();
    const events = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart'];
    events.forEach(name => window.addEventListener(name, wake, { passive: true }));
    return () => { clearTimeout(timer); events.forEach(name => window.removeEventListener(name, wake)); };
  }, [delay]);
  return idle;
}

export default function Bruma({ mood = 'calma', cue = 0, animated = true, className = '' }) {
  const [shown, setShown] = useState(mood);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { setShown(mood); }, [mood, cue]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const pose = MOODS[shown] ? shown : 'calma';
  const video = animated && !reducedMotion && ALPHA_VIDEO;
  useEffect(() => { setPlaying(false); }, [pose, cue, video]);

  return <div className={`gh-bruma-avatar ${className}`} data-mood={pose}>
    <img className={playing ? 'hidden' : ''} src={`/media/bruma/${pose}.webp`} alt={MOODS[pose].alt} width="360" height="360" />
    {video && <video
      key={`${pose}-${cue}`}
      src={`/media/bruma/${pose}.webm`}
      autoPlay muted playsInline loop={MOODS[pose].loop} preload="auto" aria-hidden="true"
      className={playing ? '' : 'hidden'}
      onPlaying={() => setPlaying(true)}
      onEnded={() => { if (!MOODS[pose].loop) setShown('calma'); }}
      onError={() => setPlaying(false)}
    />}
  </div>;
}
