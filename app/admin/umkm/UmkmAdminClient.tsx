'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import type { Umkm } from '@/types'

const EMPTY: Omit<Umkm, 'id'> = { nama: '', deskripsi: '', foto: null, whatsapp: null, maps: null, kategori: null }
const KATEGORI = ['Pertanian', 'Kerajinan', 'Makanan & Minuman', 'Jasa Lokal', 'Lainnya']

export default function UmkmAdminClient({ initialData }: { initialData: Umkm[] }) {
    const [list, setList] = useState<Umkm[]>(initialData)
    const [form, setForm] = useState<Omit<Umkm, 'id'>>(EMPTY)
    const [editId, setEditId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState('')
    const supabase = createClient()

    function openAdd() { setForm(EMPTY); setEditId(null); setShowForm(true); setMsg('') }
    function openEdit(u: Umkm) { setForm({ nama: u.nama, deskripsi: u.deskripsi, foto: u.foto, whatsapp: u.whatsapp, maps: u.maps, kategori: u.kategori }); setEditId(u.id); setShowForm(true); setMsg('') }
    function closeForm() { setShowForm(false); setEditId(null); setForm(EMPTY) }

    async function uploadFoto(file: File): Promise<string | null> {
        setUploading(true)
        const ext = file.name.split('.').pop()
        const path = `${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('umkm').upload(path, file, { upsert: true })
        setUploading(false)
        if (error) { setMsg('Gagal upload foto.'); return null }
        const { data } = supabase.storage.from('umkm').getPublicUrl(path)
        return data.publicUrl
    }

    async function handleSave() {
        if (!form.nama.trim()) { setMsg('Nama wajib diisi.'); return }
        setSaving(true)
        if (editId) {
            const { error } = await supabase.from('umkm').update(form).eq('id', editId)
            if (!error) {
                setList(l => l.map(u => u.id === editId ? { ...u, ...form } : u))
                closeForm()
            } else setMsg('Gagal menyimpan.')
        } else {
            const { data, error } = await supabase.from('umkm').insert(form).select().single()
            if (!error && data) {
                setList(l => [...l, data])
                closeForm()
            } else setMsg('Gagal menyimpan.')
        }
        setSaving(false)
    }

    async function handleDelete(id: string) {
        if (!confirm('Hapus UMKM ini?')) return
        const { error } = await supabase.from('umkm').delete().eq('id', id)
        if (!error) setList(l => l.filter(u => u.id !== id))
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Kelola UMKM</h1>
                    <p className="text-gray-500 text-sm">{list.length} usaha terdaftar</p>
                </div>
                <button onClick={openAdd} className="px-4 py-2 bg-desa-700 hover:bg-desa-800 text-white text-sm font-bold rounded-xl transition-colors">
                    + Tambah UMKM
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeForm}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-extrabold text-gray-900">{editId ? 'Edit UMKM' : 'Tambah UMKM'}</h2>
                            <button onClick={closeForm} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Foto */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto Usaha</label>
                                {form.foto && (
                                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2 bg-gray-100">
                                        <Image src={form.foto} alt="preview" fill className="object-cover" sizes="400px" />
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={async e => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    const url = await uploadFoto(file)
                                    if (url) setForm(f => ({ ...f, foto: url }))
                                }}
                                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-desa-50 file:text-desa-700 file:font-semibold hover:file:bg-desa-100"
                                />
                                {uploading && <p className="text-xs text-desa-600 mt-1">Mengupload foto...</p>}
                            </div>

                            {/* Nama */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Usaha *</label>
                                <input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500" placeholder="Contoh: Warung Bu Siti" />
                            </div>

                            {/* Kategori */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Kategori</label>
                                <select value={form.kategori ?? ''} onChange={e => setForm(f => ({ ...f, kategori: e.target.value || null }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500 bg-white">
                                    <option value="">-- Pilih Kategori --</option>
                                    {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
                                </select>
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Deskripsi</label>
                                <textarea value={form.deskripsi ?? ''} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500 resize-none" placeholder="Deskripsi singkat usaha..." />
                            </div>

                            {/* WhatsApp */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nomor WhatsApp</label>
                                <input value={form.whatsapp ?? ''} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value || null }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500" placeholder="628xxxxxxxxxx" />
                                <p className="text-xs text-gray-400 mt-1">Format: 628xxxxxxxxxx (tanpa + atau spasi)</p>
                            </div>

                            {/* Maps */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Link Google Maps</label>
                                <input value={form.maps ?? ''} onChange={e => setForm(f => ({ ...f, maps: e.target.value || null }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500" placeholder="https://maps.app.goo.gl/..." />
                            </div>

                            {msg && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">{msg}</p>}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Batal</button>
                            <button onClick={handleSave} disabled={saving || uploading}
                                className="flex-1 py-2.5 bg-desa-700 hover:bg-desa-800 text-white text-sm font-bold rounded-xl disabled:opacity-60">
                                {saving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {list.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-4xl mb-3">🛍️</p>
                        <p className="font-medium">Belum ada data UMKM</p>
                        <button onClick={openAdd} className="mt-3 text-sm text-desa-600 hover:underline">Tambah sekarang</button>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Usaha</th>
                                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Kategori</th>
                                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:table-cell">WhatsApp</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {list.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            {u.foto ? (
                                                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image src={u.foto} alt={u.nama} fill className="object-cover" sizes="40px" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-desa-50 flex items-center justify-center flex-shrink-0 text-lg">🛍️</div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900">{u.nama}</p>
                                                <p className="text-xs text-gray-400 line-clamp-1">{u.deskripsi}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 hidden sm:table-cell">
                                        {u.kategori ? <span className="bg-desa-50 text-desa-700 text-xs font-bold px-2.5 py-1 rounded-full">{u.kategori}</span> : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-5 py-3 hidden md:table-cell text-gray-500">{u.whatsapp ?? <span className="text-gray-300">—</span>}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button onClick={() => openEdit(u)} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50">Edit</button>
                                            <button onClick={() => handleDelete(u.id)} className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-500 rounded-lg hover:bg-red-50">Hapus</button>
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
