// Decorative living background: drifting fireflies and slow mist. Purely visual and hidden from assistive tech.
function seeded(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

function fireflies(count, seed) {
  const random = seeded(seed);
  return Array.from({ length: count }, (_, id) => ({
    id,
    style: {
      left: `${(random() * 100).toFixed(1)}%`,
      top: `${(random() * 100).toFixed(1)}%`,
      '--size': `${(2 + random() * 3).toFixed(1)}px`,
      '--drift-x': `${(random() * 120 - 60).toFixed(0)}px`,
      '--drift-y': `${(-40 - random() * 110).toFixed(0)}px`,
      '--time': `${(9 + random() * 12).toFixed(1)}s`,
      '--delay': `${(-random() * 20).toFixed(1)}s`,
    },
  }));
}

const BACK = fireflies(26, 11);
const FRONT = fireflies(7, 97);

export default function Ambience() {
  return <>
    <div className="gh-ambience" aria-hidden="true">
      <i className="gh-mist gh-mist-a" /><i className="gh-mist gh-mist-b" />
      {BACK.map(fly => <span key={fly.id} style={fly.style} />)}
    </div>
    <div className="gh-ambience gh-ambience-front" aria-hidden="true">
      {FRONT.map(fly => <span key={fly.id} style={fly.style} />)}
    </div>
  </>;
}
