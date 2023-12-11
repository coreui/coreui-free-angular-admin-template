export interface IUserInfo {
    token: IToken;
    user: IUserData;
    wallet: IWallet;
  }
  
  export interface IToken {
    accessToken: string;
  }
  
  export interface IUserData {
    id: number;
    role_id: number;
    email: string;
    username: string;
    last_login: string;
    last_ip: string;
    banned: boolean;
    display_name: string;
    active: number;
    referrer_id: number;
    posid: number;
    full_name: string;
    position: string;
    balance: number;
    country: string;
    phone: string;
    wallet_addr: string;
    refer_code: string;
  }
  
  export interface IWalletAddress {
    id?: number;
    user_id?: number;
    address: string;
    network_name: string;
    network_type: string;
    status: string;
    note: string;
  }
  
  export interface IWallet {
    net_wallet: number;
    roi_wallet: number;
    invest_wallet: number;
  }
  
  
  export interface IDepositAddress {
    deposit_address: string;
  }
  
  export interface IUserLoginData {
    email: string;
    password: string;
  }
  
  export interface IAffiliate {
    id: number;
    full_name: string;
    username: string;
    invest_wallet: number;
    referrer_id: number;
    new_invest: number;
    carry_forward: number;
  }
  
  export interface ITransaction {
    id?: number;
    date?: string;
    description?: string;
    type: string;
    amount?: number;
    balance?: number;
    reference_number?: string;
    user_id?: number;
    status?: string;
    notes?: string;
    transaction_fee?: number;
    approval?: Approval;
    currency?: string;
    modified?: string;
    read_status?: number;
  }
  
  interface ITransactionType {
    type: string;
    value: string;
  }
  
  export interface IWithdraw {
    id?: number;
    user_id: number;
    withdraw_amount: number;
    address: string;
    network: string;
    status: string;
    modified_on: string;
    cancel_reason: string;
    reference: string;
    full_name?: string; 
    net_wallet?: number;
  }
  
  export const transactionEnum: ITransactionType[] = [
    {type: 'deposit', value: 'Deposit'},
    {type: 'PairingBonus', value: 'Pairing Bonus'},
    {type: 'purchase_package', value: 'Purchase Package'},
    {type: 'ArbitrageRoiBonus', value: 'Arbitrage ROI Bonus'},
    {type: 'ArbitrageBonus', value: 'Arbitrage Bonus'},
    {type: 'package_withdrawal', value: 'Package withdrawal'}
  ];
  
  export enum Approval {
    Approved = 'approved',
    Declined = 'declined',
    Pending = 'pending'
  }
  
  export type transactionType = "deposit" | "PairingBonus" | "purchase_package" | "ArbitrageRoiBonus" | "ArbitrageBonus" | "package_withdrawal";
  