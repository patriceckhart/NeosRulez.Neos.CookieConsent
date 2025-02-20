import { useState, useEffect, useCallback } from "react";
import { Button } from "./components/ui/button";
import { Cookie } from "lucide-react";
import ConsentDialog from "./components/consent-dialog";
import SettingsDialog from './components/settings-dialog';
import { cookieManager } from './lib/cookie-manager';
import { CookieGroup } from './lib/interfaces';
import { domModifier } from './lib/dom-modifier';

export default function App(params: { delay: string | undefined, positionX: string | undefined, positionY: string | undefined, disableDecline: string | undefined, json: string | undefined }) {

  const [initial, setInitial] = useState<boolean>(false);
  const [consent, setConsent] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [cookieGroups, setCookieGroups] = useState<CookieGroup[]>([]);

  const allowAllCookies = () => {
    setCookieGroups([]);
    cookieManager.setCookie('__cookie_consent', 'all', { expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) });
    getConsent();
  }

  const allowSelectedCookies = () => {
    if (cookieGroups.length > 0) {
      const filteredCookieGroups = cookieGroups.filter(group => group.value !== 'all' && group.value !== 'declined');
      cookieManager.setCookie('__cookie_consent', filteredCookieGroups.map(cookieGroup => cookieGroup.value).join(','), { expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) });
    } else {
      declinedAllCookies();
    }
    getConsent();
  }

  const removeAllCookies = useCallback(() => {
    cookieManager.removeCookie('__cookie_consent');
  }, []);

  const declinedAllCookies = () => {
    cookieManager.setCookie('__cookie_consent', 'declined', { expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) });
  }

  const handleCookieChange = (cookieGroup: CookieGroup) => {
    setCookieGroups(prevCookieGroups => {
      const exists = prevCookieGroups.some(group => group.value === cookieGroup.value);
      if (exists) {
        return prevCookieGroups.filter(group => group.value !== cookieGroup.value);
      } else {
        return [...prevCookieGroups, cookieGroup];
      }
    });
  }

  const getConsent = useCallback(() => {
    const consent = cookieManager.getCookie('__cookie_consent');
    if (consent === null) {
      if (params.delay) {
        setTimeout(() => {
          setInitial(true);
          setIsOpen(true);
        }, parseInt(params.delay));
      } else {
        setInitial(true);
        setIsOpen(true);
      }
    } else {
      setInitial(true);
    }
    setConsent(consent);
  }, [params.delay]);

  useEffect(() => {
    if (cookieGroups.length > 0 && consent) {
      domModifier(cookieGroups);
    }
  }, [cookieGroups, consent]);

  useEffect(() => {
    if (isSettingsOpen) {
      removeAllCookies();
    }
  }, [isSettingsOpen, removeAllCookies]);

  useEffect(() => {
    if (consent) {
      setCookieGroups(consent.split(',').map(name => ({ name, value: name })));
    }
  }, [consent]);

  useEffect(() => {
    getConsent();
  }, [getConsent]);

  return (
    <>
      {initial &&
        <>
          {isOpen ?
            <>
              {isSettingsOpen ? <SettingsDialog setIsSettingsOpen={setIsSettingsOpen} allowAllCookies={allowAllCookies} allowSelectedCookies={allowSelectedCookies} handleCookieChange={handleCookieChange} cookieGroups={cookieGroups} setIsOpen={setIsOpen} positionX={params.positionX} positionY={params.positionY} json={params.json} /> : <ConsentDialog setIsSettingsOpen={setIsSettingsOpen} allowAllCookies={allowAllCookies} declinedAllCookies={declinedAllCookies} setIsOpen={setIsOpen} positionX={params.positionX} positionY={params.positionY} disableDecline={params.disableDecline} json={params.json} />}
            </>
            :
            <div className="fixed left-0 bottom-0 lg:ps-0 flex flex-col items-end ms-3 mb-3">
              <Button className="rounded-full w-14 h-14" onClick={() => setIsOpen(!isOpen)}>
                <Cookie className="w-[2rem!important] h-[2rem!important]" />
              </Button>
            </div>
          }
        </>
      }
    </>
  );
}
