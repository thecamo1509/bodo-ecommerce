import { getHomeInfo } from "@/lib/utils/strapi/homePage/get-home-info";
import ComingSoonPage from "./proximamente/page";
import { Hero } from "@/components/homePage/hero/Hero";
import styles from "./HomePage.module.css";
import { TopMenu } from "./common/TopMenu/TopMenu";
import { InfoContainer } from "@/components/homePage/infoContainer/InfoContainer";
import { Projects } from "@/components/homePage/Projects/Projects";
import { Contact } from "@/components/homePage/contact/Contact";
import { Footer } from "./common/Footer/Footer";
import { CreditsFooter } from "./common/CreditsFooter/CreditsFooter";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default async function Home() {
  const homeInfo = await getHomeInfo()
  const comingSoonMode = process.env.COMING_SOON_MODE === "true"
  const heroInfo = homeInfo.sliderItem
  const cardInfo = homeInfo.firstCard
  const contactInfo = homeInfo.thirdCard
  const contactImage = homeInfo.contactImage.url
  const host = process.env.STRAPI_HOST
  console.log("--------->", homeInfo)
  return (
    comingSoonMode ? <ComingSoonPage /> : 
    <>
      <TopMenu />
      <div className={styles.container}>
        <AnimateOnScroll direction="fade" duration={0.8}>
          <Hero items={heroInfo} intervalMs={5000} pauseOnHover={true} baseHost={host} />
        </AnimateOnScroll>
        
        <AnimateOnScroll direction="up" delay={0.2} duration={0.7}>
          <InfoContainer cardInfo={cardInfo} />
        </AnimateOnScroll>
        
        <AnimateOnScroll direction="up" delay={0.4} duration={0.7}>
          <Projects baseHost={host} />
        </AnimateOnScroll>
      </div>
      
      <AnimateOnScroll direction="up" delay={0.1} duration={0.8}>
        <Contact baseHost={host || ""} cardTitle={contactInfo.cardTitle} cardDescription={contactInfo.cardDescription} cardImageUrl={contactImage}/>
      </AnimateOnScroll>
      
      <AnimateOnScroll direction="fade" delay={0.2} duration={0.6}>
        <Footer />
      </AnimateOnScroll>
      
      <AnimateOnScroll direction="fade" delay={0.3} duration={0.5}>
        <CreditsFooter/>
      </AnimateOnScroll>
    </>
  );
}
