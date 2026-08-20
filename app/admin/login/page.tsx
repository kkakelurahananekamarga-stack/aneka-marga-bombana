'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError('Email atau password salah.')
            setLoading(false)
        } else {
            router.push('/admin')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-desa-900 via-desa-800 to-emerald-700 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <Image src="/logo-bombana.png" alt="Logo Bombana" width={64} height={64} className="mx-auto mb-4 drop-shadow-lg" />
                    <h1 className="text-white text-2xl font-extrabold">Panel Admin</h1>
                    <p className="text-white/60 text-sm mt-1">Kelurahan Aneka Marga</p>
                </div>

                <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500"
                            placeholder="admin@kelurahan.id"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500"
                            placeholder="••••••••"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-desa-700 hover:bg-desa-800 text-white font-bold rounded-xl transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Masuk...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    )
}
