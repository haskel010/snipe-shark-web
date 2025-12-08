
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { response, user } = await updateSession(request)

    // Protected routes logic
    const path = request.nextUrl.pathname

    // Public routes that don't need auth
    const isPublicRoute = path === '/' || path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/auth')

    if (!user && !isPublicRoute) {
        // Redirect unauthenticated users to login page
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user && (path.startsWith('/login') || path.startsWith('/signup'))) {
        // Redirect authenticated users to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
