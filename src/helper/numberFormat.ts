import intl from 'intl';
import 'intl/locale-data/jsonp/id-ID';

export const numberFormat = intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
})