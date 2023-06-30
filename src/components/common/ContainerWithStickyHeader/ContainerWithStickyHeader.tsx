'use client';
import { useEffect } from 'react';
import * as headerStyles from '@/components/common/Header/Header.css';

import * as styles from './ContainerWithStickyHeader.css';
import useHeader, { HeaderProps } from '@/hooks/useHeader';
import { variants } from '../Typography/Typography.css';

interface StickyTitleProps {
  headerProps: HeaderProps;
}

export default function ContainerWithStickyHeader({
  headerProps,
  children
}: React.PropsWithChildren<StickyTitleProps>) {
  const setHeader = useHeader({ ...headerProps });

  useEffect(() => {
    const headerElem = document.getElementsByClassName(
      headerStyles.container
    )[0];
    const titleElem = headerElem?.getElementsByClassName(variants.h4)[0];
    const containerElem = document.getElementsByClassName(styles.container)[0];

    if (!(headerElem && containerElem && titleElem)) {
      throw new Error(`정의되지 않은 html 엘리먼트가 있습니다.`);
    }

    /** header에 sticky 스타일 class 추가 */
    headerElem.classList.add(styles.sticky);

    /** container에 height가 있을때만 title hidden*/
    if (containerElem.getBoundingClientRect().height !== 0) {
      titleElem.classList.add(styles.hidden);
    }

    const titleFadeInteractionControl = () => {
      const headerRect = headerElem.getBoundingClientRect();
      const containerRect = containerElem.getBoundingClientRect();

      const point = headerRect.height - containerRect.height;

      /**
       * containerRect.top 위치는 스크롤이 내려갈때마다 - 되므로,
       * headerRect.height - containerRect.height 를 했을때의 top 위치가
       * 헤더 하단부분과.container 하단부분이 맞닿는 지점이 된다.
       */
      if (containerRect.top <= point) {
        titleElem.classList.add(styles.fadeIn);
        titleElem.classList.remove(styles.hidden);
      } else {
        titleElem.classList.remove(styles.fadeIn);
        titleElem.classList.add(styles.hidden);
      }
    };

    window.addEventListener('scroll', titleFadeInteractionControl);
    return () =>
      window.removeEventListener('scroll', titleFadeInteractionControl);
  }, [setHeader]);
  return <div className={styles.container}>{children}</div>;
}
