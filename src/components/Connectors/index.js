import GoogleAds from './GoogleAds'
import FacebookAds from './FacebookAds'
import AmazonAds from './AmazonAds'
import BingAds from './BingAds'
import Stripe from './Stripe'
import Shopify from './Shopify'
import PayPal from './PayPal'
import AmazonSeller from './AmazonSeller'
import GooglePlay from './GooglePlay'
import AppStore from './AppStore'
import Holded from './Holded'
import Sage from './Sage'
import Sageone from './Sageone'
import FreeAgent from './FreeAgent'
import FreshBooks from './FreshBooks'
import KashFlow from './KashFlow'
import Nutcache from './Nutcache'
import MercadoPago from './MercadoPago'
import MercadoLibre from './MercadoLibre'
import Xero from './Xero'
import ZohoBooks from './ZohoBooks'
import FinanceOthers from './FinanceOthers'
import MarketingOthers from './MarketingOthers'
import SalesOthers from './SalesOthers'
import QuickBooks from './QuickBooks'
import Magento from './Magento'
import Prestashop from './Prestashop'
import Woocommerce from './Woocommerce'
import GoogleAnalytics from './GoogleAnalytics'

export { default as AmazonAds } from './AmazonAds'
export { default as AmazonSeller } from './AmazonSeller'
export { default as AppStore } from './AppStore'
export { default as BingAds } from './BingAds'
export { default as DefaultContent } from './DefaultContent'
export { default as FacebookAds } from './FacebookAds'
export { default as FaqInfo } from './FaqInfo'
export { default as FinanceOthers } from './FinanceOthers'
export { default as FreeAgent } from './FreeAgent'
export { default as FreshBooks } from './FreshBooks'
export { default as GoogleAds } from './GoogleAds'
export { default as GoogleAnalytics } from './GoogleAnalytics'
export { default as GooglePlay } from './GooglePlay'
export { default as Holded } from './Holded'
export { default as KashFlow } from './KashFlow'
export { default as Magento } from './Magento'
export { default as MarketingOthers } from './MarketingOthers'
export { default as MercadoLibre } from './MercadoLibre'
export { default as MercadoPago } from './MercadoPago'
export { default as Nutcache } from './Nutcache'
export { default as PayPal } from './PayPal'
export { default as Prestashop } from './Prestashop'
export { default as QuickBooks } from './QuickBooks'
export { default as Sage } from './Sage'
export { default as Sageone } from './Sageone'
export { default as SalesOthers } from './SalesOthers'
export { default as Shopify } from './Shopify'
export { default as Stripe } from './Stripe'
export { default as Woocommerce } from './Woocommerce'
export { default as Xero } from './Xero'
export { default as ZohoBooks } from './ZohoBooks'

export const connectorComponent = {
  gas: GoogleAds,
  googleanalytics: GoogleAnalytics,
  aas: AmazonAds,
  fas: FacebookAds,
  bas: BingAds,
  mercadolibre: MercadoLibre,
  mercadopago: MercadoPago,
  stripe: Stripe,
  shopify: Shopify,
  paypal: PayPal,
  amazonseller: AmazonSeller,
  googleplay: GooglePlay,
  appstore: AppStore,
  holded: Holded,
  sage: Sage,
  freeagent: FreeAgent,
  freshbooks: FreshBooks,
  kashflow: KashFlow,
  nutcache: Nutcache,
  xero: Xero,
  zohobooks: ZohoBooks,
  financeothers: FinanceOthers,
  salesothers: SalesOthers,
  marketingothers: MarketingOthers,
  quickbooks: QuickBooks,
  magento: Magento,
  prestashop: Prestashop,
  woocommerce: Woocommerce,
  sageone: Sageone,
}
