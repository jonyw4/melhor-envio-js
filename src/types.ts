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

export interface Order {
  id: string;
  protocol: string;
  service_id: number;
  agency_id: string | null;
  contract: string;
  service_code: string | null;
  quote: number;
  price: number;
  coupon: string | null;
  discount: number;
  delivery_min: number;
  delivery_max: number;
  status: string;
  reminder: string | null;
  insurance_value: number;
  weight: number | null;
  width: number | null;
  height: number | null;
  length: number | null;
  diameter: number | null;
  format: string;
  billed_weight: 0.14;
  receipt: boolean;
  own_hand: boolean;
  collect: boolean;
  collect_scheduled_at: string | null;
  reverse: boolean;
  non_commercial: boolean;
  authorization_code: string | null;
  tracking: string | null;
  self_tracking: string | null;
  delivery_receipt: string | null;
  additional_info: string | null;
  cte_key: string | null;
  paid_at: string | null;
  generated_at: string | null;
  posted_at: string | null;
  delivered_at: string | null;
  canceled_at: string | null;
  suspended_at: string | null;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
  parse_pi_at: string | null;
  volumes: [
    {
      id: string;
      height: string;
      width: string;
      length: string;
      diameter: string;
      weight: string;
      format: string;
      created_at: string;
      updated_at: string;
    }
  ];
}

export interface Transaction {
  id: string;
  protocol: string;
  value: number;
  type: string;
  status: string;
  description: string;
  authorized_at: string;
  unauthorized_at: string | null;
  reserved_at: string | null;
  canceled_at: string | null;
  created_at: string;
  description_internal: string | null;
  reason: any;
}

export interface AddressBase {
  name: string;
  phone: string;
  email: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state_register: string;
  state_abbr: string;
  country_id: string;
  postal_code: string;
  note?: string;
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

    export interface Checkout {
      purchase: {
        id: string;
        protocol: string;
        total: number;
        discount: number;
        status: string;
        paid_at: string;
        canceled_at: string | null;
        created_at: string;
        updated_at: string;
        payment: string;
        transactions: Transaction[];
        orders: Order[];
        paypal_discounts: Array<any>;
      };
      digitable: string | null;
      redirect: string | null;
      message: string | null;
      token: string | null;
      payment_id: string | null;
    }
    export interface Print {
      url: string;
    }
    export interface Generate {
      [orderId: string]: {
        status: boolean;
        message: string;
      };
    }
    export interface Tracking {
      id: string;
      protocol: string;
      status: string;
      tracking: string;
      melhorenvio_tracking: string;
      created_at: string;
      paid_at: string;
      generated_at: string;
      posted_at: string | null;
      delivered_at: string | null;
      canceled_at: string | null;
      expired_at: string | null;
    }
  }
  export type Cart = Order;
}
interface RequestWithOrders {
  orders: string[];
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

    interface CheckoutWithGateway extends RequestWithOrders {
      gateway: 'moip' | 'mercado-pago' | 'picpay' | 'pagseguro';
      /**
       * URL de redirecionamento para retorno após o pagamento
       */
      redirect: string;
    }
    export type Checkout = RequestWithOrders | CheckoutWithGateway;

    export interface Print extends RequestWithOrders {
      /**
       * É possível solicitar que o link seja público ou privado através do parâmetro mode. Por padrão, todos os links de impressão solicitados sem a definição do parâmetro mode como public são privados. Sendo o link público, qualquer pessoa com o link pode acessar. Sendo o link privado, é necessário estar logado no Melhor Envio com o usuário que gerou a etiqueta.
       */
      mode: 'public' | 'private';
    }
    export type Generate = RequestWithOrders;
    export type Tracking = RequestWithOrders;
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
    agency: S extends JadlogShippingMethods
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
