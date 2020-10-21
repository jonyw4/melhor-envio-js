interface Range {
  min: number;
  max: number;
}

export enum ShippingMethods {
  CorreiosPac = '1',
  CorreiosSEDEX = '2',
  CorreiosPacMini = '17',
  JadlogPackage = '3',
  JadlogCom = '4'
}

export type CorreiosShippingMethods =
  | ShippingMethods.CorreiosPac
  | ShippingMethods.CorreiosSEDEX
  | ShippingMethods.CorreiosPacMini;

export type JadlogShippingMethods =
  | ShippingMethods.JadlogCom
  | ShippingMethods.JadlogPackage;

export interface AddressBase {
  name: string;
  phone: string;
  email: string;
  state_register: string;
  address: string;
  complement: string;
  number: string;
  district: string;
  state_abbr: string;
  city: string;
  country_id: string;
  postal_code: string;
  note: string;
}

export interface AddressCPF extends AddressBase {
  document: string;
}

export interface AddressCNPJ extends AddressBase {
  company_document: string;
}

export type Address = AddressCPF | AddressCNPJ;

export interface MelhorEnvioBoxRange {
  weight: Range;
  width: Range;
  height: Range;
  length: Range;
  sum: number;
}

export interface MelhorEnvioCompany {
  id: number;
  name: string;
  picture: string;
}

export interface MelhorEnvioPackage {
  /** Width (cm) */
  width: number;
  /** Height (cm) */
  height: number;
  /** Length (cm) */
  length: number;
  /** Weight (kg) */
  weight: number;
}

export interface MelhorEnvioCalculateShipmentProduct {
  id: string;
  /** Width (cm) */
  width: number;
  /** Height (cm)*/
  height: number;
  /** Length (cm) */
  length: number;
  /** Weight (kg) */
  weight: number;
  /** Value for the insurance */
  insurance_value: number;
  /** Qty of items */
  quantity: number;
}

export namespace Response {
  export interface Server<T> {
    data: T;
  }
  export namespace Shipment {
    export interface Services {
      id: number;
      name: string;
      type: string;
      /** Restriction information */
      restrictions: {
        /** Range of insurance allowed */
        insurance_value: Range;
        /** A list of allowed formats */
        formats: {
          box?: MelhorEnvioBoxRange;
          roll?: MelhorEnvioBoxRange;
          letter?: MelhorEnvioBoxRange;
        };
      };
      /** ? */
      requirements: Array<any>;
      /** ? */
      optionals: Array<any>;
      company: MelhorEnvioCompany;
    }
    interface CalculateItem {
      Id: number;
      name: string;
      price: number;
      custom_price: number;
      discount: number;
      currency: string;
      delivery_time: number;
      delivery_range: Range;
      custom_delivery_time: number;
      custom_delivery_range: Range;
      packages: Array<any>;
      additional_services: {
        receipt: boolean;
        own_hand: boolean;
        collect: boolean;
      };
      company: MelhorEnvioCompany;
    }
    export type Calculate<T = Array<string> | string | null> = T extends string
      ? CalculateItem
      : CalculateItem[];
    /**
     * **Nota: entre os dados retornados constará o id da etiqueta. Este id deverá ser salvo em vias de realizar futuras interações para esta etiqueta, como o momento da compra da etiqueta (checkout).**
     */
  }
  export interface Cart {
    id: string;
  }
}

export namespace Request {
  export namespace Shipment {
    export interface Calculate {
      fromPostalCode: string;
      toPostalCode: string;
      productsOrPackageData:
        | MelhorEnvioPackage
        | MelhorEnvioCalculateShipmentProduct[];
      services: Array<string> | string | null;
      receipt?: boolean;
      ownHand: boolean;
      insuranceValue: number;
    }
  }

  type CartProducts = Array<{
    name: string;
    quantity: number;
    unitary_value: number;
  }>;
  type CartInvoice = {
    key: string;
  };

  export type Cart<S, NC> = {
    service: S;
    agency: S extends CorreiosShippingMethods
      ? string
      : string | null | undefined;
    from: Address;
    to: Address;
    products: NC extends true ? CartProducts : CartProducts | null | undefined;
    volumes: S extends CorreiosShippingMethods
      ? [MelhorEnvioPackage]
      : Array<MelhorEnvioPackage>;
    options: {
      /** **O campo deve conter o valor de seguro do envio, que deve corresponder ao valor dos itens/produtos enviados e deverá bater com o valor da NF.** */
      insurance_value: number;
      receipt: false;
      own_hand: false;
      reverse: false;
      non_commercial: NC;
      invoice: NC extends false ? CartInvoice : null;
      platform: string;
      tags?: Array<{
        tag: string;
        url: string | null | undefined;
      }>;
    };
  };
}
