import { POSTAL_CODE_NAME_BY_COUNTRY_CODE } from "../constants"

export const getPostalCodeNameForCountryCode = (countryCode: string) => {
  const entry = POSTAL_CODE_NAME_BY_COUNTRY_CODE.find((item) => item.countryCode === countryCode);
  
  if (entry?.postalCodeName) {
    return entry.postalCodeName;
  } else {
    throw new Error(`Unable to find postal code name for ${countryCode}`);
  }
}