import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface PasswordSettings {
  password: string;
  passwordLength: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export default function PasswordGenerator() {
  const [passwordSettings, setPasswordSettings] = useState<PasswordSettings>({
    password: "",
    passwordLength: 6,
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
  });

  function handlePasswordLengthChange(e: Array<number>) {
    setPasswordSettings({ ...passwordSettings, passwordLength: e[0] });
  }

  function generatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let charset = "";
    const lowercase = passwordSettings.lowercase;
    const uppercase = passwordSettings.uppercase;
    const numbers = passwordSettings.numbers;
    const symbols = passwordSettings.symbols;
    const passwordLength = passwordSettings.passwordLength;

    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += '!"^+%&/()=?_#%([]]|;:>:`<.*-@';

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPasswordSettings({ ...passwordSettings, password });
  }

  function copyPassword() {
    const password = passwordSettings.password;

    navigator.clipboard.writeText(password);
  }

  return (
    <Card className="mt-28 w-5/12 flex justify-center flex-col items-center mx-auto">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <form onSubmit={generatePassword}>
        <CardContent className="flex flex-col items-center">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              id="password"
              value={passwordSettings.password}
              readOnly
            />
            <Button type="button" onClick={copyPassword}>
              Copy
            </Button>
          </div>

          <div className="flex flex-col justify-center w-full mt-8 gap-4">
            Password Length
            <Slider
              id="slider"
              defaultValue={[passwordSettings.passwordLength]}
              max={20}
              step={1}
              onValueChange={(e) => handlePasswordLengthChange(e)}
            ></Slider>
            <span className="text-center">
              {passwordSettings.passwordLength}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 w-full">
            <div className="flex items-center">
              <input
                className="mr-2"
                id="lowercase"
                name="lowercase"
                type="checkbox"
                checked={passwordSettings.lowercase}
                onChange={(e) =>
                  setPasswordSettings({
                    ...passwordSettings,
                    lowercase: e.target.checked,
                  })
                }
              ></input>
              <Label htmlFor="lowercase">Lowercase (a-z)</Label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                id="uppercase"
                name="uppercase"
                type="checkbox"
                checked={passwordSettings.uppercase}
                onChange={(e) =>
                  setPasswordSettings({
                    ...passwordSettings,
                    uppercase: e.target.checked,
                  })
                }
              ></input>
              <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                id="numbers"
                name="numbers"
                type="checkbox"
                checked={passwordSettings.numbers}
                onChange={(e) =>
                  setPasswordSettings({
                    ...passwordSettings,
                    numbers: e.target.checked,
                  })
                }
              ></input>
              <Label htmlFor="numbers">Numbers (0-9)</Label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                id="symbols"
                name="symbols"
                type="checkbox"
                checked={passwordSettings.symbols}
                onChange={(e) =>
                  setPasswordSettings({
                    ...passwordSettings,
                    symbols: e.target.checked,
                  })
                }
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
  );
}
