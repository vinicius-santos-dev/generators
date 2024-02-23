import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

export default function App() {
  return (
    <>
      <Card className="w-5/12 m-auto flex justify-center flex-col items-center">
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
          <CardDescription>Enter your text or URL</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text"></Label>
                <Input id="text" name="text"></Input>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 ">
          <Button>Generate</Button>
          <Button>Download</Button>
        </CardFooter>
      </Card>
    </>
  );
}
