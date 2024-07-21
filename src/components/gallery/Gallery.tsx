import styles from './Gallery.module.scss';
import { GalleryCard, TCard } from './gallery-card/GalleryCard';

type GalleryProps = {
  content: TCard[];
};

export default function Gallery({ content }: GalleryProps) {
  return (
    <div className={styles.gallery}>
      {content.map((item) => (
        <GalleryCard key={item.id} {...item} />
      ))}
    </div>
  );
}
