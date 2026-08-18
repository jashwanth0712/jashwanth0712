import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — EAR",
  description:
    "Privacy policy for EAR, the private on-device meeting notes app.",
};

const sections = [
  {
    heading: "Our privacy position",
    paragraphs: [
      "EAR does not require an account, include advertising or analytics SDKs, track you across apps or websites, or operate a developer-owned server that receives your meeting content.",
    ],
  },
  {
    heading: "Information processed on your device",
    paragraphs: [
      "When you choose to record a meeting, EAR processes microphone audio, speech-recognition results, speaker embeddings, transcripts, summaries, decisions, questions, and tasks. This information is stored only in EAR’s private app container on your device.",
      "Speaker embeddings are mathematical representations used to separate speakers. EAR does not use them to identify people against an external identity database.",
      "EAR also stores app preferences such as audio-retention policy, Wi-Fi-only download preference, and whether you postponed the optional model download.",
    ],
  },
  {
    heading: "Optional model download",
    paragraphs: [
      "EAR can download an optional Gemma on-device language model from Hugging Face and its content-delivery providers. The request downloads a static model file and does not contain meeting audio, transcripts, notes, contacts, or account information.",
      "The network provider may process ordinary connection information, such as an IP address and request metadata, under its own privacy policy. After download, the model runs locally. Meeting content is not sent to the model host.",
    ],
  },
  {
    heading: "Apple services and permissions",
    paragraphs: [
      "EAR requests Microphone and Speech Recognition permissions only after you start the recording workflow. Speech recognition is configured to require Apple’s on-device recognition. If on-device recognition is unavailable, EAR does not send the recording to a fallback transcription server.",
      "Apple may process permission and operating-system diagnostic information under Apple’s own privacy policy.",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      "You choose how long meeting audio is retained. Transcripts, notes, tasks, decisions, and questions remain on the device until you delete them.",
      "Open EAR Settings to delete audio, transcripts and notes, the downloaded model, or all local data. Deleting EAR from the device removes its app-container data.",
    ],
  },
  {
    heading: "Sharing and sale",
    paragraphs: [
      "EAR does not sell personal information or share meeting content with advertisers, data brokers, analytics providers, or third-party AI services.",
    ],
  },
  {
    heading: "Children and lawful recording",
    paragraphs: [
      "EAR is not directed to children. Record only when you have the authority and any consent required by the laws that apply where you are.",
    ],
  },
];

export default function EarPrivacyPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#privacy-policy">
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Link className={styles.brand} href="/" aria-label="Jashwanth Peddisetty home">
            EAR<span aria-hidden="true" />
          </Link>
          <span className={styles.headerLabel}>PRIVATE MEETING NOTES</span>
          <nav className={styles.nav} aria-label="EAR links">
            <a href="#privacy-policy" aria-current="page">
              Privacy
            </a>
            <a href="mailto:Jashwanth@artly.co.in">Support</a>
            <a
              href="https://github.com/jashwanth0712/ear"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </nav>
        </div>
      </header>

      <main id="privacy-policy" className={`${styles.shell} ${styles.content}`}>
        <aside className={styles.intro}>
          <p className={styles.eyebrow}>Your data</p>
          <h1>Privacy policy</h1>
          <p>
            EAR is designed to process meeting recordings and meeting
            intelligence locally on your device.
          </p>
          <span className={styles.date}>EFFECTIVE / 2026-08-12</span>
        </aside>

        <article className={styles.document}>
          {sections.map((section, index) => (
            <section key={section.heading}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          <section>
            <span className={styles.index}>08</span>
            <div>
              <h2>Changes and contact</h2>
              <p>
                If EAR’s data practices change, this policy and the App Store
                privacy disclosure will be updated before the changed version is
                distributed.
              </p>
              <p>
                For privacy questions, email{" "}
                <a href="mailto:Jashwanth@artly.co.in">Jashwanth@artly.co.in</a>.
                Do not include meeting content or other personal information in
                your message.
              </p>
            </div>
          </section>
        </article>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p>EAR / PRIVATE MEETING NOTES</p>
          <p>PRIVACY POLICY / UPDATED 2026-08-12</p>
        </div>
      </footer>
    </div>
  );
}
