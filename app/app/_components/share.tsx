import { CircleCheckBig, Copy, Share } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";

export function ShareLink() {
  const [copied, setCopied] = useState(false);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "URL não definida";

  const handleCopyClick = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex w-full items-center ">
          <Share className="mr-2 h-4 w-4" /> Compartilhar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar plataforma</DialogTitle>
          <DialogDescription>
            Este é o link de compartilhamento da plataforma.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={appUrl} readOnly />
          </div>

          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopyClick}
          >
            <span className="sr-only">Copiar</span>
            {copied ? (
              <CircleCheckBig className="h-4 w-4" />
            ) : (
              <Copy
                className="h-4 w-4"
                onClick={() => navigator.clipboard.writeText(appUrl)}
              />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
