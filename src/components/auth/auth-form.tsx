
'use client'

import { login, signup } from '@/app/auth/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

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
                    formAction={isLogin ? login : signup}
                    // We need to pass the form data. 
                    // Since we are using formAction on a button inside a form, it automatically submits the form.
                    // However, we are in a client component, and passing Server Actions directly to formAction works in Next.js.
                    // But to toggle between login/signup, we might need separate buttons or handle it differently.
                    // Wait, if I put `form="auth-form"` it might work, but the simpler way is to wrap inputs in <form> and have the button inside.
                    // Actually, let's just make the button type="submit" and handle the action on the form tag? 
                    // No, we want two different actions.
                    // The `formAction` attribute on a submit button overrides the form's action.
                    // So this should work.
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
