export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ ok: false, message: 'Method Not Allowed' })
    }

    // Vercel peut passer req.body en string ou objet selon le setup => gérer les deux cas
    const body = req.body && typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { name, email, type, date, guests, message } = body

    if (!name || !email || !type || !date) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'ladosapt@gmail.com'
    const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'
    const SITE_NAME = process.env.SITE_NAME || 'Indian Dosa'

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY in environment')
      return res.status(500).json({ ok: false, message: 'Email service not configured' })
    }

    const escapeHtml = (unsafe) =>
      String(unsafe || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')

    const adminHtml = `
      <h2>Nouveau booking d'événement - ${escapeHtml(SITE_NAME)}</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Type :</strong> ${escapeHtml(type)}</p>
      <p><strong>Date :</strong> ${escapeHtml(date)}</p>
      <p><strong>Nombre d'invités :</strong> ${escapeHtml(guests || '—')}</p>
      <p><strong>Message :</strong><br/> ${escapeHtml(message || '—')}</p>
      <hr />
      <p>Envoyé depuis le formulaire Events / Food Truck</p>
    `

    // Envoi email au client/admin
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: CONTACT_EMAIL,
        subject: `Nouvelle demande événement — ${escapeHtml(name)} (${escapeHtml(date)})`,
        html: adminHtml
      })
    })

    if (!resp.ok) {
      const txt = await resp.text()
      console.error('Resend admin error:', txt)
      return res.status(500).json({ ok: false, message: 'Failed to send email to admin' })
    }

    // FIX: Handle JSON parsing properly
    let adminData = {}
    try {
      adminData = await resp.json()
    } catch (jsonError) {
      console.warn('Could not parse response as JSON:', jsonError)
    }

    // Envoi de confirmation à l'utilisateur (non bloquant)
    setImmediate(async () => {
      try {
        const userHtml = `
          <h3>Merci ${escapeHtml(name)} — ${escapeHtml(SITE_NAME)}</h3>
          <p>Nous avons bien reçu votre demande pour le <strong>${escapeHtml(date)}</strong>. Nous vous contacterons bientôt pour confirmer les détails.</p>
          <p>Résumé : Type: ${escapeHtml(type)} — Invités: ${escapeHtml(guests || '—')}</p>
        `
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: `${SITE_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: `Confirmation de votre demande — ${SITE_NAME}`,
            html: userHtml
          })
        })
      } catch (err) {
        console.warn('Warning: failed to send confirmation to user', err)
      }
    })

    return res.status(200).json({ ok: true, id: adminData?.id ?? null })
  } catch (err) {
    console.error('send-event error', err)
    return res.status(500).json({ ok: false, message: 'Internal server error' })
  }
}
