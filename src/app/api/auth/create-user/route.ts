import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, fullName, avatarUrl, role } = await request.json()

  // Note: These environment variables should be configured in your Vercel/hosting environment.
  // They should not be exposed on the client side.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json({ error: 'Missing Supabase environment variables' }, { status: 500 })
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

  // Create the user in the auth.users table
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Automatically confirm the user's email
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  if (!authData.user) {
    return NextResponse.json({ error: 'User could not be created.' }, { status: 500 })
  }

  // The trigger has already created a profile. Now, update it with the full name and avatar URL.
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({ full_name: fullName, avatar_url: avatarUrl, role: role })
    .eq('id', authData.user.id)

  if (profileError) {
    // Even if updating the profile fails, the user was created.
    // You might want to handle this case, e.g., by deleting the auth user or logging the error.
    console.error('Error updating profile:', profileError)
    return NextResponse.json({ 
      user: authData.user, 
      warning: 'User was created, but profile could not be updated.' 
    })
  }

  return NextResponse.json({ user: authData.user })
}
