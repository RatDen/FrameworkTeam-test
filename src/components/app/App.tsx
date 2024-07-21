import { useState } from 'react';
import clsx from 'clsx';
import ReactPaginate from 'react-paginate';
import styles from './App.module.scss';
import { PaintingsListQuerySettings, appAPI } from '../../services/appService';

// Компоненты
import Header from '../header/Header';
import Main from '../main/Main';
import SearchGalleryForm from '../forms/seacrh-gallery-form/SearchGalleryForm';
import Gallery from '../gallery/Gallery';

// Svg
import Dark from '../../images/svg/dark_icon.svg?react';
import Light from '../../images/svg/light_icon.svg?react';
import Logo from '../../images/svg/logo.svg?react';
import Arrow from '../../images/svg/arrow.svg?react';

const root = document.getElementById('root') as HTMLDivElement;
const PAINTINGS_LIMIT = 6;
const DEFAULT_SETTINGS: PaintingsListQuerySettings = {
  _limit: PAINTINGS_LIMIT,
  _page: 0,
};

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const paintings = appAPI.useFetchPaintingsQuery(settings);
  const authors = appAPI.useFetchAuthorsQuery({});
  const locations = appAPI.useFetchLocationsQuery({});

  const handlePageChange = (selectedItem: { selected: number }) => {
    setSettings({ ...settings, _page: selectedItem.selected + 1 });
  };

  const handleThemeToggle = () => {
    root.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
    setIsDarkTheme(!isDarkTheme);
  };

  const handleSearchPaintings = (request: string) => {
    if (!request) {
      setSettings(DEFAULT_SETTINGS);
    } else {
      setSettings({ ...DEFAULT_SETTINGS, q: request });
    }
  };

  return (
    <>
      <Header>
        <Logo className={styles.logo} />
        <button
          type="button"
          className={clsx(styles.theme_toggler)}
          onClick={handleThemeToggle}
        >
          {isDarkTheme ? (
            <Light className={styles.theme_toggler_light} />
          ) : (
            <Dark className={styles.theme_toggler_dark} />
          )}
        </button>
      </Header>
      <Main>
        <SearchGalleryForm onSubmit={handleSearchPaintings} />
        {paintings.isLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {!paintings.isLoading && paintings.data?.items.length === 0 && (
          <div className={styles.error_container}>
            <p className={clsx(styles.error_message, 'paragraph_l_light')}>
              No matches for
              {' '}
              <span className="paragraph_l_medium">{settings.q}</span>
            </p>
            <p className={clsx(styles.error_hint, 'paragraph_m_light')}>
              Please try again with a different spelling or keywords.
            </p>
          </div>
        )}
        {!paintings.isLoading && paintings.data?.items.length !== 0 && (
          <>
            <Gallery
              content={
                paintings.data?.items.map((painting) => ({
                  ...painting,
                  authorName:
                    authors.data?.find(
                      (author) => author.id === painting.authorId,
                    )?.name ?? 'unknown',
                  location:
                    locations.data?.find(
                      (location) => location.id === painting.locationId,
                    )?.location ?? 'unknown',
                })) ?? []
              }
            />
            <ReactPaginate
              className={clsx('paginator', 'paragraph_l_light')}
              pageCount={
                paintings.data
                  ? Math.ceil(Number(paintings.data?.total) / PAINTINGS_LIMIT)
                  : 0
              }
              forcePage={settings._page ? settings._page - 1 : 0}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              nextLabel={<Arrow className="paginator_arrow" />}
              previousLabel={<Arrow className="paginator_arrow left_arrow" />}
            />
          </>
        )}
      </Main>
    </>
  );
}
