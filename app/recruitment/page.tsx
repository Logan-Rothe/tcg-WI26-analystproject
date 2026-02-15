import styles from './recruitment.module.css';
import Link from 'next/link';


export const metadata = {
  title: 'Recruitment - TCG',
};

export default function RecruitmentPage() {
  const handle = 'tcgatucsd';
  const profileUrl = `https://www.instagram.com/${encodeURIComponent(handle)}/?hl=en`;
  

  return (
    <main>
<div className={styles.container}>
    <section
      className={styles.hero}
      style={{
        backgroundImage:
          "url(https://slack-imgs.com/?c=1&o1=ro.gu&url=https%3A%2F%2Fframerusercontent.com%2Fimages%2FR6IjytfYRuwoNoOEhI5oW8BUyw.png)",
      }}
    >
      <div className={styles.heroOverlay}>
        <h1>Recruitment</h1>
        <p>
          Unlock your potential and shape the future of consulting with Triton
          Consulting Group
        </p>

        <a
          href="https://tcg-application-portal.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.applyButton}>Apply Now</button>
        </a>
      </div>
    </section>
  </div>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div
            className={styles.cardImage}
            style={{ backgroundImage: "url('/Recruitment1Photo.avif')" }}
            aria-hidden
          />

          <div>
            <h2>Become a Part of Triton Consulting Group</h2>
            <p className={styles.lead}>
              Elevate your career with us at Triton Consulting Group. Join us to tackle impactful
              projects, collaborate with top professionals, and access unparalleled growth
              opportunities. At TCG, you'll be part of a forward-thinking team dedicated to
              excellence. Explore this page to learn more about our recruitment process and join
              today!
            </p>
            <Link href="/about-us" className={styles.applyButton} style={{ marginTop: 18 }}>Learn More about TCG</Link>
    
          </div>
        </div>

        <div className={styles.twoCol} style={{ alignItems: 'start' }}>
          <div
            className={styles.cardImage}
            style={{ backgroundImage: "url('/Recruitment2Photo.avif')" }}
            aria-hidden
          />

          <div>
            <h2>Recruitment Overview</h2>
            <p className={styles.lead}>
              We welcome students from all majors, no prior consulting experience required. Our
              recruitment process typically takes place during the Fall and Winter Quarters,
              around weeks 2 and 3. Interested students can attend our Info Night to meet active
              members, interact with the board, and learn more about TCG.
            </p>

            <p className={styles.lead}>
              Accepted members will join our Analyst Program, an onboarding curriculum designed to
              equip you with consulting fundamentals, professional skills, and case interview
              preparation.
            </p>

            <a
               href="https://youtube.com/playlist?list=PLSZXI1eOuSUv2xYQAINf_ngd48EkaF51W&si=CvfwgoQM9_rhxnag"
                target="_blank"
                 rel="noopener noreferrer"
                 className={styles.applyButton}
                 style={{ marginTop: 18 }}
               >
                Case Prep Resources
                </a>
            
          </div>
        </div>
        <div className={styles.twoCol} style={{ alignItems: 'start' }}>
          <div
            className={styles.cardImage}
            style={{ backgroundImage: "url('/recruitment-tcg.png')" }}
            aria-hidden
          />

          <div>
            <h2>Case Learning</h2>
            <p className={styles.lead}>
              Our first round of recruitment is case night, where students are put into teams to do a case altogether.
            </p>

            <p className={styles.lead}>
              In order to prep for case nights, we have provided example cases as practice. It flows through the case portion by portion, timing each portion as would during case night. At the end, students may export a PDF of their answers along with the TCG provided answers to review. Best of luck to everyone!
            </p>

            <a
               href="/recruitment/case-practice"
                target="_blank"
                 rel="noopener noreferrer"
                 className={styles.applyButton}
                 style={{ marginTop: 18 }}
               >
                Practice Cases
                </a>
            
          </div>
        </div>
        


        <div className={styles.timeline}>
          <h2>Recruitment Timeline</h2>
          <div className={styles.timelineBar} />

          <div className={styles.timelineGrid}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>01.</div>
              <div className={styles.timelineTitle}>Info Night</div>
              <div className={styles.timelineDesc}>Learn about TCG and meet our team.</div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>02.</div>
              <div className={styles.timelineTitle}>Case Study Night</div>
              <div className={styles.timelineDesc}>Participate in group interviews.</div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>03.</div>
              <div className={styles.timelineTitle}>Social Night</div>
              <div className={styles.timelineDesc}>Meet with associates in a casual setting.</div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>04.</div>
              <div className={styles.timelineTitle}>Individual Interviews</div>
              <div className={styles.timelineDesc}>Invite only. Final step in the selection process.</div>
            </div>
          </div>
        </div>

        <div className={styles.instagramSection}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              <div className={styles.instaPlaceholder}>Instagram</div>
            </div>
          </div>

          <div>
            <h3>Stay Updated: Follow Our Recruitment Process & Timeline on Instagram</h3>
            <p className={styles.lead}>
              Stay up-to-date with every step of our recruitment process by following us on
              Instagram! From application deadlines to key milestones and behind-the-scenes
              glimpses into our team culture, we’ll keep you informed and engaged every step of
              the way. Don’t miss out on important updates—follow us now to ensure you’re always
              in the loop!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
