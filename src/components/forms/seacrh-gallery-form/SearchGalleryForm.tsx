import { ChangeEvent, FormEvent, useState } from 'react';
import { clsx } from 'clsx';
import styles from './SearchGalleryForm.module.scss';

import Search from '../../../images/svg/search.svg?react';
import Close from '../../../images/svg/close_icon.svg?react';

type FormProps = {
  onSubmit: (request: string) => void;
};

export default function SearchGalleryForm({ onSubmit }: FormProps) {
  const [request, setRequest] = useState('');

  function handleChange(event: ChangeEvent) {
    const input = event.target as HTMLInputElement;
    setRequest(input.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(request);
  }

  function handleReset() {
    setRequest('');
  }

  return (
    <form
      className={clsx(styles.form, 'paragraph_s_light')}
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className={clsx(styles.button, styles.button_submit)}
      >
        <Search className={styles.svg_icon} />
      </button>
      <input
        type="text"
        className={styles.form_input}
        placeholder="Painting title"
        value={request}
        onChange={handleChange}
      />
      {request && (
        <button
          type="button"
          className={clsx(styles.button, styles.button_reset)}
          onClick={handleReset}
        >
          <Close className={styles.svg_icon} />
        </button>
      )}
    </form>
  );
}
