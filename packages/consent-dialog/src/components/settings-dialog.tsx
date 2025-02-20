import Group from './settings-dialog/group';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import Wrapper from './wrapper';
import { CookieGroup } from '../lib/interfaces';
import { X } from 'lucide-react';

export default function SettingsDialog(params: { setIsSettingsOpen: (isSettingsOpen: boolean) => void, allowAllCookies: () => void, allowSelectedCookies: () => void, handleCookieChange: (cookieGroup: CookieGroup) => void, cookieGroups: CookieGroup[], setIsOpen: (isOpen: boolean) => void, positionX: string | undefined, positionY: string | undefined, json: string | undefined }) {

  const handleClick = (callback: () => void) => {
    callback();
    params.setIsOpen(false);
    params.setIsSettingsOpen(false);
  }

  const header = JSON.parse(params.json || '{}').header;
  const groups = JSON.parse(params.json || '{}').groups;
  const buttons = JSON.parse(params.json || '{}').buttons;

  return (
    <Wrapper className="w-full max-w-[550px]" positionX={params.positionX} positionY={params.positionY}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{header}</CardTitle>
          <Button variant="ghost" className="!m-0 p-2 h-fit" onClick={() => params.setIsSettingsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="cookie-group-container max-h-[50vh] p-4 overflow-y-auto border border-primary/10 rounded-lg flex flex-col gap-4">
            {Object.keys(groups).map((group: string) => (
              <Group key={group} name={groups[group].name} value={group} handleCookieChange={params.handleCookieChange} cookieGroups={params.cookieGroups} cookies={groups[group].cookies} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full shadow-none" onClick={() => handleClick(params.allowSelectedCookies)}>{buttons.settings.additionalLabelText}</Button>
          <Button className="w-full shadow-none" onClick={() => handleClick(params.allowAllCookies)}>{buttons.confirm.label}</Button>
        </CardFooter>
      </Card>
    </Wrapper>
  );
}
