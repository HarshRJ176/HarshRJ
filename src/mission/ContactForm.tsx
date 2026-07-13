import { useState, type FormEvent } from 'react';
const WEB3FORMS_ACCESS_KEY = '632883fb-e0cf-4b5e-a35b-e9f716a623f9';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get('website') ?? '').trim().length > 0) {
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-form panel" data-reveal>
      <p className="contact-form-kicker">Quick message</p>
      <p className="contact-form-hint">
        Prefer not to switch to your mail app? Send a short note here — it goes straight to my
        inbox and I&apos;ll reply by email.
      </p>

      {status === 'success' ? (
        <p className="contact-form-success">Sent — thanks, I&apos;ll get back to you shortly.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="New message from harshrajjaiswal.com.np" />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="contact-form-honeypot"
          />

          <label className="contact-form-field">
            <span>Name</span>
            <input type="text" name="name" required maxLength={120} />
          </label>

          <label className="contact-form-field">
            <span>Email</span>
            <input type="email" name="email" required maxLength={160} />
          </label>

          <label className="contact-form-field">
            <span>Message</span>
            <textarea name="message" required rows={4} maxLength={2000} />
          </label>

          <button type="submit" className="contact-form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'error' && (
            <p className="contact-form-error">
              Something went wrong on this end — please email me directly instead.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
