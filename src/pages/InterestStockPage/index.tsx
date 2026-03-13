import StockListSection from '@/components/common/StockListSection';
import { useFavoriteStocks } from '@/contexts/useFavoriteStocks';

function InterestStockPage() {
  const { favoriteItems } = useFavoriteStocks();

  return <StockListSection items={favoriteItems} showChart removeOnUnlike />;
}

export default InterestStockPage;
