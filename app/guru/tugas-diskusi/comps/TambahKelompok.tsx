"use client";

import { useState } from "react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { X, User, ChevronDown } from "lucide-react";

interface TambahKelompokProps {
  onClose: () => void;
}

interface Suggestion {
  nama: string;
  avatar?: string;
}

export default function TambahKelompok({ onClose }: TambahKelompokProps) {
  const [namaKelompok, setNamaKelompok] = useState("");
  const [ketua, setKetua] = useState<Suggestion | null>(null);
  const [anggotaList, setAnggotaList] = useState<(Suggestion | null)[]>([]);
  const [query, setQuery] = useState("");
  const [showDelegasiModal, setShowDelegasiModal] = useState(false);
  const [delegasiAktif, setDelegasiAktif] = useState(false);
  const [showSimpanModal, setShowSimpanModal] = useState(false);

  const suggestions: Suggestion[] = [
    { nama: "Ahmad Firdaus" },
    { nama: "Rian Saputra" },
    { nama: "Putri Salju" },
    { nama: "Dewi Anggraini" },
    { nama: "Nabila Zahra" },
    { nama: "Bagus Kurniawan" },
    { nama: "Siti Rahma" },
    { nama: "Laila Nurul" },
    { nama: "Fajar Nugraha" },
    { nama: "Tania Oktaviani" },
  ];

  const filteredSuggestions = query === "" ? suggestions : suggestions.filter((s) => s.nama.toLowerCase().includes(query.toLowerCase()));

  const handleTambahAnggota = () => {
    setAnggotaList([...anggotaList, null]);
    setDelegasiAktif(false);
  };

  const handleAnggotaChange = (index: number, value: Suggestion | null) => {
    const updated = [...anggotaList];
    updated[index] = value;
    setAnggotaList(updated);
  };

  const handleRemoveAnggota = (index: number) => {
    setAnggotaList(anggotaList.filter((_, i) => i !== index));
  };

  const handleDelegasi = () => {
    setShowDelegasiModal(false);
    setDelegasiAktif(true);
    setAnggotaList([]);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 relative">
        {/* Tombol tutup */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition" aria-label="Tutup">
          <X className="w-5 h-5" />
        </button>

        {/* Judul */}
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-5">Tambah Kelompok</h2>

        {/* Input Nama Kelompok */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Nama kelompok</label>
          <input
            type="text"
            value={namaKelompok}
            onChange={(e) => setNamaKelompok(e.target.value)}
            placeholder="Contoh: Kelompok 3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        {/* Ketua */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700">Ketua kelompok</label>
          <Combobox value={ketua} onChange={setKetua}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-md border border-gray-300 bg-white text-left shadow-sm focus-within:ring-2 focus-within:ring-sky-400 sm:text-sm">
                <ComboboxInput
                  className="w-full border-none py-2 pl-3 pr-10 text-sm text-gray-900 focus:outline-none"
                  displayValue={(person: Suggestion | null) => person?.nama ?? ""}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ketik nama ketua..."
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </ComboboxButton>
              </div>
              {filteredSuggestions.length > 0 && (
                <ComboboxOptions className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {filteredSuggestions.map((s, i) => (
                    <ComboboxOption key={i} value={s} className={({ active }) => `cursor-pointer select-none py-2 pl-3 pr-4 ${active ? "bg-sky-100 text-sky-800" : "text-gray-900"}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span>{s.nama}</span>
                      </div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>
        </div>

        {/* Anggota */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700">Anggota</label>

          {/* Input anggota */}
          {!delegasiAktif &&
            anggotaList.map((anggota, index) => (
              <div key={index} className="mt-2 flex items-center gap-2">
                <div className="relative flex-1">
                  <Combobox value={anggota} onChange={(val) => handleAnggotaChange(index, val)}>
                    <div className="relative">
                      <ComboboxInput
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        displayValue={(person: Suggestion | null) => person?.nama ?? ""}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Nama anggota ${index + 1}`}
                      />
                      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </ComboboxButton>
                    </div>

                    {filteredSuggestions.length > 0 && (
                      <ComboboxOptions className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {filteredSuggestions.map((s, i) => (
                          <ComboboxOption key={i} value={s} className={({ active }) => `cursor-pointer select-none py-2 pl-3 pr-4 ${active ? "bg-sky-100 text-sky-800" : "text-gray-900"}`}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                <User className="w-3.5 h-3.5" />
                              </div>
                              <span>{s.nama}</span>
                            </div>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </Combobox>
                </div>

                <button type="button" onClick={() => handleRemoveAnggota(index)} className="text-gray-400 hover:text-red-500 transition" title="Hapus anggota ini">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}

          {/* Dua tombol di bawah input, bagi dua */}
          {!delegasiAktif && (
            <div className="flex gap-2 mt-3">
              <button type="button" onClick={handleTambahAnggota} className="w-1/2 text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-3 py-1.5 rounded-md shadow-sm transition-all">
                + Tambah anggota
              </button>

              {!anggotaList.length && (
                <button type="button" onClick={() => setShowDelegasiModal(true)} className="w-1/2 text-xs border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-100 font-medium px-3 py-1.5 rounded-md transition-all">
                  Delegasikan ke ketua
                </button>
              )}
            </div>
          )}

          {/* Jika sudah didelegasikan, tampilkan label info */}
          {delegasiAktif && <div className="mt-3 p-2 text-xs text-gray-600 bg-amber-300 font-light text-center italic"> --- Penambahan anggota didelegasikan ke ketua --- </div>}
        </div>

        {/* Tombol Simpan */}
        <button type="button" onClick={() => setShowSimpanModal(true)} className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md text-sm font-medium shadow-sm transition-all">
          Simpan
        </button>
      </div>

      {/* Modal Delegasi */}
      {showDelegasiModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delegasikan ke ketua?</h3>
            <p className="text-sm text-gray-600 mb-5">Anggota kelompok akan ditambahkan oleh ketuanya masing-masing.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDelegasiModal(false)} className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition">
                Batal
              </button>
              <button onClick={handleDelegasi} className="px-3 py-1.5 text-sm text-white bg-sky-500 hover:bg-sky-600 rounded-md transition">
                Delegasikan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Simpan */}
      {showSimpanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Simpan perubahan?</h3>
            <p className="text-sm text-gray-600 mb-5">Apakah Anda yakin ingin menyimpan data kelompok ini?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSimpanModal(false)} className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition">
                Batal
              </button>
              <button
                onClick={() => {
                  setShowSimpanModal(false);
                  // Tambahkan logika simpan di sini nanti
                  alert("Data kelompok berhasil disimpan!");
                }}
                className="px-3 py-1.5 text-sm text-white bg-sky-500 hover:bg-sky-600 rounded-md transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
