'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import type { GalleryItem } from '@/types'

export default function GaleriAdminClient({ initialData }: { initialData: GalleryItem[] }) {
    const [list, setList] = useState<GalleryItem[]>(initialData)
    const [deskripsi, setDeskripsi] = useState('')
    const [uploading, setUploading] = useState(false)
    const [msg, setMsg] = useState('')
    const supabase = createClient()

    async function handleUpload(files: FileList | null) {
        if (!files || files.length === 0) return
        setUploading(true)
        setMsg('')
        for (const file of Array.from(files)) {
            const path = `${Date.now()}-${file.name}`
            const { error: upErr } = await supabase.storage.from('galeri').upload(path, file, { upsert: true })
            if (upErr) { setMsg(`Gagal upload ${file.name}`); continue }
            const { data: urlData } = supabase.storage.from('galeri').getPublicUrl(path)
            const { data, error } = await supabase.from('galeri').insert({ foto: urlData.publicUrl, deskripsi: deskripsi || null }).select().single()
            if (!error && data) setList(l => [data, ...l])
        }
        setUploading(false)
        setDeskripsi('')
    }

    async function handleDelete(item: GalleryItem) {
        if (!confirm('Hapus foto ini?')) return
        await supabase.from('galeri').delete().eq('id', item.id)
        setList(l => l.filter(g => g.id !== item.id))
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900">Kelola Galeri</h1>
                <p className="text-gray-500 text-sm">{list.length} foto tersimpan</p>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-desa-400 transition-colors p-6 mb-6">
                <div className="text-center mb-4">
                    <p className="text-3xl mb-2">🖼️</p>
                    <p className="font-semibold text-gray-700">Upload Foto Baru</p>
                    <p className="text-xs text-gray-400 mt-1">Bisa pilih beberapa foto sekaligus</p>
                </div>
                <div className="max-w-sm mx-auto space-y-3">
                    <input value={deskripsi} onChange={e => setDeskripsi(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500"
                        placeholder="Keterangan foto (opsional)" />
                    <input type="file" accept="image/*" multiple onChange={e => handleUpload(e.target.files)}
                        disabled={uploading}
                        className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-desa-600 file:text-white file:font-semibold hover:file:bg-desa-700 disabled:opacity-60" />
                    {uploading && <p className="text-xs text-desa-600 text-center animate-pulse">Mengupload foto...</p>}
                    {msg && <p className="text-xs text-red-500">{msg}</p>}
                </div>
            </div>

            {/* Grid Foto */}
            {list.length === 0 ? (
                <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
                    <p className="text-4xl mb-3">📷</p>
                    <p className="font-medium">Belum ada foto di galeri</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {list.map(item => (
                        <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
                            <Image src={item.foto} alt={item.deskripsi ?? 'Foto galeri'} fill className="object-cover" sizes="200px" />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-between p-3 opacity-0 group-hover:opacity-100">
                                {item.deskripsi && (
                                    <p className="text-white text-xs font-medium line-clamp-2 flex-1 mr-2">{item.deskripsi}</p>
                                )}
                                <button onClick={() => handleDelete(item)}
                                    className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm shadow-lg">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
