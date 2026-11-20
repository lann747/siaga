// Garis seismogram dekoratif. Dibuat deterministik agar sama di server dan klien.
function buatJalur() {
  let seed = 7;
  const acak = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647 - 0.5;
  };
  const W = 1200;
  const tengah = 60;
  let d = `M0 ${tengah}`;
  for (let x = 6; x <= W; x += 6) {
    const jarak = Math.abs(x - 430);
    let amp = 3;
    if (x > 400)
      amp =
        3 + 52 * Math.exp(-(x - 400) / 150) * (x < 440 ? (x - 400) / 40 : 1);
    if (jarak > 600) amp = 3;
    const y = tengah + acak() * 2 * amp * (x % 12 === 0 ? 1 : -1);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}

export default function Seismogram() {
  return (
    <svg
      className="seismo"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      role="img"
      aria-label="Ilustrasi garis seismogram yang mencatat guncangan gempa"
    >
      <line x1="0" y1="60" x2="1200" y2="60" className="seismo-dasar" />
      <path d={buatJalur()} className="seismo-garis" pathLength="1" />
    </svg>
  );
}
