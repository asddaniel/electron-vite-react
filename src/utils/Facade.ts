export const getPageStyle = ()=>{
    // Récupérer toutes les feuilles de style liées au document
  const styleSheets = document.styleSheets;
  
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