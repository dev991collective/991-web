"use client";

import { useState } from "react";
import Image from "next/image";

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim()) return setError("Informe seu nome.");
    if (!emailOk(email)) return setError("Informe um e-mail valido.");
    if (!message.trim()) return setError("Escreva sua mensagem.");

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
          website: website.trim(),
        }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setError(json?.error || "Falha ao enviar. Tente novamente.");
        return;
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      setSuccess(true);
    } catch {
      setError("Nao foi possivel enviar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pb-16 pt-0 lg:pb-24 dark:bg-darkmode">
      <div className="container mx-auto md:max-w-screen-md lg:max-w-screen-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="col-span-6">
            <h2 className="mb-6 max-w-72 text-[40px] font-bold leading-[3.4rem] text-secondary">Talk to 991Collective</h2>
            <form className="flex w-full flex-wrap justify-between" onSubmit={onSubmit}>
              <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="my-2.5 w-full">
                <label htmlFor="name" className="inline-block pb-3 text-base text-SlateBlueText">
                  Name*
                </label>
                <input
                  id="name"
                  className="w-full rounded-lg border border-border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-dark_border dark:bg-darkmode dark:text-white dark:focus:border-primary"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={120}
                  required
                />
              </div>

              <div className="my-2.5 w-full">
                <label htmlFor="email" className="inline-block pb-3 text-base text-SlateBlueText">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-dark_border dark:bg-darkmode dark:text-white dark:focus:border-primary"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="my-2.5 w-full">
                <label htmlFor="subject" className="inline-block pb-3 text-base text-SlateBlueText">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full rounded-lg border border-border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-dark_border dark:bg-darkmode dark:text-white dark:focus:border-primary"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  maxLength={180}
                />
              </div>

              <div className="my-2.5 w-full">
                <label htmlFor="message" className="inline-block pb-3 text-base text-SlateBlueText">
                  Message*
                </label>
                <textarea
                  id="message"
                  className="min-h-36 w-full rounded-lg border border-border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-dark_border dark:bg-darkmode dark:text-white dark:focus:border-primary"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={3000}
                  required
                />
              </div>

              {error && (
                <p className="my-2.5 w-full text-sm text-red-500" role="alert" aria-live="assertive">
                  {error}
                </p>
              )}
              {success && (
                <p className="my-2.5 w-full text-sm text-green-500" role="status" aria-live="polite">
                  Mensagem enviada com sucesso.
                </p>
              )}

              <div className="my-2.5 w-full">
                <button
                  className="mt-4 overflow-hidden rounded-lg btn btn-1 hover-filled-slide-down disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Send message"}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="col-span-6">
            <Image
              src="/images/contact-page/contact.jpg"
              alt="Contact"
              width={1300}
              height={0}
              quality={100}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg bg-no-repeat bg-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
