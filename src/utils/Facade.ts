import { User } from "./Database";
import bcrypt from "bcryptjs"

export const initializeDefaultUser = async ()=>{
 const all = await User.all();
 if(all.length == 0){

  const salt = await bcrypt.genSalt(9)
  const hash = await bcrypt.hash("admin", salt)
  const user = await User.create({
    username:"admin", 
    id:all.length,
    email:"admin", 
    password:hash, 
    telephone:"0000",
    role:0,
    created_at:new Date(),
    is_deleted:false,
    special_id:generateAlphaNumericString(20),
  })
   
 }
 
}


export const getPageStyle = ()=>{
    // Récupérer toutes les feuilles de style liées au document
  const styleSheets:any = document.styleSheets;
  
  // Stocker les styles sous forme de chaîne de caractères
  let allStyles = '';
  
  // Parcourir toutes les feuilles de style
  for (const styleSheet of styleSheets) {
    try {
      // Récupérer les règles de style de chaque feuille de style
      const rules = styleSheet.cssRules || styleSheet.rules;
  
      // Parcourir toutes les règles de style
      for (const rule of rules) {
        allStyles += rule.cssText + '\n';
      }
    } catch (error:any) {
      // Gérer les éventuelles erreurs d'accès aux feuilles de style (peuvent être dues à des politiques de même origine, etc.)
      console.error('Erreur lors de l\'accès à une feuille de style :', error.message);
    }
  }
  
  // Afficher les styles dans la console ou faire ce que vous voulez avec la chaîne de caractères
  console.log(allStyles);
  return allStyles;
  }
  
  export function generateAlphaNumericString(length:number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }