import { useState } from "react";
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
import QRCode from "react-qr-code";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";

export default function App() {
  /* QR Code Generator */
  const [isGenerated, setIsGenerated] = useState(false);
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsGenerated(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function convertSvgToPng(svg: SVGSVGElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        resolve(pngFile);
      };

      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      image.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    });
  }

  function downloadPng(pngFile: string) {
    const downloadLink = document.createElement("a");
    downloadLink.download = "QRCode.png";
    downloadLink.href = pngFile;
    downloadLink.click();
  }

  async function handleDownload() {
    try {
      const qrCodeSvg = document.getElementById(
        "QRCode"
      ) as unknown as SVGSVGElement;
      const pngFile = await convertSvgToPng(qrCodeSvg);
      downloadPng(pngFile);
    } catch (error) {
      console.error("Failed to download QR Code", error);
    }
  }
  /* QR Code Generator */

  /* Password Generator */
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  function handlePasswordLengthChange(e: Array<number>) {
    setPasswordLength(e[0]);
  }

  function generatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += '!"^+%&/()=?_#5%6([]]|;:>:`<.*-@';

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(password);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password);
  }
  /* Password Generator */

  return (
    <>
      <Card className="w-5/12 m-auto flex justify-center flex-col items-center">
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
          <CardDescription>Enter your text or URL</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col items-center">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  placeholder="Your text or URL here"
                  required
                  id="text"
                  name="text"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            {/* QR Code */}
            <Card
              className="mt-6 flex items-center justify-center"
              style={{ height: 180, width: 180 }}
            >
              <CardContent className="flex justify-center p-0">
                {isGenerated && (
                  <QRCode id="QRCode" value={text} size={160}></QRCode>
                )}
              </CardContent>
            </Card>
            {/* QR Code */}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 ">
            <Button type="submit" className="w-1/2">
              Generate
            </Button>
            {isGenerated && (
              <Button className="w-1/2" onClick={handleDownload}>
                Download
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <Card className="mt-28 w-5/12 flex justify-center flex-col items-center mx-auto">
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
        </CardHeader>
        <form onSubmit={generatePassword}>
          <CardContent className="flex flex-col items-center">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" id="password" value={password} readOnly />
              <Button type="button" onClick={copyPassword}>Copy</Button>
            </div>

            <div className="flex flex-col justify-center w-full mt-8 gap-4">
              Password Length
              <Slider
                id="slider"
                defaultValue={[passwordLength]}
                max={20}
                step={1}
                onValueChange={(e) => handlePasswordLengthChange(e)}
              ></Slider>
              <span className="text-center">{passwordLength}</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 w-full">
              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="lowercase"
                  name="lowercase"
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                ></input>
                <Label htmlFor="lowercase">Lowercase (a-z)</Label>
              </div>

              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="uppercase"
                  name="uppercase"
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                ></input>
                <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
              </div>

              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="numbers"
                  name="numbers"
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                ></input>
                <Label htmlFor="numbers">Numbers (0-9)</Label>
              </div>

              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="symbols"
                  name="symbols"
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                ></input>
                <Label htmlFor="symbols">Symbols (!$^+-)</Label>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-center">
            <Button type="submit" className="w-1/2">
              Generate password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
