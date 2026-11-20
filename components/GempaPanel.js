"use client";
import { useEffect, useState } from "react";

const TAB = [
  { id: "terkini", label: "Magnitudo 5+" },
  { id: "dirasakan", label: "Dirasakan warga" },
];

function tingkat(m) {
  if (m >= 6) return "kuat";
  if (m >= 4) return "sedang";
  return "ringan";
}

function Baris({ g }) {
  return (
    <li className="gempa-baris">
      <span
        className={`mag mag-${tingkat(g.magnitude)}`}
        aria-label={`Magnitudo ${g.magnitude}`}
      >
        {g.magnitude.toFixed(1)}
      </span>
      <div>
        <p className="gempa-wilayah">{g.wilayah}</p>
        <p className="gempa-meta">
          {g.tanggal}, {g.jam} · kedalaman {g.kedalaman}
        </p>
        {g.dirasakan && <p className="gempa-meta">Dirasakan: {g.dirasakan}</p>}
      </div>
    </li>
  );
}

export default function GempaPanel() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("terkini");

  async function muat() {
    setError("");
    try {
      const res = await fetch("/api/gempa");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal memuat data gempa.");
      setData(json);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    muat();
    const t = setInterval(muat, 120000);
    return () => clearInterval(t);
  }, []);

  const t = data?.terbaru;
  const daftar = data ? data[tab] || [] : [];

  return (
    <div className="gempa-wrap">
      <div className="gempa-utama">
        {!data && !error && (
          <p className="muted">Memuat data gempa dari BMKG...</p>
        )}
        {error && (
          <div className="pesan-error" role="alert">
            <p>{error}</p>
            <button className="tombol tombol-garis" onClick={muat}>
              Muat ulang
            </button>
          </div>
        )}
        {t && (
          <article className="gempa-terbaru" aria-live="polite">
            <p className="label-kecil">Gempa terbaru tercatat BMKG</p>
            <p className="gempa-besar">
              <span className={`mag mag-besar mag-${tingkat(t.magnitude)}`}>
                {t.magnitude.toFixed(1)}
              </span>
              <span>{t.wilayah}</span>
            </p>
            <p className="gempa-meta">
              {t.tanggal}, {t.jam} · kedalaman {t.kedalaman} · {t.lintang},{" "}
              {t.bujur}
            </p>
            {t.potensi && <p className="gempa-potensi">{t.potensi}</p>}
            {t.dirasakan && (
              <p className="gempa-meta">Dirasakan: {t.dirasakan}</p>
            )}
            {t.shakemap && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="shakemap"
                src={t.shakemap}
                alt={`Peta guncangan gempa ${t.wilayah}`}
                loading="lazy"
              />
            )}
          </article>
        )}
      </div>

      <div className="gempa-daftar">
        <div className="tab" role="tablist" aria-label="Daftar gempa">
          {TAB.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={tab === x.id}
              className={tab === x.id ? "aktif" : ""}
              onClick={() => setTab(x.id)}
            >
              {x.label}
            </button>
          ))}
        </div>
        {data && daftar.length === 0 && (
          <p className="muted">Belum ada data pada kategori ini.</p>
        )}
        <ul className="gempa-list">
          {daftar.slice(0, 8).map((g, i) => (
            <Baris key={`${g.tanggal}${g.jam}${i}`} g={g} />
          ))}
        </ul>
        <p className="sumber">
          Sumber data: {data?.sumber || "BMKG"}. Diperbarui otomatis tiap 2
          menit.
        </p>
      </div>
    </div>
  );
}
