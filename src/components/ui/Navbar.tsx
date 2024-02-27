import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface NavbarProps {
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ setActiveTab }: NavbarProps) {
  return (
    <NavigationMenu className="max-w-none p-4 bg-current">
      <NavigationMenuList className="space-x-4 md:space-x-8">
        <NavigationMenuItem className="hover:cursor-pointer">
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => setActiveTab("Password Generator")}
          >
            Password Generator
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:cursor-pointer">
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => setActiveTab("QR Code Generator")}
          >
            QR Code Generator
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
