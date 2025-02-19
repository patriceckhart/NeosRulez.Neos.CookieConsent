import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import Wrapper from './wrapper';

export default function ConsentDialog(params: { setIsSettingsOpen: (isSettingsOpen: boolean) => void, allowAllCookies: () => void, declinedAllCookies: () => void, setIsOpen: (isOpen: boolean) => void, positionX: string | undefined, positionY: string | undefined, json: string | undefined }) {

  const handleClick = (callback: () => void) => {
    callback();
    params.setIsOpen(false);
  }

  const header = JSON.parse(params.json || '{}').header;
  const text = JSON.parse(params.json || '{}').text;
  const buttons = JSON.parse(params.json || '{}').buttons;
  const links = JSON.parse(params.json || '{}').links;

  return (
    <Wrapper className="w-full max-w-[400px]" positionX={params.positionX} positionY={params.positionY}>
      <Card>
        <CardHeader>
          <CardTitle>{header}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{text}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full shadow-none" variant="outline" onClick={() => params.setIsSettingsOpen(true)}>{buttons.settings.label}</Button>
          <Button className="w-full shadow-none" variant="outline" onClick={() => handleClick(params.declinedAllCookies)}>{buttons.decline.label}</Button>
          <Button className="w-full shadow-none" onClick={() => handleClick(params.allowAllCookies)}>{buttons.confirm.label}</Button>
          <div className="flex flex-row items-center gap-3 mt-3 text-sm">
            <div>
              <a href={links.legalnotice.href} target="_blank" rel="noopener noreferrer">{links.legalnotice.label}</a>
            </div>
            <div>
              <a href={links.dataprivacy.href} target="_blank" rel="noopener noreferrer">{links.dataprivacy.label}</a>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Wrapper>
  );
}
