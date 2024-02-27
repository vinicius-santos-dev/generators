import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import QRCode from "react-qr-code";

export default function QrCodeGenerator() {
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

  return (
    <Card className="flex justify-center flex-col items-center">
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
  );
}
