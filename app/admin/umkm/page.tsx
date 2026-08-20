import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import UmkmAdminClient from './UmkmAdminClient'

export default async function AdminUmkmPage() {
    const supabase = await createClient()
    const { data } = await supabase.from('umkm').select('*').order('nama')
    return (
        <AdminShell>
            <UmkmAdminClient initialData={data ?? []} />
        </AdminShell>
    )
}
