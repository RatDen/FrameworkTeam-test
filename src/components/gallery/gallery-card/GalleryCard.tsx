import clsx from 'clsx';
import styles from './GalleryCard.module.scss';

export type TCard = {
  id: number;
  imageUrl: string;
  name: string;
  created: string;
  authorName: string;
  location: string;
};

export function GalleryCard({
  imageUrl,
  name,
  created,
  authorName,
  location,
}: TCard) {
  return (
    <article className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.card_image} />
      <div className={styles.card_description_container}>
        <div className={styles.card_description_wrap}>
          <div className={styles.card_description_painting}>
            <p className={clsx(styles.card_description_heading, 'heading1')}>
              {name}
            </p>
            <p className={clsx(styles.card_description_text, 'caption_s_bold')}>
              {created}
            </p>
          </div>
          <div className={styles.card_description_created}>
            <p className={clsx(styles.card_description_heading, 'heading1')}>
              {authorName}
            </p>
            <p className={clsx(styles.card_description_text, 'caption_s_bold')}>
              {location}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
