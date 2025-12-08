
'use client'

import { login, signup } from '@/app/auth/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { toast } from "sonner"

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = async (formData: FormData) => {
        const action = isLogin ? login : signup
        const result = await action(formData)

        if (result?.error) {
            toast.error(result.error)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
                <CardDescription>
                    {isLogin
                        ? 'Enter your email below to login to your account.'
                        : 'Enter your email below to create a new account.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="auth-form" className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button
                    className="w-full"
                    formAction={handleSubmit}
                    type="submit"
                    form="auth-form"
                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
                <Button
                    variant="link"
                    className="w-full"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsLogin(!isLogin)
                    }}
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </Button>
            </CardFooter>
        </Card>
    )
}
