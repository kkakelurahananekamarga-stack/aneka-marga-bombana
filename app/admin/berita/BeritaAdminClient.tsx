'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import type { News } from '@/types'

type BeritaForm = { judul: string; isi: string; gambar: string | null; tanggal: string }
const EMPTY: BeritaForm = { judul: '', isi: '', gambar: null, tanggal: new Date().toISOString().split('T')[0] }

export default function BeritaAdminClient({ initialData }: { initialData: News[] }) {
    const [list, setList] = useState<News[]>(initialData)
    const [form, setForm] = useState<BeritaForm>(EMPTY)
    const [editId, setEditId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState('')
    const supabase = createClient()

    function openAdd() { setForm(EMPTY); setEditId(null); setShowForm(true); setMsg('') }
    function openEdit(b: News) { setForm({ judul: b.judul, isi: b.isi, gambar: b.gambar, tanggal: b.tanggal }); setEditId(b.id); setShowForm(true); setMsg('') }
    function closeForm() { setShowForm(false); setEditId(null); setForm(EMPTY) }

    async function uploadGambar(file: File): Promise<string | null> {
        setUploading(true)
        const path = `${Date.now()}.${file.name.split('.').pop()}`
        const { error } = await supabase.storage.from('berita').upload(path, file, { upsert: true })
        setUploading(false)
        if (error) { setMsg('Gagal upload gambar.'); return null }
        const { data } = supabase.storage.from('berita').getPublicUrl(path)
        return data.publicUrl
    }

    async function handleSave() {
        if (!form.judul.trim() || !form.isi.trim()) { setMsg('Judul dan isi wajib diisi.'); return }
        setSaving(true)
        if (editId) {
            const { error } = await supabase.from('berita').update(form).eq('id', editId)
            if (!error) { setList(l => l.map(b => b.id === editId ? { ...b, ...form } : b)); closeForm() }
            else setMsg('Gagal menyimpan.')
        } else {
            const { data, error } = await supabase.from('berita').insert(form).select().single()
            if (!error && data) { setList(l => [data, ...l]); closeForm() }
            else setMsg('Gagal menyimpan.')
        }
        setSaving(false)
    }

    async function handleDelete(id: string) {
        if (!confirm('Hapus berita ini?')) return
        const { error } = await supabase.from('berita').delete().eq('id', id)
        if (!error) setList(l => l.filter(b => b.id !== id))
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Kelola Berita</h1>
                    <p className="text-gray-500 text-sm">{list.length} berita terpublikasi</p>
                </div>
                <button onClick={openAdd} className="px-4 py-2 bg-desa-700 hover:bg-desa-800 text-white text-sm font-bold rounded-xl">+ Tambah Berita</button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeForm}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-extrabold text-gray-900">{editId ? 'Edit Berita' : 'Tambah Berita'}</h2>
                            <button onClick={closeForm} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Gambar */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto Berita</label>
                                {form.gambar && (
                                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-2 bg-gray-100">
                                        <Image src={form.gambar} alt="preview" fill className="object-cover" sizes="600px" />
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={async e => {
                                    const file = e.target.files?.[0]; if (!file) return
                                    const url = await uploadGambar(file)
                                    if (url) setForm(f => ({ ...f, gambar: url }))
                                }} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-desa-50 file:text-desa-700 file:font-semibold hover:file:bg-desa-100" />
                                {uploading && <p className="text-xs text-desa-600 mt-1">Mengupload...</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Judul *</label>
                                <input value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500" placeholder="Judul berita..." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tanggal</label>
                                <input type="date" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Isi Berita *</label>
                                <textarea value={form.isi} onChange={e => setForm(f => ({ ...f, isi: e.target.value }))} rows={8}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500 resize-none" placeholder="Isi berita lengkap..." />
                            </div>
                            {msg && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">{msg}</p>}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Batal</button>
                            <button onClick={handleSave} disabled={saving || uploading} className="flex-1 py-2.5 bg-desa-700 hover:bg-desa-800 text-white text-sm font-bold rounded-xl disabled:opacity-60">
                                {saving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {list.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-4xl mb-3">📰</p>
                        <p className="font-medium">Belum ada berita</p>
                        <button onClick={openAdd} className="mt-3 text-sm text-desa-600 hover:underline">Tulis berita pertama</button>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Berita</th>
                                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Tanggal</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {list.map(b => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            {b.gambar ? (
                                                <div className="relative w-12 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image src={b.gambar} alt={b.judul} fill className="object-cover" sizes="48px" />
                                                </div>
                                            ) : <div className="w-12 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">📰</div>}
                                            <p className="font-semibold text-gray-900 line-clamp-2">{b.judul}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 hidden sm:table-cell text-gray-500 whitespace-nowrap">{b.tanggal}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => openEdit(b)} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50">Edit</button>
                                            <button onClick={() => handleDelete(b.id)} className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-500 rounded-lg hover:bg-red-50">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
