import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!)
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
    const signature = Buffer.from(req.headers.get('x-signature') || '', 'utf8')

    // SECURITY: Verify the signature. If it doesn't match, someone is faking a payment!
    if (!crypto.timingSafeEqual(digest, signature)) {
      return new Response('Invalid signature', { status: 401 })
    }

    const data = JSON.parse(rawBody)
    const eventName = data['meta']['event_name']
    
    // Grab the User ID we passed in Step 1
    const userId = data['meta']['custom_data']['user_id']

    if (eventName === 'order_created' || eventName === 'subscription_created') {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll() { return cookieStore.getAll() } } }
      )

      // SECURITY: Update the database with Service Role or direct write
      const { error } = await supabase
        .from('subscriptions')
        .upsert({ 
          user_id: userId, 
          status: 'pro',
          updated_at: new Date().toISOString()
        })

      if (error) throw error
    }

    return NextResponse.json({ message: 'Webhook received and verified' })
  } catch (err) {
    console.error('Webhook Error:', err)
    return new Response('Webhook Error', { status: 400 })
  }
}