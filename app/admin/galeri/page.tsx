import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import GaleriAdminClient from './GaleriAdminClient'

export default async function AdminGaleriPage() {
    const supabase = await createClient()
    const { data } = await supabase.from('galeri').select('*').order('created_at', { ascending: false })
    return (
        <AdminShell>
            <GaleriAdminClient initialData={data ?? []} />
        </AdminShell>
    )
}
