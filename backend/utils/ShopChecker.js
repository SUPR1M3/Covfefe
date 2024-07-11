import { MenuChecker } from "./MenuChecker.js";
export const ShopChecker = (Shop) => {
    if(!Shop.name || typeof(Shop.name)!=="string" || !Shop.address || typeof(Shop.address)!=="string" || !Shop.rating || !Shop.menu || !MenuChecker(Shop.menu)){
        return false;
    }
    return true;
}