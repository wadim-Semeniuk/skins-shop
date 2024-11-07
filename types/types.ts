export interface Skin {
  id: number;
  name: string;
  price: number;
  image: string;
  exterior?: {
    title: string;
    css_color: string;
  };
}

export enum PaymentType {
  CARD = 'CARD',
  CRYPTO = 'CRYPTO',
}

export enum SortOptionValue {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortOption {
  label: string;
  icon: string;
  value: SortOptionValue
}

export interface Payment {
  id: string;
  image: string;
  type: PaymentType;
}

export interface Country {
  id: string;
  logo: string;
  title: string;
  payments: Payment[];
}

export interface PaymentInfoItem {
  title: string;
  value: string;
  visible: boolean;
}

export enum PaymentStageValue {
  METHOD = 'METHOD',
  DETAILS = 'DETAILS',
  CONFIRMATION = 'CONFIRMATION',
  TRANSFER ='TRANSFER',
}

export enum TransferStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PaymentStage {
  value: PaymentStageValue;
  title: string;
}

export interface TransferState {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  click: () => void;
}