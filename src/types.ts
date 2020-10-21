interface Range {
  min: number;
  max: number;
}

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
}
