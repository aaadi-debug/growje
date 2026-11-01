
import Link from "next/link";

const sections = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to Growje Brand Solution ("Growje", "we", "our", or "us").
          We respect your privacy and are committed to protecting the
          personal information you share with us through our website,
          services, and other communication channels.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, disclose,
          and protect your personal information when you visit
          <a href="https://growje.com" className="text-[#08689A] hover:underline"> growje.com</a>,
          contact us, submit an enquiry, or use our services.
        </p>
        <p>
          By accessing or using our website, you acknowledge that you have
          read this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          We may collect the following categories of information when you
          interact with our website or services:
        </p>
        <h3 className="font-semibold text-black mt-5 mb-2">
          A. Personal Information
        </h3>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number and WhatsApp contact details</li>
          <li>Company or business name</li>
          <li>Service requirements and estimated project budget</li>
          <li>Messages, enquiries, and other information you voluntarily provide</li>
        </ul>
        <h3 className="font-semibold text-black mt-5 mb-2">
          B. Technical and Usage Information
        </h3>
        <p>
          When you visit our website, certain information may be collected
          automatically, including:
        </p>
        <ul>
          <li>IP address and approximate location</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Pages visited and time spent on our website</li>
          <li>Referral sources and browsing interactions</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information collected for legitimate business purposes, including:</p>
        <ul>
          <li>Responding to enquiries, questions, and service requests.</li>
          <li>Understanding your business requirements and project needs.</li>
          <li>Providing branding, website development, digital marketing, SEO, graphic design, video editing, and other services.</li>
          <li>Preparing proposals, quotations, and project communications.</li>
          <li>Improving our website, services, user experience, and performance.</li>
          <li>Sending relevant service updates and business communications.</li>
          <li>Managing customer relationships and providing support.</li>
          <li>Preventing fraudulent activity, misuse, and security threats.</li>
          <li>Complying with applicable legal and regulatory requirements.</li>
        </ul>
        <p>
          We do not sell your personal information to third parties.
        </p>
      </>
    ),
  },
  {
    title: "4. Cookies and Tracking Technologies",
    content: (
      <>
        <p>
          Our website may use cookies, analytics tools, and similar
          technologies to improve website functionality and understand
          visitor behaviour.
        </p>
        <p>These technologies may help us:</p>
        <ul>
          <li>Understand website traffic and visitor interactions.</li>
          <li>Analyse website performance and user experience.</li>
          <li>Identify technical issues and improve website functionality.</li>
          <li>Measure the effectiveness of marketing campaigns.</li>
        </ul>
        <p>
          We may use analytics and performance measurement technologies,
          including Google Analytics (GA4), heatmaps, or similar tools,
          where implemented.
        </p>
        <p>
          You can manage or disable cookies through your browser settings.
          Please note that disabling certain cookies may affect some
          website functionalities.
        </p>
      </>
    ),
  },
  {
    title: "5. Sharing of Information",
    content: (
      <>
        <p>
          We may share your information with trusted third parties only
          when reasonably necessary for business operations or service
          delivery.
        </p>
        <p>These may include:</p>
        <ul>
          <li>Website hosting and infrastructure providers.</li>
          <li>Analytics and website performance service providers.</li>
          <li>CRM and customer communication platforms.</li>
          <li>Advertising and marketing platforms.</li>
          <li>Professional consultants and business partners involved in service delivery.</li>
          <li>Government authorities or law enforcement agencies where legally required.</li>
        </ul>
        <p>
          Such third parties may process information in accordance with
          their own privacy policies and applicable contractual or legal
          obligations.
        </p>
        <p>
          We do not authorise third parties to use your personal information
          for unrelated purposes on our behalf.
        </p>
      </>
    ),
  },
  {
    title: "6. Data Storage and Security",
    content: (
      <>
        <p>
          We take reasonable technical and organisational measures to
          protect your personal information against unauthorised access,
          misuse, alteration, disclosure, or destruction.
        </p>
        <p>
          However, no method of electronic transmission or internet storage
          is completely secure. While we make reasonable efforts to protect
          your information, we cannot guarantee absolute security.
        </p>
        <p>
          Access to personal information is limited to individuals and
          service providers who reasonably require it for authorised
          business purposes.
        </p>
      </>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary to fulfil the purposes described in this Privacy
          Policy, provide our services, maintain business records, resolve
          disputes, and comply with applicable legal obligations.
        </p>
        <p>
          When information is no longer required, we will take reasonable
          steps to delete it or anonymise it, subject to applicable
          retention requirements.
        </p>
      </>
    ),
  },
  {
    title: "8. Your Privacy Rights",
    content: (
      <>
        <p>
          Subject to applicable laws, including relevant Indian data
          protection requirements, you may have the right to:
        </p>
        <ul>
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction or updating of inaccurate information.</li>
          <li>Request deletion of personal information where legally permissible.</li>
          <li>Withdraw consent where processing is based on your consent.</li>
          <li>Raise concerns or grievances regarding the processing of your information.</li>
          <li>Opt out of non-essential promotional communications.</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the details
          provided in the Contact Us section below. We may need to verify
          your identity before processing certain requests.
        </p>
      </>
    ),
  },
  {
    title: "9. Third-Party Websites and Services",
    content: (
      <>
        <p>
          Our website may contain links to third-party websites,
          social media platforms, or external services, including
          Facebook, Instagram, YouTube, Google, and WhatsApp.
        </p>
        <p>
          These external websites and services operate independently and
          have their own privacy policies and practices. Growje is not
          responsible for the privacy, security, or content of third-party
          websites.
        </p>
        <p>
          We encourage you to review the privacy policies of any external
          services you access.
        </p>
      </>
    ),
  },
  {
    title: "10. Children's Privacy",
    content: (
      <>
        <p>
          Our website and services are intended for businesses,
          professionals, and individuals capable of entering into
          applicable agreements.
        </p>
        <p>
          We do not knowingly collect personal information from children
          in violation of applicable laws. If we become aware that such
          information has been collected, we will take appropriate steps
          to address it in accordance with applicable legal requirements.
        </p>
      </>
    ),
  },
  {
    title: "11. Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our business practices, website functionality,
          technology, or applicable legal requirements.
        </p>
        <p>
          Any updated version will be published on this page with a
          revised "Last Updated" date.
        </p>
          <p>
          We encourage visitors to review this page periodically to stay
          informed about how their information is handled.
        </p>
      </>
    ),
  },
  {
    title: "12. Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this
          Privacy Policy or the handling of your personal information,
          you can contact Growje Brand Solution using the details below:
        </p>
        <div className="mt-5 rounded-2xl bg-gray-50 border border-gray-200 p-6 space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400">
              Business
            </span>
            <p className="font-semibold text-black mt-1">
              Growje Brand Solution
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400">
              Email
            </span>
            <p className="mt-1">
              <a href="mailto:support@growje.com" className="text-[#08689A] hover:underline">
                support@growje.com
              </a>
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400">
              Phone
            </span>
            <p className="mt-1">
              <a href="tel:+919625870021" className="text-[#08689A] hover:underline">
                +91-96258 70021
              </a>
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400">
              Business Address
            </span>
            <p className="mt-1 text-gray-600">
              WZ-806, Near Palam Metro Road, Block J,
              Palam, New Delhi, Delhi – 110045, India.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08689A] px-6 lg:px-12 py-28 lg:py-36">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/65">
            Growje Brand Solution
          </p>

          <h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.065em] text-white">
            Privacy <span className="text-white/60">Policy.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base lg:text-xl leading-relaxed text-white/75">
            Your privacy matters to us. Learn how we collect, use,
            protect, and manage your personal information when you
            interact with Growje.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/65">
            <span>Last Updated: November 1, 2026</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>growje.com</span>
          </div>
        </div>
      </section>

      {/* POLICY CONTENT */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-20">

          {/* TABLE OF CONTENTS */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              On this page
            </p>

            <nav className="space-y-3">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index + 1}`}
                  className="block text-sm text-gray-500 transition hover:text-[#08689A]"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                Have a privacy-related question?
              </p>
              <a
                href="mailto:support@growje.com"
                className="mt-2 inline-flex text-sm font-semibold text-[#08689A] hover:underline"
              >
                Contact our team →
              </a>
            </div>
          </aside>

          {/* POLICY SECTIONS */}
          <div className="max-w-4xl">
            <div className="mb-12 border-b border-gray-200 pb-10">
              <p className="text-lg leading-relaxed text-gray-600">
                At Growje Brand Solution, we value the trust you place in
                us. This policy explains our approach to personal data
                and the measures we take to handle your information
                responsibly.
              </p>
            </div>

            <div className="space-y-12 lg:space-y-14">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  id={`section-${index + 1}`}
                  className="scroll-mt-28"
                >
                  <h2 className="mb-5 text-2xl lg:text-3xl font-medium tracking-tight">
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-[15px] lg:text-base leading-[1.9] text-gray-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:pl-1">
                    {section.content}
                  </div>
                </article>
              ))}
            </div>

            {/* BOTTOM NOTE */}
            <div className="mt-16 rounded-2xl bg-[#08689A] p-8 lg:p-10 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Your trust matters
              </p>
              <h2 className="mt-4 text-3xl lg:text-4xl font-medium tracking-tight">
                Questions about your privacy?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/75">
                We're happy to help clarify how your personal information
                is handled.
              </p>
              <a
                href="mailto:support@growje.com"
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#08689A] transition hover:bg-gray-100"
              >
                Email Growje →
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-400">
              <span>© {new Date().getFullYear()} Growje Brand Solution.</span>
              <Link href="/" className="hover:text-[#08689A] transition">
                Back to Home ↑
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
