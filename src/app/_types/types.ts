interface IPrice {
  eur: number;
  rub: number;
  usd: number;
}

///----------------------------------
/// Карточка трендов
///----------------------------------

interface ITrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_btc: string;
      price_change_percentage_24h: IPrice;
      market_cap: string;
      market_cap_btc: string;
      total_volume: string;
      total_volume_btc: string;
      sparkline: string;
    };
  };
}

interface ITrendingCategoria {
  id: number;
  name: string;
  market_cap_1h_change: number;
  slug: string;
  coins_count: string;
  data: {
    market_cap: number;
    market_cap_btc: number;
    total_volume: number;
    total_volume_btc: number;
    market_cap_change_percentage_24h: IPrice;
    sparkline: string;
  };
}

interface ITrendingNft {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
  data: {
    floor_price: string;
    floor_price_in_usd_24h_percentage_change: string;
    h24_volume: string;
    h24_average_sale_price: string;
    sparkline: string;
  };
}

export interface ITrending {
  coins: ITrendingCoin[];
  categories: ITrendingCategoria[];
  nfts: ITrendingNft[];
}
///----------------------------------
/// Тайпгард для карточки трендов
///----------------------------------

type CardItem = ITrendingCoin | ITrendingNft;

export function isNft(item: CardItem): item is ITrendingNft {
  return "nft_contract_id" in item;
}

///----------------------------------
/// Карточка маркета
///----------------------------------

export interface IMarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

///----------------------------------
/// Страница историческая информация
///----------------------------------

export interface IAboutCoin {
  id: string;
  symbol: string;
  name: string;
  hashing_algorithm: string;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  genesis_date: string;
  last_updated: string;
}

///----------------------------------
/// Пропсы компонентов
///----------------------------------

export type InfoCardProps = {
  title: string;
  description: string;
  date: string;
};

export type TrendingCardProps = {
  cardItem: CardItem;
  key: React.Key;
};

export type MarketCardProps = {
  coin: IMarketCoin;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  key: React.Key;
};

///----------------------------------
/// Провайдер для страницы профиля
///----------------------------------

export interface IUserContext {
  favoriteCoins: string[];
  changeFavoriteCoins: (coinId: string) => void;
}

export interface IUserContextProvider {
  children: React.ReactNode;
}

///----------------------------------
/// Для модального окна
///----------------------------------

export type ModalProps = {
  show: boolean;
  onCloseButtonClick: () => void;
};

export type MessageProps = {
  text: string;
  img?: File;
  key: React.Key;
};

export interface IModalHTMLFormControlsCollection
  extends HTMLFormControlsCollection {
  msg: { value: string };
  msgfile: { files: FileList };
}

export interface ICoinListItem {
  id: string;
  symbol: string;
  name: string;
}
