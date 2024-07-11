export const Findby = (name, address, rating, dishName, cost, tempShops)=>{
    let shops;
    if(name){
        shops = tempShops.filter((elem)=>elem.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if(address){
        shops = tempShops.filter((elem)=>elem.address.toLowerCase().includes(address.toLowerCase()));
    }
    else if(rating && !isNaN(parseFloat(rating))){
        shops = tempShops.filter((elem)=>elem.rating>rating);
    }
    else if(cost && !isNaN(parseFloat(cost))){
        shops = tempShops.filter((elem)=>(elem.menu.reduce((agg,dish)=>agg+dish.price,0)/elem.menu.length)<=cost);
    }
    else if(dishName){
        shops = tempShops.filter((elem)=>elem.menu.filter((dish)=>dish.name.toLowerCase().includes(dishName.toLowerCase())).length!==0);
    }
    else{
        return tempShops;
    }
    return shops;
}