import styles from './page.module.css';
import { FullLogo } from '../common/branding/logos/FullLogo';
import { neueRegrade } from '@/lib/fonts/neueRegrade';
import { cn } from '@/lib/utils/cn';
import { NewsLetter } from '../common/newsletter/NewsLetter';
import { CustomTypewriter } from '../common/Typewriter/CustomTypewriter';

export default function ComingSoonPage() {
  return <div className={styles.container}>
    <FullLogo/>
    <div className={styles.content}>
      <CustomTypewriter strings={['Creating experiences through design', 'Transforming interiors into living spaces','Crafting products with purpose']} autoStart={true} loop={true} className={cn(styles.title, neueRegrade.className)} />
      <p className={cn(styles.description, neueRegrade.className)}>We are coming soon</p>
    </div>
      <NewsLetter />
  </div>;
}