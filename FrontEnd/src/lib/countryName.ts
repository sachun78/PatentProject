import { countries } from '../components/CountrySelector/CountrySelector'

export default function getCountryName(countryCode: string) {
  return countries[countries.findIndex((v) => (countryCode) === v.code)].label
}
