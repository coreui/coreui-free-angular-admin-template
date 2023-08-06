export class OrigoSupplierUser {
    constructor(
        readonly uid:string,
        readonly name:string,
        readonly surname:string,
        readonly email:string,
        public supplier:string, // Nota: supplier e supplierid resi non readonly per poter poter fare enrolling nel user profile. Pensare ad una soluzione migliore, l'utente dovrebbe essere assegnato da un admin
        public supplierId:string,
        public displayName?: string,
        public phoneNumber?: string,
        public photoURL?: string) {}
}