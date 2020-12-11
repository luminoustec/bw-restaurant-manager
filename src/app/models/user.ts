export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  password: string;
  location_lat: number;
  location_lng: number;
  token: string;
  profile_img?: string;
  rideId: number;
  location: string;
  home?: string;
  work?: string;
  isChecked?: boolean;
  signInToken?: string;
}

export interface cc {
  cardName: string;
  cardNumber: number;
  cvv: number
  expiryDate: string;
  cardType: string;
}

export interface fav {
  name: string;
  companyName: string;
  phone: string
  address: string;
}

