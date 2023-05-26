export interface CreateOrder {
  DestinationAddress: DestinationAddressI;
  Products: ProductsI[];
}

interface DestinationAddressI {
  Coordinates: string;
  FirstName: string;
  LastName: string;
  Street: string;
  ZipCode: number;
  State: string;
  City: string;
  Neighbourhood: string;
  ExNumber: number;
  InNumber: number;
  PhoneNumber: number;
}

export interface ProductsI {
  Weight: string;
}

export interface DetailOrder {
  Order: OrderDetail
 
}

interface OrderDetail{
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  PackageSize: string;
  Status: string;
  Refund: boolean;
  DestinationAddress: DetailDestinationAddress;
  Products: DetailProducts[];
}

interface DetailDestinationAddress {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  Coordinates: string;
  FirstName: string;
  LastName: string;
  Street: string;
  ZipCode: string;
  State: string;
  City: string;
  Neighbourhood: string;
  ExNumber: string;
  InNumber: string;
  PhoneNumber: string;
  OrderID: number;
}

export interface DetailProducts {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Weight: number;
  OrderID: number;
}
