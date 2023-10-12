import { useCallback, useEffect, useState } from 'react';
import useDialog from './useDialog';
import { useRouter } from 'next/navigation';

// 브라우저 뒤로가기 막기
export default function useRouteGuard(callback?: () => unknown) {
  const [routable, setRoutable] = useState(false);
  const { dialogOn, dialogOff } = useDialog();
  const router = useRouter();
  const defaultCallback = useCallback(() => {
    dialogOn({
      message: '앗! 이대로 나가면 입력하신 정보가 모두 사라져요!',
      confirm: {
        text: '나가기',
        variant: 'filled',
        onClick: () => {
          setRoutable(true);
          dialogOff();
          router.back();
        }
      },
      close: {}
    });
  }, [dialogOff, dialogOn, router]);

  const onBeforeunload = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  }, []);

  const onPopstate = useCallback(() => {
    history.pushState('Route guard', '');
    callback ? callback() : defaultCallback();
  }, [callback, defaultCallback]);

  useEffect(() => {
    if (!routable) {
      // 브라우저 새로고침 또는 닫기 방지
      window.onbeforeunload = onBeforeunload;
      // 브라우저 뒤로가기 방지
      window.onpopstate = onPopstate;
    } else {
      window.onbeforeunload = null;
      window.onpopstate = null;
      if (history.state === 'Route guard') history.back(); // 'Route guard' state 제거
    }
  }, [onBeforeunload, onPopstate, routable]);

  useEffect(() => {
    history.pushState('Route guard init', '');
    return () => {
      window.onpopstate = null;
    };
  }, []);

  return { setRoutable };
}
