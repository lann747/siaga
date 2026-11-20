import { NextResponse } from "next/server";

// Data terbuka BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
const BASE = "https://data.bmkg.go.id/DataMKG/TEWS";

function normalisasi(g) {
  if (!g) return null;
  return {
    tanggal: g.Tanggal || "",
    jam: g.Jam || "",
    magnitude: parseFloat(g.Magnitude) || 0,
    kedalaman: g.Kedalaman || "",
    wilayah: g.Wilayah || "",
    potensi: g.Potensi || "",
    dirasakan: g.Dirasakan || "",
    lintang: g.Lintang || "",
    bujur: g.Bujur || "",
    shakemap: g.Shakemap ? `${BASE}/${g.Shakemap}` : null,
  };
}

async function ambil(file) {
  const res = await fetch(`${BASE}/${file}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`BMKG ${file}: ${res.status}`);
  const data = await res.json();
  return data?.Infogempa?.gempa;
}

export async function GET() {
  const [terbaru, terkini, dirasakan] = await Promise.allSettled([
    ambil("autogempa.json"),
    ambil("gempaterkini.json"),
    ambil("gempadirasakan.json"),
  ]);

  const daftar = (r) =>
    r.status === "fulfilled"
      ? []
          .concat(r.value || [])
          .map(normalisasi)
          .filter(Boolean)
      : [];

  const hasil = {
    terbaru:
      terbaru.status === "fulfilled"
        ? normalisasi([].concat(terbaru.value)[0])
        : null,
    terkini: daftar(terkini),
    dirasakan: daftar(dirasakan),
    sumber: "BMKG (data.bmkg.go.id)",
  };

  if (!hasil.terbaru && !hasil.terkini.length && !hasil.dirasakan.length) {
    return NextResponse.json(
      { error: "Data BMKG belum bisa dimuat. Coba lagi beberapa saat." },
      { status: 502 },
    );
  }
  return NextResponse.json(hasil);
}
