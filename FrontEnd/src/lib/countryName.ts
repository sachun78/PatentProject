import { countries } from '../components/CountrySelector/CountrySelector'

export default function getCountryName(countryCode: string) {
  if (!countryCode) return ''
  return countries[countries.findIndex((v) => countryCode === v.code)].label
}
