import Seismogram from "../components/Seismogram";

export default function Home() {
  return (
    <>
      <a className="lewati" href="#rencana">
        Lewati ke rencana siaga
      </a>
      <header className="atas">
        <div className="wadah atas-isi">
          <span className="merek">Siaga</span>
          <nav aria-label="Navigasi utama">
            <a href="#gempa">Gempa terkini</a>
            <a href="#rencana">Rencana siaga</a>
            <a href="#tanya">Tanya Siaga</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wadah">
            <h1>Siap sebelum guncangan pertama.</h1>
            <p className="hero-teks">
              Siaga memantau gempa dari BMKG dan menyusun rencana evakuasi
              keluarga yang disesuaikan dengan tempat tinggal dan orang-orang di
              rumahmu.
            </p>
            <div className="hero-aksi">
              <a className="tombol tombol-utama" href="#rencana">
                Buat rencana siaga
              </a>
              <a className="tombol tombol-garis" href="#gempa">
                Lihat gempa terkini
              </a>
            </div>
          </div>
          <Seismogram />
        </section>

        <section id="gempa" className="bagian" aria-labelledby="j-gempa">
          <div className="wadah">
            <h2 id="j-gempa">Gempa terkini di Indonesia</h2>
            <p className="bagian-teks">
              Data langsung dari BMKG. Gunakan untuk memahami wilayah yang baru
              saja berguncang.
            </p>
            <p className="muted">(Fitur gempa akan dipasang di Tahap 3)</p>
          </div>
        </section>

        <section
          id="rencana"
          className="bagian bagian-lembut"
          aria-labelledby="j-rencana"
        >
          <div className="wadah">
            <h2 id="j-rencana">Rencana siaga keluarga</h2>
            <p className="bagian-teks">
              Jawab beberapa pertanyaan. AI menyusun langkah sebelum, saat, dan
              sesudah bencana, plus isi tas siaga.
            </p>
            <p className="muted">(Fitur rencana akan dipasang di Tahap 4)</p>
          </div>
        </section>

        <section id="tanya" className="bagian" aria-labelledby="j-tanya">
          <div className="wadah wadah-sempit">
            <h2 id="j-tanya">Tanya Siaga</h2>
            <p className="bagian-teks">
              Punya pertanyaan spesifik? Asisten AI menjawab berdasarkan pedoman
              kebencanaan.
            </p>
            <p className="muted">(Fitur tanya akan dipasang di Tahap 5)</p>
          </div>
        </section>
      </main>

      <footer className="kaki">
        <div className="wadah">
          <p>
            Siaga dibuat untuk IT RUSH 2026, subtema Mitigasi Bencana dan
            Perubahan Iklim. Data gempa: BMKG. Panduan AI bersifat umum dan
            tidak menggantikan arahan resmi BPBD. Dalam keadaan darurat, hubungi
            112.
          </p>
        </div>
      </footer>
    </>
  );
}
