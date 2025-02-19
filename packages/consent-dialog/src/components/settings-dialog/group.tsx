import { Switch } from "../ui/switch";
import Cookie from './cookie';
import { CookieGroup, CookieData } from '../../lib/interfaces';
export default function Group(params: { name: string, value: string, handleCookieChange: (cookieGroup: CookieGroup) => void, cookieGroups: CookieGroup[], cookies: [] }) {

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-bold">{params.name}</div>
        <Switch checked={params.cookieGroups.some(cookieGroup => cookieGroup.value === params.value) || params.value === 'essential'} onCheckedChange={() => params.handleCookieChange({ name: params.name, value: params.value })} />
      </div>
      <div className="flex flex-col gap-3">
        {Object.keys(params.cookies).map((cookieKey: any) => {
          const cookie = params.cookies[cookieKey] as CookieData;

          return (
            <Cookie
              key={cookieKey}
              name={cookieKey}
              description={cookie.description}
              lifetime={cookie.lifetime}
            />
          );
        })}
      </div>
    </div>
  );
}
