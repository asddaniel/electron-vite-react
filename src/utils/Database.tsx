import { models } from '@/utils/beast';
import Dexie from 'dexie';

// 





export class User extends models.Model{
  Id = models.AutoField({primaryKey:true})
  username = models.CharField({maxLength: 100})
  email = models.CharField({blank: true, maxLength: 100})
  password = models.CharField({maxLength: 100})
  telephone = models.CharField({maxLength: 100})
  is_deleted = models.BooleanField({default: false})
  created_at = models.DateTimeField({blank:true})
  updated_at = models.DateTimeField({blank:true})
  deleted_at = models.DateTimeField({blank:true})
  special_id = models.CharField({maxLength: 100})
}
export type Usertype = {
    id?:number;
    username?:string;
    email:string;
    password:string;
    telephone?:string;
    created_at?:Date | string;
    updated_at?:Date | string;
    deleted_at?:Date | string;
    is_deleted?:boolean;
    special_id:string;
}

export class Role extends models.Model{ 
    id = models.IntegerField({primaryKey: true})
    name = models.CharField({maxLength:255})
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})

}

export type RoleType = {
    id?:number;
    name:string;
    created_at?:Date | string;
    updated_at?:Date | string;
    deleted_at?:Date | string;
    is_deletd?:boolean;
    special_id:string;
}
export class Categorie extends models.Model{
    id = models.IntegerField({primaryKey: true, default:0, unique: true})
    name = models.CharField({maxLength:255})
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
    
    
}

export type CategorieType = {
    id?:number;
    name:string;
    created_at?:Date | string;
    updated_at?:Date | string;
    deleted_at?:Date | string;
    is_deleted?:boolean;
    special_id:string;
}
export class Produit extends models.Model{
    id = models.IntegerField({primaryKey: true})
    name = models.CharField({maxLength:255})
    quantite = models.BigIntegerField({default:0})
    prix = models.BigIntegerField()
    is_deleted = models.BooleanField({default: false})
    Categorie = models.ForeignKey({model: Categorie})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
}

export type ProduitType = {
    id?:number;
    name:string;
    created_at?:Date | string;
    updated_at?:Date | string;
    quantite?:number;
    prix:number;
    Categorie:any;
    deleted_at?:Date | string;
    is_deleted?:boolean;
    special_id:string;
}

export class Client extends models.Model {
    id = models.IntegerField({primaryKey: true})
    name = models.CharField({maxLength:255})
    tel  = models.CharField({maxLength:255, blank:true})
    email = models.CharField({maxLength:255, blank:true});
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField({blank:true})
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
}

export type ClientType = {
    id?:number;
    name:string;
    tel?:string;
    email?:string;
    created_at?:Date | string;
    updated_at?:Date | string;
    deleted_at?:Date | string;
    is_deleted?:boolean;
    special_id:string;
}

export class Reduction extends models.Model{
    id = models.IntegerField({primaryKey: true})
    is_deleted = models.BooleanField({default: false})
    montant = models.BigIntegerField()
    facture = models.ForeignKey({model:Facture})
    pourcentage = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
}

export type ReductionType = {
    id?:number;
    montant?:string|number;
    pourcentage?:number;
    facture:Facture;
    created_at?:Date | string;
    updated_at?:Date | string;
    deleted_at?:Date | string;
    is_deleted?:boolean;
    special_id:string;
}

export class Facture extends models.Model{
    id = models.IntegerField({primaryKey: true})
    Client = models.ForeignKey({model: Client})
    numfacture = models.CharField({maxLength:255})
    is_paid = models.BooleanField({default:false})
    User = models.ForeignKey({model: User, blank:true, default:{}})
    is_deleted = models.BooleanField({default: false})
    Reduction = models.ForeignKey({model: Reduction, blank:true})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true}) 
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})

}

export class Fournisseur extends models.Model {
     id = models.IntegerField({primaryKey: true})
     name = models.CharField({maxLength:255})
     telephone = models.CharField({maxLength:255, blank:true})
     email = models.CharField({maxLength:255, blank:true})
     is_deleted = models.BooleanField({default: false})
     created_at = models.DateTimeField()
     updated_at = models.DateTimeField({blank:true})
     deleted_at = models.DateTimeField({blank:true})
     special_id = models.CharField({maxLength: 100})

}
export type FournisseurType = {
    id?:number;
    name:string;
    telephone?:string;
    email?:string;
    created_at?:Date | string;
    updated_at?:Date | string;
    deleted_at?:Date | string;
    is_deleted?:boolean;
    special_id:string;
}

export class Approvisionnement extends models.Model {
    id = models.IntegerField({primaryKey: true})
    Fournisseur = models.ForeignKey({model: Fournisseur})
    Produit = models.ForeignKey({model:Produit})
    quantite = models.IntegerField({primaryKey: true})
    prix = models.BigIntegerField()
    description = models.TextField()
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
}

export class LigneFacture extends models.Model {
    id = models.IntegerField({primaryKey: true})
    Produit = models.ForeignKey({model:Produit})
    Facture = models.ForeignKey({model:Facture})
    quantite = models.IntegerField()
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})

 }

 export class Livraison extends models.Model {
    id = models.IntegerField({primaryKey: true})
    Facture = models.ForeignKey({model:Facture})
    User = models.ForeignKey({model:User})
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
 }


 export class CodeBarre extends models.Model {
    id = models.IntegerField({primaryKey: true})
    Produit = models.ForeignKey({model:Produit})
    codebarre = models.CharField({maxLength:255})
    Approvisionnement = models.ForeignKey({model:Approvisionnement})
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
 }

 export class RoleUser extends models.Model {
    id = models.IntegerField({primaryKey: true})
    Role = models.ForeignKey({model:Role})
    User = models.ForeignKey({model:User})
    is_deleted = models.BooleanField({default: false})
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField({blank:true})
    deleted_at = models.DateTimeField({blank:true})
    special_id = models.CharField({maxLength: 100})
 }
 export type RoleUserType = {
    id?: number;
    Role: RoleType;
    User: Usertype;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted?: boolean;
    special_id: string;
  };
 export type FactureType = {
    id?: number;
    Client: ClientType;
    numfacture?: string;
    is_paid?: boolean;
    User?: Usertype;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted?: boolean;
    special_id: string;
  };
  

 export type ApprovisionnementType = {
    id?: number;
    Fournisseur: FournisseurType;
    Produit: ProduitType;
    quantite: number;
    description?: string;
    prix: number;
    created_at?: Date;
    updated_at?: Date|string;
    deleted_at?: Date;
    is_deleted?: boolean;
    special_id: string;
  };
  
  export type LigneFactureType = {
    id?: number;
    Produit: ProduitType;
    Facture: FactureType;
    quantite: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted?: boolean;
    special_id: string;
  };
  
  export type LivraisonType = {
    id?: number;
    Facture: FactureType;
    User: Usertype;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted?: boolean;
    special_id: string;
  };
  
  export type CodeBarreType = {
    id?: number;
    Produit: ProduitType;
    codebarre: string;
    Approvisionnement: ApprovisionnementType;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted?: boolean;
    special_id: string;
  };

  

 models.register({
    databaseName:"mtech", 
    version:1, 
    type: "indexedDB", 
    models: [User, Role, Categorie, Produit, Client, Facture, Fournisseur, Approvisionnement, LigneFacture, Livraison,
            CodeBarre, RoleUser, Reduction]
 })
 //models.migrate();