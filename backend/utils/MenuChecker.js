export const MenuChecker = (Menu) => {
    if(!Array.isArray(Menu) || Menu.length===0){
        return false;
    }
    else{
        for(let i=0; i<Menu.length; i++){
            if(!Menu[i].name || typeof(Menu[i].name)!=="string" || !Menu[i].price || !Menu[i].category || typeof(Menu[i].category)!=="string"){
                return false;
            }
        }
        return true;
    }
}
