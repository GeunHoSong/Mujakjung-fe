export {};

declare global {
  interface Window {
    kakao?: {
      maps?: any;
      postcode?: any;
      Postcode?: any;
    };
  }
}