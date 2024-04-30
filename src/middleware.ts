import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname

        // Manage route protection
        const isAuth = await getToken({ req });
        const isLoginPage = pathname === '/'

        const sensitiveRoutes = ['/', '/users', '/conversations']
        const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
            pathname.startsWith(route)
        )

        if (isLoginPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/users', req.url))
            }

            return NextResponse.next()
        }

        if (!isAuth && isAccessingSensitiveRoute) {
            return NextResponse.redirect(new URL('/', req.url))
        }

        if (isAuth && pathname === '/') {
            return NextResponse.redirect(new URL('/users', req.url))
        }
    },
    {   // bellow is to avvoid infinite redirect
        callbacks: {
            async authorized() {
                return true
            },
        },
    },
)

export const config = {
    matchter: ['/', '/users/:path*', '/conversations/:path*'],
}