export default function CTASection() {
  return (
    <section className="border-t bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
            Get Started Today
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Ready to Build Your
            <span className="block text-primary">Professional Network?</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join the Vignan Smart Alumni & Placement Portal to connect with
            experienced alumni, discover career opportunities, and accelerate your
            professional growth.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-primary px-8 py-3 font-semibold text-white transition hover:opacity-90">
              Register Now
            </button>
            <button className="rounded-xl border border-border bg-background px-8 py-3 font-semibold text-foreground transition hover:bg-muted">
              Browse Opportunities
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Free Registration</span>
            <span>✓ Verified Alumni Network</span>
            <span>✓ Career Growth Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}