import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import BeritaAdminClient from './BeritaAdminClient'

export default async function AdminBeritaPage() {
    const supabase = await createClient()
    const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false })
    return (
        <AdminShell>
            <BeritaAdminClient initialData={data ?? []} />
        </AdminShell>
    )
}
