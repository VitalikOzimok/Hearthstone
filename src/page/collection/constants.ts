import Mage from "../../assets/classes/Mage.png";
import Paladin from "../../assets/classes/Paladin.png";
import Druid from "../../assets/classes/Druid.png";
import Priest from "../../assets/classes/Priest.png";
import Hunter from "../../assets/classes/Hunter.png";
import Rogue from "../../assets/classes/Rogue.png";
import Shaman from "../../assets/classes/Shaman.png";
import Warlock from "../../assets/classes/Warlock.png";
import Warrior from "../../assets/classes/Warrior.png";

export const heroImages: Record<string, string> = {
  Mage,
  Paladin,
  Druid,
  Priest,
  Hunter,
  Rogue,
  Shaman,
  Warlock,
  Warrior,
};
export const costOptions = [1, 2, 3, 4, 5, 6, 7, 8];

export const BASE_URL = "https://omgvamp-hearthstone-v1.p.rapidapi.com";

export const CARD_TYPES = {
  HERO_POWER: "Hero Power",
  HERO: "Hero",
};
