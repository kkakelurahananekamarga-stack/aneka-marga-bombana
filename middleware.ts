import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { response, user } = await updateSession(request)

    const pathname = request.nextUrl.pathname
    const isAdminRoute = pathname.startsWith('/admin')
    const isLoginPage = pathname === '/admin/login'

    if (isAdminRoute && !isLoginPage && !user) {
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    if (isLoginPage && user) {
        const dashboardUrl = new URL('/admin', request.url)
        return NextResponse.redirect(dashboardUrl)
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*'],
}
